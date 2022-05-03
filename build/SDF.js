import { vec3 } from 'gl-matrix';
import { Forward } from './struct/Vec3Constants';
export class SDF {
    constructor() {
        this.spherePos = Forward();
        this.sphereRadius = 0.5;
    }
    Distance(pos) {
        return vec3.dist(pos, this.spherePos) - this.sphereRadius;
    }
}
//# sourceMappingURL=SDF.js.map