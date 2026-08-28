"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { InstancedMesh, Object3D, Color } from "three";

export interface ParticlesProps {
  count?: number;
  scrollVelocity?: number;
}

export default function Particles({ count = 120, scrollVelocity = 0 }: ParticlesProps) {
  const meshRef = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);
  const color = useMemo(() => new Color(), []);

  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        position: [
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 8 - 2,
        ] as [number, number, number],
        scale: Math.random() * 0.06 + 0.01,
        speed: Math.random() * 0.5 + 0.2,
        phase: Math.random() * Math.PI * 2,
      });
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const time = performance.now() * 0.001;

    particles.forEach((p, i) => {
      dummy.position.set(
        p.position[0] + Math.sin(time * p.speed + p.phase) * 0.3,
        p.position[1] + Math.cos(time * p.speed * 0.7 + p.phase) * 0.2,
        p.position[2]
      );
      const s = p.scale + scrollVelocity * 0.02;
      dummy.scale.setScalar(Math.max(0.01, s));
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);

      const brightness = 0.3 + scrollVelocity * 0.4;
      color.setRGB(brightness, brightness, brightness);
      meshRef.current!.setColorAt(i, color);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial transparent opacity={0.4} />
    </instancedMesh>
  );
}
