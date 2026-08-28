#!/usr/bin/env python3
"""
Custom builder for Dirty Martin's:
- Default mode: Pure White (#FFFFFF) / Clean Ivory (#FAF9F5) background.
- Primary accent: Vintage Texas Dark Mustard (#C68A14).
- Text: Black (#0A0A0A) on light surfaces, White (#FFFFFF) on Mustard buttons.
- STRICTLY NO black background anywhere (cards, header, footer, hero all use white/mustard/cream).
"""

import re
from pathlib import Path

ROOT = Path(__file__).parent.parent
DM_DIR = ROOT / "projects" / "dirty-martins"

# 1. Logo SVG with White Background & Mustard Crest
LOGO_SVG = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <!-- Crisp White Background Circle -->
  <circle cx="50" cy="50" r="48" fill="#FFFFFF" />
  <circle cx="50" cy="50" r="45" stroke="#C68A14" stroke-width="3" fill="#FFFFFF" />
  <circle cx="50" cy="50" r="39" stroke="#C68A14" stroke-width="1" stroke-dasharray="2 2" fill="none" opacity="0.6" />
  <!-- 1926 Kum-Bak Dark Mustard Seal -->
  <text x="50" y="42" fill="#C68A14" font-family="'Space Grotesk', 'Impact', sans-serif" font-size="13" font-weight="900" text-anchor="middle" letter-spacing="2">KUM-BAK</text>
  <text x="50" y="66" fill="#0A0A0A" font-family="'Space Grotesk', 'Impact', sans-serif" font-size="24" font-weight="900" text-anchor="middle">1926</text>
  <text x="50" y="82" fill="#C68A14" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="700" text-anchor="middle" letter-spacing="1">AUSTIN, TX</text>
</svg>"""

# 2. globals.css for Dirty Martin's (Default White Background, Mustard Accent, Black Text)
GLOBALS_CSS = """@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;700&family=JetBrains+Mono:wght@400;700&family=Space+Grotesk:wght@500;700;900&display=swap');
@import "tailwindcss";

@theme {
  --color-char: #122B1E;
  --color-char-soft: #1B3B2B;
  --color-char-mute: #284F3B;
  --color-smoke: #8FAEA0;
  --color-stone: #C5D9CE;
  --color-bone: #FAF8F2;
  --color-bone-warm: #F4EFE6;
  --color-bone-dark: #E4DCCF;
  --color-ember: #DE3B2B;
  --color-ember-glow: #F04F3F;
  --color-yolk: #C68A14;
  --color-yolk-light: #E5A93C;
  
  --font-display: 'Bebas Neue', 'Space Grotesk', Impact, sans-serif;
  --font-body: 'DM Sans', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}

/* ─── Dirty Martin's: Pure White Background, Mustard Accents, Black Text ─── */
:root {
  --bg:                  #FFFFFF;
  --fg:                  #0A0A0A;
  --fg-muted:            rgba(10, 10, 10, 0.70);
  --fg-sub:              rgba(10, 10, 10, 0.45);
  --border:              rgba(198, 138, 20, 0.25);
  --primary:             #C68A14;
  
  /* Action Buttons: Mustard background with Crisp White text */
  --btn-primary-bg:      #C68A14;
  --btn-primary-fg:      #FFFFFF;
  --btn-secondary-bg:    #FFFFFF;
  --btn-secondary-fg:    #0A0A0A;
  --btn-secondary-border:rgba(198, 138, 20, 0.40);
  --btn-invert-bg:       #0A0A0A;
  --btn-invert-fg:       #FFFFFF;
}

html.light, html.dark {
  --bg:                  #FFFFFF;
  --fg:                  #0A0A0A;
  --fg-muted:            rgba(10, 10, 10, 0.70);
  --fg-sub:              rgba(10, 10, 10, 0.45);
  --border:              rgba(198, 138, 20, 0.25);
  --primary:             #C68A14;
  --btn-primary-bg:      #C68A14;
  --btn-primary-fg:      #FFFFFF;
  --btn-secondary-bg:    #FFFFFF;
  --btn-secondary-fg:    #0A0A0A;
  --btn-secondary-border:rgba(198, 138, 20, 0.40);
}

