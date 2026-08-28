"use client";

import { useEffect, useRef, useState, useMemo } from "react";

type Particle = {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  delay: number;
  startTime: number;
  phase: number;
};

type ParticleTextProps = {
  text?: string;
  particleSize?: number;
  density?: number;
  color?: string;
  highlightColor?: string;
  scatter?: number;
  gatherDuration?: number;
  stagger?: number;
  pointerRepel?: number;
  repelRadius?: number;
  idleDrift?: number;
  trigger?: "mount" | "hover";
  glow?: boolean;
  fontSize?: string;
  fontWeight?: number;
  fontFamily?: string;
  className?: string;
  style?: React.CSSProperties;
};

const ParticleText = ({
  text = "AURA",
  particleSize = 3.3,
  density = 4,
  color = "#EF4444",
  highlightColor = "#db00e0",
  scatter = 190,
  gatherDuration = 2100,
  stagger = 420,
  pointerRepel = 42,
  repelRadius = 120,
  idleDrift = 0.8,
  trigger = "mount",
  glow = false,
  fontSize = "clamp(3.5rem, 13vw, 9rem)",
  fontWeight = 800,
  fontFamily = "inherit",
  className = "",
  style,
}: ParticleTextProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });
  const [ready, setReady] = useState(false);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const offscreen = document.createElement("canvas");
    offscreen.width = canvas.width;
    offscreen.height = canvas.height;
    const offCtx = offscreen.getContext("2d");
    if (!offCtx) return;
    offCtx.scale(dpr, dpr);

    offCtx.font = `${fontWeight} ${fontSize} ${fontFamily}`;
    offCtx.fillStyle = "#ffffff";
    offCtx.textBaseline = "middle";
    offCtx.textAlign = "center";
    offCtx.fillText(text, rect.width / 2, rect.height / 2);

    const imageData = offCtx.getImageData(0, 0, offscreen.width, offscreen.height);
    const data = imageData.data;
    const points: { x: number; y: number }[] = [];

    const step = Math.max(1, 6 - density);

    for (let y = 0; y < offscreen.height; y += step) {
      for (let x = 0; x < offscreen.width; x += step) {
        const i = (y * offscreen.width + x) * 4;
        if (data[i + 3] > 128) {
          points.push({ x: x / dpr, y: y / dpr });
        }
      }
    }

    const particles: Particle[] = points.map((p, i) => {
      const angle = Math.random() * Math.PI * 2;
      const dist = scatter * (0.6 + Math.random() * 0.4);
      return {
        x: p.x + Math.cos(angle) * dist,
        y: p.y + Math.sin(angle) * dist,
        targetX: p.x,
        targetY: p.y,
        originX: p.x,
        originY: p.y,
        vx: 0,
        vy: 0,
        size: particleSize * (0.8 + Math.random() * 0.4),
        color: Math.random() > 0.85 ? highlightColor : color,
        delay: i * (stagger / 1000 / Math.max(1, points.length)),
        startTime: performance.now() + Math.random() * 800,
        phase: Math.random() * Math.PI * 2,
      };
    });

    particlesRef.current = particles;

    const animate = (now: number) => {
      ctx.clearRect(0, 0, rect.width, rect.height);

      if (glow) {
        ctx.shadowColor = color;
        ctx.shadowBlur = 18;
      } else {
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
      }

      particles.forEach((p) => {
        const elapsed = (now - p.startTime) / 1000;
        const gatherT = Math.min(1, Math.max(0, elapsed / (gatherDuration / 1000)));
        const eased = 1 - Math.pow(1 - gatherT, 3);

        const gx = p.originX + (p.targetX - p.originX) * eased;
        const gy = p.originY + (p.targetY - p.originY) * eased;

        const dx = mouseRef.current.x - gx;
        const dy = mouseRef.current.y - gy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let repelX = 0;
        let repelY = 0;
        if (dist < repelRadius && dist > 0) {
          const force = (1 - dist / repelRadius) * pointerRepel;
          repelX = -(dx / dist) * force;
          repelY = -(dy / dist) * force;
        }

        const drift =
          !prefersReducedMotion && idleDrift > 0
            ? Math.sin(now * 0.001 + p.phase) * idleDrift
            : 0;

        p.x += (gx + repelX + drift - p.x) * 0.12 + p.vx;
        p.y += (gy + repelY + drift - p.y) * 0.12 + p.vy;
        p.vx *= 0.85;
        p.vy *= 0.85;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    const onLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    setReady(true);

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [
    text,
    particleSize,
    density,
    color,
    highlightColor,
    scatter,
    gatherDuration,
    stagger,
    pointerRepel,
    repelRadius,
    idleDrift,
    trigger,
    glow,
    fontSize,
    fontWeight,
    fontFamily,
    prefersReducedMotion,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={`particle-text ${className}`}
      style={{
        width: "100%",
        height: 360,
        display: "block",
        background: "#09090f",
        ...style,
      }}
    />
  );
};

export default ParticleText;
