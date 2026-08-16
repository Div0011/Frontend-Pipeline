"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export interface CanProps {
  modelPath: string;
  color?: string;
  metalness?: number;
  roughness?: number;
  clearcoat?: number;
  envMapIntensity?: number;
}

export default function Can({
  modelPath,
  color = "#ffffff",
  metalness = 0.9,
  roughness = 0.15,
  clearcoat = 1.0,
  envMapIntensity = 1.5,
}: CanProps) {
  const { scene } = useGLTF(modelPath);
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial | null>(null);

  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += 0.005;
  });

  return (
    <group ref={groupRef} dispose={null}>
      <primitive
        object={clonedScene}
        onCreated={(obj: any) => {
          obj.traverse((child: any) => {
            if (child.isMesh) {
              child.material = new THREE.MeshPhysicalMaterial({
                color: new THREE.Color(color),
                metalness,
                roughness,
                clearcoat,
                clearcoatRoughness: 0.1,
                envMapIntensity,
              });
              materialRef.current = child.material;
            }
          });
        }}
      />
    </group>
  );
}

useGLTF.preload = useGLTF.preload || (() => {});
