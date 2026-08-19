"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  MeshTransmissionMaterial,
  Text,
} from "@react-three/drei";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */

const PROJECTS = [
  {
    id: "ghats",
    title: "Silence of the Ghats",
    year: "2024",
    location: "Western Ghats",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=90&fit=crop",
    color: "#8b9a7d",
  },
  {
    id: "monsoon",
    title: "The Last Monsoon",
    year: "2025",
    location: "Kerala",
    image: "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=1200&q=90&fit=crop",
    color: "#6b8e7b",
  },
  {
    id: "light",
    title: "After the Light",
    year: "2025",
    location: "Mumbai",
    image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1200&q=90&fit=crop",
    color: "#c4a265",
  },
  {
    id: "benares",
    title: "Benares Shadows",
    year: "2026",
    location: "Varanasi",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1200&q=90&fit=crop",
    color: "#d4a574",
  },
];

/* ------------------------------------------------------------------ */
/*  Central Prism Aperture — Glass crystal mesh                       */
/* ------------------------------------------------------------------ */

function CentralPrismAperture({ progress }: { progress: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x = t * 0.2 + progress * Math.PI;
    meshRef.current.rotation.y = t * 0.35;
    meshRef.current.rotation.z = Math.sin(t * 0.15) * 0.2;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <octahedronGeometry args={[1.4, 0]} />
      <MeshTransmissionMaterial
        backside
        thickness={0.8}
        roughness={0.05}
        transmission={0.95}
        ior={1.6}
        chromaticAberration={0.25}
        anisotropy={0.5}
        distortion={0.3}
        temporalDistortion={0.1}
        color="#f5c418"
      />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/*  Project Plane — glass-morphic frame with image texture             */
/* ------------------------------------------------------------------ */

function ProjectPlane({
  src,
  position,
  rotation,
  index,
  color,
}: {
  src: string;
  position: [number, number, number];
  rotation: [number, number, number];
  index: number;
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const tex = loader.load(src);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [src]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.35 + index) * 0.14;
    meshRef.current.rotation.z = Math.sin(t * 0.25 + index) * 0.03;
  });

  return (
    <Float speed={1.8} rotationIntensity={0.15} floatIntensity={0.5}>
      <group position={position} rotation={rotation}>
        {/* Film Image plane */}
        <mesh ref={meshRef} position={[0, 0, -0.05]}>
          <planeGeometry args={[3.8, 2.3]} />
          <meshBasicMaterial map={texture} transparent opacity={0.95} />
        </mesh>

        {/* Glass overlay with chromatic aberration */}
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[3.8, 2.3]} />
          <MeshTransmissionMaterial
            backside
            thickness={0.35}
            chromaticAberration={0.12}
            anisotropy={0.25}
            distortion={0.08}
            temporalDistortion={0.05}
            color={color}
            transparent
            opacity={0.15}
          />
        </mesh>

        {/* Project title */}
        <Text
          position={[0, -1.65, 0.04]}
          fontSize={0.22}
          color="#f5f5f5"
          anchorX="center"
          anchorY="middle"
        >
          {PROJECTS[index].title}
        </Text>

        {/* Year tag */}
        <Text
          position={[0, -1.95, 0.04]}
          fontSize={0.11}
          color="rgba(245, 196, 24, 0.7)"
          anchorX="center"
          anchorY="middle"
        >
          {PROJECTS[index].year} // {PROJECTS[index].location}
        </Text>
      </group>
    </Float>
  );
}

/* ------------------------------------------------------------------ */
/*  Dust & Flare particles with turbulence                            */
/* ------------------------------------------------------------------ */

function DustParticles() {
  const count = 350;
  const meshRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 28;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 28;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.05;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#f5c418" transparent opacity={0.45} depthWrite={false} />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/*  Camera rig — cinematic scroll track                               */
/* ------------------------------------------------------------------ */

function CameraRig({ progress }: { progress: number }) {
  const { camera } = useThree();

  useFrame(() => {
    const angle = progress * Math.PI * 2.4;
    const radius = 7.2 + Math.sin(progress * Math.PI) * 1.8;
    camera.position.x = Math.sin(angle) * radius;
    camera.position.z = Math.cos(angle) * radius;
    camera.position.y = 0.4 + Math.sin(progress * Math.PI * 3) * 0.7;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ------------------------------------------------------------------ */
/*  Scene export                                                      */
/* ------------------------------------------------------------------ */

export default function WorkShowcase3D({ progress }: { progress: number }) {
  const radius = 5.2;

  return (
    <div className="absolute inset-0 z-20 pointer-events-none opacity-80 transition-opacity duration-700">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 15, 10]} intensity={1.5} color="#f5c418" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#6b8e7b" />

        <CentralPrismAperture progress={progress} />

        {PROJECTS.map((proj, i) => {
          const angle = (i / PROJECTS.length) * Math.PI * 2;
          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius;
          const rotY = -angle + Math.PI / 2;

          return (
            <ProjectPlane
              key={proj.id}
              src={proj.image}
              position={[x, 0, z]}
              rotation={[0, rotY, 0]}
              index={i}
              color={proj.color}
            />
          );
        })}

        <DustParticles />
        <CameraRig progress={progress} />
      </Canvas>
    </div>
  );
}
