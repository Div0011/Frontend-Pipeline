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

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Track scroll progress to compute transition intensity
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

    const render = () => {
      // Compute distance to nearest snap point
      const relativePos = scrollProgress / step;
      const currentSlideIndex = Math.round(relativePos);
      const distFromSnap = Math.abs(relativePos - currentSlideIndex);
      
      // Calculate intensity (0 at snaps, 1 at midpoints)
      const intensity = Math.pow(Math.sin(distFromSnap * Math.PI), 1.5);

      if (intensity < 0.01) {
        ctx.clearRect(0, 0, width, height);
      } else {
        // Clear with alpha trail to create cinematic motion blur
        ctx.fillStyle = `rgba(6, 6, 9, ${0.1 + intensity * 0.25})`;
        ctx.fillRect(0, 0, width, height);

        ctx.save();
        ctx.translate(width / 2, height / 2);
        
        // Spin speed increases with transition speed
        angle += 0.04 + intensity * 0.08;

        // Circular motion orbital lines (White & Parrot Green)
        const maxRadius = Math.min(width, height) * 0.4;
        const numCircles = 6;

        for (let i = 0; i < numCircles; i++) {
          const radius = (i + 1.5) * (maxRadius / numCircles);
          const dir = i % 2 === 0 ? 1 : -1;
          const currentAngle = angle * dir * (0.8 + i * 0.2);

          // Alternating colors between pure white and parrot green (#d4ff00)
          const colorPrefix = i % 2 === 0 ? "rgba(255, 255, 255, " : "rgba(212, 255, 0, ";
          const alpha = intensity * (0.2 + (i / numCircles) * 0.5);

          ctx.strokeStyle = colorPrefix + alpha + ")";
          ctx.lineWidth = 1.5 + (i % 2) * 1.5;
          ctx.shadowBlur = 12 * intensity;
          ctx.shadowColor = i % 2 === 0 ? "#ffffff" : "#d4ff00";

          ctx.beginPath();
          // Animated dash segments
          const arcLength = Math.PI * (0.25 + 0.45 * Math.sin(angle * 0.6 + i));
          ctx.arc(0, 0, radius, currentAngle, currentAngle + arcLength);
          ctx.stroke();
        }

        // Swirling light particles
        const numOrbiters = 20;
        for (let i = 0; i < numOrbiters; i++) {
          const orbitAngle = angle * (i % 2 === 0 ? 1 : -1) * 0.6 + (i * (Math.PI * 2) / numOrbiters);
          const orbitRadius = (maxRadius * 0.5) * (1 + 0.25 * Math.sin(angle * 1.2 + i));
          const ox = Math.cos(orbitAngle) * orbitRadius;
          const oy = Math.sin(orbitAngle) * orbitRadius;

          ctx.fillStyle = i % 2 === 0 ? "rgba(255, 255, 255, " + intensity * 0.9 + ")" : "rgba(212, 255, 0, " + intensity * 0.9 + ")";
          ctx.beginPath();
          ctx.arc(ox, oy, 2 + (i % 3), 0, Math.PI * 2);
          ctx.fill();
        }

        // Center HUD digital crosshair
        ctx.strokeStyle = "rgba(212, 255, 0, " + intensity * 0.4 + ")";
        ctx.lineWidth = 1;
        ctx.beginPath();
        // Inner reticle circle
        ctx.arc(0, 0, 15, 0, Math.PI * 2);
        // Crosshair ticks
        ctx.moveTo(-25, 0); ctx.lineTo(-10, 0);
        ctx.moveTo(10, 0); ctx.lineTo(25, 0);
        ctx.moveTo(0, -25); ctx.lineTo(0, -10);
        ctx.moveTo(0, 10); ctx.lineTo(0, 25);
        ctx.stroke();

        ctx.restore();

        // Digital Scanlines / Texture overlay
        ctx.strokeStyle = "rgba(212, 255, 0, " + intensity * 0.04 + ")";
        ctx.lineWidth = 1;
        for (let y = 0; y < height; y += 6) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }

        // HUD diagnostics text layout (Premium technical texture feel)
        ctx.fillStyle = "rgba(212, 255, 0, " + intensity * 0.85 + ")";
        ctx.font = "bold 9px monospace";
        ctx.textAlign = "center";
        
        // Center text
        ctx.fillText("SYNCING SYSTEM ASSETS", width / 2, height / 2 + 65);

        // Sidebar stats
        ctx.textAlign = "left";
        ctx.fillText("SYS: VOID_CORE_v1.0.4", 40, height - 80);
        ctx.fillText("TRANSITION_LOCKED: ACTIVE", 40, height - 60);
        ctx.fillText(`BUFFER_INTEGRITY: ${Math.round(intensity * 100)}%`, 40, height - 40);

        ctx.textAlign = "right";
        ctx.fillText("RENDER_MODE: HORIZONTAL_SCRUB", width - 40, height - 80);
        ctx.fillText(`CURRENT_TARGET_SLIDE: 0${currentSlideIndex + 1}`, width - 40, height - 60);
        ctx.fillText(`DAMPING_DELAY: 12ms`, width - 40, height - 40);
      }

      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);

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
    />
  );
}
