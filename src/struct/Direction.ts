// https://evertpot.com/opaque-ts-types/

import {vec3} from 'gl-matrix';
import {Forward, Right, Up} from './Vec3Constants';
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
  const output = vec3.create();
  vec3.scale(output, input, 1 / vec3.length(input));
  assertValidDirection(output);
  return output;
}

export const ForwardDir = toDirection(Forward);
export const UpDir = toDirection(Up);
export const RightDir = toDirection(Right);
