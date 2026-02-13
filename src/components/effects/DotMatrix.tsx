/* eslint-disable react/no-unknown-property */
'use client';

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, Suspense } from "react";
import * as THREE from "three";

const SPACING = 0.7;
const MAX_PARTICLES = 1800;

const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;

  varying float vZ;
  varying float vMouseDist;

  void main() {
    vec3 basePos = vec3(instanceMatrix[3]);

    float wave = sin(basePos.x * 0.5 + uTime) * 0.2
               + cos(basePos.y * 0.5 + uTime) * 0.2;

    float dist = distance(basePos.xy, uMouse);
    float mouseEffect = smoothstep(3.0, 0.0, dist) * 2.0;

    float z = wave + mouseEffect;
    float scale = 1.0 + z * 0.5;

    vec3 pos = position * scale + vec3(basePos.xy, z);

    vZ = z;
    vMouseDist = dist;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 uColor;
  uniform vec3 uMouseColor;

  varying float vZ;
  varying float vMouseDist;

  void main() {
    float t = smoothstep(3.0, 0.0, vMouseDist);
    vec3 color = mix(uColor, uMouseColor, t * 0.6);
    color *= 1.0 + vZ * 0.3;
    float alpha = 0.4 + vZ * 0.15;
    gl_FragColor = vec4(color, alpha);
  }
`;

const Dots = () => {
  const { viewport, mouse } = useThree();
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const mouseTarget = useRef(new THREE.Vector2(0, 0));

  const { cols, rows, count } = useMemo(() => {
    let c = Math.ceil(viewport.width / SPACING) + 4;
    let r = Math.ceil(viewport.height / SPACING) + 4;
    if (c * r > MAX_PARTICLES) {
      const ratio = Math.sqrt(MAX_PARTICLES / (c * r));
      c = Math.floor(c * ratio);
      r = Math.floor(r * ratio);
    }
    return { cols: c, rows: r, count: c * r };
  }, [viewport.width, viewport.height]);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uColor: { value: new THREE.Color("#0066FF") },
        uMouseColor: { value: new THREE.Color("#9346FF") },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
    });
  }, []);

  // Set instance matrices once on mount / resize
  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const dummy = new THREE.Object3D();
    let idx = 0;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const x = (j - cols / 2) * SPACING;
        const y = (i - rows / 2) * SPACING;
        dummy.position.set(x, y, 0);
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        mesh.setMatrixAt(idx, dummy.matrix);
        idx++;
      }
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, [cols, rows]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const mouseX = (mouse.x * viewport.width) / 2;
    const mouseY = (mouse.y * viewport.height) / 2;

    // Smooth mouse trailing
    mouseTarget.current.x += (mouseX - mouseTarget.current.x) * 0.08;
    mouseTarget.current.y += (mouseY - mouseTarget.current.y) * 0.08;

    // 2 uniform updates per frame
    material.uniforms.uTime.value = time;
    material.uniforms.uMouse.value.set(mouseTarget.current.x, mouseTarget.current.y);
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} key={count} material={material}>
      <circleGeometry args={[0.05, 6]} />
    </instancedMesh>
  );
};

export const DotMatrix = () => {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full bg-background pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <Dots />
        </Suspense>
      </Canvas>
    </div>
  );
};
