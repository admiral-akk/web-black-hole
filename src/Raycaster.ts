import {vec3} from 'gl-matrix';
import {SDF} from './sdf/SDF';
import {Sphere} from './sdf/Sphere';
import {Color, toColor, White} from './struct/Color';
import {Direction} from './struct/Direction';
import {Ray} from './struct/Ray';
import {Forward, Zero} from './struct/Vec3Constants';

export class Raycaster {
  private rayCollisionDistance: number;
  private sdf: SDF;
  private maxDistance: number;
  constructor(rayCollisionDistance = 1e-2, maxDistance = 10) {
    this.rayCollisionDistance = rayCollisionDistance;
    this.sdf = new Sphere(Forward(),  0.4);
    this.maxDistance = maxDistance;
  }

  castRay(ray: Ray): Color {
    let step: vec3 = Zero();
    let distanceTravelled = 0;
    while (distanceTravelled < this.maxDistance) {
      const distance = this.sdf.distance(ray.pos);
      if (distance < this.rayCollisionDistance) {
        return White();
      }
      step = vec3.scale(step, ray.dir, distance);
      ray.pos = vec3.add(ray.pos, ray.pos, step);
      distanceTravelled += distance;
    }
    return this.backgroundColor(ray.dir);
  }

  private backgroundColor(direction: Direction): Color {
    return toColor([500 * direction[2], 500 * direction[1], 0, 255]);
  }
}
