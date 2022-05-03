import { vec3 } from 'gl-matrix';
import { Sphere } from './sdf/Sphere';
import { Black, toColor } from './struct/Color';
import { Forward, Zero } from './struct/Vec3Constants';
export class Raycaster {
    constructor(rayCollisionDistance = 1e-2, maxDistance = 10) {
        this.rayCollisionDistance = rayCollisionDistance;
        this.sdf = new Sphere(Forward(), 0.4);
        this.maxDistance = maxDistance;
    }
    castRay(ray) {
        let step = Zero();
        let distanceTravelled = 0;
        while (distanceTravelled < this.maxDistance) {
            const distance = this.sdf.distance(ray.pos);
            if (distance < this.rayCollisionDistance) {
                return this.sdf.color(ray.pos);
            }
            step = vec3.scale(step, ray.dir, distance);
            ray.pos = vec3.add(ray.pos, ray.pos, step);
            distanceTravelled += distance;
        }
        return Black();
    }
    backgroundColor(direction) {
        return toColor([500 * direction[2], 500 * direction[1], 0, 255]);
    }
}
//# sourceMappingURL=Raycaster.js.map