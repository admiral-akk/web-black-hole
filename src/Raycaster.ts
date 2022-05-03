import {Color, toColor} from './struct/Color';
import {Ray} from './struct/Ray';

export class Raycaster {
  constructor() {}

  castRay(ray: Ray): Color {
    return toColor([ray.dir[2], ray.dir[1], 0, 255]);
  }

  private sdf(x: number, y: number, z: number): number {
    return 1;
  }

  private getColor(x: number, y: number): Color {
    return toColor([255, 255, 0, 255]);
  }
}
