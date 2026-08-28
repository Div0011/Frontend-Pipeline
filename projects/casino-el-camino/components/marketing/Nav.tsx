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
          ? "backdrop-blur-xl border-b py-3 shadow-2xl bg-[#0e0505]/88 border-white/10"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between">
        {/* Brand Emblem + Name */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/40 border border-white/15 p-1 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200 shadow-md">
            <Image
              src="/logo.svg"
              alt="CASINO EL CAMINO Emblem"
              width={32}
              height={32}
              unoptimized
              className="object-contain"
              priority
            />
          </div>
          <span className="type-display text-lg sm:text-xl md:text-2xl font-black text-white dark:text-white light:text-black tracking-tight group-hover:opacity-90 transition-opacity">
            CASINO EL CAMINO
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-sans font-semibold tracking-wider uppercase text-stone-300 dark:text-stone-300 light:text-stone-800">
          <Link href="/menu" className="hover:text-white dark:hover:text-white light:hover:text-black transition-colors">
            Menu
          </Link>
          <Link href="/about" className="hover:text-white dark:hover:text-white light:hover:text-black transition-colors">
            Our Story
          </Link>
          <Link href="/locations" className="hover:text-white dark:hover:text-white light:hover:text-black transition-colors">
            Locations
          </Link>
          <Link href="/films" className="hover:text-white dark:hover:text-white light:hover:text-black transition-colors">
            Films
          </Link>
        </nav>

        {/* Inverting Action CTA Button */}
        <div className="flex items-center gap-4">
          <Link
            href="/menu"
            className="btn-primary px-5 py-2.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider shadow-md"
          >
            Full Menu →
          </Link>
        </div>
      </div>
    </header>
  );
}
