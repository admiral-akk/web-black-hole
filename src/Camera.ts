import { Ray } from "./Ray";
import { Vec3 } from "./Vector3";

export class Camera {
    pos : Vec3;
    dir : Vec3;
    focalAngle: number;

    constructor(focalAngle: number = 30) {
        this.pos = new Vec3();
        this.dir = new Vec3(1,0,0);
        this.focalAngle = focalAngle;
    }

    viewportToRay(viewport: Vec3): Ray {
        let ray = new Ray();

        return ray;
    }
}