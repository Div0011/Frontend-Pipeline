"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop || window.scrollY || 0;

      if (currentScrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = Math.max(0, currentScrollY);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-out select-none ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      } ${
        isScrolled
          ? "backdrop-blur-xl border-b py-3 shadow-md bg-white/92 border-[#C68A14]/20"
          : "bg-white/80 backdrop-blur-sm py-4 border-b border-black/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between">
        {/* Brand Emblem Badge + Brand Title */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-[#C68A14]/40 p-1 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200 shadow-sm">
            <Image
              src="/logo.svg"
              alt="Dirty Martin's Emblem"
              width={32}
              height={32}
              unoptimized
              className="object-contain"
              priority
            />
          </div>
          <span className="type-display text-lg sm:text-xl md:text-2xl font-black text-black tracking-tight group-hover:opacity-90 transition-opacity">
            DIRTY MARTIN&apos;S
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-sans font-bold tracking-wider uppercase text-stone-800">
          <Link href="/menu" className="hover:text-[#C68A14] transition-colors">
            Menu
          </Link>
          <Link href="/about" className="hover:text-[#C68A14] transition-colors">
            Our Story
          </Link>
          <Link href="/locations" className="hover:text-[#C68A14] transition-colors">
            Locations
          </Link>
          <Link href="/films" className="hover:text-[#C68A14] transition-colors">
            Films
          </Link>
        </nav>

        {/* Primary CTA Button */}
        <div className="flex items-center gap-4">
          <Link
            href="/menu"
            className="px-5 py-2.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider bg-[#C68A14] text-white hover:bg-[#B37B0F] active:scale-95 transition-all shadow-md"
          >
            Full Menu →
          </Link>
        </div>
      </div>
    </header>
  );
}
