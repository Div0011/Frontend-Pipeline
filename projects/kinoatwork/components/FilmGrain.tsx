"use client";

import { useEffect, useRef } from "react";

/**
 * FilmGrain — animated 35mm grain overlay
 * Uses an animated SVG feTurbulence baked into a canvas to avoid
 * the "same-tile" repeat pattern of a static SVG background.
 * Completely GPU-composited via `will-change: transform`.
 */
export default function FilmGrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Honor prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      canvas.style.opacity = "0.015";
      return;
    }

    let lastTime = 0;
    const FRAME_INTERVAL = 80; // ~12fps grain shift for authentic look

    // We bake different SVG grains and swap them rapidly
    const grains: ImageBitmap[] = [];
    let grainIndex = 0;
    let ready = false;

    const GRAIN_COUNT = 8;
    const SIZE = 256;

    const bakeGrains = async () => {
      for (let g = 0; g < GRAIN_COUNT; g++) {
        const freq = (0.65 + g * 0.04).toFixed(3);
        const seed = g * 31 + 7;
        const svgStr = `
          <svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}">
            <filter id="n">
              <feTurbulence type="fractalNoise"
                baseFrequency="${freq}"
                numOctaves="4"
                seed="${seed}"
                stitchTiles="stitch"/>
            </filter>
            <rect width="100%" height="100%" filter="url(#n)"/>
          </svg>`;
        const blob = new Blob([svgStr], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const img = new Image();
        img.src = url;
        await img.decode();
        const bmp = await createImageBitmap(img);
        grains.push(bmp);
        URL.revokeObjectURL(url);
      }
      ready = true;
    };

    const tick = (time: number) => {
      rafRef.current = requestAnimationFrame(tick);
      if (!ready) return;
      if (time - lastTime < FRAME_INTERVAL) return;
      lastTime = time;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const { innerWidth: w, innerHeight: h } = window;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }

      ctx.clearRect(0, 0, w, h);
      const bmp = grains[grainIndex % GRAIN_COUNT];
      grainIndex++;

      // Tile the grain bitmap across the canvas
      for (let x = 0; x < w; x += SIZE) {
        for (let y = 0; y < h; y += SIZE) {
          ctx.drawImage(bmp, x, y, SIZE, SIZE);
        }
      }
    };

    bakeGrains().then(() => {
      rafRef.current = requestAnimationFrame(tick);
    });

    return () => {
      cancelAnimationFrame(rafRef.current);
      grains.forEach((b) => b.close());
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[999] mix-blend-screen"
      style={{
        opacity: 0.032,
        willChange: "transform",
      }}
      aria-hidden="true"
    />
  );
}
