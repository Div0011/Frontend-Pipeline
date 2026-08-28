"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MandalaIcon } from "./JaaliOverlay";

export default function RoyalPreloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let start = 0;
    const interval = setInterval(() => {
      start += Math.floor(Math.random() * 8) + 4;
      if (start >= 100) {
        start = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsFinished(true);
          setTimeout(onComplete, 900);
        }, 300);
      }
      setProgress(start);
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-between p-8 bg-[#160306] text-[#faf0ca] pointer-events-none"
        >
          {/* Top Royal Crest Tag */}
          <div className="flex items-center gap-3 pt-6">
            <span className="w-8 h-px bg-[#f5d061]/40" />
            <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#f5d061]">
              RAAJMAHAL PALACE & RESORT · JAIPUR
            </span>
            <span className="w-8 h-px bg-[#f5d061]/40" />
          </div>

          {/* Center Mandala Spinner & Counter */}
          <div className="flex flex-col items-center text-center my-auto space-y-6">
            <div className="relative flex items-center justify-center">
              <MandalaIcon className="w-16 h-16 text-[#f5d061] animate-spin-slow opacity-90" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="w-2 h-2 rotate-45 bg-[#f5d061]" />
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl md:text-3xl text-[#f5d061] tracking-[0.2em] uppercase">
                RAAJMAHAL
              </h2>
              <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-[#faf0ca]/50 mt-1">
                ILLUMINATING ROYAL SANCTUARY
              </p>
            </div>

            {/* Percentage Counter */}
            <div className="font-display text-5xl md:text-7xl font-bold text-[#f5d061] tracking-tight gold-glow">
              {progress.toString().padStart(3, "0")}%
            </div>

            {/* Progress Line */}
            <div className="w-48 md:w-64 h-0.5 bg-[#20060a] relative overflow-hidden border border-[#f5d061]/20">
              <motion.div
                className="h-full bg-gradient-to-r from-[#e5b842] via-[#f5d061] to-[#ffdf7a]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Bottom Heritage Tag */}
          <div className="flex items-center justify-between w-full max-w-5xl font-mono text-[9px] uppercase tracking-[0.3em] text-[#f5d061]/60 pb-4">
            <span>EST. 1592</span>
            <span>PREPARING YOUR ARRIVAL</span>
            <span>JAIPUR · RAJASTHAN</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
