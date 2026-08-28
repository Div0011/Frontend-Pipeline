"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [displayText, setDisplayText] = useState("AURA");
  const loaderRef = useRef<HTMLDivElement>(null);
  const targetText = "AURA";

  useEffect(() => {
    // Progress increment simulation
    const loadInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(loadInterval);
          setReady(true);
          return 100;
        }
        return prev + (Math.random() * 8 + 2);
      });
    }, 150);

    return () => clearInterval(loadInterval);
  }, []);

  useEffect(() => {
    // Scramble text effect while loading
    if (ready) {
      setDisplayText(targetText);
      return;
    }

    const scrambleInterval = setInterval(() => {
      const scrambled = targetText
        .split("")
        .map((char, index) => {
          if (progress > (index / targetText.length) * 100 + 20) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");
      setDisplayText(scrambled);
    }, 50);

    return () => clearInterval(scrambleInterval);
  }, [progress, ready, targetText]);

  const handleEnter = () => {
    if (!loaderRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.to(loaderRef.current, {
        opacity: 0,
        duration: 1.2,
        ease: "power2.inOut",
        onComplete: () => {
          onComplete();
        },
      });
    });
    
    return () => ctx.revert();
  };

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 bg-[#050506] flex flex-col items-center justify-center z-[10000] bg-noise"
    >
      <div className="flex flex-col items-center gap-12">
        <div
          className="font-display text-[clamp(3rem,8vw,6rem)] text-gradient-brand font-bold tracking-[0.3em] font-mono w-48 text-center"
        >
          {displayText}
        </div>

        {!ready ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-64 h-[1px] bg-white/10 relative overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-brand shadow-[0_0_15px_rgba(255,138,0,0.5)] transition-all duration-300 ease-out"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <div className="text-[0.65rem] text-white/40 tracking-[0.4em] font-mono uppercase">
              Initializing {Math.round(Math.min(progress, 100))}%
            </div>
          </div>
        ) : (
          <button
            onClick={handleEnter}
            className="group relative px-12 py-4 border border-white/20 rounded-full hover:border-white/50 transition-colors duration-500 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <span className="relative z-10 font-mono text-[0.7rem] uppercase tracking-[0.4em] text-white/70 group-hover:text-white transition-colors">
              Enter Experience
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
