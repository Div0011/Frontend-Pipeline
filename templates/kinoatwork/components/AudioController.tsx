"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { soundEngine } from "@/lib/audio";

export default function AudioController() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const startAudio = useCallback(() => {
    soundEngine.init();
    soundEngine.resume();
    setHasStarted(true);
  }, []);

  useEffect(() => {
    const handleFirstClick = () => {
      startAudio();
      window.removeEventListener("click", handleFirstClick);
      window.removeEventListener("keydown", handleFirstClick);
      window.removeEventListener("touchstart", handleFirstClick);
    };

    window.addEventListener("click", handleFirstClick);
    window.addEventListener("keydown", handleFirstClick);
    window.addEventListener("touchstart", handleFirstClick);

    return () => {
      window.removeEventListener("click", handleFirstClick);
      window.removeEventListener("keydown", handleFirstClick);
      window.removeEventListener("touchstart", handleFirstClick);
    };
  }, [startAudio]);

  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dataArray = new Uint8Array(32);

    const render = () => {
      animId = requestAnimationFrame(render);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isMuted || !hasStarted) {
        // Draw resting flat line
        ctx.fillStyle = "rgba(245, 196, 24, 0.2)";
        ctx.fillRect(0, canvas.height / 2 - 1, canvas.width, 2);
        return;
      }

      soundEngine.getFrequencyData(dataArray);

      const barWidth = 3;
      const gap = 2;
      const count = 7;
      const totalWidth = count * (barWidth + gap);
      const startX = (canvas.width - totalWidth) / 2;

      for (let i = 0; i < count; i++) {
        const val = dataArray[i * 2] || 0;
        const normalized = val / 255;
        const barHeight = Math.max(3, normalized * (canvas.height - 4));
        const x = startX + i * (barWidth + gap);
        const y = (canvas.height - barHeight) / 2;

        ctx.fillStyle = `rgba(245, 196, 24, ${0.4 + normalized * 0.6})`;
        ctx.fillRect(x, y, barWidth, barHeight);
      }
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isMuted, hasStarted]);

  const handleToggle = () => {
    if (!hasStarted) {
      startAudio();
      return;
    }
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
    soundEngine.triggerHoverClick();
  };

  return (
    <button
      onClick={handleToggle}
      onMouseEnter={() => soundEngine.triggerHoverClick()}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-cinema-bg/85 backdrop-blur-md border border-cinema-ink/15 hover:border-cinema-accent/60 text-cinema-ink px-4 py-2.5 rounded-full transition-all duration-300 shadow-2xl group cursor-pointer"
      title={isMuted ? "Enable Soundscape" : "Mute Soundscape"}
      data-cursor-text="AUDIO"
    >
      <canvas ref={canvasRef} width={36} height={18} className="block" />
      <div className="flex flex-col text-left font-mono text-[9px] tracking-widest uppercase leading-tight">
        <span className="text-cinema-accent font-semibold flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${isMuted ? "bg-red-500" : "bg-cinema-accent animate-pulse"}`} />
          {isMuted ? "MUTED" : "SOUND ON"}
        </span>
        <span className="text-cinema-muted group-hover:text-cinema-ink transition-colors">
          {hasStarted ? (isMuted ? "UNMUTE" : "ATMOSPHERE") : "CLICK SOUND"}
        </span>
      </div>
    </button>
  );
}
