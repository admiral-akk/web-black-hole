import {vec2} from 'gl-matrix';
import {Camera} from './Camera';
import {Raycaster} from './Raycaster';

export class Renderer {
  private ctx: CanvasRenderingContext2D;
  private camera: Camera;
  private raycaster: Raycaster;
  constructor() {
    const canvas = document.getElementById('gpu-canvas')! as HTMLCanvasElement;
    this.ctx = canvas.getContext('2d')!;
    this.ctx.canvas.width = 400;
    this.ctx.canvas.height = 400;
    this.camera = new Camera();
    this.raycaster = new Raycaster();
  }

  pan(movement: vec2) {
    this.camera.pan(movement);
  }

  Render() {
    const imageData = this.ctx.getImageData(
      0,
      0,
      this.ctx.canvas.width,
      this.ctx.canvas.height
    );
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const x = Math.floor(Math.floor(i / 4) % this.ctx.canvas.width);
      const y = Math.floor(Math.floor(i / 4) / this.ctx.canvas.width);
      const viewportCoordinates: vec2 = [
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
