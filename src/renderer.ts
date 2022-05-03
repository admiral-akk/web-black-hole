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

  private sdf(x: number, y: number, z: number): number {
    return 1;
  }

  private getColor(x: number, y: number): [number, number, number, number] {
    return [
      Math.floor((255 * y) / this.ctx.canvas.height),
      Math.floor((255 * x) / this.ctx.canvas.width),
      0,
      255,
    ];
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
