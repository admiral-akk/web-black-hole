import { vec2 } from 'gl-matrix';
export class InputController {
    constructor(moveCallback) {
        this.previousPos = null;
        this.moveCallback = moveCallback;
        onmousedown = (e) => this.handleMouse(e);
        onmouseup = (e) => this.handleMouse(e);
        onmousemove = (e) => this.handleMouse(e);
    }
    handleMouse(e) {
        if ((e.buttons & 1) !== 1) {
            this.previousPos = null;
            return;
        }
        if (this.previousPos !== null) {
            let movement = [e.clientX, e.clientY];
            movement = vec2.subtract(movement, movement, this.previousPos);
            this.moveCallback(movement);
        }
        this.previousPos = [e.clientX, e.clientY];
    }
}
//# sourceMappingURL=InputController.js.map