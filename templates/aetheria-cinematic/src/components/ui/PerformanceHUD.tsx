"use client";

import { useEffect, useState } from "react";

export default function PerformanceHUD() {
  const [fps, setFps] = useState(60);
  const [memory, setMemory] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    let frameCount = 0;
    let lastTime = performance.now();
    let animationId: number;

    const updateFPS = () => {
      frameCount++;
      const now = performance.now();
      const delta = now - lastTime;

      if (delta >= 1000) {
        setFps(Math.round((frameCount * 1000) / delta));
        frameCount = 0;
        lastTime = now;
      }

      animationId = requestAnimationFrame(updateFPS);
    };

    animationId = requestAnimationFrame(updateFPS);

    // Memory API (Chrome only)
    const updateMemory = () => {
      const mem = (performance as any).memory;
      if (mem) {
        const mb = Math.round(mem.usedJSHeapSize / 1024 / 1024);
        setMemory(`${mb} MB`);
      }
    };

    const memoryInterval = setInterval(updateMemory, 2000);
    updateMemory();

    return () => {
      cancelAnimationFrame(animationId);
      clearInterval(memoryInterval);
    };
  }, [isClient]);

  if (!isClient) return null;

  const fpsColor = fps >= 55 ? "text-green-400" : fps >= 30 ? "text-amber" : "text-red-400";

  return (
    <div className="fixed bottom-4 right-4 z-[90] font-mono text-[10px] text-bone-dim/70 bg-void/80 backdrop-blur-sm border border-stone/20 rounded-sm p-3 space-y-1 pointer-events-none">
      <div className="flex items-center gap-2">
        <span className={`${fpsColor} font-bold`}>{fps}</span>
        <span>FPS</span>
      </div>
      {memory && (
        <div className="flex items-center gap-2">
          <span className="text-amber">{memory}</span>
          <span>HEAP</span>
        </div>
      )}
    </div>
  );
}
