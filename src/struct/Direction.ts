// https://evertpot.com/opaque-ts-types/

import {vec3} from 'gl-matrix';
import {Forward} from './Vec3Constants';
declare const validDirection: unique symbol;
export type Direction = vec3 & {
  [validDirection]: true;
};

function assertValidDirection(input: vec3): asserts input is Direction {
  if (Math.abs(1 - vec3.length(input)) > 0.000001) {
    console.log(`length: ${vec3.length(input)}`);
    throw new Error(`The vector: ${input} is not normalized`);
  }
}

export function toDirection(input: vec3): Direction {
  vec3.scale(input, input, 1 / vec3.length(input));
  assertValidDirection(input);
  return input;
}

export function ForwardDir() {
  return toDirection(Forward());
}
