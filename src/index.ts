import {Renderer} from './Renderer';

const renderer = new Renderer();

function renderLoop() {
  const start = Date.now();
  renderer.Render();
  console.log(`render time: ${Date.now() - start}ms`);
  setTimeout(() => renderLoop(), 100);
}
renderLoop();
