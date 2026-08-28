"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 400);
          }, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 20);

    return () => clearInterval(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#08080a] text-[#f5f5f5] overflow-hidden select-none">
      {/* Dynamic Ambient Glow */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none opacity-20 animate-pulse"
        style={{ backgroundColor: "#EA580C" }}
      />

      {/* Concentric Pulse Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.2, opacity: 0.5 }}
            animate={{
              scale: [0.2, 3.8],
              opacity: [0.5, 0.2, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeOut",
              delay: i * 0.9,
            }}
            className="absolute rounded-full border"
            style={{
              borderColor: "#EA580C",
              width: "300px",
              height: "300px",
            }}
          />
        ))}
      </div>

      {/* Centered Brand Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 max-w-xl px-6 text-center">
        {/* Loading Counter */}
        <div
          className="w-24 h-24 rounded-full bg-[#121214] border flex items-center justify-center relative shadow-2xl"
          style={{ borderColor: "#EA580C40" }}
        >
          <div
            className="absolute inset-0 rounded-full border-2 border-transparent animate-spin"
            style={{ borderTopColor: "#EA580C" }}
          />
          <span className="font-mono text-xl font-bold" style={{ color: "#EA580C" }}>
            {progress}%
          </span>
        </div>

        {/* Brand Identity & Craft Subtitle */}
        <div className="space-y-2">
          <h2 className="type-display text-4xl sm:text-5xl text-white tracking-wider font-extrabold">
            SOUR DUCK MARKET
          </h2>
          <p className="font-mono text-xs uppercase tracking-widest text-stone-400">
            NATURALLY FERMENTED SOURDOUGH BAKE
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-56 h-1 bg-white/10 rounded-full overflow-hidden relative">
          <motion.div
            className="h-full rounded-full"
            style={{ width: `${progress}%`, backgroundColor: "#EA580C" }}
          />
        </div>

        <p className="font-mono text-[10px] uppercase tracking-widest text-stone-500 pt-2">
          SOURDOUGH BAKERY & SMOKEHOUSE · EAST AUSTIN
        </p>
      </div>
    </div>
  );
}
