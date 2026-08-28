"use client";

import { useState, useEffect } from "react";

export default function Header({ onToggleMenu }: { onToggleMenu: () => void }) {
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  useEffect(() => {
    const fn = () => {
      // Hide header completely as soon as user scrolls past hero top (80px)
      setScrolledPastHero(window.scrollY > 80);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] flex justify-between items-center px-8 md:px-16 py-6 border-0 transition-all duration-500 ease-out ${
        scrolledPastHero
          ? "opacity-0 -translate-y-full pointer-events-none"
          : "opacity-100 translate-y-0 pointer-events-auto"
      }`}
    >
      {/* Brand logo */}
      <a
        href="#"
        className="font-sans-display text-white text-lg tracking-[0.25em] uppercase hover:opacity-75 transition-opacity"
      >
        FORGE
      </a>

      {/* Menu Trigger */}
      <button
        onClick={onToggleMenu}
        className="group flex items-center gap-3 py-2 px-1 text-white hover:opacity-75 transition-opacity"
        aria-label="Open menu"
      >
        <span className="font-mono-label text-[0.68rem] tracking-[0.25em]">MENU</span>
        <div className="flex flex-col gap-[6px]">
          <span className="block w-5 h-px bg-white transition-transform duration-300 group-hover:scale-x-75 origin-right" />
          <span className="block w-5 h-px bg-white transition-transform duration-300" />
        </div>
      </button>
    </header>
  );
}
