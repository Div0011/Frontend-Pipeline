"use client";

import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface InteractiveBackgroundProps {
  primaryColor?: string;
  themeBase?: string;
}

export default function InteractiveBackground({
  primaryColor = "#D97706",
  themeBase = "#100a05",
}: InteractiveBackgroundProps) {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springX = useSpring(mouseX, { stiffness: 45, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 25 });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(e.clientX / innerWidth);
      mouseY.set(e.clientY / innerHeight);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const doodleTypes = ["burger", "spatula", "flame", "star", "sparkle", "steam", "swirl"];
    const doodleCount = 22;

    const doodles = Array.from({ length: doodleCount }, (_, i) => ({
      type: doodleTypes[i % doodleTypes.length],
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 22 + 18,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.008,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -(Math.random() * 0.3 + 0.1),
      alpha: Math.random() * 0.35 + 0.15,
      maxAlpha: Math.random() * 0.45 + 0.2,
      fadeSpeed: Math.random() * 0.004 + 0.002,
    }));

    const emberCount = 35;
    const embers = Array.from({ length: emberCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 0.8,
      vy: -(Math.random() * 0.5 + 0.2),
      vx: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.5 + 0.1,
      fadeSpeed: Math.random() * 0.006 + 0.003,
    }));

    const drawBurger = (c: CanvasRenderingContext2D, size: number) => {
      const s = size * 0.5;
      c.beginPath();
      c.arc(0, -s * 0.3, s, Math.PI, 0, false);
      c.closePath();
      c.stroke();
      c.beginPath();
      c.arc(-s * 0.4, -s * 0.6, 1.2, 0, Math.PI * 2);
      c.arc(0, -s * 0.7, 1.2, 0, Math.PI * 2);
      c.arc(s * 0.4, -s * 0.6, 1.2, 0, Math.PI * 2);
      c.fill();
      c.beginPath();
      c.moveTo(-s * 1.1, 0);
      c.quadraticCurveTo(0, s * 0.3, s * 1.1, 0);
      c.stroke();
      c.beginPath();
      c.moveTo(-s, s * 0.1);
      c.lineTo(-s * 0.3, s * 0.5);
      c.lineTo(0, s * 0.1);
      c.lineTo(s * 0.4, s * 0.6);
      c.lineTo(s, s * 0.1);
      c.stroke();
      c.beginPath();
      c.moveTo(-s * 0.9, s * 0.7);
      c.quadraticCurveTo(0, s * 0.9, s * 0.9, s * 0.7);
      c.stroke();
    };

    const drawSpatula = (c: CanvasRenderingContext2D, size: number) => {
      const s = size * 0.6;
      c.beginPath();
      c.moveTo(0, s);
      c.lineTo(0, 0);
      c.stroke();
      c.strokeRect(-s * 0.5, -s, s, s);
      c.beginPath();
      c.moveTo(-s * 0.25, -s * 0.8);
      c.lineTo(-s * 0.25, -s * 0.2);
      c.moveTo(0, -s * 0.8);
      c.lineTo(0, -s * 0.2);
      c.moveTo(s * 0.25, -s * 0.8);
      c.lineTo(s * 0.25, -s * 0.2);
      c.stroke();
    };

    const drawFlame = (c: CanvasRenderingContext2D, size: number) => {
      const s = size * 0.6;
      c.beginPath();
      c.moveTo(0, -s);
      c.bezierCurveTo(s * 0.8, -s * 0.2, s * 0.8, s * 0.8, 0, s);
      c.bezierCurveTo(-s * 0.8, s * 0.8, -s * 0.8, -s * 0.2, 0, -s);
      c.stroke();
      c.beginPath();
      c.moveTo(0, -s * 0.4);
      c.bezierCurveTo(s * 0.4, 0, s * 0.4, s * 0.6, 0, s * 0.7);
      c.bezierCurveTo(-s * 0.4, s * 0.6, -s * 0.4, 0, 0, -s * 0.4);
      c.stroke();
    };

    const drawStar = (c: CanvasRenderingContext2D, size: number) => {
      const s = size * 0.5;
      c.beginPath();
      c.moveTo(0, -s);
      c.quadraticCurveTo(0, 0, s, 0);
      c.quadraticCurveTo(0, 0, 0, s);
      c.quadraticCurveTo(0, 0, -s, 0);
      c.quadraticCurveTo(0, 0, 0, -s);
      c.closePath();
      c.stroke();
    };

    const drawSparkle = (c: CanvasRenderingContext2D, size: number) => {
      const s = size * 0.5;
      c.beginPath();
      c.moveTo(0, -s);
      c.lineTo(0, s);
      c.moveTo(-s, 0);
      c.lineTo(s, 0);
      c.stroke();
      c.beginPath();
      c.moveTo(-s * 0.4, -s * 0.4);
      c.lineTo(s * 0.4, s * 0.4);
      c.moveTo(-s * 0.4, s * 0.4);
      c.lineTo(s * 0.4, -s * 0.4);
      c.stroke();
    };

    const drawSteam = (c: CanvasRenderingContext2D, size: number) => {
      const s = size * 0.5;
      c.beginPath();
      c.moveTo(-s * 0.3, s);
      c.bezierCurveTo(-s * 0.6, s * 0.3, 0, -s * 0.3, -s * 0.3, -s);
      c.stroke();
      c.beginPath();
      c.moveTo(s * 0.3, s);
      c.bezierCurveTo(0, s * 0.3, s * 0.6, -s * 0.3, s * 0.3, -s);
      c.stroke();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      doodles.forEach((d) => {
        d.y += d.vy;
        d.x += d.vx;
        d.rotation += d.rotSpeed;
        d.alpha += d.fadeSpeed;

        if (d.alpha > d.maxAlpha || d.alpha < 0.08) {
          d.fadeSpeed = -d.fadeSpeed;
        }

        if (d.y < -50) {
          d.y = height + 40;
          d.x = Math.random() * width;
          d.alpha = 0.08;
        }

        ctx.save();
        ctx.translate(d.x, d.y);
        ctx.rotate(d.rotation);
        ctx.strokeStyle = primaryColor;
        ctx.fillStyle = primaryColor;
        ctx.lineWidth = 1.4;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.globalAlpha = Math.max(0.04, Math.min(0.45, d.alpha));
        ctx.shadowBlur = 6;
        ctx.shadowColor = primaryColor;

        if (d.type === "burger") drawBurger(ctx, d.size);
        else if (d.type === "spatula") drawSpatula(ctx, d.size);
        else if (d.type === "flame") drawFlame(ctx, d.size);
        else if (d.type === "star") drawStar(ctx, d.size);
        else if (d.type === "sparkle") drawSparkle(ctx, d.size);
        else if (d.type === "steam") drawSteam(ctx, d.size);
        else drawStar(ctx, d.size);

        ctx.restore();
      });

      embers.forEach((e) => {
        e.y += e.vy;
        e.x += e.vx;
        e.alpha += e.fadeSpeed;

        if (e.alpha > 0.6 || e.alpha < 0.05) {
          e.fadeSpeed = -e.fadeSpeed;
        }

        if (e.y < -10) {
          e.y = height + 10;
          e.x = Math.random() * width;
          e.alpha = 0.05;
        }

        ctx.beginPath();
        ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
        ctx.fillStyle = primaryColor;
        ctx.globalAlpha = Math.max(0, Math.min(1, e.alpha * 0.5));
        ctx.shadowBlur = 8;
        ctx.shadowColor = primaryColor;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [primaryColor]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 30%, ${themeBase} 0%, #050806 100%)`,
        }}
      />

      <motion.div
        className="absolute w-[900px] h-[900px] rounded-full blur-[180px] opacity-20 pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
        style={{
          backgroundColor: primaryColor,
          left: springX ? `${springX.get() * 100}%` : "50%",
          top: springY ? `${springY.get() * 100}%` : "30%",
        }}
      />

      <div
        className="absolute -top-32 right-0 w-[700px] h-[700px] rounded-full blur-[200px] opacity-15 pointer-events-none"
        style={{ backgroundColor: primaryColor }}
      />
      <div
        className="absolute bottom-0 left-10 w-[800px] h-[800px] rounded-full blur-[220px] opacity-12 pointer-events-none"
        style={{ backgroundColor: primaryColor }}
      />

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${primaryColor} 1px, transparent 0)`,
          backgroundSize: "36px 36px",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}
