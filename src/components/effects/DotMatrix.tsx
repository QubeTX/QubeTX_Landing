/* eslint-disable react/no-unknown-property */
'use client';

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, Suspense } from "react";
import * as THREE from "three";

const Dots = () => {
  const { viewport, mouse } = useThree();
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 50 * 50; // Grid size
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Grid parameters
  const rows = 50;
  const cols = 50;
  const spacing = 0.5;

  // Initialize positions
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const x = (j - cols / 2) * spacing;
        const y = (i - rows / 2) * spacing;
        const z = 0;
        temp.push({ x, y, z, mx: x, my: y });
      }
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();

    // Convert normalized mouse coordinates to world coordinates
    const mouseX = (mouse.x * viewport.width) / 2;
    const mouseY = (mouse.y * viewport.height) / 2;

    particles.forEach((particle, i) => {
      const { mx, my } = particle;

      // Distance from mouse
      const dx = mouseX - mx;
      const dy = mouseY - my;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Wave effect based on time and position
      let z = Math.sin(mx * 0.5 + time) * 0.2 + Math.cos(my * 0.5 + time) * 0.2;

      // Mouse interaction
      if (dist < 3) {
        const force = (3 - dist) / 3;
        z += force * 2; // Push dots towards camera
      }

      dummy.position.set(mx, my, z);

      // Scale effect based on Z position
      const scale = 1 + z * 0.5;
      dummy.scale.set(scale, scale, scale);

      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);

      // Optional: Change color based on Z
      // const color = new THREE.Color();
      // color.setHSL(0.6, 1, 0.5 + z * 0.1);
      // meshRef.current!.setColorAt(i, color);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <circleGeometry args={[0.05, 16]} />
      <meshBasicMaterial color="#0066FF" transparent opacity={0.4} />
    </instancedMesh>
  );
};

export const DotMatrix = () => {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full bg-background pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
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
