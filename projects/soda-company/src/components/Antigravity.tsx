"use client";

import { useEffect, useRef } from "react";

interface AntigravityProps {
  count?: number;
  magnetRadius?: number;
  ringRadius?: number;
  waveSpeed?: number;
  waveAmplitude?: number;
  particleSize?: number;
  lerpSpeed?: number;
  color?: string;
  autoAnimate?: boolean;
  particleVariance?: number;
  depthFactor?: number;
  pulseSpeed?: number;
  particleShape?: "capsule" | "circle" | "ring";
  fieldStrength?: number;
  opacity?: number;
}

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  z: number;
  size: number;
  vx: number;
  vy: number;
  angle: number;
  speed: number;
  phase: number;
  length: number;
}

export default function Antigravity({
  count = 180,
  magnetRadius = 8,
  ringRadius = 7,
  waveSpeed = 0.35,
  waveAmplitude = 1.2,
  particleSize = 1.8,
  lerpSpeed = 0.06,
  color = "#FF8A00",
  autoAnimate = true,
  particleVariance = 1.2,
  particleShape = "capsule",
  fieldStrength = 12,
  opacity = 0.7,
}: AntigravityProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const colorRef = useRef(color);

  useEffect(() => {
    colorRef.current = color;
  }, [color]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const init = () => {
      particles = [];
      const w = canvas.width;
      const h = canvas.height;
      // Reduce count on low-end / mobile devices
      const actualCount = window.navigator.hardwareConcurrency <= 4 ? Math.floor(count * 0.5) : count;

      for (let i = 0; i < actualCount; i++) {
        const bx = Math.random() * w;
        const by = Math.random() * h;
        const z = Math.random() * 2 + 0.4;

        particles.push({
          x: bx,
          y: by,
          baseX: bx,
          baseY: by,
          z,
          size: (particleSize + Math.random() * particleVariance) * z,
          vx: 0,
          vy: 0,
          angle: Math.random() * Math.PI * 2,
          speed: (0.15 + Math.random() * 0.35) * waveSpeed,
          phase: Math.random() * Math.PI * 2,
          length: (particleSize * 3.5 + Math.random() * 6) * z,
        });
      }
    };

    resize();
    window.addEventListener("resize", resize);

    // Global window mouse tracker so full-screen background responds everywhere
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        active: true,
      };
    };

    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    let time = 0;

    const animate = () => {
      time += 0.016 * waveSpeed;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      const mouse = mouseRef.current;
      const magnetDist = magnetRadius * 28;
      const curColor = colorRef.current;

      for (const p of particles) {
        // Multi-frequency organic levitation wave physics
        if (autoAnimate) {
          const waveX =
            Math.sin(time * 0.8 + p.phase) * (waveAmplitude * 10 * p.z) +
            Math.cos(time * 1.6 + p.phase) * (waveAmplitude * 3 * p.z);
          const waveY =
            Math.cos(time * 0.6 + p.phase) * (waveAmplitude * 14 * p.z) +
            Math.sin(time * 1.2 + p.phase) * (waveAmplitude * 4 * p.z);

          // Subtle floating drift
          p.baseY -= 0.18 * p.z;
          if (p.baseY < -50) {
            p.baseY = h + 50;
            p.baseX = Math.random() * w;
            p.x = p.baseX;
            p.y = p.baseY;
          }

          p.x += (p.baseX + waveX - p.x) * lerpSpeed;
          p.y += (p.baseY + waveY - p.y) * lerpSpeed;
        }

        // Magnetic zero-g disturbance from mouse cursor (use squared distance to avoid sqrt)
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distSq = dx * dx + dy * dy;
          const magnetDistSq = magnetDist * magnetDist;

          if (distSq < magnetDistSq && distSq > 1) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / magnetDist) * (fieldStrength * 1.1);
            p.x -= (dx / dist) * force;
            p.y -= (dy / dist) * force;
          }
        }

        // Render particle - NO shadowBlur (massive GPU cost)
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle + time * 0.3);

        const baseAlpha = Math.min(1, Math.max(0.1, (p.z / 2.4) * 0.75)) * opacity;
        ctx.globalAlpha = baseAlpha;
        ctx.fillStyle = curColor;

        if (particleShape === "capsule") {
          const wCapsule = p.size;
          const hCapsule = p.length;
          ctx.beginPath();
          ctx.roundRect(-wCapsule / 2, -hCapsule / 2, wCapsule, hCapsule, wCapsule / 2);
          ctx.fill();
        } else if (particleShape === "ring") {
          ctx.beginPath();
          ctx.arc(0, 0, p.size * ringRadius * 0.3, 0, Math.PI * 2);
          ctx.strokeStyle = curColor;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [
    count,
    magnetRadius,
    ringRadius,
    waveSpeed,
    waveAmplitude,
    particleSize,
    lerpSpeed,
    autoAnimate,
    particleVariance,
    particleShape,
    fieldStrength,
    opacity,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none transition-opacity duration-700"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
