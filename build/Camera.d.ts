import { vec2, vec3 } from 'gl-matrix';
import { Direction } from './struct/Direction';
import { Ray } from './struct/Ray';
export declare class Camera {
    pos: vec3;
    dir: Direction;
    focalAngleRad: number;
    center: vec3;
    zoomDistance: number;
    constructor(focalAngle?: number, pos?: vec3, dir?: Direction);
    pan(movement: vec2): void;
    private Position;
    viewportToRay(viewport: vec2): Ray;
}
