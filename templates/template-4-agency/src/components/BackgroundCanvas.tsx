"use client";

import { useEffect, useRef } from "react";

export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let time = 0;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const mouse = { x: width / 2, y: height / 2, tx: width / 2, ty: height / 2 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const orbs = Array.from({ length: 5 }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 120 + Math.random() * 180,
      speed: 0.15 + Math.random() * 0.2,
      phase: Math.random() * Math.PI * 2,
      accent: i % 2 === 0,
    }));

    const render = () => {
      time += 0.004;
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;

      ctx.clearRect(0, 0, width, height);

      // Soft drifting lime/white atmospheres — no particle-network dashboard
      orbs.forEach((orb, i) => {
        const ox =
          orb.x +
          Math.sin(time * orb.speed + orb.phase) * 80 +
          (mouse.x - width / 2) * 0.015 * (i + 1);
        const oy =
          orb.y +
          Math.cos(time * orb.speed * 0.8 + orb.phase) * 60 +
          (mouse.y - height / 2) * 0.012 * (i + 1);

        const gradient = ctx.createRadialGradient(ox, oy, 0, ox, oy, orb.r);
        if (orb.accent) {
          gradient.addColorStop(0, "rgba(212, 255, 0, 0.045)");
          gradient.addColorStop(0.45, "rgba(212, 255, 0, 0.015)");
          gradient.addColorStop(1, "rgba(212, 255, 0, 0)");
        } else {
          gradient.addColorStop(0, "rgba(255, 255, 255, 0.03)");
          gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.01)");
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(ox, oy, orb.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Subtle mouse glow
      const glow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 220);
      glow.addColorStop(0, "rgba(212, 255, 0, 0.04)");
      glow.addColorStop(1, "rgba(212, 255, 0, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 220, 0, Math.PI * 2);
      ctx.fill();

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
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[1] h-full w-full opacity-80"
      aria-hidden
    />
  );
}
