import { vec4 } from 'gl-matrix';
declare const validColor: unique symbol;
export declare type Color = vec4 & {
    [validColor]: true;
};
export declare function toColor(input: vec4): Color;
export {};
