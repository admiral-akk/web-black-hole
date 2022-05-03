// https://evertpot.com/opaque-ts-types/
import { vec4 } from 'gl-matrix';
function assertValidColor(input) {
    if (input.filter(rgbaVal => rgbaVal < 0 || rgbaVal > 255).length > 0) {
        throw new Error(`The color: ${input} has out of bounds values!`);
    }
}
export function toColor(input) {
    let output = vec4.clone(input);
    assertValidColor(output);
    return output;
}
//# sourceMappingURL=Color.js.map