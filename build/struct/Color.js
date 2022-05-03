// https://evertpot.com/opaque-ts-types/
import { vec4 } from 'gl-matrix';
function assertValidColor(input) {
    if (input.filter(rgbaVal => rgbaVal < 0 || rgbaVal > 255).length > 0) {
        throw new Error(`The color: ${input} has out of bounds values!`);
    }
}
function boundRGBAValue(input) {
    if (input < 0) {
        return 0;
    }
    if (input > 255) {
        return 255;
    }
    return input;
}
export function toColor(input) {
    const output = vec4.clone(input);
    for (let i = 0; i < 4; i++) {
        output[i] = boundRGBAValue(output[i]);
    }
    assertValidColor(output);
    return output;
}
//# sourceMappingURL=Color.js.map