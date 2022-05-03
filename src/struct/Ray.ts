import {vec3} from 'gl-matrix';
import {ForwardDir, Direction} from './Direction';
import {Zero} from './Vec3Constants';

export class Ray {
  pos: vec3;
  dir: Direction;
  constructor(pos: vec3 = Zero, dir: Direction = ForwardDir) {
    this.pos = pos;
    this.dir = dir;
  }
}
