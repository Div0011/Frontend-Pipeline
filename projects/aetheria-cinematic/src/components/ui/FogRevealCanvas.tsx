"use client";

import { useEffect, useRef } from "react";

interface TrailPoint {
  x: number;
  y: number;
  radius: number;
  alpha: number;
}

export default function FogRevealCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Preload dark museum wallpaper image
    const bgImage = new Image();
    bgImage.src = "/images/dark-museum-wallpaper.jpg";
    let bgLoaded = false;
    bgImage.onload = () => {
      bgLoaded = true;
    };

    // Offscreen canvas for the dense fog layer to perform eraser math cleanly
    const fogCanvas = document.createElement("canvas");
    fogCanvas.width = width;
    fogCanvas.height = height;
    const fogCtx = fogCanvas.getContext("2d");

    // Trail points left by cursor
    const trail: TrailPoint[] = [];
    let mouse = { x: width / 2, y: height / 2, moved: false };

    const handleResize = () => {
      if (!canvas || !fogCanvas) return;
      width = canvas.width = fogCanvas.width = window.innerWidth;
      height = canvas.height = fogCanvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.moved = true;

      // Add trail point with smooth clearing radius
      trail.push({
        x: e.clientX,
        y: e.clientY,
        radius: 170 + Math.random() * 40,
        alpha: 1.0,
      });

      if (trail.length > 35) {
        trail.shift();
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Underlying Dark Venetian Plaster Museum Wallpaper
      if (bgLoaded) {
        ctx.save();
        const imgRatio = bgImage.width / bgImage.height;
        const canvasRatio = width / height;
        let renderW = width;
        let renderH = height;
        let offsetX = 0;
        let offsetY = 0;

        if (canvasRatio > imgRatio) {
          renderH = width / imgRatio;
          offsetY = (height - renderH) / 2;
        } else {
          renderW = height * imgRatio;
          offsetX = (width - renderW) / 2;
        }

        ctx.globalAlpha = 0.95;
        ctx.drawImage(bgImage, offsetX, offsetY, renderW, renderH);
        ctx.restore();
      } else {
        ctx.fillStyle = "#12100e";
        ctx.fillRect(0, 0, width, height);
      }

      // 2. Render ULTRA DENSE Warm Beige Fog Layer on Offscreen Canvas
      if (fogCtx) {
        fogCtx.clearRect(0, 0, width, height);

        // Ultra thick, heavy fog fill
        const fogGrad = fogCtx.createRadialGradient(
          width / 2,
          height / 2,
          80,
          width / 2,
          height / 2,
          Math.max(width, height)
        );
        fogGrad.addColorStop(0, "rgba(224, 214, 198, 0.96)");
        fogGrad.addColorStop(0.4, "rgba(205, 192, 172, 0.98)");
        fogGrad.addColorStop(0.85, "rgba(180, 165, 145, 0.96)");
        fogGrad.addColorStop(1, "rgba(18, 16, 14, 0.98)");

        fogCtx.fillStyle = fogGrad;
        fogCtx.fillRect(0, 0, width, height);

        // Add dense volumetric mist swirls
        fogCtx.fillStyle = "rgba(235, 225, 210, 0.25)";
        for (let i = 0; i < 50; i++) {
          const px = (Math.sin(Date.now() * 0.0004 + i * 19) * 0.5 + 0.5) * width;
          const py = (Math.cos(Date.now() * 0.0006 + i * 29) * 0.5 + 0.5) * height;
          const pr = 100 + (i % 6) * 35;
          fogCtx.beginPath();
          fogCtx.arc(px, py, pr, 0, Math.PI * 2);
          fogCtx.fill();
        }

        // 3. Erase Dense Fog at Cursor Position to Reveal Dark Wallpaper Below
        if (mouse.moved) {
          fogCtx.save();
          fogCtx.globalCompositeOperation = "destination-out";

          // Current cursor spotlight eraser
          const spotGrad = fogCtx.createRadialGradient(
            mouse.x,
            mouse.y,
            15,
            mouse.x,
            mouse.y,
            220
          );
          spotGrad.addColorStop(0, "rgba(0,0,0,1)");
          spotGrad.addColorStop(0.65, "rgba(0,0,0,0.85)");
          spotGrad.addColorStop(1, "rgba(0,0,0,0)");

          fogCtx.fillStyle = spotGrad;
          fogCtx.beginPath();
          fogCtx.arc(mouse.x, mouse.y, 220, 0, Math.PI * 2);
          fogCtx.fill();

          // Trail points eraser
          for (let i = trail.length - 1; i >= 0; i--) {
            const pt = trail[i];
            const ptGrad = fogCtx.createRadialGradient(
              pt.x,
              pt.y,
              8,
              pt.x,
              pt.y,
              pt.radius
            );
            ptGrad.addColorStop(0, `rgba(0,0,0,${pt.alpha})`);
            ptGrad.addColorStop(1, "rgba(0,0,0,0)");

            fogCtx.fillStyle = ptGrad;
            fogCtx.beginPath();
            fogCtx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
            fogCtx.fill();

            pt.alpha -= 0.012;
            pt.radius *= 0.993;
            if (pt.alpha <= 0) {
              trail.splice(i, 1);
            }
          }

          fogCtx.restore();
        }

        // Draw fog layer onto main canvas
        ctx.drawImage(fogCanvas, 0, 0);
      }

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
      className="fixed inset-0 pointer-events-none z-0 opacity-95 transition-opacity duration-1000"
    />
  );
}
