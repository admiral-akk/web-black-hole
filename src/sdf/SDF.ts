import {vec3} from 'gl-matrix';
import {Color} from '../struct/Color';

export interface SDF {
  distance(pos: vec3): number;
  normal(pos: vec3): vec3;
  color(pos: vec3): Color;
}
