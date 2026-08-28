#!/usr/bin/env python3
"""
Master script applying all user-specified brand revisions:
1. Multi-line PixelText with centered multi-row dot grid engine
2. Dan's Hamburgers: 100% Red (#E52421) & White (#FFFFFF)
3. Beyondburg Inc.: 100% Dark Green (#122B1E) & White (#FFFFFF)
4. Burger Seigneur: 100% Forest Green (#418043), White (#FFFFFF), and Black (#0A0A0A)
5. Truffles Bangalore: 100% Neon Yellow (#FFE500), Slate Grey (#2A2A2A), and White (#FFFFFF)
6. Casino El Camino: 2-line stacked footer brand name ("CASINO EL\\nCAMINO")
7. Authentic vector logos and favicons for all brands
"""

import os
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).parent.parent
PROJECTS_DIR = ROOT / "projects"

MULTILINE_PIXEL_TEXT_CODE = '''"use client";

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
  "\'": [
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
    const lines = text.split("\\n");
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
'''

def update_pixel_text_everywhere():
    print("👉 Propagating multi-line PixelText.tsx across all projects...")
    for project_dir in sorted(PROJECTS_DIR.iterdir()):
        if not project_dir.is_dir() or project_dir.name in ["fabroar", "superfan-redesign", "smash-guys"]:
            continue
        pt_file = project_dir / "components" / "ui" / "PixelText.tsx"
        if pt_file.exists():
            pt_file.write_text(MULTILINE_PIXEL_TEXT_CODE)
            print(f"  ✓ Updated PixelText.tsx in {project_dir.name}")

def update_dans_burgers():
    print("👉 Rebuilding Dan's Hamburgers strictly in Red (#E52421) & White (#FFFFFF)...")
    p_dir = PROJECTS_DIR / "dans-burgers"
    
    # 1. Logo SVG (Authentic Red & White Seal)
    logo_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <circle cx="50" cy="50" r="46" stroke="#E52421" stroke-width="3" fill="#0A0A0A" />
  <circle cx="50" cy="50" r="41" stroke="#E52421" stroke-width="1" stroke-dasharray="2 2" fill="none" opacity="0.6" />
  <!-- White Star & Bold Script D in Red -->
  <polygon points="50,16 53,24 61,24 55,29 57,37 50,32 43,37 45,29 39,24 47,24" fill="#FFFFFF" />
  <text x="50" y="66" fill="#E52421" font-family="'Space Grotesk', 'Impact', sans-serif" font-size="34" font-weight="900" text-anchor="middle">D</text>
  <text x="50" y="82" fill="#FFFFFF" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="700" text-anchor="middle" letter-spacing="1">EST 1973</text>
</svg>"""
    (p_dir / "public" / "logo.svg").write_text(logo_svg)

    # 2. Replace amber #D97706 with Red #E52421 across all files
    for root, _, files in os.walk(p_dir):
        for file in files:
            if file.endswith(('.tsx', '.ts', '.css', '.json')) and not file.startswith('package'):
                fp = Path(root) / file
                txt = fp.read_text()
                txt = re.sub(r'#D97706|#d97706', '#E52421', txt)
                fp.write_text(txt)

    print("  ✓ Dan's Hamburgers is now strictly Red & White!")

def update_beyondburg_inc():
    print("👉 Rebuilding Beyondburg Inc. strictly in Dark Green (#122B1E) & White (#FFFFFF)...")
    p_dir = PROJECTS_DIR / "beyondburg-inc"
    
    # 1. Logo SVG (Dark Green & White Geometric Mark)
    logo_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <rect x="6" y="6" width="88" height="88" rx="20" stroke="#122B1E" stroke-width="3" fill="#0A0A0A" />
  <!-- Dark Green Geometric Double Stack B -->
  <path d="M34 26 H56 C64 26 70 31 70 38 C70 43 66 47 60 48 C68 49 72 54 72 62 C72 70 65 74 56 74 H34 V26 Z M44 35 V45 H54 C58 45 61 43 61 40 C61 37 58 35 54 35 H44 Z M44 54 V65 H55 C60 65 63 63 63 59.5 C63 56 60 54 55 54 H44 Z" fill="#1B4D36" />
</svg>"""
    (p_dir / "public" / "logo.svg").write_text(logo_svg)

    # 2. Replace yellow #F5C418 with Dark Green #122B1E / Forest Green #1B4D36
    for root, _, files in os.walk(p_dir):
        for file in files:
            if file.endswith(('.tsx', '.ts', '.css', '.json')) and not file.startswith('package'):
                fp = Path(root) / file
                txt = fp.read_text()
                txt = re.sub(r'#F5C418|#f5c418|#EAA824', '#1B4D36', txt)
                fp.write_text(txt)

    print("  ✓ Beyondburg Inc. is now strictly Dark Green & White!")

