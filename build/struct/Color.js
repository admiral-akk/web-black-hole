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
    const output = vec4.clone([input[0], input[1], input[2], 255]);
    for (let i = 0; i < 3; i++) {
        output[i] = boundRGBAValue(output[i]);
    }
    assertValidColor(output);
    return output;
}
export function White() {
    return toColor([255, 255, 255]);
}
export function Black() {
    return toColor([0, 0, 0]);
}
export function Red() {
    return toColor([255, 0, 0]);
}
export function Green() {
    return toColor([0, 255, 0]);
}
export function Blue() {
    return toColor([0, 0, 255]);
}
//# sourceMappingURL=Color.js.map