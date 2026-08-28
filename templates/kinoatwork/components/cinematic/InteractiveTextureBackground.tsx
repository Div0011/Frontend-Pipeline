"use client";

import { useEffect, useRef } from "react";

export default function InteractiveTextureBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5, vx: 0, vy: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId = 0;
    let width = 0;
    let height = 0;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX / width;
      mouseRef.current.targetY = e.clientY / height;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Floating light particles
    const particleCount = 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 1 + Math.random() * 2.5,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
      alpha: 0.15 + Math.random() * 0.35,
    }));

    let time = 0;

    const render = () => {
      time += 0.01;

      // Smooth mouse lerp
      const m = mouseRef.current;
      m.vx = (m.targetX - m.x) * 0.08;
      m.vy = (m.targetY - m.y) * 0.08;
      m.x += m.vx;
      m.y += m.vy;

      // Deep Obsidian base gradient
      const bgGradient = ctx.createRadialGradient(
        m.x * width,
        m.y * height,
        0,
        m.x * width,
        m.y * height,
        Math.max(width, height) * 0.8
      );
      bgGradient.addColorStop(0, "rgba(25, 22, 18, 1)");
      bgGradient.addColorStop(0.5, "rgba(10, 10, 10, 1)");
      bgGradient.addColorStop(1, "rgba(5, 5, 5, 1)");

      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Dynamic cursor glow light spot
      const cursorSpot = ctx.createRadialGradient(
        m.x * width,
        m.y * height,
        0,
        m.x * width,
        m.y * height,
        350
      );
      cursorSpot.addColorStop(0, "rgba(212, 168, 75, 0.18)");
      cursorSpot.addColorStop(0.4, "rgba(180, 130, 45, 0.06)");
      cursorSpot.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = cursorSpot;
      ctx.fillRect(0, 0, width, height);

      // Render floating particle embers reacting to cursor proximity
      ctx.fillStyle = "#d4a84b";
      for (const p of particles) {
        p.x += p.speedX + m.vx * 3;
        p.y += p.speedY + m.vy * 3;

        // Wrap edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.globalAlpha = p.alpha * (0.6 + Math.sin(time * 2 + p.x) * 0.4);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      // Anamorphic Vignette Edge
      const vignette = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.4,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.75
      );
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(1, "rgba(0,0,0,0.85)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {/* Noise Grain SVG Texture Overlay */}
      <div className="film-grain-overlay opacity-30" />
    </div>
  );
}
