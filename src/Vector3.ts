export class Vec3 {
    x : number;
    y : number;
    z : number;
    constructor(x:number= 0, y:number= 0, z:number= 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    length(): number {
        return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
    }

    normalize() {
        const len = this.length();
        this.x = this.x / len;
        this.y = this.y / len;
        this.z = this.z / len;
    }
}