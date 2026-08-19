'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './useReducedMotion';

interface ColorStop {
  color: string;
  pos: number;
}

interface ScrollColorMorphProps {
  stops: ColorStop[];
}

export const ScrollColorMorph: React.FC<ScrollColorMorphProps> = ({ stops }) => {
  const morphRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    const ctx = morphRef.current;
    if (!ctx) return;

    const endPos = (window.innerHeight) * (stops.length - 1);
    const steps = stops.map((s) => s.color);

    const st = ScrollTrigger.create({
      start: 'top top',
      end: `top -${endPos}px`,
      scrub: 0.6,
      onUpdate: (self) => {
        const progress = self.progress;
        const segment = Math.floor(progress * (stops.length - 1));
        const segmentProgress = (progress * (stops.length - 1)) - segment;
        const clampedSeg = Math.min(segment, stops.length - 2);
        const c1 = stops[clampedSeg]?.color || steps[0];
        const c2 = stops[clampedSeg + 1]?.color || steps[steps.length - 1];

        let r1 = parseInt(c1.slice(1, 3), 16);
        let g1 = parseInt(c1.slice(3, 5), 16);
        let b1 = parseInt(c1.slice(5, 7), 16);
        let r2 = parseInt(c2.slice(1, 3), 16);
        let g2 = parseInt(c2.slice(3, 5), 16);
        let b2 = parseInt(c2.slice(5, 7), 16);

        const r = Math.round(r1 + (r2 - r1) * segmentProgress).toString(16).padStart(2, '0');
        const g = Math.round(g1 + (g2 - g1) * segmentProgress).toString(16).padStart(2, '0');
        const b = Math.round(b1 + (b2 - b1) * segmentProgress).toString(16).padStart(2, '0');

        ctx.style.backgroundColor = `#${r}${g}${b}`;
      },
    });

    return () => st.kill();
  }, [stops, prefersReduced]);

  if (stops.length === 0) return null;

  return (
    <div
      ref={morphRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        transition: 'background-color 0.2s ease',
      }}
    />
  );
};
