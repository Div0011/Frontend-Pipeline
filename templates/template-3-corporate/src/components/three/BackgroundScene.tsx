"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * Atmospheric slate fog reveal — warm metal undertones.
 * Cursor clears fog to reveal architectural texture beneath.
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
  const timeRef = useRef(0);

  const generateFogTexture = useCallback((w: number, h: number) => {
    const fogCanvas = document.createElement("canvas");
    fogCanvas.width = w;
    fogCanvas.height = h;
    const fctx = fogCanvas.getContext("2d");
    if (!fctx) return null;

    const imageData = fctx.createImageData(w, h);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const x = (i / 4) % w;
      const y = Math.floor(i / 4 / w);

      const n1 = Math.sin(x * 0.008) * Math.cos(y * 0.009) * 0.5 + 0.5;
      const n2 =
        Math.sin(x * 0.022 + 1.1) * Math.cos(y * 0.02 + 0.6) * 0.5 + 0.5;
      const n3 =
        Math.sin(x * 0.045 + 2.0) * Math.cos(y * 0.048 + 1.3) * 0.5 + 0.5;

      const noise = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;
      const alpha = Math.floor(175 + noise * 55);

      // Deep slate with warm metal tint
      data[i] = 10 + Math.floor(noise * 6);
      data[i + 1] = 11 + Math.floor(noise * 4);
      data[i + 2] = 14;
      data[i + 3] = alpha;
    }

    fctx.putImageData(imageData, 0, 0);
    return fogCanvas;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", {
      alpha: true,
      willReadFrequently: false,
    });
    if (!ctx) return;
    ctxRef.current = ctx;

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
      fogCanvasRef.current = generateFogTexture(
        w * dpr,
        h * dpr
      ) as HTMLCanvasElement;

      mouseRef.current = { x: w / 2, y: h / 2 };
      smoothMouseRef.current = { x: w / 2, y: h / 2 };

      ctx.setTransform(1, 0, 0, 1, 0, 0);
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

    const animate = () => {
      if (!ctx || !canvas) return;

      const sw = window.innerWidth;
      const sh = window.innerHeight;
      timeRef.current += 0.004;

      smoothMouseRef.current.x +=
        (mouseRef.current.x - smoothMouseRef.current.x) * 0.07;
      smoothMouseRef.current.y +=
        (mouseRef.current.y - smoothMouseRef.current.y) * 0.07;

      ctx.clearRect(0, 0, sw, sh);

      if (bgImageRef.current && imageLoaded.current) {
        const bg = bgImageRef.current;
        const imgAspect = bg.width / bg.height;
        const canvasAspect = sw / sh;

        let sx = 0;
        let sy = 0;
        let sWidth = bg.width;
        let sHeight = bg.height;
        if (imgAspect > canvasAspect) {
          sWidth = bg.height * canvasAspect;
          sx = (bg.width - sWidth) / 2;
        } else {
          sHeight = bg.width / canvasAspect;
          sy = (bg.height - sHeight) / 2;
        }

        ctx.drawImage(bg, sx, sy, sWidth, sHeight, 0, 0, sw, sh);
        ctx.fillStyle = "rgba(8, 10, 13, 0.62)";
        ctx.fillRect(0, 0, sw, sh);

        // Warm metal ambient wash
        const warm = ctx.createRadialGradient(
          sw * 0.35,
          sh * 0.3,
          0,
          sw * 0.35,
          sh * 0.3,
          sw * 0.55
        );
        warm.addColorStop(0, "rgba(196, 165, 116, 0.06)");
        warm.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = warm;
        ctx.fillRect(0, 0, sw, sh);
      } else {
        const grad = ctx.createRadialGradient(
          sw / 2,
          sh / 2,
          0,
          sw / 2,
          sh / 2,
          Math.max(sw, sh) * 0.7
        );
        grad.addColorStop(0, "#141820");
        grad.addColorStop(0.55, "#0a0e14");
        grad.addColorStop(1, "#06080b");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, sw, sh);
      }

      if (fogCanvasRef.current) {
        ctx.drawImage(fogCanvasRef.current, 0, 0, sw, sh);

        const mx = smoothMouseRef.current.x;
        const my = smoothMouseRef.current.y;

        if (mx > 0 && my > 0 && mx < sw && my < sh) {
          ctx.save();
          ctx.globalCompositeOperation = "destination-out";

          const pulse = 1 + Math.sin(timeRef.current) * 0.04;
          const radius = Math.min(sw, sh) * 0.28 * pulse;
          const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, radius);
          gradient.addColorStop(0, "rgba(0,0,0,1)");
          gradient.addColorStop(0.35, "rgba(0,0,0,0.8)");
          gradient.addColorStop(0.7, "rgba(0,0,0,0.35)");
          gradient.addColorStop(1, "rgba(0,0,0,0)");

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(mx, my, radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      const vignette = ctx.createRadialGradient(
        sw / 2,
        sh / 2,
        sw * 0.12,
        sw / 2,
        sh / 2,
        sw * 0.78
      );
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(1, "rgba(6, 8, 11, 0.55)");
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
