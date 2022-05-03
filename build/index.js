import { InputController } from './InputController';
import { Renderer } from './Renderer';
const renderer = new Renderer();
const input = new InputController((move) => renderer.pan(move));
function renderLoop() {
    renderer.Render();
    setTimeout(() => renderLoop(), 100);
}
renderLoop();
//# sourceMappingURL=index.js.map