import {vec3} from 'gl-matrix';
import {HalfLambertLighting} from './sdf/HalfLambertLighting';
import {SDF} from './sdf/SDF';
import {Sphere} from './sdf/Sphere';
import {Black, Color, toColor} from './struct/Color';
import {Ray} from './struct/Ray';
import {Forward, Zero} from './struct/Vec3Constants';

export class Raycaster {
  private rayCollisionDistance: number;
  private sdf: SDF;
  private maxDistance: number;
  constructor(rayCollisionDistance = 1e-2, maxDistance = 10) {
    this.rayCollisionDistance = rayCollisionDistance;
    this.sdf = new HalfLambertLighting<Sphere>(
      new Sphere(Forward(), 0.4),
      [1, 1, 1]
    );
    this.maxDistance = maxDistance;
  }

  castRay(ray: Ray): Color {
    let step: vec3 = Zero();
    let distanceTravelled = 0;
    while (distanceTravelled < this.maxDistance) {
      const distance = this.sdf.distance(ray.pos);
      if (distance < this.rayCollisionDistance) {
        return toColor(this.sdf.color(ray.pos));
      }
      step = vec3.scale(step, ray.dir, distance);
      ray.pos = vec3.add(ray.pos, ray.pos, step);
      distanceTravelled += distance;
    }
    return Black();
  }
}
