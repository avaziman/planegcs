// This library provides WebAssembly bindings for the FreeCAD's geometric solver library planegcs.
// Copyright (C) 2023  Miroslav Šerý, Salusoft89 <miroslav.sery@salusoft89.cz>  
// Copyright (C) 2023  Jiří Hon, Salusoft89 <jiri.hon@salusoft89.cz>  

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

import { InternalAlignmentType, Constraint_Alignment, } from "./enums";

export interface DoubleVector {
    get: (i: number) => number;
    size: () => number;
    delete: () => void;
    push_back: (val: number) => void;
}
export interface IntVector {
    get: (i: number) => number;
    size: () => number;
    delete: () => void;
    push_back: (val: number) => void;
}
export interface Point {
    delete: () => void;
}
export interface Curve {
    delete: () => void;
}
export type Line = Curve;
export type Circle = Curve;
export type Ellipse = Curve;
export type Hyperbola = Curve;
export type Parabola = Curve;
export type Arc = Circle;
export type ArcOfHyperbola = Hyperbola;
export type ArcOfEllipse = Ellipse;
export type ArcOfParabola = Parabola;
export type BSpline = Curve;

export type GcsGeometry = Point | Curve | Line | Circle | Ellipse | Hyperbola | Parabola | Arc | ArcOfHyperbola | ArcOfEllipse | ArcOfParabola | BSpline;

export interface GcsSystem {

