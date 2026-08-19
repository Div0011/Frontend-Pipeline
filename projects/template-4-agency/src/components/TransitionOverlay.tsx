"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function TransitionOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animId = 0;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    let scrollProgress = 0;
    const numPanels = 5;
    const step = 1 / (numPanels - 1);

    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        scrollProgress = self.progress;
      },
    });

    let angle = 0;
    let time = 0;

    const render = () => {
      time += 0.016;
      const relativePos = scrollProgress / step;
      const currentSlideIndex = Math.round(relativePos);
      const distFromSnap = Math.abs(relativePos - currentSlideIndex);
      const intensity = Math.pow(Math.sin(distFromSnap * Math.PI), 1.65);

      if (intensity < 0.015) {
        ctx.clearRect(0, 0, width, height);
      } else {
        ctx.clearRect(0, 0, width, height);

        // Soft cinematic veil
        const veil = ctx.createRadialGradient(
          width / 2,
          height / 2,
          0,
          width / 2,
          height / 2,
          Math.max(width, height) * 0.7
        );
        veil.addColorStop(0, `rgba(6, 6, 9, ${0.15 + intensity * 0.35})`);
        veil.addColorStop(1, `rgba(6, 6, 9, ${0.55 + intensity * 0.35})`);
        ctx.fillStyle = veil;
        ctx.fillRect(0, 0, width, height);

        // Horizontal light streak / film wipe
        const wipeY = height * (0.35 + 0.3 * Math.sin(time * 0.4 + scrollProgress * 6));
        const streak = ctx.createLinearGradient(0, wipeY - 80, 0, wipeY + 80);
        streak.addColorStop(0, "rgba(212, 255, 0, 0)");
        streak.addColorStop(0.45, `rgba(212, 255, 0, ${intensity * 0.12})`);
        streak.addColorStop(0.5, `rgba(255, 255, 255, ${intensity * 0.28})`);
        streak.addColorStop(0.55, `rgba(212, 255, 0, ${intensity * 0.12})`);
        streak.addColorStop(1, "rgba(212, 255, 0, 0)");
        ctx.fillStyle = streak;
        ctx.fillRect(0, wipeY - 80, width, 160);

        ctx.save();
        ctx.translate(width / 2, height / 2);
        angle += 0.018 + intensity * 0.05;

        const maxRadius = Math.min(width, height) * 0.38;
        const rings = 5;

        for (let i = 0; i < rings; i++) {
          const radius = (i + 1.2) * (maxRadius / rings);
          const dir = i % 2 === 0 ? 1 : -1;
          const currentAngle = angle * dir * (0.55 + i * 0.12);
          const alpha = intensity * (0.15 + (i / rings) * 0.4);
          const isAccent = i % 2 === 1;

          ctx.strokeStyle = isAccent
            ? `rgba(212, 255, 0, ${alpha})`
            : `rgba(255, 255, 255, ${alpha * 0.85})`;
          ctx.lineWidth = isAccent ? 1.5 : 1;
          ctx.shadowBlur = 18 * intensity;
          ctx.shadowColor = isAccent ? "#d4ff00" : "#ffffff";

          ctx.beginPath();
          const arcLength = Math.PI * (0.2 + 0.35 * Math.sin(angle * 0.5 + i));
          ctx.arc(0, 0, radius, currentAngle, currentAngle + arcLength);
          ctx.stroke();
        }

        // Soft orbit sparks
        for (let i = 0; i < 12; i++) {
          const orbitAngle =
            angle * (i % 2 === 0 ? 0.7 : -0.55) + (i * Math.PI * 2) / 12;
          const orbitRadius = maxRadius * 0.55 * (1 + 0.2 * Math.sin(angle + i));
          const ox = Math.cos(orbitAngle) * orbitRadius;
          const oy = Math.sin(orbitAngle) * orbitRadius;
          const sparkAlpha = intensity * (0.35 + 0.45 * Math.sin(time * 2 + i));

          ctx.fillStyle =
            i % 2 === 0
              ? `rgba(255, 255, 255, ${sparkAlpha})`
              : `rgba(212, 255, 0, ${sparkAlpha})`;
          ctx.beginPath();
          ctx.arc(ox, oy, 1.2 + (i % 2), 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();

        // Edge film bars
        ctx.fillStyle = `rgba(212, 255, 0, ${intensity * 0.08})`;
        ctx.fillRect(0, 0, width, 2);
        ctx.fillRect(0, height - 2, width, 2);

        // Minimal slide index
        ctx.fillStyle = `rgba(212, 255, 0, ${intensity * 0.7})`;
        ctx.font = "500 11px 'JetBrains Mono', monospace";
        ctx.textAlign = "center";
        ctx.fillText(
          `0${currentSlideIndex + 1}  —  0${numPanels}`,
          width / 2,
          height - 36
        );
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      st.kill();
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-40 h-full w-full mix-blend-screen"
      aria-hidden
    />
  );
}
