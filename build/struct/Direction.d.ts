import { vec3 } from 'gl-matrix';
declare const validDirection: unique symbol;
export declare type Direction = vec3 & {
    [validDirection]: true;
};
export declare function toDirection(input: vec3): Direction;
export declare function ForwardDir(): Direction;
export {};
