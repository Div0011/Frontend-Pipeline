"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";

// 5×7 pixel font bitmap for uppercase letters and symbols
const FONT: Record<string, number[][]> = {
  A: [
    [0,1,1,1,0],
    [1,0,0,0,1],
    [1,1,1,1,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,0,0,0,0],
  ],
  B: [
    [1,1,1,1,0],
    [1,0,0,0,1],
    [1,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,1,1,1,0],
    [0,0,0,0,0],
  ],
  C: [
    [0,1,1,1,1],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [0,1,1,1,1],
    [0,0,0,0,0],
  ],
  D: [
    [1,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,1,1,1,0],
    [0,0,0,0,0],
  ],
  E: [
    [1,1,1,1,1],
    [1,0,0,0,0],
    [1,1,1,1,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,1,1,1,1],
    [0,0,0,0,0],
  ],
  F: [
    [1,1,1,1,1],
    [1,0,0,0,0],
    [1,1,1,1,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [0,0,0,0,0],
  ],
  G: [
    [0,1,1,1,1],
    [1,0,0,0,0],
    [1,0,1,1,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0],
    [0,0,0,0,0],
  ],
  H: [
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,1,1,1,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,0,0,0,0],
  ],
  I: [
    [1,1,1,1,1],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [1,1,1,1,1],
    [0,0,0,0,0],
  ],
  J: [
    [0,1,1,1,1],
    [0,0,0,1,0],
    [0,0,0,1,0],
    [0,0,0,1,0],
    [1,0,0,1,0],
    [0,1,1,0,0],
    [0,0,0,0,0],
  ],
  K: [
    [1,0,0,1,0],
    [1,0,1,0,0],
    [1,1,0,0,0],
    [1,1,0,0,0],
    [1,0,1,0,0],
    [1,0,0,1,0],
    [0,0,0,0,0],
  ],
  L: [
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,1,1,1,1],
    [0,0,0,0,0],
  ],
  M: [
    [1,0,0,0,1],
    [1,1,0,1,1],
    [1,0,1,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,0,0,0,0],
  ],
  N: [
    [1,0,0,0,1],
    [1,1,0,0,1],
    [1,0,1,0,1],
    [1,0,0,1,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,0,0,0,0],
  ],
  O: [
    [0,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0],
    [0,0,0,0,0],
  ],
  P: [
    [1,1,1,1,0],
    [1,0,0,0,1],
    [1,1,1,1,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [0,0,0,0,0],
  ],
  Q: [
    [0,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,1,0,1],
    [1,0,0,1,1],
    [0,1,1,1,1],
    [0,0,0,0,0],
  ],
  R: [
    [1,1,1,1,0],
    [1,0,0,0,1],
    [1,1,1,1,0],
    [1,0,1,0,0],
    [1,0,0,1,0],
    [1,0,0,0,1],
    [0,0,0,0,0],
  ],
  S: [
    [0,1,1,1,1],
    [1,0,0,0,0],
    [0,1,1,1,0],
    [0,0,0,0,1],
    [0,0,0,0,1],
    [1,1,1,1,0],
    [0,0,0,0,0],
  ],
  T: [
    [1,1,1,1,1],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,0,0,0],
  ],
  U: [
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0],
    [0,0,0,0,0],
  ],
  V: [
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,0,1,0],
    [0,0,1,0,0],
    [0,0,0,0,0],
  ],
  W: [
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,1,0,1],
    [1,1,0,1,1],
    [1,0,0,0,1],
    [0,0,0,0,0],
  ],
  X: [
    [1,0,0,0,1],
    [0,1,0,1,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,1,0,1,0],
    [1,0,0,0,1],
    [0,0,0,0,0],
  ],
  Y: [
    [1,0,0,0,1],
    [0,1,0,1,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,0,0,0],
  ],
  Z: [
    [1,1,1,1,1],
    [0,0,0,1,0],
    [0,0,1,0,0],
    [0,1,0,0,0],
    [1,0,0,0,0],
    [1,1,1,1,1],
    [0,0,0,0,0],
  ],
  " ": [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
  ],
  ".": [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,1,1,0,0],
    [0,1,1,0,0],
  ],
  "'": [
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,1,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
  ],
  "&": [
    [0,1,1,0,0],
    [1,0,0,1,0],
    [0,1,1,0,0],
    [1,0,0,1,0],
    [1,0,0,1,0],
    [0,1,1,0,1],
    [0,0,0,0,0],
  ],
  "-": [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [1,1,1,1,1],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
  ],
  "1": [
    [0,0,1,0,0],
    [0,1,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,1,1,1,0],
    [0,0,0,0,0],
  ],
  "2": [
    [0,1,1,1,0],
    [1,0,0,0,1],
    [0,0,0,1,0],
    [0,0,1,0,0],
    [0,1,0,0,0],
    [1,1,1,1,1],
    [0,0,0,0,0],
  ],
  "3": [
    [1,1,1,1,0],
    [0,0,0,0,1],
    [0,1,1,1,0],
    [0,0,0,0,1],
    [0,0,0,0,1],
    [1,1,1,1,0],
    [0,0,0,0,0],
  ],
  "4": [
    [1,0,0,1,0],
    [1,0,0,1,0],
    [1,1,1,1,1],
    [0,0,0,1,0],
    [0,0,0,1,0],
    [0,0,0,1,0],
    [0,0,0,0,0],
  ],
  "5": [
    [1,1,1,1,1],
    [1,0,0,0,0],
    [1,1,1,1,0],
    [0,0,0,0,1],
    [0,0,0,0,1],
    [1,1,1,1,0],
    [0,0,0,0,0],
  ],
  "6": [
    [0,1,1,1,0],
    [1,0,0,0,0],
    [1,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0],
    [0,0,0,0,0],
  ],
  "7": [
    [1,1,1,1,1],
    [0,0,0,0,1],
    [0,0,0,1,0],
    [0,0,1,0,0],
    [0,1,0,0,0],
    [0,1,0,0,0],
    [0,0,0,0,0],
  ],
  "8": [
    [0,1,1,1,0],
    [1,0,0,0,1],
    [0,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0],
    [0,0,0,0,0],
  ],
  "9": [
    [0,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,1],
    [0,0,0,0,1],
    [0,1,1,1,0],
    [0,0,0,0,0],
  ],
  "0": [
    [0,1,1,1,0],
    [1,0,0,1,1],
    [1,0,1,0,1],
    [1,1,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0],
    [0,0,0,0,0],
  ],
};

