/* eslint-disable react/no-unknown-property */
'use client';

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, Suspense, useEffect } from "react";
import * as THREE from "three";

const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;

  void main() {
    vec3 basePos = instanceMatrix[3].xyz;
    float time = uTime * 0.5;

    float z = sin(basePos.x * 0.3 + time) * 0.15 + cos(basePos.y * 0.3 + time) * 0.15;

    float dist = distance(basePos.xy, uMouse);
    if (dist < 4.0) {
      float force = (4.0 - dist) / 4.0;
      z += force * 1.5;
    }

    float scale = 1.0 + z * 0.3;

    vec3 pos = position * scale + vec3(basePos.xy, z);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  void main() {
    gl_FragColor = vec4(0.0, 0.4, 1.0, 0.2);
  }
`;

const Dots = () => {
  const { viewport, mouse } = useThree();
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const rows = 35;
  const cols = 60;
  const count = rows * cols;
  const spacing = 0.6;

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
  }), []);

  useEffect(() => {
    if (!meshRef.current) return;

    const dummy = new THREE.Object3D();
    let i = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = (c - cols / 2) * spacing;
        const y = (r - rows / 2) * spacing;

        dummy.position.set(x, y, 0);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i++, dummy.matrix);
      }
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [rows, cols, spacing]);

  useFrame((state) => {
    if (!matRef.current) return;

    const time = state.clock.getElapsedTime();
    const mouseX = (mouse.x * viewport.width) / 2;
    const mouseY = (mouse.y * viewport.height) / 2;

    matRef.current.uniforms.uTime.value = time;
    matRef.current.uniforms.uMouse.value.set(mouseX, mouseY);
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <circleGeometry args={[0.04, 16]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </instancedMesh>
  );
};

export const WallpaperMatrix = () => {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full bg-[#0a0f1c] pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 18], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Dots />
        </Suspense>
      </Canvas>
    </div>
  );
};
