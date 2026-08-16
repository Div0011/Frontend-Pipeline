"use client";

import { useRef, useState, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";
import { MODEL_PATHS, ProductSlug } from "@/config/sceneConfig";

interface ProductModelViewerProps {
  slug: ProductSlug;
}

function CanModel({ slug }: { slug: ProductSlug }) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(MODEL_PATHS[slug], '/draco/');
  const [hovered, setHovered] = useState(false);

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return clone;
  }, [scene]);

  const { scaleFactor, offset } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(clonedScene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const rawHeight = size.y > 0 ? size.y : 1;
    const scale = 2.4 / rawHeight;
    const off: [number, number, number] = [
      -center.x * scale,
      -center.y * scale,
      -center.z * scale,
    ];
    return { scaleFactor: scale, offset: off };
  }, [clonedScene]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    const targetRotY = hovered ? time * 1.5 : time * 0.35;
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.05;
    if (!hovered) {
      groupRef.current.rotation.y = time * 0.35;
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <group position={offset} scale={scaleFactor}>
        <primitive object={clonedScene} />
      </group>
    </group>
  );
}

export default function ProductModelViewer({ slug }: ProductModelViewerProps) {
  return (
    <div className="relative w-full aspect-square max-w-lg mx-auto">
      <Canvas
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 4.5], fov: 42 }}
      >
        <ambientLight intensity={1.8} />
        <hemisphereLight args={["#ffffff", "#221133", 1.5]} />
        <directionalLight position={[4, 5, 6]} intensity={2.8} />
        <directionalLight position={[-5, 2, 4]} intensity={1.5} color="#4CC9F0" />
        <spotLight position={[0, 6, -5]} intensity={2.5} angle={0.5} penumbra={0.8} />
        <pointLight position={[0, -2, 2]} intensity={1.0} />
        <Suspense fallback={null}>
          <CanModel slug={slug} />
        </Suspense>
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.8}
          autoRotate
          autoRotateSpeed={1.5}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL_PATHS.classic, '/draco/');
useGLTF.preload(MODEL_PATHS.diet, '/draco/');
useGLTF.preload(MODEL_PATHS.cool, '/draco/');
