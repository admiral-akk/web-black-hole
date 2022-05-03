import { vec3 } from 'gl-matrix';
import { White } from '../struct/Color';
import { Zero } from '../struct/Vec3Constants';
export class Sphere {
    constructor(pos = Zero(), rad = 1) {
        this.pos = pos;
        this.rad = rad;
        this.temp = vec3.create();
    }
    distance(pos) {
        return vec3.dist(pos, this.pos) - this.rad;
    }
    normal(pos) {
        return vec3.clone(vec3.subtract(this.temp, pos, this.pos));
    }
    color(pos) {
        return White();
    }
}
//# sourceMappingURL=Sphere.js.map