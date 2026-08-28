"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { getPositionOnZigzag } from "./ZigzagPath";
import { useGLTF } from "@react-three/drei";

export default function PathFollower({
  modelPath,
  color,
}: {
  modelPath: string;
  color: string;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(modelPath);
  const scrollProgress = useScrollProgress();

  useFrame(() => {
    if (!groupRef.current) return;
    const pos = getPositionOnZigzag(scrollProgress);
    groupRef.current.position.set(pos.x, pos.y, pos.z);
    groupRef.current.rotation.y = scrollProgress * Math.PI * 4;
  });

  return (
    <group ref={groupRef} dispose={null}>
      <primitive
        object={scene.clone()}
        onCreated={(obj: any) => {
          obj.traverse((child: any) => {
            if (child.isMesh) {
              child.material = new THREE.MeshPhysicalMaterial({
                color: new THREE.Color(color),
                metalness: 0.9,
                roughness: 0.15,
                clearcoat: 1.0,
                clearcoatRoughness: 0.1,
                envMapIntensity: 1.5,
              });
            }
          });
        }}
      />
    </group>
  );
}
