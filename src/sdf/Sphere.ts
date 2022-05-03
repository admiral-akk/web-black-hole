import {vec3} from 'gl-matrix';
import {Color, toColor} from '../struct/Color';
import {One, Zero} from '../struct/Vec3Constants';
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
    this.temp = vec3.subtract(this.temp, pos, this.pos);
    this.temp = vec3.scale(this.temp, this.temp, 1 / vec3.len(this.temp));
    return vec3.clone(this.temp);
  }

  color(pos: vec3): Color {
    let norm = this.normal(pos);
    norm = vec3.add(norm, norm, One());
    norm = vec3.scale(norm, norm, 255 / 2);
    return toColor(norm);
  }
}
