"use client";

import { useEffect, useRef, useState } from "react";
import { lenisScrollRef } from "../LenisProvider";

const CHAPTERS = [
  { label: "ARRIVAL", id: "chapter-1" },
  { label: "CONSULTATION", id: "chapter-2" },
  { label: "THE CRAFT", id: "chapter-3" },
  { label: "REVEAL", id: "chapter-4" },
  { label: "DEPARTURE", id: "chapter-5" },
];

export default function ScrollProgress() {
  const [activeChapter, setActiveChapter] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const update = () => {
      const progress = lenisScrollRef.current; // 0–1
      const idx = Math.min(
        Math.floor(progress * CHAPTERS.length),
        CHAPTERS.length - 1
      );
      setActiveChapter(idx);
      rafRef.current = requestAnimationFrame(update);
    };
    rafRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const scrollToChapter = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      lenisScrollRef.lenis?.scrollTo(el, { duration: 1.8, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    }
  };

  return (
    <div className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-30 flex flex-col items-end gap-4 pointer-events-none select-none">
      {CHAPTERS.map((ch, i) => (
        <button
          key={ch.id}
          onClick={() => scrollToChapter(ch.id)}
          className="group flex items-center gap-3 pointer-events-auto cursor-pointer"
          aria-label={`Jump to ${ch.label}`}
        >
          {/* Label — visible on hover */}
          <span
            className="font-mono text-[9px] uppercase tracking-[0.25em] transition-all duration-300 opacity-0 group-hover:opacity-100 whitespace-nowrap"
            style={{ color: i === activeChapter ? "#d4a574" : "rgba(255,255,255,0.4)" }}
          >
            {ch.label}
          </span>

          {/* Dot */}
          <div
            className="relative flex items-center justify-center transition-all duration-500"
            style={{
              width: i === activeChapter ? "10px" : "5px",
              height: i === activeChapter ? "10px" : "5px",
            }}
          >
            <div
              className="rounded-full transition-all duration-500"
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: i === activeChapter ? "#d4a574" : "rgba(255,255,255,0.25)",
                boxShadow: i === activeChapter ? "0 0 10px rgba(212,165,116,0.8), 0 0 20px rgba(212,165,116,0.4)" : "none",
              }}
            />
          </div>
        </button>
      ))}
    </div>
  );
}
