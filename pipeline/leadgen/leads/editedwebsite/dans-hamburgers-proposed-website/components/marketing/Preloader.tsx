"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

interface AssetItem {
  src: string;
}

// Key assets needed for a clean first load
const CRITICAL_ASSETS: AssetItem[] = [
  { src: "/hero-burger.png" },
  { src: "/truffle-fries.png" },
  { src: "/matcha-special.png" },
  { src: "/old-monk-mousse.png" },
];

function generateFrames(prefix: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) =>
    `/frames/${prefix}/frame_${String(i).padStart(6, "0")}.webp`
  );
}

const BURGER_FRAMES = generateFrames("burger", 248);
const SMOOTHIE_FRAMES = generateFrames("smoothie", 248);

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const loadAsset = useCallback((src: string): Promise<void> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => resolve();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    let cancelled = false;
    const assetsToLoad: string[] = [];

    // Push critical structural assets
    CRITICAL_ASSETS.forEach((asset) => assetsToLoad.push(asset.src));
    
    // Load the first 30 frames of both sequences eagerly so that the hero scrubbers
    // look perfect the instant the user begins to scroll.
    for (let i = 0; i < 30; i++) {
      assetsToLoad.push(BURGER_FRAMES[i]);
      assetsToLoad.push(SMOOTHIE_FRAMES[i]);
    }

    let completed = 0;
    const total = assetsToLoad.length;

    const updateProgress = () => {
      completed++;
      if (cancelled) return;
      setProgress(Math.min(completed / total, 1));
    };

    const loadAll = async () => {
      const promises = assetsToLoad.map((src) =>
        loadAsset(src).then(updateProgress)
      );
      await Promise.all(promises);
    };

    loadAll().then(() => {
      if (cancelled) return;
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(onComplete, 600);
      }, 400);
    });

    return () => {
      cancelled = true;
    };
  }, [onComplete, loadAsset]);

  if (!isVisible) return null;

  const displayProgress = Math.round(progress * 100);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-char overflow-hidden select-none">
      {/* ── Continuous Zooming Out Concentric Rings ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.1, opacity: 0.6 }}
            animate={{
              scale: [0.1, 4.5],
              opacity: [0.6, 0.4, 0.15, 0],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeOut",
              delay: i * 0.9,
            }}
            className={`absolute rounded-full border-4 ${
              i % 2 === 0 ? "border-ember" : "border-yolk/50"
            }`}
            style={{
              width: "350px",
              height: "350px",
              boxShadow: "0 0 40px rgba(0, 0, 0, 0.3)",
            }}
          />
        ))}
      </div>

      {/* ── Centered Content ── */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        
        {/* Loading percentage with circular frame */}
        <div className="w-24 h-24 rounded-full bg-char-soft border-2 border-ember/50 flex items-center justify-center relative shadow-2xl">
          {/* Spinning loader ring */}
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-ember animate-spin" />
          
          <span className="type-display text-2xl text-yolk font-bold">
            {displayProgress}%
          </span>
        </div>

        {/* Brand label & Status text */}
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="type-display text-4xl sm:text-5xl text-ink leading-none tracking-wider">
            DAN&apos;S HAMBURGERS
          </h2>
          
          <div className="w-40 h-1 bg-char-mute relative overflow-hidden rounded-full">
            <div
              className="absolute inset-y-0 left-0 bg-ember transition-all duration-300 rounded-full"
              style={{ width: `${displayProgress}%` }}
            />
          </div>
          
          <p className="type-caption text-stone text-[9px] tracking-widest uppercase">
            AUSTIN, TEXAS · EST. 1973 · MADE TO ORDER
          </p>
        </div>

      </div>
    </div>
  );
}
