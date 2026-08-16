"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface CameraRigProps {
  scrollProgress?: number;
}

export default function CameraRig({ scrollProgress = 0 }: CameraRigProps) {
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const shakeRef = useRef({ x: 0, y: 0 });

  const cameraState = useMemo(() => {
    const states = [
      { fov: 50, pos: [0, 0, 8], look: [0, 0, 0] },
      { fov: 38, pos: [0, 0.2, 7], look: [0, 0, 0] },
      { fov: 42, pos: [0, 0.1, 7.5], look: [0, 0, 0] },
      { fov: 32, pos: [0, 0, 6.5], look: [0, 0, 0] },
    ];

    const idx = Math.min(3, Math.floor(scrollProgress * 3.99));
    const nextIdx = Math.min(3, idx + 1);
    const t = scrollProgress * 3.99 - idx;

    return {
      fov: states[idx].fov + (states[nextIdx].fov - states[idx].fov) * t,
      pos: states[idx].pos.map((v, i) => v + (states[nextIdx].pos[i] - v) * t) as [number, number, number],
      look: states[idx].look.map((v, i) => v + (states[nextIdx].look[i] - v) * t) as [number, number, number],
    };
  }, [scrollProgress]);

  useFrame(() => {
    if (!cameraRef.current) return;
    const cam = cameraRef.current;

    gsap.to(cam, {
      fov: cameraState.fov,
      duration: 0.8,
      ease: "power3.inOut",
      onUpdate: () => cam.updateProjectionMatrix(),
    });

    gsap.to(cam.position, {
      x: cameraState.pos[0],
      y: cameraState.pos[1],
      z: cameraState.pos[2],
      duration: 0.8,
      ease: "power3.inOut",
    });

    cam.lookAt(...cameraState.look);
  });

  return <PerspectiveCamera ref={cameraRef} makeDefault fov={cameraState.fov} position={cameraState.pos} near={0.1} far={50} />;
}
