"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface InteractiveBackgroundProps {
  primaryColor?: string;
  themeBase?: string;
}

export default function InteractiveBackground({
  primaryColor = "#E67E22",
  themeBase = "#100904",
}: InteractiveBackgroundProps) {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  const springX = useSpring(mouseX, { stiffness: 45, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 25 });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const handleThemeChange = (e: any) => {
      const isDark = e.detail?.isDark !== undefined ? e.detail.isDark : true;
      setIsDarkMode(isDark);
    };

    window.addEventListener("themechange", handleThemeChange);
    return () => window.removeEventListener("themechange", handleThemeChange);
  }, []);

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
      c.arc(0, s * 0.3, s * 0.9, 0, Math.PI, false);
      c.stroke();
    };

    const drawPizza = (c: CanvasRenderingContext2D, size: number) => {
      const s = size * 0.5;
      c.beginPath();
      c.moveTo(0, -s * 1.2);
      c.lineTo(s * 0.9, s * 0.9);
      c.quadraticCurveTo(0, s * 1.1, -s * 0.9, s * 0.9);
      c.closePath();
      c.stroke();
      c.beginPath();
      c.arc(-s * 0.2, 0, 2.5, 0, Math.PI * 2);
      c.arc(s * 0.25, s * 0.2, 2.5, 0, Math.PI * 2);
      c.arc(0, s * 0.5, 2.5, 0, Math.PI * 2);
      c.fill();
    };

    const drawSpatula = (c: CanvasRenderingContext2D, size: number) => {
      const s = size * 0.5;
      c.beginPath();
      c.rect(-s * 0.7, -s * 0.9, s * 1.4, s * 0.8);
      c.stroke();
      c.beginPath();
      c.moveTo(-s * 0.3, -s * 0.7);
      c.lineTo(-s * 0.3, -s * 0.3);
      c.moveTo(0, -s * 0.7);
      c.lineTo(0, -s * 0.3);
      c.moveTo(s * 0.3, -s * 0.7);
      c.lineTo(s * 0.3, -s * 0.3);
      c.stroke();
      c.beginPath();
      c.moveTo(0, -s * 0.1);
      c.lineTo(0, s * 0.9);
      c.stroke();
    };

    const drawFlame = (c: CanvasRenderingContext2D, size: number) => {
      const s = size * 0.5;
      c.beginPath();
      c.moveTo(0, -s);
      c.quadraticCurveTo(s * 0.8, -s * 0.2, s * 0.5, s * 0.7);
      c.quadraticCurveTo(0, s, -s * 0.5, s * 0.7);
      c.quadraticCurveTo(-s * 0.8, -s * 0.2, 0, -s);
      c.stroke();
    };

    const drawStar = (c: CanvasRenderingContext2D, size: number) => {
      const s = size * 0.4;
      c.beginPath();
      c.moveTo(0, -s * 1.2);
      c.lineTo(s * 0.3, -s * 0.3);
      c.lineTo(s * 1.2, 0);
      c.lineTo(s * 0.3, s * 0.3);
      c.lineTo(0, s * 1.2);
      c.lineTo(-s * 0.3, s * 0.3);
      c.lineTo(-s * 1.2, 0);
      c.lineTo(-s * 0.3, -s * 0.3);
      c.closePath();
      c.stroke();
    };

    const drawSparkle = (c: CanvasRenderingContext2D, size: number) => {
      const s = size * 0.35;
      c.beginPath();
      c.moveTo(0, -s);
      c.lineTo(0, s);
      c.moveTo(-s, 0);
      c.lineTo(s, 0);
      c.stroke();
    };

    const drawSteam = (c: CanvasRenderingContext2D, size: number) => {
      const s = size * 0.5;
      c.beginPath();
      c.moveTo(-s * 0.3, s * 0.6);
      c.quadraticCurveTo(-s * 0.6, 0, -s * 0.2, -s * 0.6);
      c.moveTo(s * 0.3, s * 0.6);
      c.quadraticCurveTo(s * 0.6, 0, s * 0.2, -s * 0.6);
      c.stroke();
    };

    const drawSwirl = (c: CanvasRenderingContext2D, size: number) => {
      const s = size * 0.4;
      c.beginPath();
      c.arc(0, 0, s, 0, Math.PI * 1.5, false);
      c.stroke();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const mX = springX.get() * width;
      const mY = springY.get() * height;

      // Draw Embers
      ctx.fillStyle = primaryColor;
      for (let i = 0; i < embers.length; i++) {
        const e = embers[i];
        e.y += e.vy;
        e.x += e.vx;
        e.alpha += e.fadeSpeed;
        if (e.alpha > 0.6 || e.alpha < 0.1) e.fadeSpeed = -e.fadeSpeed;

        if (e.y < -10) {
          e.y = height + 10;
          e.x = Math.random() * width;
        }

        ctx.globalAlpha = Math.max(0, Math.min(1, e.alpha));
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Motion Doodles
      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = 1.6;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let i = 0; i < doodles.length; i++) {
        const d = doodles[i];

        d.x += d.vx;
        d.y += d.vy;
        d.rotation += d.rotSpeed;

        d.alpha += d.fadeSpeed;
        if (d.alpha > d.maxAlpha || d.alpha < 0.12) {
          d.fadeSpeed = -d.fadeSpeed;
        }

        const dx = mX - d.x;
        const dy = mY - d.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180 && dist > 0) {
          const force = (180 - dist) / 180;
          d.x -= (dx / dist) * force * 1.5;
          d.y -= (dy / dist) * force * 1.5;
        }

        if (d.y < -50) {
          d.y = height + 50;
          d.x = Math.random() * width;
        }
        if (d.x < -50) d.x = width + 50;
        if (d.x > width + 50) d.x = -50;

        ctx.save();
        ctx.translate(d.x, d.y);
        ctx.rotate(d.rotation);
        ctx.globalAlpha = Math.max(0, Math.min(1, d.alpha));

        switch (d.type) {
          case "burger":
            drawBurger(ctx, d.size);
            break;
          case "pizza":
          case "slice":
            drawPizza(ctx, d.size);
            break;
          case "spatula":
            drawSpatula(ctx, d.size);
            break;
          case "flame":
            drawFlame(ctx, d.size);
            break;
          case "star":
            drawStar(ctx, d.size);
            break;
          case "sparkle":
            drawSparkle(ctx, d.size);
            break;
          case "steam":
            drawSteam(ctx, d.size);
            break;
          case "swirl":
            drawSwirl(ctx, d.size);
            break;
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [primaryColor]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none transition-colors duration-500">
      {/* Dynamic Background Surface */}
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          background: isDarkMode
            ? `radial-gradient(circle at 50% 30%, ${themeBase} 0%, #050806 100%)`
            : `radial-gradient(circle at 50% 30%, #FAF8F2 0%, #EDE7DB 100%)`,
        }}
      />

      {/* Atmospheric Ambient Glows */}
      <motion.div
        className={`absolute w-[900px] h-[900px] rounded-full blur-[180px] pointer-events-none transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 ${
          isDarkMode ? "opacity-20" : "opacity-10"
        }`}
        style={{
          backgroundColor: primaryColor,
          left: springX ? `${springX.get() * 100}%` : "50%",
          top: springY ? `${springY.get() * 100}%` : "30%",
        }}
      />

      <div
        className={`absolute -top-32 right-0 w-[700px] h-[700px] rounded-full blur-[200px] pointer-events-none transition-opacity duration-500 ${
          isDarkMode ? "opacity-15" : "opacity-0"
        }`}
        style={{ backgroundColor: primaryColor }}
      />
      <div
        className={`absolute bottom-0 left-10 w-[800px] h-[800px] rounded-full blur-[220px] pointer-events-none transition-opacity duration-500 ${
          isDarkMode ? "opacity-12" : "opacity-0"
        }`}
        style={{ backgroundColor: primaryColor }}
      />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}
