"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";
import { useAdaptiveTheme } from "@/components/AdaptiveThemeProvider";

interface BubbleFieldProps {
  count?: number;
}

export default function BubbleField({ count = 60 }: BubbleFieldProps) {
  const group = useRef<THREE.Group>(null);
  const { theme } = useAdaptiveTheme();

  const bubbles = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      position: [
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6 - 2,
      ] as [number, number, number],
      scale: Math.random() * 0.12 + 0.02,
      speed: Math.random() * 0.012 + 0.004,
      opacity: Math.random() * 0.25 + 0.03,
    }));
  }, [count]);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const elapsed = clock.getElapsedTime();
    group.current.children.forEach((child, i) => {
      const bubble = bubbles[i];
      if (!bubble) return;
      child.position.y += Math.sin(elapsed * bubble.speed + i) * 0.006;
      child.position.x += Math.cos(elapsed * bubble.speed * 0.6 + i) * 0.004;
      child.rotation.z += 0.001;
    });
  });

  const bubbleColor = theme.colors[0] || "#ffffff";

  return (
    <group ref={group}>
      {bubbles.map((bubble, i) => (
        <Sphere
          key={i}
          position={bubble.position}
          scale={bubble.scale}
          args={[1, 12, 12]}
        >
          <meshPhysicalMaterial
            color={bubbleColor}
            roughness={0}
            metalness={0}
            transparent
            opacity={bubble.opacity}
            clearcoat={1}
            clearcoatRoughness={0}
            transmission={0.92}
            thickness={0.01}
          />
        </Sphere>
      ))}
    </group>
  );
}