/* ─── Base ─────────────────────────────────────────────────────────── */
*, *::before, *::after {
  cursor: none !important;
}

input, textarea, select, [contenteditable] {
  cursor: text !important;
}

body {
  background-color: var(--bg);
  color: var(--fg);
  font-family: var(--font-body), sans-serif;
  overflow-x: hidden;
  transition: background-color 0.4s ease, color 0.4s ease;
}

.type-display {
  font-family: var(--font-display), sans-serif;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  line-height: 0.9;
}

/* ─── BUTTONS ──────────────────────────────────────────────────────── */
.btn-primary {
  background-color: #C68A14 !important;
  color: #FFFFFF !important;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-primary:hover {
  background-color: #B37B0F !important;
  transform: scale(1.03);
}

.btn-secondary {
  background-color: #FFFFFF !important;
  color: #0A0A0A !important;
  border: 1px solid rgba(198, 138, 20, 0.40) !important;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-secondary:hover {
  background-color: #FAF8F2 !important;
  border-color: #C68A14 !important;
  transform: scale(1.03);
}

/* ─── PROTECTED HERO OVERLAY ZONES ─────────────────────────────────── */
[data-image-overlay],
[data-image-overlay] * {
  color: #0A0A0A;
}

.img-overlay-text,
.img-overlay-text * {
  color: #0A0A0A;
}
"""

# 3. layout.tsx
LAYOUT_TSX = """import InteractiveBackground from "@/components/ui/InteractiveBackground";
import AtmosphereControls from "@/components/ui/AtmosphereControls";
import type { Metadata } from "next";
import LenisProvider from "@/components/providers/LenisProvider";
import CustomCursor from "@/components/marketing/CustomCursor";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dirty Martin's Kum-Bak | AUSTIN",
  description: "Dirty Martin's Kum-Bak — Historic 1926 Culinary Craft in Austin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className="antialiased overflow-x-hidden bg-white text-black transition-colors duration-500">
        <LenisProvider>
          <InteractiveBackground primaryColor="#C68A14" themeBase="#FFFFFF" />
          <CustomCursor />
          {children}
          <AtmosphereControls primaryColor="#C68A14" darkBg="#FFFFFF" lightBg="#FAF8F2" />
        </LenisProvider>
      </body>
    </html>
  );
}
"""

# 4. Nav.tsx
NAV_TSX = """"use client";

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
      }}
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
"""

# 5. CinematicHero.tsx
HERO_TSX = """"use client";

import React, { useState } from "react";
import Link from "next/link";
import CanvasScrubber from "./CanvasScrubber";

const FRAME_COUNT = 248;
const BURGER_FRAMES = Array.from({ length: FRAME_COUNT }, (_, i) =>
  `/frames/burger/frame_${String(i).padStart(6, "0")}.webp`
);

function getStage(progress: number): 1 | 2 | 3 {
  if (progress < 0.32) return 1;
  if (progress < 0.68) return 2;
  return 3;
}

