import { Color } from "./struct/Color";
import { Ray } from "./struct/Ray";
export declare class Raycaster {
    constructor();
    castRay(ray: Ray): Color;
    private sdf;
    private getColor;
}
