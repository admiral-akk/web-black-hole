import { vec3 } from 'gl-matrix';
import { ForwardDir, toDirection } from './struct/Direction';
import { Ray } from './struct/Ray';
import { Zero } from './struct/Vec3Constants';
export class Camera {
    constructor(focalAngle = 30, pos = Zero, dir = ForwardDir) {
        this.focalAngleRad = Math.PI * focalAngle / 180;
        this.pos = pos;
        this.dir = dir;
    }
    viewportToRay(viewport) {
        const xAngle = (viewport[0] - 0.5) * this.focalAngleRad / 2;
        let rayDir = vec3.clone(this.dir);
        vec3.rotateY(rayDir, rayDir, Zero, xAngle);
        const yAngle = (viewport[1] - 0.5) * this.focalAngleRad / 2;
        vec3.rotateZ(rayDir, rayDir, Zero, yAngle);
        const ray = new Ray(this.pos, toDirection(rayDir));
        return ray;
    }
}
//# sourceMappingURL=Camera.js.map