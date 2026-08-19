"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function AnamorphicLensMesh({ progress }: { progress: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const { x, y } = state.pointer;

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.4 + progress * Math.PI, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y * 0.3, 0.05);
    }

    if (meshRef.current) {
      meshRef.current.rotation.z = t * 0.15;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = -t * 0.25;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Outer Metallic Lens Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[2.4, 0.04, 32, 100]} />
        <meshStandardMaterial
          color="#d4a84b"
          metalness={0.9}
          roughness={0.15}
          wireframe={false}
          emissive="#523d0c"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Inner Aperture Blades */}
      <mesh ref={meshRef}>
        <ringGeometry args={[1.2, 2.2, 8]} />
        <meshStandardMaterial
          color="#151515"
          metalness={0.8}
          roughness={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Center Anamorphic Flare Glass */}
      <mesh position={[0, 0, 0.1]}>
        <cylinderGeometry args={[1.1, 1.1, 0.1, 32]} />
        <meshPhysicalMaterial
          color="#0d1b2a"
          transmission={0.9}
          opacity={0.85}
          transparent
          roughness={0.05}
          ior={1.5}
          thickness={0.5}
        />
      </mesh>
    </group>
  );
}

function AmbientDustParticles({ progress }: { progress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const count = 60;

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 14,
        y: (Math.random() - 0.5) * 10,
        z: (Math.random() - 0.5) * 10,
        scale: 0.05 + Math.random() * 0.15,
      });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.02 + progress * 0.3;
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]}>
          <sphereGeometry args={[p.scale, 8, 8]} />
          <meshBasicMaterial
            color={i % 3 === 0 ? "#d4a84b" : "#ffffff"}
            transparent
            opacity={0.25 + Math.sin(i + progress * 4) * 0.15}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function CinematicHero3D({ progress }: { progress: number }) {
  return (
    <div className="absolute inset-0 z-15 pointer-events-none opacity-75">
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[4, 4, 4]} intensity={2.0} color="#d4a84b" />
        <pointLight position={[-4, -4, -2]} intensity={1.0} color="#3a7bd5" />

        <AnamorphicLensMesh progress={progress} />
        <AmbientDustParticles progress={progress} />
      </Canvas>
    </div>
  );
}
