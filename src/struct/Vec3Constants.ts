import {vec3} from 'gl-matrix';

export function Zero(): vec3 {
  return [0, 0, 0];
}
export function One(): vec3 {
  return [1, 1, 1];
}
export function Forward(): vec3 {
  return [1, 0, 0];
}
