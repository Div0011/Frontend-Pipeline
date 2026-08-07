"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLHeadingElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate loading progress
    let frame = 0;
    const totalFrames = 60;
    const interval = setInterval(() => {
      frame++;
      // Logarithmic easing for natural feel
      const pct = Math.min(100, Math.floor((1 - Math.pow(1 - frame / totalFrames, 2)) * 100));
      setProgress(pct);

      if (frame >= totalFrames) {
        clearInterval(interval);
        handleComplete();
      }
    }, 25);

    // Entrance animations
    const tl = gsap.timeline({ delay: 0.2 });
    tl.to(brandRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
    tl.to(textRef.current, { opacity: 0.8, duration: 0.5 }, "-=0.3");
    tl.to(percentRef.current, { opacity: 0.6, duration: 0.5 }, "-=0.3");

    return () => clearInterval(interval);
  }, []);

  const handleComplete = () => {
    // Show author line
    if (authorRef.current) {
      gsap.to(authorRef.current, { opacity: 0.5, duration: 0.6, delay: 0.2 });
    }

    // Fill progress bar completely then dismiss
    if (progressFillRef.current) {
      gsap.to(progressFillRef.current, { height: "100%", duration: 0.4, ease: "power2.out" });
    }

    setTimeout(() => {
      setIsComplete(true);

      // Animate out
      gsap.to(containerRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: "power3.inOut",
        onComplete: () => {
          if (containerRef.current) {
            containerRef.current.style.display = "none";
          }
        },
      });
    }, 600);
  };

  if (isComplete) return null;

  return (
    <div ref={containerRef} className="preloader-container">
      {/* Vertical progress bar */}
      <div className="preloader-progress">
        <div ref={progressFillRef} className="preloader-progress-fill" style={{ height: `${progress}%` }} />
      </div>

      {/* Brand name */}
      <h1 ref={brandRef} className="preloader-brand">
        Apex
      </h1>

      {/* Loading text */}
      <div ref={textRef} className="preloader-text" style={{ opacity: 0 }}>
        Loading Editorial
      </div>

      {/* Percentage */}
      <div ref={percentRef} className="preloader-percentage" style={{ opacity: 0 }}>
        {progress}%
      </div>

      {/* Author credit */}
      <div ref={authorRef} className="preloader-author" style={{ opacity: 0 }}>
        Est. 1987 · Institutional Grade
      </div>
    </div>
  );
}

