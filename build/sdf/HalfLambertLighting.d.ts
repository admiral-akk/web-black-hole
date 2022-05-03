import { vec3 } from 'gl-matrix';
import { SDF } from './SDF';
export declare class HalfLambertLighting<T extends SDF> implements SDF {
    private sdf;
    private lightPos;
    constructor(sdf: T, lightPos: vec3);
    distance(pos: vec3): number;
    normal(pos: vec3): vec3;
    color(pos: vec3): vec3;
}
