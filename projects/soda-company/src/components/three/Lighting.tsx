"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSceneStore } from "@/stores/sceneStore";
import { THEME_PALETTES } from "@/lib/adaptive-theme";

export default function Lighting() {
  const keyLightRef = useRef<THREE.DirectionalLight>(null);
  const fillLightRef = useRef<THREE.DirectionalLight>(null);
  const rimLightRef = useRef<THREE.SpotLight>(null);
  const activeProduct = useSceneStore((s) => s.activeProduct);

  const theme = activeProduct ? THEME_PALETTES[activeProduct] : THEME_PALETTES.default;


  return (
    <>
      {/* Studio hemisphere light providing rich environment sheen */}
      <hemisphereLight
        args={[theme.lightA, theme.ambient, 1.6]}
      />
      <ambientLight intensity={1.2} />

      {/* Main Key Light for specular reflections */}
      <directionalLight
        position={[4, 6, 6]}
        intensity={2.8}
        color="#ffffff"
      />

      {/* Front Light for metallic label clarity */}
      <directionalLight
        position={[0, 1, 5]}
        intensity={1.6}
        color="#ffffff"
      />

      {/* Dynamic Fill Light responding to active theme */}
      <directionalLight
        position={[-5, 2, 4]}
        intensity={1.8}
        color={theme.lightA}
      />

      {/* Warm / Vibrant Rim Backlight for can silhouette definition */}
      <spotLight
        position={[0, 6, -5]}
        intensity={3.2}
        angle={0.6}
        penumbra={0.8}
        color={theme.lightB}
      />

      {/* Under-can reflective floor bounce */}
      <pointLight position={[0, -2.5, 2]} intensity={1.2} color={theme.accentColor} />
    </>
  );
}
