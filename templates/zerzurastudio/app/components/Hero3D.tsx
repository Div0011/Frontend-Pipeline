"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, ChromaticAberration, Vignette, ToneMapping } from "@react-three/postprocessing";
import { BlendFunction, ToneMappingMode } from "postprocessing";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  Camera rig: scroll-driven spline path                              */
/* ------------------------------------------------------------------ */

const CAMERA_SPLINE = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, 0, 12),
  new THREE.Vector3(3, 1, 7),
  new THREE.Vector3(5, 2, 3),
  new THREE.Vector3(3, 3, -1),
  new THREE.Vector3(0, 3.5, -4),
  new THREE.Vector3(-3, 3, -7),
  new THREE.Vector3(-1, 2.5, -10),
]);

function CameraRig({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    const t = Math.max(0, Math.min(1, scrollProgress));
    const point = CAMERA_SPLINE.getPoint(t);
    const look = CAMERA_SPLINE.getPoint(Math.min(1, t + 0.08));

    camera.position.lerp(point, 0.08);
    target.lerp(look, 0.08);
    camera.lookAt(target);
  });

  return null;
}

/* ------------------------------------------------------------------ */
/*  Playful scene objects (Resn-inspired)                              */
/* ------------------------------------------------------------------ */

function PlayfulObjects() {
  const groupRef = useRef<THREE.Group>(null);

  const objects = useMemo(() => {
    const items = [];
    const geos = [
      new THREE.TorusKnotGeometry(1, 0.35, 200, 32),
      new THREE.IcosahedronGeometry(1.2, 1),
      new THREE.OctahedronGeometry(1.4, 0),
      new THREE.TorusGeometry(1.8, 0.5, 16, 100),
      new THREE.SphereGeometry(1.3, 32, 32),
      new THREE.TorusKnotGeometry(0.9, 0.3, 128, 16),
      new THREE.ConeGeometry(1.2, 2.5, 6),
      new THREE.DodecahedronGeometry(1.1, 0),
      new THREE.TorusGeometry(1.2, 0.3, 8, 32),
      new THREE.IcosahedronGeometry(0.9, 0),
    ];
    const colors = ["#C9A96E", "#E0C99A", "#FAF6F0", "#D4AF37", "#F5E6C8", "#C9A96E", "#E0C99A", "#FAF6F0", "#D4AF37", "#E0C99A"];

    for (let i = 0; i < 10; i++) {
      const t = i / 9;
      const pos = CAMERA_SPLINE.getPoint(t);
      const offset = new THREE.Vector3(
        (Math.random() - 0.5) * 7,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 6
      );
      items.push({
        position: pos.clone().add(offset),
        geometry: geos[i],
        color: colors[i],
        roughness: 0.1 + Math.random() * 0.25,
        metalness: 0.6 + Math.random() * 0.4,
        emissive: colors[i],
        emissiveIntensity: 0.03 + Math.random() * 0.08,
        scale: 0.5 + Math.random() * 1.6,
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.4,
          y: (Math.random() - 0.5) * 0.4,
          z: (Math.random() - 0.5) * 0.3,
        },
        floatSpeed: 0.3 + Math.random() * 0.7,
        floatAmp: 0.2 + Math.random() * 0.8,
      });
    }
    return items;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    groupRef.current.children.forEach((mesh, i) => {
      if (i < objects.length) {
        mesh.rotation.x += objects[i].rotSpeed.x * 0.012;
        mesh.rotation.y += objects[i].rotSpeed.y * 0.012;
        mesh.rotation.z += objects[i].rotSpeed.z * 0.012;
        mesh.position.y += Math.sin(time * objects[i].floatSpeed + i) * objects[i].floatAmp * 0.005;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {objects.map((obj, i) => (
        <mesh
          key={i}
          geometry={obj.geometry}
          position={obj.position}
          scale={obj.scale}
        >
          <meshStandardMaterial
            color={obj.color}
            roughness={obj.roughness}
            metalness={obj.metalness}
            emissive={obj.emissive}
            emissiveIntensity={obj.emissiveIntensity}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Particle field                                                     */
/* ------------------------------------------------------------------ */

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 1000;

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const t = Math.random();
      const pos = CAMERA_SPLINE.getPoint(t);
      positions[i * 3] = pos.x + (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = pos.y + (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = pos.z + (Math.random() - 0.5) * 10;

      const color = new THREE.Color().setHSL(0.12 + Math.random() * 0.08, 0.5, 0.5 + Math.random() * 0.4);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.012;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.008) * 0.06;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.025}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/*  Wireframe grid floor                                               */
/* ------------------------------------------------------------------ */

function WireframeGrid() {
  const gridRef = useRef<THREE.GridHelper>(null);

  useFrame((state) => {
    if (!gridRef.current) return;
    gridRef.current.position.y = -4;
    gridRef.current.rotation.y = state.clock.elapsedTime * 0.015;
  });

  return (
    <gridHelper
      ref={gridRef}
      args={[50, 50, "#C9A96E", "#1a1a1a"]}
      position={[0, -4, 0]}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                       */
/* ------------------------------------------------------------------ */

export default function Hero3D({ scrollProgress = 0 }: { scrollProgress?: number }) {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 45, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[10, 10, 5]} intensity={2.5} color="#FFFDF7" />
        <directionalLight position={[-10, 5, -5]} intensity={1.8} color="#FFE4C4" />
        <pointLight position={[0, 0, 0]} intensity={2.5} color="#C9A96E" distance={18} />
        <pointLight position={[6, 6, 6]} intensity={1.2} color="#E0C99A" distance={14} />
        <pointLight position={[-6, -4, -6]} intensity={1} color="#D4AF37" distance={12} />
        <pointLight position={[0, 8, 0]} intensity={0.8} color="#FAF6F0" distance={20} />

        <CameraRig scrollProgress={scrollProgress} />
        <PlayfulObjects />
        <ParticleField />
        <WireframeGrid />

        <EffectComposer>
          <Bloom
            luminanceThreshold={0.35}
            luminanceSmoothing={0.9}
            height={400}
            intensity={0.9}
            blendFunction={BlendFunction.SCREEN}
          />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={[0.0006, 0.0006]}
          />
          <Vignette
            blendFunction={BlendFunction.NORMAL}
            offset={0.35}
            darkness={0.55}
          />
          <ToneMapping
            mode={ToneMappingMode.ACES_FILMIC}
            resolution={256}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
