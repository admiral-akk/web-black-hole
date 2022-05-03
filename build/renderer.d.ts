import { vec2 } from 'gl-matrix';
export declare class Renderer {
    private ctx;
    private camera;
    private raycaster;
    constructor();
    pan(movement: vec2): void;
    Render(): void;
}