def update_burger_seigneur():
    print("👉 Rebuilding Burger Seigneur strictly in Forest Green (#418043), White (#FFFFFF) & Black (#0A0A0A)...")
    p_dir = PROJECTS_DIR / "burger-seigneur"
    
    # 1. Logo SVG (Forest Green & White Crown Seal)
    logo_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <circle cx="50" cy="50" r="46" stroke="#418043" stroke-width="3" fill="#0A0A0A" />
  <circle cx="50" cy="50" r="41" stroke="#418043" stroke-width="1" stroke-dasharray="2 2" fill="none" opacity="0.6" />
  <!-- French Crown in Forest Green -->
  <path d="M30 38 L38 48 L50 32 L62 48 L70 38 L67 58 L33 58 Z" fill="#418043" />
  <circle cx="30" cy="36" r="2.5" fill="#418043" />
  <circle cx="50" cy="30" r="3" fill="#418043" />
  <circle cx="70" cy="36" r="2.5" fill="#418043" />
  <!-- Monogram BS in White -->
  <text x="50" y="76" fill="#FFFFFF" font-family="'Space Grotesk', 'Impact', sans-serif" font-size="20" font-weight="900" text-anchor="middle" letter-spacing="1">BS</text>
</svg>"""
    (p_dir / "public" / "logo.svg").write_text(logo_svg)

    # 2. Replace Gold #C8A96E with Forest Green #418043 across all files
    for root, _, files in os.walk(p_dir):
        for file in files:
            if file.endswith(('.tsx', '.ts', '.css', '.json')) and not file.startswith('package'):
                fp = Path(root) / file
                txt = fp.read_text()
                txt = re.sub(r'#C8A96E|#c8a96e', '#418043', txt)
                fp.write_text(txt)

    print("  ✓ Burger Seigneur is now strictly Forest Green, White, and Black!")

def update_truffles_bangalore():
    print("👉 Rebuilding Truffles strictly in Neon Yellow (#FFE500), Slate Grey (#2A2A2A) & White (#FFFFFF)...")
    p_dir = PROJECTS_DIR / "truffles-bangalore"
    
    # 1. Logo SVG (Neon Yellow & Slate Grey Emblem)
    logo_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <circle cx="50" cy="50" r="46" stroke="#FFE500" stroke-width="3" fill="#2A2A2A" />
  <!-- Burger Bun in Neon Yellow -->
  <path d="M30 46 C30 36 70 36 70 46 Z" fill="#FFE500" />
  <rect x="28" y="49" width="44" height="4" rx="2" fill="#FFE500" />
  <rect x="30" y="55" width="40" height="4" rx="2" fill="#FFE500" />
  <!-- Monogram T in White -->
  <text x="50" y="78" fill="#FFFFFF" font-family="'Space Grotesk', 'Syne', sans-serif" font-size="22" font-weight="900" text-anchor="middle">T</text>
</svg>"""
    (p_dir / "public" / "logo.svg").write_text(logo_svg)

    # 2. Replace Amber #F5A623 with Neon Yellow #FFE500
    for root, _, files in os.walk(p_dir):
        for file in files:
            if file.endswith(('.tsx', '.ts', '.css', '.json')) and not file.startswith('package'):
                fp = Path(root) / file
                txt = fp.read_text()
                txt = re.sub(r'#F5A623|#f5a623', '#FFE500', txt)
                fp.write_text(txt)

    print("  ✓ Truffles is now strictly Neon Yellow, Grey, and White!")

def update_casino_el_camino_footer():
    print("👉 Updating Casino El Camino footer to 2-line stacked brand name...")
    footer_file = PROJECTS_DIR / "casino-el-camino" / "components" / "marketing" / "Footer.tsx"
    if footer_file.exists():
        txt = footer_file.read_text()
        txt = txt.replace('text="CASINO EL CAMINO"', 'text="CASINO EL\\nCAMINO"')
        footer_file.write_text(txt)
        print("  ✓ Casino El Camino footer brand name stacked into 2 bold lines!")

def main():
    update_pixel_text_everywhere()
    update_dans_burgers()
    update_beyondburg_inc()
    update_burger_seigneur()
    update_truffles_bangalore()
    update_casino_el_camino_footer()
    print("🎉 All brand revisions deployed successfully!")

if __name__ == "__main__":
    main()
