"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { useSceneStore } from "@/stores/sceneStore";

export default function CameraController() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const activeProduct = useSceneStore((s) => s.activeProduct);
  const prefersReducedMotion = useSceneStore((s) => s.prefersReducedMotion);

  useFrame((state, delta) => {
    if (!cameraRef.current) return;

    // Responsive camera framing: pull back on vertical / narrow mobile screens
    const aspect = state.viewport.aspect;
    const baseZ = aspect < 1.2 ? (activeProduct ? 8.8 : 9.5) : (activeProduct ? 6.6 : 7.5);
    const baseY = activeProduct ? 0.1 : (aspect < 1.2 ? -0.2 : 0);
    const baseX = 0;

    // Subtle pointer parallax when not in reduced motion
    const pointerX = prefersReducedMotion ? 0 : state.pointer.x * 0.25;
    const pointerY = prefersReducedMotion ? 0 : state.pointer.y * 0.15;

    const t = 1 - Math.exp(-3.5 * delta);

    cameraRef.current.position.x = THREE.MathUtils.lerp(
      cameraRef.current.position.x,
      baseX + pointerX,
      t
    );
    cameraRef.current.position.y = THREE.MathUtils.lerp(
      cameraRef.current.position.y,
      baseY + pointerY,
      t
    );
    cameraRef.current.position.z = THREE.MathUtils.lerp(
      cameraRef.current.position.z,
      baseZ,
      t
    );

    cameraRef.current.lookAt(0, 0, 0);
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[0, 0, 7.5]}
      fov={42}
      near={0.1}
      far={60}
    />
  );
}
