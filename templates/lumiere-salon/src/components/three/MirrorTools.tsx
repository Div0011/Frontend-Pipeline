"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function MirrorTools({ visible = true }: { visible?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const mirrorRef = useRef<THREE.Mesh>(null);

  const items = useMemo(() => {
    const arr: { mesh: THREE.Mesh; speed: number; axis: "x" | "y" | "z"; range: number }[] = [];
    const add = (geo: THREE.BufferGeometry, color: string, x: number, y: number, z: number, s: number, metalness = 0.75, roughness = 0.2) => {
      const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color, metalness, roughness }));
      m.position.set(x, y, z);
      m.scale.setScalar(s);
      groupRef.current?.add(m);
      arr.push({ mesh: m, speed: 0.2 + Math.random() * 0.5, axis: ["x", "y", "z"][Math.floor(Math.random() * 3)] as "x" | "y" | "z", range: 0.2 + Math.random() * 0.4 });
    };

    const ring = new THREE.TorusGeometry(0.4, 0.05, 16, 64);
    const bar = new THREE.BoxGeometry(0.1, 1.6, 0.1);
    const plane = new THREE.PlaneGeometry(2, 1.4);
    const sphere = new THREE.SphereGeometry(0.18, 32, 32);
    const torusKnot = new THREE.TorusKnotGeometry(0.35, 0.08, 64, 16);

    add(ring, "#d4a574", 2.4, 0.8, 0, 1.1, 0.9, 0.1);
    add(ring, "#ffffff", 2, -0.5, -0.6, 0.9, 0.9, 0.05);
    add(bar, "#d4a574", -1.8, -0.2, 0.3, 1);
    add(bar, "#ffffff", -2.1, 1, -0.4, 0.85);
    add(plane, "#e8d4b8", 0, 1, -1.5, 1.2, 0.1, 0.05);
    add(sphere, "#ffffff", 1.2, -0.8, 0.8, 0.9);
    add(torusKnot, "#d4a574", 0, 0.2, -0.5, 0.7, 0.85, 0.15);
    add(sphere, "#c9a96e", -0.8, 1.2, 0.6, 0.6);

    return arr;
  }, []);

  useFrame((state) => {
    if (!groupRef.current || !visible) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = Math.sin(t * 0.08) * 0.3;
    groupRef.current.rotation.z = Math.sin(t * 0.12) * 0.08;

    items.forEach((it) => {
      it.mesh.rotation[it.axis] = Math.sin(t * it.speed) * it.range;
    });

    if (mirrorRef.current) {
      mirrorRef.current.rotation.y = t * 0.05;
      mirrorRef.current.position.y = Math.sin(t * 0.4) * 0.15;
    }
  });

  return <group ref={groupRef} />;
}
