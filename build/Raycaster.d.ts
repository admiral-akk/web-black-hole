import { Color } from './struct/Color';
import { Ray } from './struct/Ray';
export declare class Raycaster {
    private rayCollisionDistance;
    private sdf;
    private maxDistance;
    constructor(rayCollisionDistance?: number, maxDistance?: number);
    castRay(ray: Ray): Color;
}
