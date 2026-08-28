"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";

// 5×7 pixel font bitmap for uppercase letters, numbers and symbols
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
    [1,0,0,0,0],
    [1,0,1,1,1],
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
    [0,0,1,1,1],
    [0,0,0,1,0],
    [0,0,0,1,0],
    [0,0,0,1,0],
    [1,0,0,1,0],
    [0,1,1,0,0],
    [0,0,0,0,0],
  ],
  K: [
    [1,0,0,0,1],
    [1,0,0,1,0],
    [1,1,1,0,0],
    [1,0,0,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
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
    [1,0,0,1,0],
    [0,1,1,0,1],
    [0,0,0,0,0],
  ],
  R: [
    [1,1,1,1,0],
    [1,0,0,0,1],
    [1,1,1,1,0],
    [1,0,0,1,0],
    [1,0,0,0,1],
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
    [0,1,0,1,0],
    [1,0,0,0,1],
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
    [0,0,0,0,0],
  ],
  "'": [
    [0,1,1,0,0],
    [0,0,1,0,0],
    [0,1,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
  ],
  "-": [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [1,1,1,1,1],
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
    [1,0,0,0,1],
    [0,1,1,1,0],
    [0,0,0,0,0],
  ]
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

interface PixelTextProps {
  text?: string;
  dotSize?: number;
  gap?: number;
  color?: string;
  explodeRadius?: number;
  explodeForce?: number;
  returnStiffness?: number;
  className?: string;
}

export default function PixelText({
  text = "BRAND",
  dotSize = 10,
  gap = 3,
  color = "#FFFFFF",
  explodeRadius = 120,
  explodeForce = 28,
  returnStiffness = 0.09,
  className = "",
}: PixelTextProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });
  const animFrameRef = useRef<number | null>(null);
  const [containerWidth, setContainerWidth] = useState(1200);

  const step = dotSize + gap;

  // Compute multi-line dot grid with centered horizontal rows
  const { dots: initialDots, naturalWidth, naturalHeight } = useMemo(() => {
    const lines = text.split("\n");
    const charWidth = 5;
    const rows = 7;
    const charSpacing = 1;
    const lineSpacing = 3;

    let maxLineCols = 0;
    lines.forEach((line) => {
      const chars = line.toUpperCase().split("");
      let lineCols = 0;
      chars.forEach(() => {
        lineCols += charWidth + charSpacing;
      });
      if (lineCols > maxLineCols) maxLineCols = lineCols;
    });

    const allDots: { col: number; row: number; subOffset: { dx: number; dy: number } }[] = [];

    // Dense 3-line thick cluster
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

    const totalGridRows = lines.length * rows + (lines.length - 1) * lineSpacing;

    lines.forEach((line, lineIndex) => {
      const chars = line.toUpperCase().split("");
      const lineWidth = chars.length * (charWidth + charSpacing);
      const startX = Math.floor((maxLineCols - lineWidth) / 2);
      let cursorX = startX;
      const startRow = lineIndex * (rows + lineSpacing);

      for (const ch of chars) {
        const bitmap = FONT[ch] || FONT[" "];
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < charWidth; c++) {
            if (bitmap[r]?.[c]) {
              for (const sub of subOffsets) {
                allDots.push({
                  col: cursorX + c,
                  row: startRow + r,
                  subOffset: sub,
                });
              }
            }
          }
        }
        cursorX += charWidth + charSpacing;
      }
    });

    const natW = (maxLineCols + 1) * step;
    const natH = (totalGridRows + 1) * step;

    return { dots: allDots, naturalWidth: natW, naturalHeight: natH };
  }, [text, step]);

  // Responsive tracking to auto-scale canvas to fit 100% inside container
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
      style={{ cursor: "none" }}
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
