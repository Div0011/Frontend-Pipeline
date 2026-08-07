"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const loaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const brandName = "AETHERIA";
    let currentIndex = 0;
    const typeInterval = setInterval(() => {
      if (textRef.current && currentIndex <= brandName.length) {
        textRef.current.textContent = brandName.slice(0, currentIndex);
        currentIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, 150);

    const loadInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(loadInterval);
          gsap.to(loaderRef.current, {
            opacity: 0,
            duration: 1,
            ease: "power2.inOut",
            onComplete,
          });
          return 100;
        }
        return prev + Math.random() * 12;
      });
    }, 180);

    return () => {
      clearInterval(loadInterval);
      clearInterval(typeInterval);
    };
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 bg-[#0a0a0a] flex flex-col items-center justify-center z-[10000]"
    >
      <div
        ref={textRef}
        className="font-display text-[clamp(2rem,6vw,4rem)] text-amber tracking-[0.2em] mb-8"
      />
      <div className="w-48 h-[2px] bg-[#1a1a1a]">
        <div
          className="h-full bg-amber transition-all duration-300"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      <div className="mt-4 text-[0.75rem] text-white/30 tracking-widest font-mono">
        {Math.round(Math.min(progress, 100))}%
      </div>
    </div>
  );
}
