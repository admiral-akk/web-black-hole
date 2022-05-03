import { toColor } from './struct/Color';
export class Raycaster {
    constructor() { }
    castRay(ray) {
        return toColor([500 * ray.dir[2], 500 * ray.dir[1], 0, 255]);
    }
    sdf(x, y, z) {
        return 1;
    }
    getColor(x, y) {
        return toColor([255, 255, 0, 255]);
    }
}
//# sourceMappingURL=Raycaster.js.map