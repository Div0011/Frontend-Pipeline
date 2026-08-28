"use client";

import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useSceneStore } from "@/stores/sceneStore";
import { ProductSlug, MODEL_PATHS } from "@/config/sceneConfig";

interface SodaCanProps {
  slug: ProductSlug;
  phaseOffset?: number;
  isIsolated?: boolean;
}

const TARGET_HEIGHT = 2.4;

export default function SodaCan({ slug, phaseOffset = 0, isIsolated = false }: SodaCanProps) {
  const groupRef = useRef<THREE.Group>(null);
  const path = MODEL_PATHS[slug];
  const { scene } = useGLTF(path, '/draco/');

  const [hovered, setHovered] = useState(false);

  const copiedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return clone;
  }, [scene]);

  const { scaleFactor, unscaledCenter } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(copiedScene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const maxDim = Math.max(size.x, size.y, size.z);
    const s = maxDim > 0 ? TARGET_HEIGHT / maxDim : 1;

    return {
      scaleFactor: s,
      unscaledCenter: [-center.x, -center.y, -center.z] as [number, number, number],
    };
  }, [copiedScene]);

  const initialTarget = isIsolated
    ? { position: [0, 0, 0] as [number, number, number], rotation: [0, 0, 0] as [number, number, number], scale: 1.05 }
    : useSceneStore.getState().getCanTarget(slug);

  const currentPos = useRef(new THREE.Vector3(...initialTarget.position));
  const currentRot = useRef(new THREE.Euler(...initialTarget.rotation));
  const currentScale = useRef(initialTarget.scale);
  const continuousSpinY = useRef(0);
  const prevPos = useRef(new THREE.Vector3(...initialTarget.position));
  // Reusable scratch Vector3 to avoid per-frame GC allocations
  const _targetVec = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const storeState = useSceneStore.getState();
    const target = isIsolated
      ? { position: [0, 0, 0] as [number, number, number], rotation: [0, 0, 0] as [number, number, number], scale: 1.05 }
      : storeState.getCanTarget(slug);
    const prefersReducedMotion = storeState.prefersReducedMotion;

    const time = state.clock.getElapsedTime();
    const speed = prefersReducedMotion ? 6 : 3.6;
    const t = 1 - Math.exp(-speed * delta);

    if (!prefersReducedMotion) {
      continuousSpinY.current += delta * 0.42;
    }

    _targetVec.current.set(...target.position);
    const targetScaleVal = target.scale * (hovered ? 1.07 : 1.0);

    const dx = _targetVec.current.x - currentPos.current.x;
    const dz = _targetVec.current.z - currentPos.current.z;
    const bankingZ = prefersReducedMotion ? 0 : -dx * 0.08;
    const pitchX = prefersReducedMotion ? 0 : dz * 0.06;

    currentPos.current.lerp(_targetVec.current, t);
    currentRot.current.x = THREE.MathUtils.lerp(currentRot.current.x, target.rotation[0] + pitchX, t);
    currentRot.current.y = THREE.MathUtils.lerp(currentRot.current.y, target.rotation[1], t);
    currentRot.current.z = THREE.MathUtils.lerp(currentRot.current.z, target.rotation[2] + bankingZ, t);
    currentScale.current = THREE.MathUtils.lerp(currentScale.current, targetScaleVal, t);

    const floatY = prefersReducedMotion
      ? 0
      : Math.sin(time * 1.35 + phaseOffset) * 0.065 +
        Math.sin(time * 2.7 + phaseOffset) * 0.018;

    const floatRotZ = prefersReducedMotion
      ? 0
      : Math.cos(time * 0.85 + phaseOffset) * 0.035 +
        Math.sin(time * 1.7 + phaseOffset) * 0.012;

    const floatRotX = prefersReducedMotion
      ? 0
      : Math.sin(time * 0.65 + phaseOffset) * 0.025;

    const driftX = prefersReducedMotion ? 0 : dx * 0.15;
    const driftZ = prefersReducedMotion ? 0 : dz * 0.15;

    groupRef.current.position.set(
      currentPos.current.x + driftX,
      currentPos.current.y + floatY,
      currentPos.current.z + driftZ
    );

    groupRef.current.rotation.set(
      currentRot.current.x + floatRotX,
      currentRot.current.y + continuousSpinY.current,
      currentRot.current.z + floatRotZ
    );

    groupRef.current.scale.setScalar(Math.max(0.0001, currentScale.current));
    prevPos.current.copy(currentPos.current);
  });

  return (
    <group
      ref={groupRef}
      dispose={null}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        if (typeof document !== "undefined") {
          document.body.style.cursor = "pointer";
        }
      }}
      onPointerOut={() => {
        setHovered(false);
        if (typeof document !== "undefined") {
          document.body.style.cursor = "auto";
        }
      }}
      onClick={(e) => {
        e.stopPropagation();
        const store = useSceneStore.getState();
        if (store.activeProduct === slug) {
          store.setActiveProduct(null);
        } else {
          store.setActiveProduct(slug);
        }
      }}
    >
      <group scale={scaleFactor}>
        <primitive object={copiedScene} position={unscaledCenter} />
      </group>
    </group>
  );
}

useGLTF.preload(MODEL_PATHS.classic, '/draco/');
useGLTF.preload(MODEL_PATHS.diet, '/draco/');
useGLTF.preload(MODEL_PATHS.cool, '/draco/');