interface Dot {
  x: number;
  y: number;
  ox: number;
  oy: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
}

export interface PixelTextProps {
  text: string;
  dotSize?: number;
  gap?: number;
  color?: string;
  explodeRadius?: number;
  explodeForce?: number;
  returnStiffness?: number;
  className?: string;
}

export default function PixelText({
  text = "BEYONDBURG INC.",
  dotSize = 7,
  gap = 3,
  color = "#000000",
  explodeRadius = 110,
  explodeForce = 28,
  returnStiffness = 0.09,
  className = "",
}: PixelTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });

  const [containerWidth, setContainerWidth] = useState<number>(1200);

  const step = dotSize + gap;

  // Build the pixel grid points with 3 pairs of lines of dots for maximum thickness
  const { dots: initialDots, naturalWidth, naturalHeight } = useMemo(() => {
    const chars = text.toUpperCase().split("");
    const rows = 7;
    const charWidth = 5;
    const charSpacing = 2;

    let cursorX = 0;
    const allDots: { col: number; row: number; subOffset: { dx: number; dy: number } }[] = [];

    // 3 pairs of lines (dense sub-grid offsets) for each active stroke pixel
    const subOffsets = [
      { dx: -0.32, dy: -0.32 },
      { dx:  0.00, dy: -0.32 },
      { dx:  0.32, dy: -0.32 },
      { dx: -0.32, dy:  0.00 },
      { dx:  0.00, dy:  0.00 },
      { dx:  0.32, dy:  0.00 },
      { dx: -0.32, dy:  0.32 },
      { dx:  0.00, dy:  0.32 },
      { dx:  0.32, dy:  0.32 },
    ];

    for (const ch of chars) {
      const bitmap = FONT[ch] || FONT[" "];
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < charWidth; col++) {
          if (bitmap[row]?.[col]) {
            for (const sub of subOffsets) {
              allDots.push({
                col: cursorX + col,
                row,
                subOffset: sub,
              });
            }
          }
        }
      }
      cursorX += charWidth + charSpacing;
    }

    const naturalWidth  = (cursorX + 1) * step;
    const naturalHeight = (rows + 1) * step;

    return { dots: allDots, naturalWidth, naturalHeight };
  }, [text, step]);

  // Responsive container width tracking to guarantee the brand name fits 100% within screen
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth || window.innerWidth);
      }
    };

    updateSize();

    const ro = new ResizeObserver(updateSize);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", updateSize);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  // Compute auto-scale factor so long names (e.g. BURGER SEIGNEUR, GOOD FLIPPIN' BURGERS) fit screen width
  const maxAvailableWidth = Math.max(260, containerWidth - 32);
  const autoScale = Math.min(1, maxAvailableWidth / naturalWidth);

  const displayWidth = Math.round(naturalWidth * autoScale);
  const displayHeight = Math.round(naturalHeight * autoScale);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || naturalWidth <= 0 || naturalHeight <= 0) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width  = displayWidth * dpr;
    canvas.height = displayHeight * dpr;
    canvas.style.width  = `${displayWidth}px`;
    canvas.style.height = `${displayHeight}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr * autoScale, dpr * autoScale);

    // Create dot objects with 3-line thick origins
    dotsRef.current = initialDots.map((d) => {
      const originX = (d.col + d.subOffset.dx) * step + dotSize / 2 + step / 2;
      const originY = (d.row + d.subOffset.dy) * step + dotSize / 2 + step / 2;
      return {
        x:  originX,
        y:  originY,
        ox: originX,
        oy: originY,
        vx: 0,
        vy: 0,
        color,
        size: dotSize * 0.46,
      };
    });

    // Mouse tracking relative to the unscaled canvas coordinate space
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / autoScale,
        y: (e.clientY - rect.top) / autoScale,
      };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    // Touch support for mobile
    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (touch.clientX - rect.left) / autoScale,
        y: (touch.clientY - rect.top) / autoScale,
      };
    };
    container.addEventListener("touchmove", handleTouchMove, { passive: true });
    container.addEventListener("touchend", handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, naturalWidth, naturalHeight);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const dots = dotsRef.current;
      const len = dots.length;

      for (let i = 0; i < len; i++) {
        const dot = dots[i];

        const dx = dot.x - mx;
        const dy = dot.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < explodeRadius && dist > 0) {
          const force = (1 - dist / explodeRadius) * explodeForce;
          const angle = Math.atan2(dy, dx);
          dot.vx += Math.cos(angle) * force * 0.6;
          dot.vy += Math.sin(angle) * force * 0.6;
        }

        const springX = (dot.ox - dot.x) * returnStiffness;
        const springY = (dot.oy - dot.y) * returnStiffness;

        dot.vx += springX;
        dot.vy += springY;

        dot.vx *= 0.82;
        dot.vy *= 0.82;

        dot.x += dot.vx;
        dot.y += dot.vy;

        ctx.fillStyle = dot.color;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleMouseLeave);
    };
  }, [initialDots, displayWidth, displayHeight, naturalWidth, naturalHeight, autoScale, dotSize, step, color, explodeRadius, explodeForce, returnStiffness]);

  return (
    <div
      ref={containerRef}
      className={`w-full flex items-center justify-center select-none overflow-hidden ${className}`}
      style={{
        cursor: "none",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          imageRendering: "pixelated",
        }}
      />
    </div>
  );
}
