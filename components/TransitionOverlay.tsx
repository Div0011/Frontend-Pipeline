"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

// Extend window interface for global trigger access
declare global {
  interface Window {
    triggerScreenTransition?: (onMidpoint: () => void) => void;
  }
}

export default function TransitionOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const whiteFlashRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    window.triggerScreenTransition = (onMidpoint: () => void) => {
      if (isActive) return;
      setIsActive(true);

      const tl = gsap.timeline({
        onComplete: () => {
          setIsActive(false);
        },
      });

      // 1. Reset overlays
      gsap.set(circleRef.current, { scale: 0, opacity: 1 });
      gsap.set(whiteFlashRef.current, { opacity: 0 });

      // 2. Yellow circle expands rapidly (up to 25x scale to cover full viewport)
      tl.to(circleRef.current, {
        scale: 25,
        duration: 0.65,
        ease: "power3.in",
      });

      // 3. Smooth transition to solid white flash
      tl.to(
        whiteFlashRef.current,
        {
          opacity: 1,
          duration: 0.25,
          ease: "power2.out",
          onComplete: () => {
            // Execute the scroll or redirect at the peak of the transition
            onMidpoint();
          },
        },
        "-=0.15"
      );

      // 4. Fade everything out cleanly
      tl.to([circleRef.current, whiteFlashRef.current], {
        opacity: 0,
        duration: 0.45,
        ease: "power2.inOut",
        onComplete: () => {
          // Reset circle scale
          gsap.set(circleRef.current, { scale: 0, opacity: 1 });
          gsap.set(whiteFlashRef.current, { opacity: 0 });
        },
      });
    };
  }, [isActive]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[9999] flex items-center justify-center ${
        isActive ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* Expanding Yellow Circle */}
      <div
        ref={circleRef}
        className="w-16 h-16 rounded-full bg-brand-yellow scale-0 origin-center absolute z-[9999]"
      />

      {/* Solid White Flash Overlay */}
      <div
        ref={whiteFlashRef}
        className="absolute inset-0 bg-white opacity-0 z-[10000]"
      />
    </div>
  );
}
