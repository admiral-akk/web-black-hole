import { vec4 } from 'gl-matrix';
declare const validColor: unique symbol;
export declare type Color = vec4 & {
    [validColor]: true;
};
export declare function toColor(input: vec4): Color;
export declare function White(): Color;
export declare function Black(): Color;
export declare function Red(): Color;
export declare function Green(): Color;
export declare function Blue(): Color;
export {};
