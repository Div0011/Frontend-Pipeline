"use client";

import { useState, useEffect } from "react";
import { lenisScrollRef } from "../LenisProvider";

const NAV_LINKS = [
  { label: "Sanctuary", id: "hero-section" },
  { label: "Threshold", id: "entrance-section" },
  { label: "Suites", id: "suites-section" },
  { label: "Experiences", id: "experience-section" },
];

export default function Nav({ onOpenBooking }: { onOpenBooking: () => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    lenisScrollRef.lenis?.scrollTo(el, {
      duration: 1.6,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  };

  return (
    <header
      className="fixed top-0 left-0 z-40 w-full px-8 md:px-20 py-6 flex items-center justify-between transition-all duration-700 pointer-events-auto"
      style={{
        backgroundColor: scrolled ? "rgba(22, 3, 6, 0.94)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(245, 208, 97, 0.12)" : "1px solid transparent",
      }}
    >
      {/* Minimal Royal Wordmark */}
      <button
        onClick={() => scrollTo("hero-section")}
        data-cursor="hover"
        data-cursor-label="PALACE"
        className="flex flex-col text-left group cursor-pointer"
      >
        <span className="font-display text-xl md:text-2xl tracking-[0.35em] text-[#f5d061] group-hover:text-[#ffdf7a] transition-colors">
          RAAJMAHAL
        </span>
        <span className="font-mono text-[8px] uppercase tracking-[0.45em] text-[#faf0ca]/50">
          JAIPUR SANCTUARY
        </span>
      </button>

      {/* Spaced Ghost Links */}
      <nav className="hidden lg:flex items-center gap-12 font-mono text-[10px] uppercase tracking-[0.3em] text-[#faf0ca]/60">
        {NAV_LINKS.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            data-cursor="hover"
            className="hover:text-[#f5d061] transition-colors duration-300 relative group cursor-pointer"
          >
            {item.label}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#f5d061] transition-all duration-300 group-hover:w-full" />
          </button>
        ))}
      </nav>

      {/* Minimal Reserve CTA */}
      <button
        onClick={onOpenBooking}
        data-cursor="hover"
        data-cursor-label="WELCOME"
        className="px-7 py-3 border border-[#f5d061]/50 text-[#f5d061] font-mono text-[10px] uppercase tracking-[0.3em] hover:bg-[#f5d061] hover:text-[#160306] transition-all duration-500 cursor-pointer"
      >
        Reserve Stay
      </button>
    </header>
  );
}
