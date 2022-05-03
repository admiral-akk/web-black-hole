import { Color } from './struct/Color';
import { Ray } from './struct/Ray';
export declare class Raycaster {
    private rayCollisionDistance;
    private sdf;
    private maxSteps;
    constructor(rayCollisionDistance?: number, maxSteps?: number);
    castRay(ray: Ray): Color;
    private backgroundColor;
}
