"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLHeadingElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const totalFrames = 72;
    const interval = setInterval(() => {
      frame++;
      const pct = Math.min(
        100,
        Math.floor((1 - Math.pow(1 - frame / totalFrames, 2.2)) * 100)
      );
      setProgress(pct);

      if (frame >= totalFrames) {
        clearInterval(interval);
        handleComplete();
      }
    }, 22);

    const tl = gsap.timeline({ delay: 0.15 });
    tl.to(brandRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.1,
      ease: "power4.out",
    });
    tl.to(
      lineRef.current,
      { scaleX: 1, opacity: 1, duration: 0.9, ease: "power3.out" },
      "-=0.6"
    );
    tl.to(textRef.current, { opacity: 0.7, duration: 0.5 }, "-=0.4");
    tl.to(percentRef.current, { opacity: 0.55, duration: 0.5 }, "-=0.4");

    return () => clearInterval(interval);
  }, []);

  const handleComplete = () => {
    if (authorRef.current) {
      gsap.to(authorRef.current, { opacity: 0.45, duration: 0.55, delay: 0.15 });
    }
    if (progressFillRef.current) {
      gsap.to(progressFillRef.current, {
        height: "100%",
        duration: 0.35,
        ease: "power2.out",
      });
    }

    setTimeout(() => {
      const tl = gsap.timeline({
        onComplete: () => setDismissed(true),
      });
      tl.to(
        [brandRef.current, textRef.current, percentRef.current, authorRef.current, lineRef.current],
        {
          opacity: 0,
          y: -16,
          duration: 0.55,
          stagger: 0.04,
          ease: "power3.in",
        }
      );
      tl.to(
        containerRef.current,
        {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.95,
          ease: "power4.inOut",
        },
        "-=0.15"
      );
    }, 520);
  };

  if (dismissed) return null;

  return (
    <div
      ref={containerRef}
      className="preloader-container"
      style={{ clipPath: "inset(0 0 0% 0)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 55%, rgba(196,165,116,0.12) 0%, transparent 65%)",
        }}
      />

      <h1 ref={brandRef} className="preloader-brand relative z-10">
        Apex
      </h1>

      <div
        ref={lineRef}
        className="relative z-10 w-16 h-px bg-accent/70 mb-8 origin-center"
        style={{ transform: "scaleX(0)", opacity: 0 }}
      />

      <div className="preloader-progress relative z-10">
        <div
          ref={progressFillRef}
          className="preloader-progress-fill"
          style={{ height: `${progress}%` }}
        />
      </div>

      <div ref={textRef} className="preloader-text relative z-10" style={{ opacity: 0 }}>
        Opening Atelier
      </div>

      <div
        ref={percentRef}
        className="preloader-percentage relative z-10"
        style={{ opacity: 0 }}
      >
        {String(progress).padStart(2, "0")}
      </div>

      <div ref={authorRef} className="preloader-author relative z-10" style={{ opacity: 0 }}>
        Est. 1987 · Institutional Grade
      </div>
    </div>
  );
}
