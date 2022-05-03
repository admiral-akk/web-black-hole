import { vec3 } from 'gl-matrix';
import { SDF } from './SDF';
import { toColor, White } from './struct/Color';
import { Zero } from './struct/Vec3Constants';
export class Raycaster {
    constructor(rayCollisionDistance = 1e-6, maxSteps = 10) {
        this.rayCollisionDistance = rayCollisionDistance;
        this.sdf = new SDF();
        this.maxSteps = maxSteps;
    }
    castRay(ray) {
        let step = Zero();
        for (let i = 0; i < this.maxSteps; i++) {
            const distance = this.sdf.Distance(ray.pos);
            if (distance < this.rayCollisionDistance) {
                return White();
            }
            vec3.scale(step, ray.dir, distance);
            vec3.add(ray.pos, ray.pos, step);
        }
        return this.backgroundColor(ray.dir);
    }
    backgroundColor(direction) {
        return toColor([500 * direction[2], 500 * direction[1], 0, 255]);
    }
}
//# sourceMappingURL=Raycaster.js.map