"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom, ChromaticAberration, Vignette, Noise } from "@react-three/postprocessing";
import { Vector2 } from "three";
import type { Mood } from "./CameraRig";

// Mood preset table — per Phase 2 spec
const MOOD_PRESETS: Record<Mood, {
  bloom: number;
  luminanceThreshold: number;
  luminanceSmoothing: number;
  chromaticOffset: number;
  vignetteDarkness: number;
}> = {
  arrival: {
    bloom: 0.6, luminanceThreshold: 0.85, luminanceSmoothing: 0.9,
    chromaticOffset: 0.008, vignetteDarkness: 0.6,
  },
  consultation: {
    bloom: 0.85, luminanceThreshold: 0.4, luminanceSmoothing: 0.5,
    chromaticOffset: 0.003, vignetteDarkness: 0.2,
  },
  transformation: {
    bloom: 0.8, luminanceThreshold: 0.5, luminanceSmoothing: 0.6,
    chromaticOffset: 0.008, vignetteDarkness: 0.7,
  },
  reveal: {
    bloom: 0.85, luminanceThreshold: 0.4, luminanceSmoothing: 0.5,
    chromaticOffset: 0.003, vignetteDarkness: 0.2,
  },
  departure: {
    bloom: 0.7, luminanceThreshold: 1.0, luminanceSmoothing: 1.0,
    chromaticOffset: 0.003, vignetteDarkness: 0.3,
  },
};

interface PostProcessingStackProps {
  mood?: Mood;
}

export function PostProcessingStack({ mood = "arrival" }: PostProcessingStackProps) {
  const bloomRef = useRef<any>(null);
  const chromaticRef = useRef<any>(null);
  const vignetteRef = useRef<any>(null);

  // Lerp between mood presets for smooth transitions
  const currentBloom = useRef(MOOD_PRESETS.arrival.bloom);
  const currentChromatic = useRef(MOOD_PRESETS.arrival.chromaticOffset);
  const currentVignette = useRef(MOOD_PRESETS.arrival.vignetteDarkness);
  const currentLumThresh = useRef(MOOD_PRESETS.arrival.luminanceThreshold);

  useFrame(() => {
    const target = MOOD_PRESETS[mood];
    const lerpFactor = 0.03; // slow, atmospheric interpolation

    currentBloom.current += (target.bloom - currentBloom.current) * lerpFactor;
    currentChromatic.current += (target.chromaticOffset - currentChromatic.current) * lerpFactor;
    currentVignette.current += (target.vignetteDarkness - currentVignette.current) * lerpFactor;
    currentLumThresh.current += (target.luminanceThreshold - currentLumThresh.current) * lerpFactor;

    if (bloomRef.current) {
      bloomRef.current.intensity = currentBloom.current;
      bloomRef.current.luminanceThreshold = currentLumThresh.current;
    }
    if (chromaticRef.current) {
      const v = currentChromatic.current;
      chromaticRef.current.offset.set(v, v);
    }
    if (vignetteRef.current) {
      vignetteRef.current.darkness = currentVignette.current;
    }
  });

  return (
    <EffectComposer>
      <Bloom
        ref={bloomRef}
        intensity={currentBloom.current}
        luminanceThreshold={currentLumThresh.current}
        luminanceSmoothing={0.9}
        height={300}
      />
      <ChromaticAberration
        ref={chromaticRef}
        offset={new Vector2(currentChromatic.current, currentChromatic.current)}
        radialModulation={false}
        modulationOffset={0}
      />
      <Vignette
        ref={vignetteRef}
        offset={0.5}
        darkness={currentVignette.current}
      />
      <Noise opacity={0.04} />
    </EffectComposer>
  );
}
