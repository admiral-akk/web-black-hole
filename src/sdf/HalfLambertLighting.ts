import {vec3} from 'gl-matrix';
import {toDirection} from '../struct/Direction';
import {SDF} from './SDF';

export class HalfLambertLighting<T extends SDF> implements SDF {
  private sdf: T;
  private lightPos: vec3;

  constructor(sdf: T, lightPos: vec3) {
    this.sdf = sdf;
    this.lightPos = lightPos;
  }
  distance(pos: vec3): number {
    return this.sdf.distance(pos);
  }
  normal(pos: vec3): vec3 {
    return this.sdf.normal(pos);
  }
  color(pos: vec3): vec3 {
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
