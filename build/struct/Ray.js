import { ForwardDir } from "./Direction";
import { Zero } from "./Vec3Constants";
export class Ray {
    constructor(pos = Zero, dir = ForwardDir) {
        this.pos = pos;
        this.dir = dir;
    }
}
//# sourceMappingURL=Ray.js.map