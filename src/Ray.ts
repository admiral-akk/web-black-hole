import { Vec3 } from "./Vector3";

export class Ray { 
    pos : Vec3;
    dir:Vec3;
    constructor(pos:Vec3 = new Vec3(),dir:Vec3 = new Vec3()) {
        this.pos = pos;
        this.dir = dir;
    }
}