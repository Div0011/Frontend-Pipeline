"use client";

import { useRef, useState, useMemo, useLayoutEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Environment, Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAdaptiveTheme } from "@/components/AdaptiveThemeProvider";
import Particles from "@/components/three/Particles/Particles";
import ScrollManager from "@/components/three/ScrollManager/ScrollManager";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useMouseTilt } from "@/hooks/useMouseTilt";
import { useGLTF } from "@react-three/drei";
import PathFollower from "@/components/three/PathFollower";

gsap.registerPlugin(ScrollTrigger);

const MODELS = {
  red: "/models/soda-can.glb",
  silver: "/models/diet_soda.glb",
  black: "/models/cool-ayyd_soda_can.glb",
};

function PreloadModels() {
  useGLTF.preload(MODELS.red);
  useGLTF.preload(MODELS.silver);
  useGLTF.preload(MODELS.black);
  return null;
}

function SceneContent() {
  const scrollProgress = useScrollProgress();
  const { theme } = useAdaptiveTheme();
  const tilt = useMouseTilt(0.04);

  const modelColor = useMemo(() => {
    if (scrollProgress < 0.33) return "#E63946";
    if (scrollProgress < 0.66) return "#CDCDCD";
    return "#1D1D1D";
  }, [scrollProgress]);

  const modelPath = useMemo(() => {
    if (scrollProgress < 0.33) return MODELS.red;
    if (scrollProgress < 0.66) return MODELS.silver;
    return MODELS.black;
  }, [scrollProgress]);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} near={0.1} far={50} />
      <Environment preset="city" />
      <Particles count={120} scrollVelocity={Math.abs(scrollProgress - 0.5) * 2} />

      <Suspense fallback={null}>
        <Float speed={1.4} rotationIntensity={0.1} floatIntensity={0.15} floatingRange={[-0.05, 0.05]}>
          <PathFollower modelPath={modelPath} color={modelColor} />
        </Float>
        <ContactShadows position={[0, -2, 0]} opacity={0.35} blur={2.5} far={4} color="#000" />
      </Suspense>
    </>
  );
}

export default function CinematicScene({ onSectionChange }: { onSectionChange?: (section: string) => void }) {
  const [section, setSection] = useState("hero");
  const { theme } = useAdaptiveTheme();

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
        onCreated={({ scene }) => {
          scene.fog = new THREE.FogExp2("#050506", 0.06);
        }}
      >
        <SceneContent />
      </Canvas>
      <PreloadModels />
      <ScrollManager onSectionChange={(s) => {
        setSection(s);
        if (onSectionChange) onSectionChange(s);
      }} />
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-out"
        aria-hidden="true"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 50% 45%, transparent 25%, ${theme.ambient}66 100%)`,
        }}
      />
    </div>
  );
}
