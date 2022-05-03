import { Camera } from "./Camera";

export class Renderer {
    private ctx: CanvasRenderingContext2D;
    private camera: Camera;
    constructor() {
        const canvas = document.getElementById('gpu-canvas')! as HTMLCanvasElement;
        this.ctx = canvas.getContext('2d')!;
        this.ctx.canvas.width  = 400;
        this.ctx.canvas.height = 400;
        this.camera = new Camera();
    }
    
    private sdf(x:number,y:number,z:number) : number {
      return 1;
    }
    
    private getColor(x:number,y:number) : [number,number,number,number]{
     return [Math.floor(255 * y /  this.ctx.canvas.height),
     Math.floor(255 * x /  this.ctx.canvas.width),0,255];
    }

    Render() {
const imageData = this.ctx.getImageData(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
let data = imageData.data;
for (var i = 0; i < data.length; i += 4) {
  var x = Math.floor(Math.floor(i/4) % this.ctx.canvas.width);
  var y = Math.floor(Math.floor(i/4) / this.ctx.canvas.width);
  [data[i],data[i+1],data[i+2],data[i+3]] = this.getColor(x,y);
}
this.ctx.putImageData(imageData,0,0);
    }

}