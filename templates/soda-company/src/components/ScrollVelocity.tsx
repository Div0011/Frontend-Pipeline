"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollVelocityProps {
  texts: string[];
  velocity?: number;
  className?: string;
  numCopies?: number;
  damping?: number;
  stiffness?: number;
}

export default function ScrollVelocity({
  texts = ["AURA SODA CO.", "TRANSMIT FREQUENCY"],
  velocity = 100,
  className = "",
  numCopies = 6,
  damping = 50,
  stiffness = 400,
}: ScrollVelocityProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let xPos1 = 0;
    let xPos2 = 0;
    let currentSpeed = velocity * 0.015;
    let scrollSpeedBoost = 0;
    let animId: number;

    const onScroll = () => {
      // Add boost from scroll velocity
      scrollSpeedBoost = 2.5;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    const animate = () => {
      // Smooth decay for scroll speed boost
      scrollSpeedBoost *= 0.92;
      const effectiveSpeed = currentSpeed + scrollSpeedBoost;

      xPos1 -= effectiveSpeed;
      xPos2 += effectiveSpeed;

      if (track1Ref.current) {
        const width1 = track1Ref.current.scrollWidth / 2;
        if (Math.abs(xPos1) >= width1) xPos1 = 0;
        track1Ref.current.style.transform = `translate3d(${xPos1}px, 0, 0)`;
      }

      if (track2Ref.current) {
        const width2 = track2Ref.current.scrollWidth / 2;
        if (Math.abs(xPos2) >= width2) xPos2 = 0;
        track2Ref.current.style.transform = `translate3d(${-xPos2}px, 0, 0)`;
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", onScroll);
    };
  }, [velocity]);

  const renderItems = (dir: 1 | 2) => {
    return Array.from({ length: numCopies }).map((_, i) => (
      <div key={i} className="flex items-center gap-12 whitespace-nowrap shrink-0">
        {texts.map((text, j) => (
          <span
            key={j}
            className={`font-display text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold uppercase tracking-tight select-none transition-colors duration-500 ${
              dir === 1
                ? "text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.25)] hover:[-webkit-text-stroke:1px_rgba(255,255,255,0.8)] hover:text-white/10"
                : "text-white/15 hover:text-white/40"
            }`}
          >
            {text}
            <span className="inline-block ml-12 text-sm font-mono text-white/30 tracking-widest align-middle">
              //
            </span>
          </span>
        ))}
      </div>
    ));
  };

  return (
    <div ref={containerRef} className={`w-full overflow-hidden py-10 space-y-6 pointer-events-none ${className}`}>
      {/* Track 1: Moving Left */}
      <div className="flex w-fit overflow-hidden" ref={track1Ref}>
        {renderItems(1)}
        {renderItems(1)}
      </div>

      {/* Track 2: Moving Right */}
      <div className="flex w-fit overflow-hidden" ref={track2Ref}>
        {renderItems(2)}
        {renderItems(2)}
      </div>
    </div>
  );
}
