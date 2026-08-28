"use client";

import { Bloom, DepthOfField, EffectComposer, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

export default function PostEffects() {
  return (
    <EffectComposer multisampling={0}>
      <DepthOfField
        focusDistance={0.015} // Tuned for hero Z: 1.5
        focalLength={0.05}
        bokehScale={6}
      />
      <Bloom
        intensity={0.4}
        luminanceThreshold={0.5}
        luminanceSmoothing={0.4}
        mipmapBlur
      />
      <Vignette eskil={false} offset={0.1} darkness={1.1} />
    </EffectComposer>
  );
}
