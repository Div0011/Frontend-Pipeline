"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Custom Hand-Drawn SVG path components matching the original menu PDF style
const DoodleBurger = () => (
  <svg viewBox="0 0 100 100" className="w-14 h-14 fill-none stroke-black/[0.06] stroke-[3.5] stroke-linecap-round stroke-linejoin-round">
    <path d="M15,45 C15,18 85,18 85,45 Z" />
    <path d="M10,55 L90,55" />
    <path d="M18,55 C18,72 82,72 82,55" />
    <path d="M22,48 L78,48" />
  </svg>
);

const DoodleDrink = () => (
  <svg viewBox="0 0 100 100" className="w-10 h-14 fill-none stroke-black/[0.06] stroke-[3.5] stroke-linecap-round stroke-linejoin-round">
    <path d="M30,35 L36,85 C36,87 64,87 64,85 L70,35" />
    <path d="M25,35 L75,35" />
    <path d="M50,35 L62,15" />
  </svg>
);

const DoodleFries = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-14 fill-none stroke-black/[0.06] stroke-[3.5] stroke-linecap-round stroke-linejoin-round">
    <path d="M30,55 L35,85 L65,85 L70,55 Z" />
    <path d="M25,55 Q50,62 75,55" />
    <path d="M36,55 L32,25 L38,25 L40,55" />
    <path d="M46,55 L46,18 L52,18 L52,55" />
    <path d="M56,55 L60,22 L66,22 L64,55" />
  </svg>
);

const DoodleChefHat = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12 fill-none stroke-black/[0.06] stroke-[3.5] stroke-linecap-round stroke-linejoin-round">
    <path d="M25,65 C13,65 13,45 25,45 C20,30 40,20 50,30 C60,20 80,30 75,45 C87,45 87,65 75,65" />
    <path d="M25,65 L75,65 L70,80 L30,80 Z" />
    <line x1="30" y1="72" x2="70" y2="72" />
  </svg>
);

const DoodleCoffeeFilter = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-14 fill-none stroke-black/[0.06] stroke-[3.5] stroke-linecap-round stroke-linejoin-round">
    <path d="M30,22 L70,22 L60,48 L40,48 Z" />
    <path d="M35,48 L35,76 C35,79 65,79 65,76 L65,48" />
    <path d="M30,76 L70,76" />
    <path d="M20,22 L80,22" />
  </svg>
);

const DoodleChili = () => (
  <svg viewBox="0 0 100 100" className="w-8 h-12 fill-none stroke-black/[0.06] stroke-[3.5] stroke-linecap-round">
    <path d="M50,15 C52,10 60,10 65,15" />
    <path d="M45,22 C45,22 30,35 35,65 C38,80 50,90 52,90 C54,90 68,60 62,35 C60,28 50,22 45,22 Z" />
  </svg>
);

const DoodleComicBurst = () => (
  <svg viewBox="0 0 100 100" className="w-14 h-14 fill-none stroke-black/[0.06] stroke-[3.5] stroke-linejoin-round">
    <path d="M50,10 L58,30 L78,20 L68,40 L88,50 L68,60 L78,80 L58,70 L50,90 L42,70 L22,80 L32,60 L12,50 L32,40 L22,20 L42,30 Z" />
  </svg>
);

const DoodleStar = () => (
  <svg viewBox="0 0 100 100" className="w-8 h-8 fill-none stroke-black/[0.06] stroke-[3.5]">
    <path d="M50,10 L62,38 L92,38 L68,56 L78,86 L50,68 L22,86 L32,56 L8,38 L38,38 Z" />
  </svg>
);

const DoodleArrow = () => (
  <svg viewBox="0 0 100 100" className="w-9 h-9 fill-none stroke-black/[0.06] stroke-[3.5] stroke-linecap-round">
    <path d="M20,50 L80,50 M60,30 L80,50 L60,70" />
  </svg>
);

interface DoodleItem {
  id: number;
  type: string;
  y: number;
  xPercent: number;
  rotate: number;
  speed: number;
}

interface PathSegment {
  id: number;
  top: number;
  left: string;
  width: string;
  height: number;
  viewBox: string;
  d: string;
}

