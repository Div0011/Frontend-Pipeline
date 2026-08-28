"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, DepthOfField, ChromaticAberration, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

export interface PostEffectsProps {
  scrollProgress?: number;
  section?: string;
}

export default function PostEffects({ scrollProgress = 0, section = "hero" }: PostEffectsProps) {
  const { size } = useThree();
  const dofRef = useRef<any>(null);
  const bloomRef = useRef<any>(null);

  const isMobile = useMemo(() => size.width < 768, [size.width]);

  useFrame(() => {
    if (!dofRef.current) return;
    const bokeh = section === "features" ? 3 : section === "cta" ? 1 : 0;
    dofRef.current.bokehScale = bokeh;
    dofRef.current.focusDistance = 0.02;
  });

  if (isMobile) {
    return (
      <EffectComposer>
        <Bloom blendFunction={BlendFunction.SCREEN} intensity={0.6} luminanceThreshold={0.2} />
        <Vignette offset={0.3} darkness={0.6} />
      </EffectComposer>
    );
  }

  return (
    <EffectComposer>
      <Bloom ref={bloomRef} blendFunction={BlendFunction.ADD} intensity={0.8} luminanceThreshold={0.15} />
      <DepthOfField ref={dofRef} focusDistance={0.02} bokehScale={0} focalLength={0.05} />
      <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={[scrollProgress * 0.02, 0]} />
      <Vignette offset={0.25} darkness={section === "cta" ? 0.7 : 0.4} />
    </EffectComposer>
  );
}
