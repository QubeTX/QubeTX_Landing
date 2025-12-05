/* eslint-disable react/no-unknown-property */
'use client';

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, Suspense } from "react";
import * as THREE from "three";

const Dots = () => {
  const { viewport, mouse } = useThree();
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 60 * 35; // Wide grid for 16:9
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Grid parameters
  const rows = 35;
  const cols = 60;
  const spacing = 0.6; // Slightly wider spacing

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

    const time = state.clock.getElapsedTime() * 0.5; // Slower animation

    // Convert normalized mouse coordinates to world coordinates
    // Use a default position if mouse hasn't moved to prevent initial explosion
    const mouseX = (mouse.x * viewport.width) / 2;
    const mouseY = (mouse.y * viewport.height) / 2;

    particles.forEach((particle, i) => {
      const { mx, my } = particle;

      // Distance from mouse
      const dx = mouseX - mx;
      const dy = mouseY - my;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Subtle wave effect based on time and position
      let z = Math.sin(mx * 0.3 + time) * 0.15 + Math.cos(my * 0.3 + time) * 0.15;

      // Gentle mouse interaction
      if (dist < 4) {
        const force = (4 - dist) / 4;
        z += force * 1.5; // Gentle push towards camera
      }

      dummy.position.set(mx, my, z);

      // Scale effect based on Z position - subtler
      const scale = 1 + z * 0.3;
      dummy.scale.set(scale, scale, scale);

      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <circleGeometry args={[0.04, 16]} />
      <meshBasicMaterial color="#0066FF" transparent opacity={0.2} />
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
