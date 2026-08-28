"use client";

import { useEffect, useRef, useState } from "react";
import ParticleText from "./ParticleText";

type PreloaderProps = {
  onComplete?: () => void;
};

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [phase, setPhase] = useState<"assembling" | "breathing" | "exiting">("assembling");
  const timeoutRef = useRef<number>(0);

  useEffect(() => {
    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (reducedMotion) {
      onComplete?.();
      return;
    }

    timeoutRef.current = window.setTimeout(() => {
      setPhase("breathing");
      timeoutRef.current = window.setTimeout(() => {
        setPhase("exiting");
        timeoutRef.current = window.setTimeout(() => {
          onComplete?.();
        }, 1200);
      }, 2200);
    }, 2600);

    return () => window.clearTimeout(timeoutRef.current);
  }, [onComplete]);

  if (phase === "exiting") {
    return (
      <div className="preloader preloader--exit">
        <ParticleText
          text="AURA"
          particleSize={3.3}
          density={4}
          color="#EF4444"
          highlightColor="#db00e0"
          scatter={190}
          gatherDuration={2100}
          stagger={420}
          pointerRepel={42}
          repelRadius={120}
          idleDrift={0.8}
          trigger="mount"
          fontSize="clamp(3.5rem, 13vw, 9rem)"
          fontWeight={800}
          fontFamily="inherit"
          glow
        />
      </div>
    );
  }

  return (
    <div className={`preloader ${phase === "breathing" ? "preloader--breathe" : ""}`}>
      <div className="preloader__silhouettes">
        {["#EF4444", "#a1a1aa", "#171717"].map((c, i) => (
          <span
            key={c}
            className="preloader__silhouette"
            style={{
              background: c,
              animationDelay: `${i * -4}s`,
            }}
          />
        ))}
      </div>
      <ParticleText
        text="AURA"
        particleSize={3.3}
        density={4}
        color="#EF4444"
        highlightColor="#db00e0"
        scatter={190}
        gatherDuration={2100}
        stagger={420}
        pointerRepel={42}
        repelRadius={120}
        idleDrift={0.8}
        trigger="mount"
        fontSize="clamp(3.5rem, 13vw, 9rem)"
        fontWeight={800}
        fontFamily="inherit"
        glow
      />
    </div>
  );
};

export default Preloader;
