import { vec3 } from 'gl-matrix';
import { ForwardDir, toDirection } from './struct/Direction';
import { Ray } from './struct/Ray';
import { Zero } from './struct/Vec3Constants';
export class Camera {
    constructor(focalAngle = 120, pos = Zero(), dir = ForwardDir()) {
        this.focalAngleRad = (Math.PI * focalAngle) / 180;
        this.pos = pos;
        this.dir = dir;
        this.center = pos;
        this.zoomDistance = 1;
    }
    pan(movement) {
        const xAngle = (movement[0] / 200);
        const yAngle = (movement[1] / 200);
        vec3.rotateY(this.dir, this.dir, Zero(), -xAngle);
    }
    Position() {
        let pos = vec3.clone(this.center);
        let offset = vec3.clone(this.dir);
        offset = vec3.scale(offset, offset, -this.zoomDistance);
        pos = vec3.add(pos, pos, offset);
        return pos;
    }
    viewportToRay(viewport) {
        const xAngle = ((viewport[0] - 0.5) * this.focalAngleRad) / 2;
        const rayDir = vec3.clone(this.dir);
        vec3.rotateY(rayDir, rayDir, Zero(), -xAngle);
        const yAngle = ((viewport[1] - 0.5) * this.focalAngleRad) / 2;
        vec3.rotateZ(rayDir, rayDir, Zero(), -yAngle);
        const ray = new Ray(vec3.clone(this.Position()), toDirection(rayDir));
        return ray;
    }
}
//# sourceMappingURL=Camera.js.map