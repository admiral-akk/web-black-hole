import { vec2 } from 'gl-matrix';
export declare class InputController {
    previousPos: vec2 | null;
    moveCallback: (movement: vec2) => void;
    constructor(moveCallback: (movement: vec2) => void);
    private handleMouse;
}
