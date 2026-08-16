"use client";

import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import SodaCan from "./SodaCan";
import CameraController from "./CameraController";
import Lighting from "./Lighting";

export default function PersistentScene() {
  const [dpr, setDpr] = useState<[number, number]>([1, 1.5]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDpr(window.innerWidth < 768 ? [1, 1] : [1, 1.5]);
    }
  }, []);
  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none scene-container"
      style={{ zIndex: 20 }}
      aria-hidden="true"
    >
      <Canvas
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.3,
        }}
        dpr={dpr}
        eventSource={typeof document !== 'undefined' ? document.body : undefined}
        className="w-full h-full"
        style={{ pointerEvents: "none" }}
        performance={{ min: 0.5 }}
      >
        <CameraController />
        <Lighting />

        <Suspense fallback={null}>
          <group position={[0, 0, 0]}>
            <SodaCan slug="classic" phaseOffset={0} />
            <SodaCan slug="diet" phaseOffset={2.1} />
            <SodaCan slug="cool" phaseOffset={4.2} />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
