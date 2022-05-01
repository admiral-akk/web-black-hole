

export {};
const entry: GPU = navigator.gpu;
if (!entry) {
  throw new Error('WebGPU is not supported on this browser.');
}

const adapter = await entry.requestAdapter();
if (!adapter) throw Error('Couldn’t request WebGPU adapter.');

const device = await adapter.requestDevice();
if (!device) throw Error('Couldn’t request WebGPU logical device.');
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
  output[global_id.x].position =
    input[global_id.x].position +
    input[global_id.x].velocity * TIME_STEP;
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

const bindGroupLayout =
  device.createBindGroupLayout({
    entries: [
      {
        binding: 0,
        visibility: GPUShaderStage.COMPUTE,
        buffer: {
          type: "read-only-storage",
        },
      },{
      binding: 1,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'storage',
      },
    }],
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
    },{
    binding: 1,
    resource: {
      buffer: output,
    },
  }],
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

const commandEncoder = device.createCommandEncoder();
const passEncoder = commandEncoder.beginComputePass();
passEncoder.setPipeline(pipeline);
passEncoder.setBindGroup(0, bindGroup);
passEncoder.dispatch(1);
passEncoder.dispatch(Math.ceil(BUFFER_SIZE / 64));
passEncoder.end();
commandEncoder.copyBufferToBuffer(
    output,
    0, // Source offset
    stagingBuffer,
    0, // Destination offset
    BUFFER_SIZE,
);
const commands = commandEncoder.finish();
const NUM_BALLS = 1000;
function randomBetween(low: number, high: number) {
  return low + Math.random() * (high - low);
}
const canvas = document.getElementById('gpu-canvas')! as HTMLCanvasElement;
canvas.width = 400;
canvas.height = 300;
const ctx = canvas.getContext('2d')!;
ctx.clearRect( 0, 0, ctx.canvas.width, ctx.canvas.height)
let inputBalls = new Float32Array(new ArrayBuffer(BUFFER_SIZE));
for (let i = 0; i < NUM_BALLS; i++) {
  inputBalls[i * 6 + 0] = randomBetween(2, 10); // radius
  inputBalls[i * 6 + 1] = 0; // padding
  inputBalls[i * 6 + 2] = randomBetween(0, canvas.width); // position.x
  inputBalls[i * 6 + 3] = randomBetween(0, canvas.height); // position.y
  inputBalls[i * 6 + 4] = randomBetween(-100, 100); // velocity.x
  inputBalls[i * 6 + 5] = randomBetween(-100, 100); // velocity.y
}

function postDraw() {
  const copyArrayBuffer =
    stagingBuffer.getMappedRange(0, BUFFER_SIZE);
  inputBalls= new Float32Array(copyArrayBuffer.slice(0));
  stagingBuffer.unmap();
  console.log(inputBalls);
  for (let i = 0; i < NUM_BALLS; i++) {
    ctx.fillRect(inputBalls[i * 6 + 2],inputBalls[i * 6 + 3], inputBalls[i * 6 ], inputBalls[i * 6 ]);
  }
  
  window.requestAnimationFrame(draw)
}

function draw() {
  ctx.clearRect( 0, 0, ctx.canvas.width, ctx.canvas.height)
  device.queue.submit([commands]);
  device.queue.writeBuffer(input, 0, inputBalls);
  stagingBuffer.mapAsync(
    GPUMapMode.READ,
    0, // Offset
    BUFFER_SIZE, // Length
).then(() => postDraw());
}

window.requestAnimationFrame(draw);