    params_size: () => number;
    get_p_param: (i: number) => number;
    set_p_param: (i: number, value: number, fixed: boolean) => void;
    push_p_param: (value: number, fixed: boolean) => number;
    get_is_fixed: (i: number) => boolean;
    set_max_iterations: (n: number) => void;
    get_max_iterations: () => number;
    set_covergence_threshold: (threshold: number) => void;
    get_convergence_threshold: () => number;
    solve_system: (algorithm: number) => number;
    get_p_params: () => DoubleVector;
    clear_data: () => void;
    apply_solution: () => void;
    dof: () => number;
    has_conflicting: () => boolean;
    has_redundant: () => boolean;
    has_partially_redundant: () => boolean;
    get_conflicting: () => IntVector;
    get_redundant: () => IntVector;
    get_partially_redundant: () => IntVector;
    clear_by_id: (id: number) => void;
    set_debug_mode: (debug_mode: number) => void;
    get_debug_mode: () => number;
    make_point: (px_i: number, py_i: number) => Point;
    make_line: (p1x_i: number, p1y_i: number, p2x_i: number, p2y_i: number) => Line;
    make_circle: (cx_i: number, cy_i: number, rad_i: number) => Circle;
    make_ellipse: (cx_i: number, cy_i: number, focus1x_i: number, focus1y_i: number, radmin_i: number) => Ellipse;
    make_hyperbola: (cx_i: number, cy_i: number, focus1x_i: number, focus1y_i: number, radmin_i: number) => Hyperbola;
    make_parabola: (vertexx_i: number, vertexy_i: number, focus1x_i: number, focus1y_i: number) => Parabola;
    make_arc: (cx_i: number, cy_i: number, startx_i: number, starty_i: number, endx_i: number, endy_i: number, startangle_i: number, endangle_i: number, rad_i: number) => Arc;
    make_arc_of_ellipse: (cx_i: number, cy_i: number, focus1x_i: number, focus1y_i: number, startx_i: number, starty_i: number, endx_i: number, endy_i: number, startangle_i: number, endangle_i: number, radmin_i: number) => ArcOfEllipse;
    make_arc_of_parabola: (vertexx_i: number, vertexy_i: number, focusx_i: number, focusy_i: number, startx_i: number, starty_i: number, endx_i: number, endy_i: number, startangle_i: number, endangle_i: number) => ArcOfParabola;
    make_arc_of_hyperbola: (cx_i: number, cy_i: number, focus1x_i: number, focus1y_i: number, startx_i: number, starty_i: number, endx_i: number, endy_i: number, startangle_i: number, endangle_i: number, radmin_i: number) => ArcOfHyperbola;
    make_bspline: (startx_i: number, starty_i: number, endx_i: number, endy_i: number, poles_xy_i: IntVector, weights_i: IntVector, knots_i: IntVector, mult: IntVector, degree: number, periodic: boolean) => BSpline;
    add_constraint_equal: (param1_param_i: number, param2_param_i: number, tagId: number, driving: boolean, internalalignment: Constraint_Alignment, scale: number) => void;
    add_constraint_proportional: (param1_param_i: number, param2_param_i: number, ratio: number, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_difference: (param1_param_i: number, param2_param_i: number, difference_param_i: number, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_p2p_distance: ( p1: Point,  p2: Point, distance_param_i: number, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_p2p_angle_incr_angle: ( p1: Point,  p2: Point, angle_param_i: number, incrAngle: number, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_p2p_angle: ( p1: Point,  p2: Point, angle_param_i: number, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_p2l_distance: ( p: Point,  l: Line, distance_param_i: number, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_point_on_line_pl: ( p: Point,  l: Line, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_point_on_line_ppp: ( p: Point,  lp1: Point,  lp2: Point, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_point_on_perp_bisector_pl: ( p: Point,  l: Line, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_point_on_perp_bisector_ppp: ( p: Point,  lp1: Point,  lp2: Point, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_parallel: ( l1: Line,  l2: Line, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_perpendicular_ll: ( l1: Line,  l2: Line, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_perpendicular_pppp: ( l1p1: Point,  l1p2: Point,  l2p1: Point,  l2p2: Point, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_l2l_angle_ll: ( l1: Line,  l2: Line, angle_param_i: number, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_l2l_angle_pppp: ( l1p1: Point,  l1p2: Point,  l2p1: Point,  l2p2: Point, angle_param_i: number, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_angle_via_point: ( crv1: Curve,  crv2: Curve,  p: Point, angle_param_i: number, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_angle_via_two_points: ( crv1: Curve,  crv2: Curve,  p1: Point,  p2: Point, angle_param_i: number, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_angle_via_point_and_param: ( crv1: Curve,  crv2: Curve,  p: Point, cparam_param_i: number, angle_param_i: number, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_angle_via_point_and_two_params: ( crv1: Curve,  crv2: Curve,  p: Point, cparam1_param_i: number, cparam2_param_i: number, angle_param_i: number, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_midpoint_on_line_ll: ( l1: Line,  l2: Line, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_midpoint_on_line_pppp: ( l1p1: Point,  l1p2: Point,  l2p1: Point,  l2p2: Point, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_tangent_circumf: ( p1: Point,  p2: Point, rd1_param_i: number, rd2_param_i: number, internal: boolean, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_tangent_at_bspline_knot: ( b: BSpline,  l: Line, knotindex: number, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_p2p_coincident: ( p1: Point,  p2: Point, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_horizontal_l: ( l: Line, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_horizontal_pp: ( p1: Point,  p2: Point, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_vertical_l: ( l: Line, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_vertical_pp: ( p1: Point,  p2: Point, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_coordinate_x: ( p: Point, x_param_i: number, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_coordinate_y: ( p: Point, y_param_i: number, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_arc_rules: ( a: Arc, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_point_on_circle: ( p: Point,  c: Circle, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_point_on_ellipse: ( p: Point,  e: Ellipse, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_point_on_hyperbolic_arc: ( p: Point,  e: ArcOfHyperbola, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_point_on_parabolic_arc: ( p: Point,  e: ArcOfParabola, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_point_on_bspline: ( p: Point,  b: BSpline, pointparam_param_i: number, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_arc_of_ellipse_rules: ( a: ArcOfEllipse, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_curve_value: ( p: Point,  a: Curve, u_param_i: number, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_arc_of_hyperbola_rules: ( a: ArcOfHyperbola, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_arc_of_parabola_rules: ( a: ArcOfParabola, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_point_on_arc: ( p: Point,  a: Arc, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_perpendicular_line2arc: ( p1: Point,  p2: Point,  a: Arc, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_perpendicular_arc2line: ( a: Arc,  p1: Point,  p2: Point, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_perpendicular_circle2arc: ( center: Point, radius_param_i: number,  a: Arc, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_perpendicular_arc2circle: ( a: Arc,  center: Point, radius_param_i: number, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_perpendicular_arc2arc: ( a1: Arc, reverse1: boolean,  a2: Arc, reverse2: boolean, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_tangent_lc: ( l: Line,  c: Circle, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_tangent_le: ( l: Line,  e: Ellipse, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_tangent_la: ( l: Line,  a: Arc, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_tangent_cc: ( c1: Circle,  c2: Circle, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_tangent_aa: ( a1: Arc,  a2: Arc, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_tangent_ca: ( c: Circle,  a: Arc, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_circle_radius: ( c: Circle, radius_param_i: number, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_arc_radius: ( a: Arc, radius_param_i: number, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_circle_diameter: ( c: Circle, diameter_param_i: number, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_arc_diameter: ( a: Arc, diameter_param_i: number, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_equal_length: ( l1: Line,  l2: Line, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_equal_radius_cc: ( c1: Circle,  c2: Circle, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_equal_radii_ee: ( e1: Ellipse,  e2: Ellipse, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_equal_radii_ahah: ( a1: ArcOfHyperbola,  a2: ArcOfHyperbola, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_equal_radius_ca: ( c1: Circle,  a2: Arc, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_equal_radius_aa: ( a1: Arc,  a2: Arc, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_equal_focus: ( a1: ArcOfParabola,  a2: ArcOfParabola, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_p2p_symmetric_ppl: ( p1: Point,  p2: Point,  l: Line, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_p2p_symmetric_ppp: ( p1: Point,  p2: Point,  p: Point, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_snells_law: ( ray1: Curve,  ray2: Curve,  boundary: Curve, p: Point, n1_param_i: number, n2_param_i: number, flipn1: boolean, flipn2: boolean, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_c2cdistance: ( c1: Circle,  c2: Circle, dist_param_i: number, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_c2ldistance: ( c: Circle,  l: Line, dist_param_i: number, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_p2cdistance: ( p: Point,  c: Circle, distance_param_i: number, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_arc_length: ( a: Arc, dist_param_i: number, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_internal_alignment_point2ellipse: ( e: Ellipse,  p1: Point, alignmentType: InternalAlignmentType, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_internal_alignment_ellipse_major_diameter: ( e: Ellipse,  p1: Point,  p2: Point, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_internal_alignment_ellipse_minor_diameter: ( e: Ellipse,  p1: Point,  p2: Point, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_internal_alignment_ellipse_focus1: ( e: Ellipse,  p1: Point, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_internal_alignment_ellipse_focus2: ( e: Ellipse,  p1: Point, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_internal_alignment_point2hyperbola: ( e: Hyperbola,  p1: Point, alignmentType: InternalAlignmentType, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_internal_alignment_hyperbola_major_diameter: ( e: Hyperbola,  p1: Point,  p2: Point, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_internal_alignment_hyperbola_minor_diameter: ( e: Hyperbola,  p1: Point,  p2: Point, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_internal_alignment_hyperbola_focus: ( e: Hyperbola,  p1: Point, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_internal_alignment_parabola_focus: ( e: Parabola,  p1: Point, tagId: number, driving: boolean, scale: number) => void;
    add_constraint_internal_alignment_bspline_control_point: ( b: BSpline,  c: Circle, poleindex: number, tag: number, driving: boolean, scale: number) => void;
    add_constraint_internal_alignment_knot_point: ( b: BSpline,  p: Point, knotindex: number, tagId: number, driving: boolean, scale: number) => void;
    delete: () => void;
}

export interface GcsSystemConstructor {
    new (): GcsSystem;
}

export interface DoubleVectorConstructor {
    new (): DoubleVector;
}

export interface IntVectorConstructor {
    new (): IntVector;
}