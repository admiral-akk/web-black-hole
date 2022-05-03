import {vec3} from 'gl-matrix';
import {SDF} from './SDF';
import {Color, toColor, White} from './struct/Color';
import { Direction} from './struct/Direction';
import {Ray} from './struct/Ray';
import {Zero} from './struct/Vec3Constants';

export class Raycaster {
  private rayCollisionDistance: number;
  private sdf: SDF;
  private maxSteps: number;
  constructor(rayCollisionDistance = 1e-6, maxSteps = 10) {
    this.rayCollisionDistance = rayCollisionDistance;
    this.sdf = new SDF();
    this.maxSteps = maxSteps;
  }

  castRay(ray: Ray): Color {
    let step: vec3 = Zero();

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

  private backgroundColor(direction: Direction): Color {
    return toColor([500 * direction[2], 500 * direction[1], 0, 255]);
  }
}
