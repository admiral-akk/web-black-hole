import {vec2} from 'gl-matrix';

export class InputController {
  previousPos: vec2 | null;
  moveCallback: (movement: vec2) => void;

  constructor(moveCallback: (movement: vec2) => void) {
    this.previousPos = null;
    this.moveCallback = moveCallback;
    onmousedown = (e: MouseEvent) => this.handleMouse(e);
    onmouseup = (e: MouseEvent) => this.handleMouse(e);
    onmousemove = (e: MouseEvent) => this.handleMouse(e);
  }

  private handleMouse(e: MouseEvent) {
    if ((e.buttons & 1) !== 1) {
      this.previousPos = null;
      return;
    }
    if (this.previousPos !== null) {
      let movement: vec2 = [e.clientX, e.clientY];
      movement = vec2.subtract(movement, movement, this.previousPos);
      this.moveCallback(movement);
    }
    this.previousPos = [e.clientX, e.clientY];
  }
}
