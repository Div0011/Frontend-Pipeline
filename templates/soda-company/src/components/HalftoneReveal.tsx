"use client";

import React, { useRef, useEffect } from "react";

export interface HalftoneRevealProps {
  src: string;
  inkColor?: string;
  paperColor?: string;
  mode?: "mono" | "color";
  dotDensity?: number;
  angle?: number;
  revealRadius?: number;
  dotSize?: number;
  shape?: "circle" | "square" | "diamond";
  contrast?: number;
  invert?: boolean;
  edge?: number;
  follow?: number;
  idleReveal?: number;
  trigger?: "hover" | "scroll";
  className?: string;
  style?: React.CSSProperties;
}

export default function HalftoneReveal({
  src,
  inkColor = "#0d0417",
  paperColor = "#06020c",
  mode = "mono",
  dotDensity = 71,
  angle = 45,
  revealRadius = 0.45,
  dotSize = 1.1,
  shape = "circle",
  contrast = 1.15,
  invert = false,
  edge = 0.8,
  follow = 0.37,
  idleReveal = 0.05,
  trigger = "hover",
  className = "",
  style,
}: HalftoneRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseRef = useRef({
    x: 0.5,
    y: 0.5,
    targetX: 0.5,
    targetY: 0.5,
    active: false,
  });
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    let isRunning = true;

    img.onload = () => {
      // Offscreen canvas for downsampled image pixel data
      const offscreen = document.createElement("canvas");
      const offCtx = offscreen.getContext("2d");

      const render = () => {
        if (!isRunning) return;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const rect = container.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        if (width === 0 || height === 0) {
          animFrameRef.current = requestAnimationFrame(render);
          return;
        }

        if (canvas.width !== Math.floor(width * dpr) || canvas.height !== Math.floor(height * dpr)) {
          canvas.width = Math.floor(width * dpr);
          canvas.height = Math.floor(height * dpr);
        }

        // Interpolate mouse coordinates
        const m = mouseRef.current;
        m.x += (m.targetX - m.x) * follow;
        m.y += (m.targetY - m.y) * follow;

        ctx.save();
        ctx.scale(dpr, dpr);

        // 1. Draw solid paper background
        ctx.fillStyle = paperColor;
        ctx.fillRect(0, 0, width, height);

        // 2. Aspect-ratio calculation for cover fit
        const imgAspect = img.width / img.height;
        const canvasAspect = width / height;
        let drawW: number, drawH: number;
        if (canvasAspect > imgAspect) {
          drawW = width;
          drawH = width / imgAspect;
        } else {
          drawH = height;
          drawW = height * imgAspect;
        }
        const drawX = (width - drawW) / 2;
        const drawY = (height - drawH) / 2;

        const mousePxX = m.x * width;
        const mousePxY = m.y * height;
        const effectiveRadius = m.active ? revealRadius : idleReveal;
        const maxDist = Math.hypot(width, height) * (effectiveRadius || 0.001);

        // 3. Draw Revealed High-Res Image within mouse spotlight
        if (effectiveRadius > 0) {
          ctx.save();
          // Create radial gradient mask or clipping for the reveal zone
          const grad = ctx.createRadialGradient(
            mousePxX,
            mousePxY,
            maxDist * edge,
            mousePxX,
            mousePxY,
            maxDist
          );
          grad.addColorStop(0, "rgba(255, 255, 255, 1)");
          grad.addColorStop(1, "rgba(255, 255, 255, 0)");

          // Draw full-color image masked by gradient
          ctx.beginPath();
          ctx.arc(mousePxX, mousePxY, maxDist, 0, Math.PI * 2);
          ctx.clip();
          ctx.drawImage(img, drawX, drawY, drawW, drawH);
          ctx.restore();
        }

        // 4. Sample and draw halftone dots across the surface
        const sampleStep = Math.max(6, Math.floor(180 / (dotDensity / 10)));
        const sampleW = Math.floor(width / sampleStep);
        const sampleH = Math.floor(height / sampleStep);

        if (offscreen.width !== sampleW || offscreen.height !== sampleH) {
          offscreen.width = sampleW;
          offscreen.height = sampleH;
        }

        if (offCtx) {
          offCtx.drawImage(img, 0, 0, sampleW, sampleH);
          let imgData: ImageData | null = null;
          try {
            imgData = offCtx.getImageData(0, 0, sampleW, sampleH);
          } catch {
            // ignore CORS fallback
          }

          if (imgData) {
            const data = imgData.data;
            const gridSpacing = width / sampleW;

            for (let sy = 0; sy < sampleH; sy++) {
              for (let sx = 0; sx < sampleW; sx++) {
                const pxX = sx * gridSpacing + gridSpacing / 2;
                const pxY = sy * gridSpacing + gridSpacing / 2;

                const i = (sy * sampleW + sx) * 4;
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];

                let brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
                brightness = Math.pow(brightness, contrast);
                if (invert) brightness = 1 - brightness;

                const distToMouse = Math.hypot(pxX - mousePxX, pxY - mousePxY);

                let revealFactor = 0;
                if (effectiveRadius > 0) {
                  const edgeDist = maxDist * edge;
                  if (distToMouse < edgeDist) {
                    revealFactor = 1;
                  } else if (distToMouse < maxDist) {
                    revealFactor = 1 - (distToMouse - edgeDist) / (maxDist - edgeDist);
                  }
                }

                // If fully revealed under spotlight, don't draw halftone dot
                if (revealFactor >= 0.96) continue;

                const halftoneAlpha = 1 - revealFactor;
                // Dot size scales with brightness/luminosity
                const maxRadius = (gridSpacing / 2) * dotSize * (brightness * 0.95 + 0.08);

                if (maxRadius > 0.3) {
                  ctx.save();
                  ctx.globalAlpha = halftoneAlpha;

                  if (mode === "color") {
                    ctx.fillStyle = `rgb(${r},${g},${b})`;
                  } else {
                    // In mono mode, use tint based on luminosity
                    const dotLuminance = Math.floor(brightness * 180);
                    ctx.fillStyle = inkColor === "#0d0417" || inkColor === "#141414"
                      ? `rgb(${Math.max(12, dotLuminance)}, ${Math.max(20, Math.floor(dotLuminance * 1.3))}, ${Math.max(30, Math.floor(dotLuminance * 1.6))})`
                      : inkColor;
                  }

                  if (shape === "circle") {
                    ctx.beginPath();
                    ctx.arc(pxX, pxY, maxRadius, 0, Math.PI * 2);
                    ctx.fill();
                  } else if (shape === "square") {
                    ctx.fillRect(
                      pxX - maxRadius,
                      pxY - maxRadius,
                      maxRadius * 2,
                      maxRadius * 2
                    );
                  } else if (shape === "diamond") {
                    ctx.beginPath();
                    ctx.moveTo(pxX, pxY - maxRadius);
                    ctx.lineTo(pxX + maxRadius, pxY);
                    ctx.lineTo(pxX, pxY + maxRadius);
                    ctx.lineTo(pxX - maxRadius, pxY);
                    ctx.closePath();
                    ctx.fill();
                  }
                  ctx.restore();
                }
              }
            }
          }
        }

        ctx.restore();
        animFrameRef.current = requestAnimationFrame(render);
      };

      render();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseRef.current.targetX = Math.max(0, Math.min(1, x));
      mouseRef.current.targetY = Math.max(0, Math.min(1, y));
      mouseRef.current.active = true;
    };

    const handleMouseEnter = () => {
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.targetX = 0.5;
      mouseRef.current.targetY = 0.5;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      isRunning = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [
    src,
    inkColor,
    paperColor,
    mode,
    dotDensity,
    angle,
    revealRadius,
    dotSize,
    shape,
    contrast,
    invert,
    edge,
    follow,
    idleReveal,
    trigger,
  ]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={{
        backgroundColor: paperColor,
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-crosshair"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