export default function CinematicHero() {
  const [progress, setProgress] = useState(0);
  const stage = getStage(progress);
  const currentFrame = Math.min(FRAME_COUNT, Math.floor(progress * FRAME_COUNT) + 1);

  return (
    <CanvasScrubber
      frames={BURGER_FRAMES}
      scrollDistance="+=350%"
      onProgress={setProgress}
      overlayGradient
      preloadCount={60}
    >
      <div data-image-overlay className="h-full max-w-7xl mx-auto px-6 sm:px-12 md:px-20 relative select-none">
        
        {/* ── Stage 1: Hero Reveal (0–32% Scroll) ── */}
        <div
          className="absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-out"
          style={{
            opacity: stage === 1 ? 1 : 0,
            transform: stage === 1 ? "translateY(0)" : "translateY(-30px)",
            pointerEvents: stage === 1 ? "auto" : "none",
          }}
        >
          <div className="max-w-4xl space-y-6">
            {/* Live Status Pill */}
            <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 border border-[#C68A14]/30 backdrop-blur-xl w-fit shadow-md">
              <span className="w-2.5 h-2.5 rounded-full animate-pulse bg-[#C68A14]" />
              <span className="font-sans text-xs font-bold uppercase tracking-wider text-black">
                1926 Texas Kum-Bak Burger Legend · Austin, TX
              </span>
            </div>

            <h1 className="type-display text-6xl sm:text-8xl md:text-9xl lg:text-[9.5rem] text-black leading-none font-black tracking-tight drop-shadow-sm">
              DIRTY MARTIN&apos;S
            </h1>

            <div className="pt-2 flex flex-wrap gap-4 font-sans font-bold text-xs uppercase tracking-wider">
              <Link
                href="/menu"
                className="px-8 py-4 rounded-full bg-[#C68A14] text-white hover:bg-[#B37B0F] shadow-xl flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
              >
                <span>Explore Menu</span>
                <span>→</span>
              </Link>
              <Link
                href="/locations"
                className="px-8 py-4 rounded-full bg-white text-black border border-[#C68A14]/40 hover:bg-[#FAF8F2] shadow-md transition-transform hover:scale-105 active:scale-95"
              >
                Outposts
              </Link>
            </div>
          </div>
        </div>

        {/* ── Stage 2: Sizzle Kinetics (32–68% Scroll) ── */}
        <div
          className="absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-out"
          style={{
            opacity: stage === 2 ? 1 : 0,
            transform: stage === 2 ? "translateY(0)" : stage < 2 ? "translateY(30px)" : "translateY(-30px)",
            pointerEvents: stage === 2 ? "auto" : "none",
          }}
        >
          <div className="max-w-3xl space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest px-3 py-1 bg-white/90 backdrop-blur-md rounded-full border border-[#C68A14]/30 inline-block font-extrabold text-[#C68A14] shadow-sm">
              PHASE 01 / CRAFT KINETICS
            </span>

            <h2 className="type-display text-5xl sm:text-7xl md:text-8xl text-black leading-none font-black tracking-tight drop-shadow-sm">
              CENTURY-OLD GRIDDLE SEAR
            </h2>

            <p className="type-serif text-base sm:text-xl text-stone-800 max-w-xl leading-relaxed font-medium">
              ORIGINAL 1926 CAST IRON TECHNIQUE
            </p>

            <div className="flex items-center gap-4 text-xs font-mono text-stone-700">
              <span className="font-bold px-3 py-1 bg-white/90 backdrop-blur-md rounded-full border border-[#C68A14]/30 text-[#C68A14] shadow-sm">
                FRAME {currentFrame.toString().padStart(3, "0")} / {FRAME_COUNT}
              </span>
              <span className="text-stone-600 font-bold">PRECISION SIZZLE SEQUENCE</span>
            </div>
          </div>
        </div>

        {/* ── Stage 3: Masterpiece (68–100% Scroll) ── */}
        <div
          className="absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-out"
          style={{
            opacity: stage === 3 ? 1 : 0,
            transform: stage === 3 ? "translateY(0)" : "translateY(30px)",
            pointerEvents: stage === 3 ? "auto" : "none",
          }}
        >
          <div className="max-w-2xl space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest px-3 py-1 bg-white/90 backdrop-blur-md rounded-full border border-[#C68A14]/30 inline-block font-extrabold text-[#C68A14] shadow-sm">
              PHASE 02 / CULINARY SIGNATURE
            </span>

            <h2 className="type-display text-5xl sm:text-7xl md:text-8xl text-black leading-none font-black tracking-tight drop-shadow-sm">
              THE 1926 DH SPECIAL
            </h2>

            <p className="type-serif text-base sm:text-xl text-stone-800 max-w-xl leading-relaxed font-medium">
              Fresh daily Texas beef seared to perfection with house mustard and grilled onions on a toasted bun.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 font-sans font-bold text-xs uppercase tracking-wider">
              <Link
                href="/menu"
                className="px-8 py-4 rounded-full bg-[#C68A14] text-white hover:bg-[#B37B0F] shadow-xl flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
              >
                <span>Order 1926 Special</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </CanvasScrubber>
  );
}
"""

# 6. Footer.tsx for Dirty Martin's (Pure White Background, Mustard Border, Black Text, Mustard PixelText)
FOOTER_TSX = """"use client";

import React from "react";
import Link from "next/link";
import PixelText from "@/components/ui/PixelText";

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer
      style={{ backgroundColor: "#FFFFFF", color: "#0A0A0A" }}
      className="h-[100svh] min-h-[100svh] w-full flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:p-16 relative z-10 select-none overflow-hidden border-t border-[#C68A14]/20"
    >
      {/* Top Bar: Navigation & Info */}
      <div
        className="flex flex-col sm:flex-row justify-between sm:items-start gap-6 pb-6"
        style={{ borderBottom: "1px solid rgba(198, 138, 20, 0.20)" }}
      >
        <nav className="flex flex-wrap gap-6 sm:gap-10 font-sans text-sm font-bold uppercase tracking-wider">
          <Link href="/menu" className="hover:text-[#C68A14] transition-colors">
            Menu
          </Link>
          <Link href="/reservations" className="hover:text-[#C68A14] transition-colors">
            Reservations
          </Link>
          <Link href="/locations" className="hover:text-[#C68A14] transition-colors">
            Outposts
          </Link>
          <Link href="/about" className="hover:text-[#C68A14] transition-colors">
            Our Story
          </Link>
        </nav>

        <div
          className="font-sans text-xs sm:text-right space-y-1 font-medium"
          style={{ color: "#0A0A0A99" }}
        >
          <p className="font-bold text-black">OPEN DAILY: 11:00 AM – 11:00 PM</p>
          <p>THE DRAG · AUSTIN, TX</p>
        </div>
      </div>

      {/* Center: Auto-Fitting Responsive Pixel-Dot Brand Name in Dark Mustard */}
      <div className="my-auto py-6 sm:py-8 w-full flex items-center justify-center overflow-hidden">
        <PixelText
          text="DIRTY MARTIN'S"
          dotSize={8}
          gap={3}
          color="#C68A14"
          explodeRadius={120}
          explodeForce={30}
          returnStiffness={0.09}
        />
      </div>

      {/* Bottom Bar: Contact & Back to Top */}
      <div
        className="flex flex-col sm:flex-row justify-between sm:items-end gap-6 pt-6 font-sans text-xs font-bold"
        style={{ borderTop: "1px solid rgba(198, 138, 20, 0.20)" }}
      >
        <div className="space-y-1" style={{ color: "#0A0A0A99" }}>
          <p className="font-extrabold text-sm text-black">
            +1 512-477-3173
          </p>
          <p>2808 Guadalupe St, Austin, TX 78705</p>
          <p>kum-bak@dirtymartins.com</p>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-8">
          <p className="font-medium text-stone-500">
            © {new Date().getFullYear()} DIRTY MARTIN&apos;S
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="px-5 py-2.5 rounded-full border border-[#C68A14]/40 bg-white text-black hover:bg-[#FAF8F2] transition-all uppercase tracking-wider font-extrabold flex items-center gap-2 active:scale-95 shadow-sm"
          >
            <span>Top</span>
            <span>↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
"""

def main():
    print("👉 Transforming Dirty Martin's to White Background + Mustard Accents (No Black Backgrounds)...")
    
    (DM_DIR / "public" / "logo.svg").write_text(LOGO_SVG)
    (DM_DIR / "app" / "globals.css").write_text(GLOBALS_CSS)
    (DM_DIR / "app" / "layout.tsx").write_text(LAYOUT_TSX)
    (DM_DIR / "components" / "marketing" / "Nav.tsx").write_text(NAV_TSX)
    (DM_DIR / "components" / "marketing" / "CinematicHero.tsx").write_text(HERO_TSX)
    (DM_DIR / "components" / "marketing" / "Footer.tsx").write_text(FOOTER_TSX)

    print("🎉 Dirty Martin's transformed to White & Mustard palette with zero black background!")

if __name__ == "__main__":
    main()
