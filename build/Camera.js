import { Ray } from "./Ray";
import { Vec3 } from "./Vector3";
export class Camera {
    constructor(focalAngle = 30) {
        this.pos = new Vec3();
        this.dir = new Vec3(1, 0, 0);
        this.focalAngle = focalAngle;
    }
    viewportToRay(viewport) {
        let ray = new Ray();
        return ray;
    }
}
//# sourceMappingURL=Camera.js.map