"use client";

import React, { useEffect, useRef } from "react";

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Ambient particle grid canvas background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.3 + 0.1,
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Mouse glow
      const grad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 380);
      grad.addColorStop(0, "rgba(255, 255, 255, 0.07)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Particle network
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240, 240, 240, ${p.alpha})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(240, 240, 240, ${0.07 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Title magnetic hover logic
  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 1.2) {
        const strength = (1.2 - dist) / 1.2;
        el.style.transform = `translate(${dx * strength * 16}px, ${dy * strength * 8}px)`;
      } else {
        el.style.transform = "translate(0,0)";
      }
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center relative px-6 overflow-hidden select-none border-0"
      style={{ backgroundColor: "#6b6f76" }}
    >
      {/* Background Interactive Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Inter-Section Fog Mask at Bottom of Hero */}
      <div className="video-section-fog-bottom z-20" style={{ "--fog-color": "#6b6f76" } as React.CSSProperties} />

      {/* Main Center Content */}
      <div className="flex flex-col items-center text-center gap-6 relative z-10 max-w-4xl">
        <p className="font-mono-label text-white/50 tracking-[0.35em]">
          LOS ANGELES
        </p>

        <h1
          ref={titleRef}
          className="text-shimmer will-change-transform"
          style={{
            fontSize: "clamp(5.5rem,19vw,17.5rem)",
            fontWeight: 900,
            letterSpacing: "-0.065em",
            color: "#f0f0f0",
            lineHeight: 0.9,
            transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          FORGE
        </h1>

        <p className="font-mono-label text-white/50 tracking-[0.35em] text-[0.72rem] md:text-[0.8rem]">
          THE FUTURE OF FITNESS
        </p>

        <p className="text-sm text-white/60 max-w-md text-center font-light leading-relaxed mt-2">
          Where technology meets strength. Experience next-generation training.
        </p>
      </div>

      {/* Classy Scroll indicator */}
      <div className="absolute bottom-10 flex flex-col items-center gap-3 z-10">
        <span className="font-mono-label text-white/40 text-[0.58rem] tracking-[0.25em]">
          SCROLL
        </span>
        <div
          className="w-px overflow-hidden rounded-full"
          style={{ height: "48px", background: "rgba(255,255,255,0.15)" }}
        >
          <div
            style={{
              width: "100%",
              background: "#ffffff",
              animation: "scroll-bar 2s cubic-bezier(0.76,0,0.24,1) infinite",
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-bar {
          0%   { height: 0%;   transform: translateY(0); }
          50%  { height: 100%; transform: translateY(0); }
          100% { height: 0%;   transform: translateY(100%); }
        }
      `}</style>
    </section>
  );
}
