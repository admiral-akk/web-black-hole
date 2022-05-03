import { vec2, vec3 } from 'gl-matrix';
import { Direction } from './struct/Direction';
import { Ray } from './struct/Ray';
export declare class Camera {
    pos: vec3;
    dir: Direction;
    focalAngleRad: number;
    constructor(focalAngle?: number, pos?: vec3, dir?: Direction);
    pan(movement: vec2): void;
    viewportToRay(viewport: vec2): Ray;
}
