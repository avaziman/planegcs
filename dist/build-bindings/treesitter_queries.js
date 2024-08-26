// This library provides WebAssembly bindings for the FreeCAD's geometric solver library planegcs.
// Copyright (C) 2023  Miroslav Šerý, Salusoft89 <miroslav.sery@salusoft89.cz>  
// This library is free software; you can redistribute it and/or
// modify it under the terms of the GNU Lesser General Public
// License as published by the Free Software Foundation; either
// version 2.1 of the License, or (at your option) any later version.
// This library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
// Lesser General Public License for more details.
// You should have received a copy of the GNU Lesser General Public
// License along with this library; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA
import Cpp from 'tree-sitter-cpp';
import Parser from 'tree-sitter';
export default class TreeSitterQueries {
    constructor() {
        this.parser = new Parser();
        this.parser.setLanguage(Cpp);
    }
    queryConstraintFunctions(src_string) {
        // see https://tree-sitter.github.io/tree-sitter/playground
        const query = new Parser.Query(Cpp, `
        (field_declaration  
            declarator: (function_declarator
                declarator: (field_identifier) @fn
                parameters: (parameter_list) @params)
            (#match? @fn "addConstraint.+")        
        )
        `);
        const tree = this.parser.parse(src_string);
        const matches = query.matches(tree.rootNode);
        return matches.map(match => ({
            fname: match.captures[0].node.text,
            params_list: this.getParameters(match.captures[1].node)
        }));
    }
    queryEnum(enum_name, src_string) {
        const enum_base_name = enum_name.split('::').pop();
        const query_enum = new Parser.Query(Cpp, `
            (enum_specifier
                name: (type_identifier) @enum_name
            ) @enum
        `);
        const tree = this.parser.parse(src_string);
        const enums = query_enum.matches(tree.rootNode)
            .filter(match => match.captures[1].node.text === enum_base_name);
        if (enums.length === 0) {
            throw new Error(`Enum ${enum_name} not found`);
        }
        const enum_node = enums[0].captures[0].node;
        const query_values = new Parser.Query(Cpp, `
                (enumerator_list
                    (enumerator
                        name: (identifier) @name
                        value: (number_literal)? @value
                    )
                )
            `);
        const enum_values = [];
        let i = 0;
        for (const match of query_values.matches(enum_node)) {
            const name = match.captures[0].node.text;
            if (match.captures[1] === undefined) {
                // enum class does not have to have values
                enum_values.push({ name, value: i++ });
            }
            else {
                i = parseInt(match.captures[1].node.text, 10);
                enum_values.push({ name, value: i++ });
            }
        }
        return {
            name: enum_name,
            is_enum_class: enum_node.text.trim().startsWith('enum class'),
            values: enum_values,
        };
    }
    // 2nd step (after creating bindings.cpp)
    queryFunctionTypes(src_string) {
        const query = new Parser.Query(Cpp, `
            (function_definition
                type: [
                    (type_identifier) @type
                    (primitive_type) @type
                    (template_type) @type
                ]
                declarator: (function_declarator
                    declarator: (field_identifier) @fn_name
                    parameters: (parameter_list) @params
                )
            )`);
        const tree = this.parser.parse(src_string);
        const matches = query.matches(tree.rootNode);
        return matches.map(match => ({
            return_type: match.captures[0].node.text,
            fname: match.captures[1].node.text,
            params: this.getParameters(match.captures[2].node)
        }));
    }
    getParameters(param_list_node) {
        var _a, _b, _c, _d;
        if (param_list_node.type !== 'parameter_list') {
            throw new Error('Expected parameter_list, got ' + param_list_node.type);
        }
        const query = new Parser.Query(Cpp, `
            declarator: [
                (identifier) @name
                (reference_declarator
                    (identifier)) @name
                (pointer_declarator
                    (identifier)) @name
            ]`);
        const matches = query.matches(param_list_node);
        const params = [];
        for (const match of matches) {
            const match_node = match.captures[0].node;
            let optional_value = null;
            if (((_a = match_node.parent) === null || _a === void 0 ? void 0 : _a.type) === 'optional_parameter_declaration') {
                optional_value = match_node.parent.children[3].text;
            }
            else if (((_b = match_node.parent) === null || _b === void 0 ? void 0 : _b.type) !== 'parameter_declaration') {
                // this case has already been handled by other match, because
                // the declarations can be nested
                continue;
            }
            const identifier = match_node.text;
            const type = (_d = (_c = match_node.parent) === null || _c === void 0 ? void 0 : _c.children[0]) === null || _d === void 0 ? void 0 : _d.text;
            if (type === undefined) {
                throw new Error(`Could not find type for parameter ${identifier}`);
            }
            params.push(optional_value ? { identifier, type, optional_value } : { identifier, type });
        }
        return params;
    }
}
//# sourceMappingURL=treesitter_queries.js.map