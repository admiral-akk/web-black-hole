import { vec3 } from 'gl-matrix';
import { SDF } from './SDF';
export declare class Sphere implements SDF {
    pos: vec3;
    rad: number;
    temp: vec3;
    constructor(pos?: vec3, rad?: number);
    distance(pos: vec3): number;
    normal(pos: vec3): vec3;
}
