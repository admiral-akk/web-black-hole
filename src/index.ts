import {vec2} from 'gl-matrix';
import {InputController} from './InputController';
import {Renderer} from './Renderer';

const renderer = new Renderer();
const input = new InputController((move: vec2) => renderer.pan(move));
function renderLoop() {
  renderer.Render();
  setTimeout(() => renderLoop(), 100);
}
renderLoop();
