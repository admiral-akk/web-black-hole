import { vec3 } from 'gl-matrix';
import { toDirection } from '../struct/Direction';
export class HalfLambertLighting {
    constructor(sdf, lightPos) {
        this.sdf = sdf;
        this.lightPos = lightPos;
    }
    distance(pos) {
        return this.sdf.distance(pos);
    }
    normal(pos) {
        return this.sdf.normal(pos);
    }
    color(pos) {
        const norm = this.sdf.normal(pos);
        let lightDir = vec3.create();
        lightDir = vec3.subtract(lightDir, this.lightPos, pos);
        const normLightDir = toDirection(lightDir);
        let color = this.sdf.color(pos);
        const lightMagnitude = Math.max(0, vec3.dot(norm, normLightDir));
        let litColor = vec3.create();
        litColor = vec3.scale(litColor, color, lightMagnitude);
        color = vec3.scale(color, color, 0.5);
        litColor = vec3.add(litColor, color, litColor);
        return litColor;
    }
}
//# sourceMappingURL=HalfLambertLighting.js.map