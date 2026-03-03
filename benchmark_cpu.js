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

// Mock THREE.Object3D and Matrix4
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
  // Simplified version of updateMatrix
  compose(position, quaternion, scale) {
    // In a real Three.js updateMatrix, this does a lot of math
    // For benchmarking, we just want to simulate some work
    this.makeTranslation(position.x, position.y, position.z);
    // ... more math would be here
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

    particles.forEach((particle, i) => {
      const { mx, my } = particle;

      const dx = mouseX - mx;
      const dy = mouseY - my;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let z = Math.sin(mx * 0.3 + time) * 0.15 + Math.cos(my * 0.3 + time) * 0.15;

      if (dist < 4) {
        const force = (4 - dist) / 4;
        z += force * 1.5;
      }

      dummy.position.x = mx;
      dummy.position.y = my;
      dummy.position.z = z;

      const scale = 1 + z * 0.3;
      dummy.scale.x = scale;
      dummy.scale.y = scale;
      dummy.scale.z = scale;

      dummy.updateMatrix();
      setMatrixAt(i, dummy.matrix);
    });
  }

  const end = performance.now();
  console.log(`Average time per frame: ${(end - start) / iterations}ms`);
}

benchmark();
