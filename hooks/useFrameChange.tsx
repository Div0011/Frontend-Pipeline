"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useFrameChange(
  ref: React.RefObject<HTMLElement | null>,
  frames: string[],
  options: { start?: number; end?: number } = {}
) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const { start = 0, end = 100 } = options;

  useEffect(() => {
    if (!ref.current || frames.length === 0) return;

    const ctx = gsap.context(() => {
      frames.forEach((_, i) => {
        ScrollTrigger.create({
          trigger: ref.current,
          start: `top ${start}%`,
          end: `top ${end}%`,
          onEnter: () => setCurrentFrame(i),
          onEnterBack: () => setCurrentFrame(i),
        });
      });
    }, ref);

    return () => ctx.revert();
  }, [ref, frames, start, end]);

  return currentFrame;
}

export function FrameSequence({
  frames,
  className = "",
  renderFrame,
}: {
  frames: string[];
  className?: string;
  renderFrame: (frame: string, index: number) => React.ReactNode;
}) {
  const containerRef = useRef<HTMLElement>(null);
  const current = useFrameChange(containerRef, frames);

  return (
    <section ref={containerRef} className={`relative ${className}`}>
      {renderFrame(frames[current] || frames[0], current)}
    </section>
  );
}
