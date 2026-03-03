const { performance } = require('perf_hooks');

const rows = 35;
const cols = 60;
const count = rows * cols;
const particles = [];
const spacing = 0.6;

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    const x = (j - cols / 2) * spacing;
    const y = (i - rows / 2) * spacing;
    particles.push({ x, y, z: 0, mx: x, my: y });
  }
}

class Matrix4 {
  constructor() {
    this.elements = new Float32Array(16);
  }
  makeTranslation(x, y, z) {
    this.elements[12] = x;
    this.elements[13] = y;
    this.elements[14] = z;
    return this;
  }
  compose(position, quaternion, scale) {
    this.makeTranslation(position.x, position.y, position.z);
    return this;
  }
}

class Object3D {
  constructor() {
    this.position = { x: 0, y: 0, z: 0 };
    this.scale = { x: 1, y: 1, z: 1 };
    this.quaternion = { x: 0, y: 0, z: 0, w: 1 };
    this.matrix = new Matrix4();
  }
  updateMatrix() {
    this.matrix.compose(this.position, this.quaternion, this.scale);
  }
}

const dummy = new Object3D();
const instanceMatrix = new Float32Array(count * 16);

function setMatrixAt(index, matrix) {
  instanceMatrix.set(matrix.elements, index * 16);
}

function benchmark() {
  const start = performance.now();
  const iterations = 1000;

  for (let iter = 0; iter < iterations; iter++) {
    const time = iter * 0.01;
    const mouseX = 10;
    const mouseY = 10;

    // SHADER-LIKE MOCK (CPU version of shader logic)
    // In actual shader, this happens in parallel on GPU
    // On CPU, we still need to update uniforms (time, mouse)
    const uTime = time;
    const uMouse = { x: mouseX, y: mouseY };

    // This loop represents what happens if we only update uniforms
    // But we still need to compare it to the original per-frame CPU loop.
    // The "Optimization" is that this loop goes away from CPU.
  }

  const end = performance.now();
  console.log(`Average time per frame (Uniform update only): ${(end - start) / iterations}ms`);
}

benchmark();
