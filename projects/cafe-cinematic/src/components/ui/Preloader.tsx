'use client';

import { useEffect, useState } from 'react';

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const duration = 1600;
    const start = performance.now();

    function easeOutExpo(t: number) {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function tick(now: number) {
      const elapsed = now - start;
      const raw = Math.min(elapsed / duration, 1);
      setProgress(Math.round(easeOutExpo(raw) * 100));

      if (raw < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => setHidden(true), 300);
      }
    }

    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className={`preloader ${hidden ? 'hidden' : ''}`}>
      <div className="text-center space-y-4 px-6">
        <div className="w-14 h-14 rounded-full border-2 border-cafe-accent bg-cafe-dark-surface flex items-center justify-center font-display text-2xl font-black text-cafe-accent mx-auto shadow-[4px_4px_0px_#D89F56]">
          C
        </div>

        <div>
          <div className="font-display text-3xl md:text-4xl font-bold text-cafe-accent tracking-widest uppercase">
            CAFE COFFEE
          </div>
          <div className="text-[0.68rem] font-mono tracking-[0.25em] uppercase text-white/70 mt-1">
            ✦ Artisanal Roastery & Hearth Bakery ✦
          </div>
        </div>

        {/* 2D Progress Bar */}
        <div className="w-52 h-2 bg-white/10 rounded-full mx-auto overflow-hidden border border-white/30">
          <div
            className="h-full bg-cafe-accent transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="text-xs font-mono text-white/80 tracking-widest">
          {progress}%
        </div>
      </div>
    </div>
  );
}
