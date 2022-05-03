import {vec3} from 'gl-matrix';

export interface SDF {
  distance(pos: vec3): number;
  normal(pos: vec3): vec3;
  color(pos: vec3): vec3;
}
