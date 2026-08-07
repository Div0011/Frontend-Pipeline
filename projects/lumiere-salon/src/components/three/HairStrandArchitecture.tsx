"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function HairStrandArchitecture({ count = 80, visible = true }: { count?: number; visible?: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const { positions, rotations, scales, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const rot = new Float32Array(count * 3);
    const scl = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const palette = [
      new THREE.Color("#d4a574"),
      new THREE.Color("#e8d4b8"),
      new THREE.Color("#c9a96e"),
      new THREE.Color("#ffffff"),
    ];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 26;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 22;

      rot[i * 3] = Math.random() * Math.PI;
      rot[i * 3 + 1] = Math.random() * Math.PI;
      rot[i * 3 + 2] = Math.random() * Math.PI;

      scl[i * 3] = 0.4 + Math.random() * 2.2;
      scl[i * 3 + 1] = 0.8 + Math.random() * 3;
      scl[i * 3 + 2] = 0.4 + Math.random() * 2.2;

      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return { positions: pos, rotations: rot, scales: scl, colors: col };
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current || !visible) return;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const matrix = new THREE.Matrix4();
      const position = new THREE.Vector3(
        positions[i * 3] + Math.sin(time * 0.35 + i * 0.7) * 0.8,
        positions[i * 3 + 1] + Math.cos(time * 0.25 + i * 0.5) * 0.6,
        positions[i * 3 + 2] + Math.sin(time * 0.2 + i * 0.3) * 0.4,
      );
      const rotation = new THREE.Euler(
        rotations[i * 3] + time * 0.06,
        rotations[i * 3 + 1] + time * 0.04,
        rotations[i * 3 + 2] + Math.sin(time * 0.3 + i) * 0.1,
      );
      const scale = new THREE.Vector3(
        scales[i * 3],
        scales[i * 3 + 1],
        scales[i * 3 + 2],
      );

      matrix.compose(position, new THREE.Quaternion().setFromEuler(rotation), scale);
      meshRef.current.setMatrixAt(i, matrix);
      meshRef.current.setColorAt(i, new THREE.Color(colors[i * 3], colors[i * 3 + 1], colors[i * 3 + 2]));
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled={false}>
      <cylinderGeometry args={[0.012, 0.018, 14, 6]} />
      <meshStandardMaterial
        color="#d4a574"
        metalness={0.85}
        roughness={0.15}
        emissive="#d4a574"
        emissiveIntensity={0.2}
      />
    </instancedMesh>
  );
}
