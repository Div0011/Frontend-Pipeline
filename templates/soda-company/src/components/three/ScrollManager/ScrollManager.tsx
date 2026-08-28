"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

export interface ScrollManagerProps {
  onSectionChange?: (section: string) => void;
  onProgress?: (progress: number) => void;
}

export default function ScrollManager({ onSectionChange, onProgress }: ScrollManagerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          onProgress?.(progress);

          let section = "hero";
          if (progress >= 0.75) section = "cta";
          else if (progress >= 0.5) section = "features";
          else if (progress >= 0.25) section = "story";
          onSectionChange?.(section);
        },
      });
    }, container);

    return () => ctx.revert();
  }, [onSectionChange, onProgress]);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0" aria-hidden="true" />;
}
