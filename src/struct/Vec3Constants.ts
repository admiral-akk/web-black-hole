import {vec3} from 'gl-matrix';

export function Zero(): vec3 {
  return [0, 0, 0];
}
export function Forward(): vec3 {
  return [1, 0, 0];
}
export function Up(): vec3 {
  return [0, 1, 0];
}
export function Right(): vec3 {
  return [0, 0, 1];
}
