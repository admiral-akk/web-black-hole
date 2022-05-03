import { vec3 } from "gl-matrix";
import { Direction } from "./Direction";
export declare class Ray {
    pos: vec3;
    dir: Direction;
    constructor(pos?: vec3, dir?: Direction);
}
