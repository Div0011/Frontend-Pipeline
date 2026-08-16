"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Torus, Cone, Sphere, Octahedron } from "@react-three/drei";
import * as THREE from "three";
import { useAdaptiveTheme } from "@/components/AdaptiveThemeProvider";

export default function BlocksElements() {
  const group = useRef<THREE.Group>(null);
  const { theme } = useAdaptiveTheme();

  const elements = useMemo(() => {
    const palette = theme.colors;
    const items = [];
    for (let i = 0; i < 40; i++) {
      const type = i % 4;
      const color = palette[i % palette.length];
      items.push({
        type,
        color,
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 10 - 2,
        ] as [number, number, number],
        rotation: [
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
        ] as [number, number, number],
        scale: Math.random() * 0.2 + 0.05,
        speed: Math.random() * 0.005 + 0.001,
      });
    }
    return items;
  }, [theme.colors.join(",")]);

  useFrame(() => {
    if (!group.current) return;
    group.current.rotation.y += 0.0002;
    group.current.children.forEach((child, i) => {
      const el = elements[i];
      if (!el) return;
      child.rotation.x += el.speed;
      child.rotation.y += el.speed * 0.8;
    });
  });

  return (
    <group ref={group}>
      {elements.map((el, i) => {
        const material = (
          <meshPhysicalMaterial
            color={el.color}
            roughness={0.1}
            metalness={0.1}
            transmission={0.9}
            thickness={0.5}
            ior={1.5}
            clearcoat={1}
            clearcoatRoughness={0.1}
            transparent
            opacity={0.8}
          />
        );

        if (el.type === 0) {
          return (
            <Torus key={i} position={el.position} rotation={el.rotation} scale={el.scale} args={[1, 0.28, 12, 24]}>
              {material}
            </Torus>
          );
        } else if (el.type === 1) {
          return (
            <Cone key={i} position={el.position} rotation={el.rotation} scale={el.scale} args={[0.7, 1.4, 8, 8]}>
              {material}
            </Cone>
          );
        } else if (el.type === 2) {
          return (
            <Octahedron key={i} position={el.position} rotation={el.rotation} scale={el.scale} detail={0}>
              {material}
            </Octahedron>
          );
        } else {
          return (
            <Sphere key={i} position={el.position} rotation={el.rotation} scale={el.scale} args={[1, 10, 10]}>
              {material}
            </Sphere>
          );
        }
      })}
    </group>
  );
}
