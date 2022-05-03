import {vec3} from 'gl-matrix';
import {Forward} from './struct/Vec3Constants';

export class SDF {
  private spherePos: vec3;
  private sphereRadius: number;
  constructor() {
    this.spherePos = Forward();
    this.sphereRadius = 1;
  }

  Distance(pos: vec3) {
    return 1;
  }
}