export default function DoodleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [pageHeight, setPageHeight] = useState(18000);

  useEffect(() => {
    setMounted(true);
    
    // Determine page height dynamically to distribute doodles accurately
    const handleResize = () => {
      if (document.body) {
        setPageHeight(document.body.scrollHeight);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Run again after a short delay for image layouts to settle
    const timer = setTimeout(handleResize, 1500);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

  // 1. Generate stable, deterministic doodles distributed down the page
  const doodles = React.useMemo(() => {
    const list: DoodleItem[] = [];
    const types = ["burger", "drink", "fries", "chefhat", "coffee", "chili", "burst", "star", "arrow"];
    const step = 220; // spacing step size
    const count = Math.floor(pageHeight / step);

    for (let i = 0; i < count; i++) {
      const y = 180 + i * step;
      const isLeft = i % 2 === 0;
      
      // Weave coordinates back and forth between columns
      const xPercent = isLeft 
        ? 3 + (i * 11) % 6 // Left column: 3% to 9%
        : 88 - (i * 11) % 6; // Right column: 82% to 88%

      list.push({
        id: i,
        type: types[i % types.length],
        y,
        xPercent,
        rotate: -35 + (i * 19) % 70, // stable rotation
        speed: -15 + (i * 13) % 30,  // stable slight parallax drift
      });
    }
    return list;
  }, [pageHeight]);

  // 2. Generate connecting S-curve paths between consecutive doodles
  const paths = React.useMemo(() => {
    const segments: PathSegment[] = [];
    for (let i = 1; i < doodles.length; i++) {
      const prev = doodles[i - 1];
      const curr = doodles[i];

      const yStart = prev.y + 25; // center vertical offset
      const yEnd = curr.y + 25;
      const xStart = prev.xPercent;
      const xEnd = curr.xPercent;

      const dy = yEnd - yStart;
      const minX = Math.min(xStart, xEnd);
      const maxX = Math.max(xStart, xEnd);
      const dx = maxX - minX;

      // Draw local cubic Bezier curve that scales horizontally but fits vertical pixels
      segments.push({
        id: i,
        top: yStart,
        left: `${minX}%`,
        width: `${dx}%`,
        height: dy,
        viewBox: `0 0 100 ${dy}`,
        d: xStart < xEnd
          ? `M 5,5 C 50,5 50,${dy - 5} 95,${dy - 5}` // Left-to-right weave
          : `M 95,5 C 50,5 50,${dy - 5} 5,${dy - 5}`, // Right-to-left weave
      });
    }
    return segments;
  }, [doodles]);

  // 3. Apply scroll-linked parallax to elements
  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const items = containerRef.current?.querySelectorAll(".bg-doodle");
      items?.forEach((item, index) => {
        const speed = doodles[index]?.speed || 0;
        gsap.to(item, {
          y: speed,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [mounted, doodles]);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none w-full h-full overflow-hidden z-[1]"
    >
      {/* 1. Dotted Map Path Network */}
      {paths.map((p) => (
        <svg
          key={`path-${p.id}`}
          style={{
            position: "absolute",
            top: `${p.top}px`,
            left: p.left,
            width: p.width,
            height: `${p.height}px`,
          }}
          viewBox={p.viewBox}
          className="overflow-visible pointer-events-none opacity-40"
          preserveAspectRatio="none"
        >
          <path
            d={p.d}
            fill="none"
            stroke="#1A1A1A"
            strokeWidth="2"
            strokeDasharray="6,8"
            className="stroke-black/[0.08]"
          />
        </svg>
      ))}

      {/* 2. Floating Sketches */}
      {doodles.map((d) => (
        <div
          key={`doodle-${d.id}`}
          className="bg-doodle absolute select-none pointer-events-none"
          style={{
            top: `${d.y}px`,
            left: d.xPercent < 50 ? `${d.xPercent}%` : undefined,
            right: d.xPercent >= 50 ? `${100 - d.xPercent}%` : undefined,
            transform: `rotate(${d.rotate}deg)`,
          }}
        >
          {d.type === "burger" && <DoodleBurger />}
          {d.type === "drink" && <DoodleDrink />}
          {d.type === "fries" && <DoodleFries />}
          {d.type === "chefhat" && <DoodleChefHat />}
          {d.type === "coffee" && <DoodleCoffeeFilter />}
          {d.type === "chili" && <DoodleChili />}
          {d.type === "burst" && <DoodleComicBurst />}
          {d.type === "star" && <DoodleStar />}
          {d.type === "arrow" && <DoodleArrow />}
        </div>
      ))}
    </div>
  );
}
