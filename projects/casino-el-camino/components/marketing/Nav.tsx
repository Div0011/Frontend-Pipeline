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
          ? "bg-[#0a0a0c]/90 backdrop-blur-lg border-b border-white/10 py-3 shadow-2xl"
          : "bg-transparent py-4"
      } text-white`}
    >
      <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-64 sm:w-80 h-10">
            <Image
              src="/logo.svg"
              alt="Casino El Camino"
              fill
              unoptimized
              className="object-contain object-left group-hover:opacity-90 transition-opacity duration-200"
              priority
            />
          </div>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-sans font-semibold tracking-wider uppercase text-stone-300">
          <Link href="/menu" className="hover:text-white transition-colors">
            Menu
          </Link>
          <Link href="/about" className="hover:text-white transition-colors">
            Our Story
          </Link>
          <Link href="/locations" className="hover:text-white transition-colors">
            Locations
          </Link>
          <Link href="/films" className="hover:text-white transition-colors">
            Films
          </Link>
        </nav>

        {/* Primary CTA Button */}
        <div className="flex items-center gap-4">
          <Link
            href="/menu"
            className="px-5 py-2.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all shadow-md"
            style={{
              backgroundColor: "#DC2626",
              color: "#FFFFFF",
            }}
          >
            Full Menu →
          </Link>
        </div>
      </div>
    </header>
  );
}
