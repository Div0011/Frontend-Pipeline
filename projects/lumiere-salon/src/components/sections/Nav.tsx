"use client";

import { useState, useEffect } from "react";
import { lenisScrollRef } from "../LenisProvider";

const NAV_CHAPTERS = [
  { label: "Arrival", id: "chapter-1" },
  { label: "Consultation", id: "chapter-2" },
  { label: "Services", id: "chapter-3" },
  { label: "Reveal", id: "chapter-4" },
  { label: "Reserve", id: "chapter-5" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    lenisScrollRef.lenis?.scrollTo(el, {
      duration: 1.8,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  };

  return (
    <header
      className="fixed top-0 left-0 z-40 w-full px-8 md:px-16 lg:px-24 py-5 flex items-center justify-between pointer-events-auto transition-all duration-700"
      style={{
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        backgroundColor: scrolled ? "rgba(10,10,10,0.85)" : "transparent",
      }}
    >
      {/* Wordmark */}
      <button
        onClick={() => scrollTo("chapter-1")}
        data-cursor="hover"
        data-cursor-label="HOME"
        className="font-display text-lg md:text-xl tracking-[0.35em] text-white hover:text-[#d4a574] transition-colors duration-500 cursor-pointer"
      >
        LUMIÈRE
      </button>

      {/* Chapter links — minimal */}
      <nav className="hidden md:flex items-center gap-10 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
        {NAV_CHAPTERS.map((ch) => (
          <button
            key={ch.id}
            onClick={() => scrollTo(ch.id)}
            data-cursor="hover"
            className="hover:text-white/80 transition-colors duration-300 cursor-pointer"
          >
            {ch.label}
          </button>
        ))}
      </nav>

      {/* Minimal CTA — just text + line */}
      <button
        onClick={() => scrollTo("chapter-5")}
        data-cursor="hover"
        data-cursor-label="RESERVE"
        className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#d4a574]/70 hover:text-[#d4a574] transition-colors duration-300 cursor-pointer"
      >
        Reserve
        <span className="w-6 h-px bg-[#d4a574]/40 group-hover:w-10 group-hover:bg-[#d4a574] transition-all duration-500" />
      </button>
    </header>
  );
}
