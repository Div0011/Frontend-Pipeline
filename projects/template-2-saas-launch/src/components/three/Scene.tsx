
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
}

function Block({ index, total, base, target, progressRef }: BlockProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!meshRef.current) return;
    const progress = progressRef.current ?? 0;
    const delay = (index / total) * 0.25;
    const localP = Math.max(0, Math.min(1, (progress - delay) / (1 - delay * 0.5)));
    const easedP = gsap.parseEase("power3.inOut")(localP);

    const curX = THREE.MathUtils.lerp(base[0], target[0], easedP);
    const curY = THREE.MathUtils.lerp(base[1], target[1], easedP);
    const curZ = THREE.MathUtils.lerp(base[2], target[2], easedP);

    meshRef.current.position.set(curX, curY, curZ);
    meshRef.current.rotation.x += easedP * Math.PI * 0.25;
    meshRef.current.rotation.y += easedP * Math.PI * 0.5;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#e8e8ec"
          metalness={0.9}
          roughness={0.08}
          emissive="#00ffb3"
          emissiveIntensity={0.08}
        />
      </mesh>
      <Edges scale={1.01} color="#00ffb3" opacity={0.25} transparent />
    </Float>
  );
}

interface SceneContentProps {
  progressRef: React.RefObject<number>;
  isExploded: boolean;
}

function SceneContent({ progressRef, isExploded }: SceneContentProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mq.matches);
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
      { base: [0, 0, 0], target: [3.5, 2.2, 2.8] },
      { base: [1, 0, 0], target: [-3.2, -1.5, 3.2] },
      { base: [-1, 0, 0], target: [2.8, 3.1, -2.6] },
      { base: [0, 1, 0], target: [-2.5, 2.4, -3.0] },
      { base: [1, 1, 0], target: [3.0, -2.8, -2.4] },
      { base: [-1, 1, 0], target: [-3.4, -2.6, 2.7] },
      { base: [0, 0, 1], target: [1.2, -3.3, 3.4] },
      { base: [1, 0, 1], target: [-1.5, 3.5, -1.2] },
    ],
    []
  );

  useFrame((state) => {
    if (!groupRef.current || isReducedMotion) return;
    const p = progressRef.current ?? 0;

    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 8 + p * 3, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 3 + p * 1.5, 0.05);
    camera.lookAt(0, 0, 0);

    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, p * 1.5, 0.05);
    groupRef.current.rotation.y += 0.0016;

    const targetRotX = mouse.current.y * 0.18;
    const targetRotY = mouse.current.x * 0.18;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.06);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, groupRef.current.rotation.y + targetRotY * 0.05, 0.06);

    camera.position.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.25;
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={2} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      <group ref={groupRef}>
        {blocks.map((block, i) => (
          <Block
            key={i}
            index={i}
            total={blocks.length}
            base={block.base as [number, number, number]}
            target={block.target as [number, number, number]}
            progressRef={progressRef}
          />
        ))}
      </group>
    </>
  );
}

export default function Scene({
  isExploded = false,
  progressRef,
}: {
  isExploded?: boolean;
  progressRef: React.RefObject<number>;
}) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
  }, []);

  if (reducedMotion) {
    return (
      <div className="relative flex h-full w-full items-center justify-center bg-background p-8">
        <div className="font-mono text-xs uppercase tracking-widest text-foreground/30">
          [Architecture {isExploded ? "Exploded" : "Assembled"} View]
        </div>
      </div>
    );
  }

  return (
    <Canvas
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 3, 8], fov: 45 }}
      dpr={[1, 1.5]}
    >
      <SceneContent progressRef={progressRef} isExploded={isExploded} />
    </Canvas>
  );
}
