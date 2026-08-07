"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * Cursor-Reveal Fog Background
 *
 * Renders a high-end dark marble/abstract texture onto a canvas,
 * obscured by a thick fog layer. As the cursor moves, the fog
 * clears in a radial pattern, elegantly revealing the texture beneath.
 *
 * Uses Canvas2D for 60fps performance with minimal overhead.
 */

const TEXTURE_URL =
  "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1920&q=80";

export default function BackgroundScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const smoothMouseRef = useRef({ x: -9999, y: -9999 });
  const bgImageRef = useRef<HTMLImageElement | null>(null);
  const rafRef = useRef<number>(0);
  const dimsRef = useRef({ w: 0, h: 0 });
  const fogCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageLoaded = useRef(false);

  // Generate procedural fog/noise texture (cached)
  const generateFogTexture = useCallback((w: number, h: number) => {
    const fogCanvas = document.createElement("canvas");
    fogCanvas.width = w;
    fogCanvas.height = h;
    const fctx = fogCanvas.getContext("2d");
    if (!fctx) return null;

    const imageData = fctx.createImageData(w, h);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      // Layered noise for dense fog
      const x = (i / 4) % w;
      const y = Math.floor((i / 4) / w);

      const n1 = Math.sin(x * 0.01) * Math.cos(y * 0.01) * 0.5 + 0.5;
      const n2 = Math.sin(x * 0.025 + 1.3) * Math.cos(y * 0.025 + 0.7) * 0.5 + 0.5;
      const n3 = Math.sin(x * 0.05 + 2.1) * Math.cos(y * 0.05 + 1.4) * 0.5 + 0.5;

      const noise = (n1 * 0.5 + n2 * 0.3 + n3 * 0.2);
      // Dense fog = high alpha (200-240 range)
      const alpha = Math.floor(180 + noise * 60);

      data[i] = 10;     // R
      data[i + 1] = 10; // G
      data[i + 2] = 12; // B
      data[i + 3] = alpha;
    }

    fctx.putImageData(imageData, 0, 0);
    return fogCanvas;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true, willReadFrequently: false });
    if (!ctx) return;
    ctxRef.current = ctx;

    // Load the texture image
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = TEXTURE_URL;

    img.onload = () => {
      bgImageRef.current = img;
      imageLoaded.current = true;
      resize();
    };

    const resize = () => {
      if (!canvas || !ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      dimsRef.current = { w: w * dpr, h: h * dpr };

      // Generate fog at display resolution
      fogCanvasRef.current = generateFogTexture(w * dpr, h * dpr) as HTMLCanvasElement;

      // Scale mouse coords
      mouseRef.current = { x: w / 2, y: h / 2 };
      smoothMouseRef.current = { x: w / 2, y: h / 2 };

      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        mouseRef.current = { x: touch.clientX, y: touch.clientY };
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;

      const { w, h } = dimsRef.current;
      const sw = window.innerWidth;
      const sh = window.innerHeight;

      // Smooth mouse with lerp for elegant easing
      smoothMouseRef.current.x += (mouseRef.current.x - smoothMouseRef.current.x) * 0.08;
      smoothMouseRef.current.y += (mouseRef.current.y - smoothMouseRef.current.y) * 0.08;

      ctx.clearRect(0, 0, sw, sh);

      // 1. Draw the base texture image (dark marble)
      if (bgImageRef.current && imageLoaded.current) {
        const img = bgImageRef.current;
        const imgAspect = img.width / img.height;
        const canvasAspect = sw / sh;

        let sx = 0, sy = 0, sWidth = img.width, sHeight = img.height;
        if (imgAspect > canvasAspect) {
          sWidth = img.height * canvasAspect;
          sx = (img.width - sWidth) / 2;
        } else {
          sHeight = img.width / canvasAspect;
          sy = (img.height - sHeight) / 2;
        }

        ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, sw, sh);

        // Darken and add contrast for mood
        ctx.fillStyle = "rgba(5, 5, 8, 0.55)";
        ctx.fillRect(0, 0, sw, sh);
      } else {
        // Fallback gradient
        const grad = ctx.createRadialGradient(sw / 2, sh / 2, 0, sw / 2, sh / 2, Math.max(sw, sh) * 0.7);
        grad.addColorStop(0, "#1a1a2e");
        grad.addColorStop(0.5, "#0f0f1a");
        grad.addColorStop(1, "#050508");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, sw, sh);
      }

      // 2. Draw the fog layer, then erase where cursor reveals
      if (fogCanvasRef.current) {
        ctx.drawImage(fogCanvasRef.current, 0, 0, sw, sh);

        // Erase fog in a radial gradient around cursor
        const mx = smoothMouseRef.current.x;
        const my = smoothMouseRef.current.y;

        // Only erase if cursor is within canvas (not initial offscreen)
        if (mx > 0 && my > 0 && mx < sw && my < sh) {
          ctx.save();
          ctx.globalCompositeOperation = "destination-out";

          const radius = Math.min(sw, sh) * 0.25;
          const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, radius);
          gradient.addColorStop(0, "rgba(0,0,0,1)");
          gradient.addColorStop(0.4, "rgba(0,0,0,0.85)");
          gradient.addColorStop(0.7, "rgba(0,0,0,0.4)");
          gradient.addColorStop(1, "rgba(0,0,0,0)");

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(mx, my, radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      // 3. Subtle vignette overlay for cinematic feel
      const vignette = ctx.createRadialGradient(sw / 2, sh / 2, sw * 0.15, sw / 2, sh / 2, sw * 0.75);
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(1, "rgba(0,0,0,0.5)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, sw, sh);

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [generateFogTexture]);

  return (
    <div className="reveal-canvas" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}

