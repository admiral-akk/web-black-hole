const entry = navigator.gpu;
if (!entry) {
    throw new Error('WebGPU is not supported on this browser.');
}
const adapter = await entry.requestAdapter();
if (!adapter)
    throw Error('Couldn’t request WebGPU adapter.');
const device = await adapter.requestDevice();
if (!device)
    throw Error('Couldn’t request WebGPU logical device.');
const module = device.createShaderModule({
    code: `struct Ball {
    radius: f32,
    position: vec2<f32>,
    velocity: vec2<f32>,
  }
  @group(0) @binding(0)
  var<storage, read> input: array<Ball>;
  @group(0) @binding(1)
  var<storage, write> output: array<Ball>;
  
  let TIME_STEP: f32 = 0.016;
  @stage(compute) @workgroup_size(64)
  fn main(
  
    @builtin(global_invocation_id)
    global_id : vec3<u32>,
  
    @builtin(local_invocation_id)
    local_id : vec3<u32>,
  
  ) {
  if(global_id.x >= arrayLength(&output)) {
    return;
  }
  output[global_id.x].radius = input[global_id.x].radius;
  output[global_id.x].position =
    input[global_id.x].position +
    input[global_id.x].velocity * TIME_STEP;
    output[global_id.x].velocity = input[global_id.x].velocity;
  }
    `,
});
const BUFFER_SIZE = 1000;
const output = device.createBuffer({
    size: BUFFER_SIZE,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC,
});
const stagingBuffer = device.createBuffer({
    size: BUFFER_SIZE,
    usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST,
});
const bindGroupLayout = device.createBindGroupLayout({
    entries: [
        {
            binding: 0,
            visibility: GPUShaderStage.COMPUTE,
            buffer: {
                type: 'read-only-storage',
            },
        }, {
            binding: 1,
            visibility: GPUShaderStage.COMPUTE,
            buffer: {
                type: 'storage',
            },
        }
    ],
});
const input = device.createBuffer({
    size: BUFFER_SIZE,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
});
const bindGroup = device.createBindGroup({
    layout: bindGroupLayout,
    entries: [
        {
            binding: 0,
            resource: {
                buffer: input,
            },
        }, {
            binding: 1,
            resource: {
                buffer: output,
            },
        }
    ],
});
const pipeline = device.createComputePipeline({
    layout: device.createPipelineLayout({
        bindGroupLayouts: [bindGroupLayout],
    }),
    compute: {
        module,
        entryPoint: 'main',
    },
});
console.log('version 1');
const NUM_BALLS = 1000;
function randomBetween(low, high) {
    return low + Math.random() * (high - low);
}
const canvas = document.getElementById('gpu-canvas');
const ctx = canvas.getContext('2d');
function renderOutput(state) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (let i = 0; i < NUM_BALLS; i++) {
        ctx.fillRect(state[i * 6 + 2], state[i * 6 + 3], state[i * 6], state[i * 6]);
    }
}
function initializeBalls() {
    const balls = new Float32Array(new ArrayBuffer(BUFFER_SIZE));
    for (let i = 0; i < NUM_BALLS; i++) {
        balls[i * 6 + 0] = randomBetween(2, 10); // radius
        balls[i * 6 + 1] = 0; // padding
        balls[i * 6 + 2] = randomBetween(0, canvas.width); // position.x
        balls[i * 6 + 3] = randomBetween(0, canvas.height); // position.y
        balls[i * 6 + 4] = randomBetween(-100, 100); // velocity.x
        balls[i * 6 + 5] = randomBetween(-100, 100); // velocity.y
    }
    return balls;
}
let inputBalls = initializeBalls();
function command() {
    const commandEncoder = device.createCommandEncoder();
    const passEncoder = commandEncoder.beginComputePass();
    passEncoder.setPipeline(pipeline);
    passEncoder.setBindGroup(0, bindGroup);
    passEncoder.dispatchWorkgroups(Math.ceil(BUFFER_SIZE / 64));
    passEncoder.end();
    commandEncoder.copyBufferToBuffer(output, 0, // Source offset
    stagingBuffer, 0, // Destination offset
    BUFFER_SIZE);
    return commandEncoder.finish();
}
function render() {
    device.queue.writeBuffer(input, 0, inputBalls);
    device.queue.submit([command()]);
    stagingBuffer.mapAsync(GPUMapMode.READ, 0, // Offset
    BUFFER_SIZE).then(() => {
        const copyArrayBuffer = stagingBuffer.getMappedRange(0, BUFFER_SIZE);
        const data = copyArrayBuffer.slice(0);
        stagingBuffer.unmap();
        inputBalls = new Float32Array(data);
        renderOutput(inputBalls);
        window.requestAnimationFrame(render);
    });
}
let frameTime = [];
function sdf(x, y, z) {
    return 1;
}
function getColor(x, y) {
    return [Math.floor(255 * y / canvas.height), Math.floor(255 * x / canvas.width), 0, 255];
}
function renderImage() {
    const startTime = Date.now();
    frameTime.push(startTime);
    while (startTime - frameTime[0] > 1000) {
        frameTime.shift();
    }
    console.log(`fps estimate: ${frameTime.length}`);
    ctx.canvas.width = 400;
    ctx.canvas.height = 400;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
        var x = Math.floor(Math.floor(i / 4) % canvas.width);
        var y = Math.floor(Math.floor(i / 4) / canvas.width);
        [data[i], data[i + 1], data[i + 2], data[i + 3]] = getColor(x, y);
    }
    ctx.putImageData(imageData, 0, 0);
    window.requestAnimationFrame(renderImage);
}
renderImage();
export {};
//# sourceMappingURL=index2.js.map