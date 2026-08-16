"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Icosahedron, Octahedron, Sphere, Torus } from "@react-three/drei";
import * as THREE from "three";
import { useAdaptiveTheme } from "@/components/AdaptiveThemeProvider";

interface FloatingFragmentsProps {
  count?: number;
}

export default function FloatingFragments({ count = 35 }: FloatingFragmentsProps) {
  const group = useRef<THREE.Group>(null);
  const { theme } = useAdaptiveTheme();

  const fragments = useMemo(() => {
    const palette = theme.colors;
    return Array.from({ length: count }).map(() => {
      const color = palette[Math.floor(Math.random() * palette.length)];
      return {
        position: [
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 8 - 3,
        ] as [number, number, number],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ] as [number, number, number],
        scale: Math.random() * 0.3 + 0.06,
        speed: Math.random() * 0.012 + 0.004,
        type: Math.floor(Math.random() * 4),
        color,
      };
    });
  }, [count, theme.colors.join(",")]);

  useFrame(() => {
    if (!group.current) return;
    group.current.rotation.y += 0.0006;
    group.current.children.forEach((child, i) => {
      const frag = fragments[i];
      if (!frag) return;
      child.rotation.x += frag.speed;
      child.rotation.y += frag.speed;
      child.position.y += Math.sin(Date.now() * 0.001 * frag.speed) * 0.006;
    });
  });

  return (
    <group ref={group}>
      {fragments.map((frag, i) => {
        const material = (
          <meshStandardMaterial
            color={frag.color}
            roughness={0.18}
            metalness={0.55}
            transparent
            opacity={0.7}
          />
        );

        if (frag.type === 0) {
          return (
            <Icosahedron key={i} position={frag.position} rotation={frag.rotation} scale={frag.scale} detail={0}>
              {material}
            </Icosahedron>
          );
        } else if (frag.type === 1) {
          return (
            <Octahedron key={i} position={frag.position} rotation={frag.rotation} scale={frag.scale} detail={0}>
              {material}
            </Octahedron>
          );
        } else if (frag.type === 2) {
          return (
            <Torus key={i} position={frag.position} rotation={frag.rotation} scale={frag.scale} args={[1, 0.3, 8, 16]}>
              {material}
            </Torus>
          );
        } else {
          return (
            <Sphere key={i} position={frag.position} rotation={frag.rotation} scale={frag.scale} args={[1, 8, 8]}>
              {material}
            </Sphere>
          );
        }
      })}
    </group>
  );
}
