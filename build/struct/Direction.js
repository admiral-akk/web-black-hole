// https://evertpot.com/opaque-ts-types/
import { vec3 } from 'gl-matrix';
import { Forward } from './Vec3Constants';
function assertValidDirection(input) {
    if (Math.abs(1 - vec3.length(input)) > 0.000001) {
        console.log(`length: ${vec3.length(input)}`);
        throw new Error(`The vector: ${input} is not normalized`);
    }
}
export function toDirection(input) {
    vec3.scale(input, input, 1 / vec3.length(input));
    assertValidDirection(input);
    return input;
}
export function ForwardDir() {
    return toDirection(Forward());
}
//# sourceMappingURL=Direction.js.map