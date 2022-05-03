import { Camera } from './Camera';
import { Raycaster } from './Raycaster';
export class Renderer {
    constructor() {
        const canvas = document.getElementById('gpu-canvas');
        this.ctx = canvas.getContext('2d');
        this.ctx.canvas.width = 400;
        this.ctx.canvas.height = 400;
        this.camera = new Camera();
        this.raycaster = new Raycaster();
    }
    pan(movement) {
        this.camera.pan(movement);
    }
    Render() {
        const imageData = this.ctx.getImageData(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
            const x = Math.floor(Math.floor(i / 4) % this.ctx.canvas.width);
            const y = Math.floor(Math.floor(i / 4) / this.ctx.canvas.width);
            const viewportCoordinates = [
                x / this.ctx.canvas.width,
                y / this.ctx.canvas.height,
            ];
            const ray = this.camera.viewportToRay(viewportCoordinates);
            [data[i], data[i + 1], data[i + 2], data[i + 3]] =
                this.raycaster.castRay(ray);
        }
        this.ctx.putImageData(imageData, 0, 0);
    }
}
//# sourceMappingURL=Renderer.js.map