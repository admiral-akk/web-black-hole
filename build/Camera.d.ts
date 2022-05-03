import { Ray } from "./Ray";
import { Vec3 } from "./Vector3";
export declare class Camera {
    pos: Vec3;
    dir: Vec3;
    focalAngle: number;
    constructor(focalAngle?: number);
    viewportToRay(viewport: Vec3): Ray;
}
