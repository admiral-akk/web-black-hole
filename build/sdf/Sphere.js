import { vec3 } from 'gl-matrix';
import { toColor } from '../struct/Color';
import { One, Zero } from '../struct/Vec3Constants';
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
        this.temp = vec3.subtract(this.temp, pos, this.pos);
        this.temp = vec3.scale(this.temp, this.temp, 1 / vec3.len(this.temp));
        return vec3.clone(this.temp);
    }
    color(pos) {
        let norm = this.normal(pos);
        norm = vec3.add(norm, norm, One());
        norm = vec3.scale(norm, norm, 255 / 2);
        return toColor(norm);
    }
}
//# sourceMappingURL=Sphere.js.map