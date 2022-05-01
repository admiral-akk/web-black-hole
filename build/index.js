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
    code: `
  @group(0) @binding(1)
  var<storage, write> output: array<f32>;
  
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
    output[global_id.x] =
      f32(global_id.x) * 1000. + f32(local_id.x);
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
    entries: [{
            binding: 1,
            visibility: GPUShaderStage.COMPUTE,
            buffer: {
                type: 'storage',
            },
        }],
});
const bindGroup = device.createBindGroup({
    layout: bindGroupLayout,
    entries: [{
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
commandEncoder.copyBufferToBuffer(output, 0, // Source offset
stagingBuffer, 0, // Destination offset
BUFFER_SIZE);
const commands = commandEncoder.finish();
device.queue.submit([commands]);
await stagingBuffer.mapAsync(GPUMapMode.READ, 0, // Offset
BUFFER_SIZE);
const copyArrayBuffer = stagingBuffer.getMappedRange(0, BUFFER_SIZE);
const data = copyArrayBuffer.slice(0);
stagingBuffer.unmap();
console.log(new Float32Array(data));
export {};
//# sourceMappingURL=index.js.map