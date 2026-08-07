"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function GoldenLightBurst({ intensity = 1, visible = true }: { intensity?: number; visible?: boolean }) {
  const innerRef = useRef<THREE.PointLight>(null);
  const outerRef = useRef<THREE.PointLight>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!visible) return;
    const t = state.clock.elapsedTime;

    if (innerRef.current) {
      innerRef.current.intensity = intensity * (1 + Math.sin(t * 2.5) * 0.35);
    }
    if (outerRef.current) {
      outerRef.current.intensity = intensity * 0.4 * (1 + Math.sin(t * 1.8 + 1) * 0.25);
    }
    if (meshRef.current) {
      meshRef.current.scale.setScalar(1 + Math.sin(t * 1.2) * 0.15);
      meshRef.current.rotation.y = t * 0.1;
    }
    if (ringRef.current) {
      ringRef.current.scale.setScalar(1 + Math.sin(t * 1.6) * 0.2);
      ringRef.current.rotation.x = Math.sin(t * 0.4) * 0.4;
      ringRef.current.rotation.y = t * 0.15;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <pointLight ref={innerRef} color="#ffd700" intensity={intensity} distance={60} decay={2} />
      <pointLight ref={outerRef} color="#ffecd2" intensity={intensity * 0.25} distance={90} decay={2.5} />
      <mesh ref={meshRef}>
        <sphereGeometry args={[3, 32, 32]} />
        <meshBasicMaterial color="#ffd700" transparent opacity={0.12} side={THREE.BackSide} />
      </mesh>
      <mesh ref={ringRef} rotation={[Math.PI * 0.5, 0, 0]}>
        <torusGeometry args={[3.5, 0.02, 16, 100]} />
        <meshBasicMaterial color="#d4a574" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}
