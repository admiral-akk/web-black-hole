// https://evertpot.com/opaque-ts-types/

import {vec4} from 'gl-matrix';
declare const validColor: unique symbol;
export type Color = vec4 & {
  [validColor]: true;
};

function assertValidColor(input: vec4): asserts input is Color {
  if (input.filter(rgbaVal => rgbaVal < 0 || rgbaVal > 255).length > 0) {
    throw new Error(`The color: ${input} has out of bounds values!`);
  }
}

export function toColor(input: vec4): Color {
  const output = vec4.clone(input);
  assertValidColor(output);
  return output;
}
