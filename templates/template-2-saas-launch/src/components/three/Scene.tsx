"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Edges, Float } from "@react-three/drei";
import { gsap } from "gsap";
import * as THREE from "three";

interface BlockProps {
  index: number;
  total: number;
  base: [number, number, number];
  target: [number, number, number];
  progressRef: React.RefObject<number>;
  accent: string;
}

function Block({ index, total, base, target, progressRef, accent }: BlockProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const progress = progressRef.current ?? 0;
    const delay = (index / total) * 0.28;
    const localP = Math.max(0, Math.min(1, (progress - delay) / (1 - delay * 0.5)));
    const easedP = gsap.parseEase("power3.inOut")(localP);

    const curX = THREE.MathUtils.lerp(base[0], target[0], easedP);
    const curY = THREE.MathUtils.lerp(base[1], target[1], easedP);
    const curZ = THREE.MathUtils.lerp(base[2], target[2], easedP);

    meshRef.current.position.set(curX, curY, curZ);
    meshRef.current.rotation.x = easedP * Math.PI * 0.18 + state.clock.elapsedTime * 0.04 * (index % 2 === 0 ? 1 : -1);
    meshRef.current.rotation.y = easedP * Math.PI * 0.35 + state.clock.elapsedTime * 0.03;

    if (matRef.current) {
      matRef.current.emissiveIntensity = 0.06 + easedP * 0.22 + Math.sin(state.clock.elapsedTime + index) * 0.02;
    }
  });

  return (
    <Float speed={0.9} rotationIntensity={0.1} floatIntensity={0.28}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[0.95, 0.95, 0.95]} />
        <meshStandardMaterial
          ref={matRef}
          color="#d8d6d0"
          metalness={0.92}
          roughness={0.12}
          emissive={accent}
          emissiveIntensity={0.08}
        />
      </mesh>
      <Edges scale={1.012} color={accent} threshold={15} />
    </Float>
  );
}

function ConnectingLines({
  blocks,
  progressRef,
}: {
  blocks: { base: number[]; target: number[] }[];
  progressRef: React.RefObject<number>;
}) {
  const matRef = useRef<THREE.LineBasicMaterial>(null);

  const positions = useMemo(() => {
    const pts: number[] = [];
    for (let i = 0; i < blocks.length; i++) {
      const next = (i + 1) % blocks.length;
      pts.push(...blocks[i].base, ...blocks[next].base);
    }
    return new Float32Array(pts);
  }, [blocks]);

  useFrame(() => {
    if (!matRef.current) return;
    const p = progressRef.current ?? 0;
    matRef.current.opacity = 0.08 + p * 0.18;
  });

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial ref={matRef} color="#6ee7c5" transparent opacity={0.1} />
    </lineSegments>
  );
}

interface SceneContentProps {
  progressRef: React.RefObject<number>;
  isExploded: boolean;
  immersive?: boolean;
}

function SceneContent({ progressRef, immersive = false }: SceneContentProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });
  const accent = "#6ee7c5";

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mq.matches);
    const onChange = () => setIsReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (isReducedMotion) return;
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isReducedMotion]);

  const blocks = useMemo(
    () => [
      { base: [0, 0, 0], target: [3.2, 2.0, 2.4] },
      { base: [1, 0, 0], target: [-2.9, -1.4, 2.8] },
      { base: [-1, 0, 0], target: [2.5, 2.8, -2.3] },
      { base: [0, 1, 0], target: [-2.2, 2.1, -2.7] },
      { base: [1, 1, 0], target: [2.7, -2.5, -2.1] },
      { base: [-1, 1, 0], target: [-3.0, -2.3, 2.4] },
      { base: [0, 0, 1], target: [1.1, -2.9, 3.0] },
      { base: [1, 0, 1], target: [-1.3, 3.1, -1.0] },
      { base: [-1, 0, 1], target: [0.4, 1.8, -3.2] },
    ],
    []
  );

  useFrame((state) => {
    if (!groupRef.current || isReducedMotion) return;
    const p = progressRef.current ?? 0;
    const baseZ = immersive ? 10 : 8;
    const baseY = immersive ? 2.2 : 3;

    camera.position.z = THREE.MathUtils.lerp(camera.position.z, baseZ + p * 2.5, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, baseY + p * 1.2, 0.04);
    camera.lookAt(0, 0.2, 0);

    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, p * 1.1, 0.04);
    groupRef.current.rotation.y += 0.0012;

    const targetRotX = mouse.current.y * 0.12;
    const targetRotY = mouse.current.x * 0.14;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      groupRef.current.rotation.y + targetRotY * 0.04,
      0.05
    );

    camera.position.x = Math.sin(state.clock.elapsedTime * 0.28) * (immersive ? 0.4 : 0.2);
  });

  return (
    <>
      <color attach="background" args={["#00000000"]} />
      <fog attach="fog" args={["#07080c", immersive ? 12 : 14, immersive ? 28 : 32]} />
      <ambientLight intensity={0.28} />
      <directionalLight position={[8, 12, 6]} intensity={1.6} castShadow color="#f0eee8" />
      <directionalLight position={[-6, -4, -8]} intensity={0.35} color="#6ee7c5" />
      <pointLight position={[0, 4, 2]} intensity={0.45} color="#6ee7c5" distance={18} />
      <pointLight position={[-4, -2, 4]} intensity={0.25} color="#8a9aaa" distance={14} />

      <group ref={groupRef} scale={immersive ? 1.15 : 1}>
        <ConnectingLines blocks={blocks} progressRef={progressRef} />
        {blocks.map((block, i) => (
          <Block
            key={i}
            index={i}
            total={blocks.length}
            base={block.base as [number, number, number]}
            target={block.target as [number, number, number]}
            progressRef={progressRef}
            accent={accent}
          />
        ))}
      </group>
    </>
  );
}

export default function Scene({
  isExploded = false,
  progressRef,
  immersive = false,
}: {
  isExploded?: boolean;
  progressRef: React.RefObject<number>;
  immersive?: boolean;
}) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (reducedMotion) {
    return (
      <div className="relative flex h-full w-full items-center justify-center bg-background/80 p-8">
        <div className="text-center">
          <div className="mx-auto mb-4 h-24 w-24 border border-primary/25 bg-primary/[0.04]" />
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/35">
            Architecture {isExploded ? "exploded" : "assembled"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Canvas
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, immersive ? 2.2 : 3, immersive ? 10 : 8], fov: immersive ? 42 : 45 }}
      dpr={[1, 1.5]}
      style={{ background: "transparent" }}
    >
      <SceneContent progressRef={progressRef} isExploded={isExploded} immersive={immersive} />
    </Canvas>
  );
}
