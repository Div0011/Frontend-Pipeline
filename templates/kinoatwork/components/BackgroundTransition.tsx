"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SECTION_COLORS = [
  { id: "hero-section", color: "#131211", weight: 0.28 },
  { id: "reel", color: "#0e0d0c", weight: 0.18 },
  { id: "work", color: "#F8F6F3", weight: 0.24 },
  { id: "parallax-strip", color: "#2D2A26", weight: 0.18 },
  { id: "philosophy", color: "#2D2A26", weight: 0.12 },
  { id: "contact", color: "#F8F6F3", weight: 0.0 },
];

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return { r, g, b };
}

function lerpColor(a: string, b: string, t: number) {
  const c1 = hexToRgb(a);
  const c2 = hexToRgb(b);
  const r = Math.round(c1.r + (c2.r - c1.r) * t);
  const g = Math.round(c1.g + (c2.g - c1.g) * t);
  const blue = Math.round(c1.b + (c2.b - c1.b) * t);
  return `rgb(${r}, ${g}, ${blue})`;
}

export default function BackgroundTransition() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bgRef.current) return;

    const ctx = gsap.context(() => {
      const main = bgRef.current;
      if (!main) return;

      const sections = SECTION_COLORS.map((s) => ({
        ...s,
        el: document.getElementById(s.id),
      })).filter((s) => s.el);

      if (sections.length < 2) return;

      const scrollRange =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollRange <= 0) return;

      const colorStops = sections.map((s) => {
        const rect = s.el!.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const progress = Math.max(0, Math.min(1, sectionTop / scrollRange));
        return { color: s.color, progress };
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
        },
      });

      colorStops.forEach((stop, idx) => {
        if (idx === 0) {
          tl.to(main, {
            backgroundColor: stop.color,
            duration: 0.01,
          }, 0);
          return;
        }

        const prev = colorStops[idx - 1];
        const progress = stop.progress;

        tl.to(main, {
          backgroundColor: stop.color,
          duration: progress - prev.progress,
          ease: "none",
        }, prev.progress);
      });
    }, bgRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={bgRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ backgroundColor: "#131211" }}
    />
  );
}
