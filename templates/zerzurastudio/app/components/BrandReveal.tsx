"use client";

import { useEffect, useState, useRef } from "react";

export default function BrandReveal({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"hidden" | "reveal" | "hold" | "exit">("hidden");
  const [showContent, setShowContent] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("reveal"), 300);
    const t2 = setTimeout(() => setPhase("hold"), 1800);
    const t3 = setTimeout(() => setPhase("exit"), 2800);
    const t4 = setTimeout(() => {
      setShowContent(true);
      onComplete();
    }, 3800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  useEffect(() => {
    if (phase !== "reveal" && phase !== "hold") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let frame = 0;
    const maxFrames = phase === "reveal" ? 60 : 120;
    let animId: number;

    const draw = () => {
      if (!ctx) return;
      frame++;
      const progress = Math.min(frame / maxFrames, 1);
      const ease = 1 - Math.pow(1 - progress, 4);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      if (phase === "reveal") {
        const radius = ease * Math.max(canvas.width, canvas.height) * 0.8;
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        gradient.addColorStop(0, `rgba(201, 169, 110, ${0.15 * ease})`);
        gradient.addColorStop(0.5, `rgba(201, 169, 110, ${0.05 * ease})`);
        gradient.addColorStop(1, "rgba(201, 169, 110, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < 20; i++) {
          const angle = (i / 20) * Math.PI * 2 + ease * 0.5;
          const dist = 100 + ease * 200;
          const x = cx + Math.cos(angle) * dist;
          const y = cy + Math.sin(angle) * dist;
          const size = 2 + Math.random() * 3;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(201, 169, 110, ${0.6 * ease})`;
          ctx.fill();
        }
      }

      if (phase === "hold") {
        const pulse = Math.sin(frame * 0.05) * 0.1 + 0.9;
        const radius = Math.max(canvas.width, canvas.height) * 0.8 * pulse;
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        gradient.addColorStop(0, `rgba(201, 169, 110, ${0.15 * pulse})`);
        gradient.addColorStop(0.5, `rgba(201, 169, 110, ${0.05 * pulse})`);
        gradient.addColorStop(1, "rgba(201, 169, 110, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      if (frame < maxFrames) {
        animId = requestAnimationFrame(draw);
      }
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-cinema-black transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        phase === "exit" ? "opacity-0 translate-y-[-20px]" : "opacity-100 translate-y-0"
      }`}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="relative z-10 flex flex-col items-center">
        <div
          className={`transition-all duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            phase === "reveal" ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
          }`}
        >
          <h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-cinema-cream text-center leading-none"
            style={{ fontFamily: "var(--font-display)" }}
          >
            ZERZURA
          </h1>
          <div className="flex items-center justify-center gap-3 mt-4">
            <span className="text-cinema-gold text-sm font-bold tracking-[0.3em]" style={{ fontFamily: "var(--font-display)" }}>
              [
            </span>
            <p
              className="text-xs uppercase tracking-[0.4em] text-cinema-gold"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Studio
            </p>
            <span className="text-cinema-gold text-sm font-bold tracking-[0.3em]" style={{ fontFamily: "var(--font-display)" }}>
              ]
            </span>
          </div>
        </div>

        {phase === "hold" && (
          <div className="mt-8 w-16 h-[1px] bg-cinema-gold animate-pulse" />
        )}
      </div>
    </div>
  );
}
