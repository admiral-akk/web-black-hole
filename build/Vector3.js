export class Vec3 {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    normalize() {
        const len = this.length();
        this.x = this.x / len;
        this.y = this.y / len;
        this.z = this.z / len;
    }
}
//# sourceMappingURL=Vector3.js.map