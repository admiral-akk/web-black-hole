import {vec3} from 'gl-matrix';
import {Zero} from '../struct/Vec3Constants';
import {SDF} from './SDF';

export class Sphere implements SDF {
  pos: vec3;
  rad: number;
  temp: vec3;
  constructor(pos: vec3 = Zero(), rad = 1) {
    this.pos = pos;
    this.rad = rad;
    this.temp = vec3.create();
  }

  distance(pos: vec3): number {
    return vec3.dist(pos, this.pos) - this.rad;
  }

  normal(pos: vec3): vec3 {
    return vec3.clone(vec3.subtract(this.temp, pos, this.pos));
  }
}
