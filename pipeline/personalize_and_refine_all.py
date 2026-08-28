import os, json

brands = {
    'backyard-burgers': {
        'name': 'Backyard Burgers & Grill',
        'short_name': 'BACKYARD BURGERS',
        'tagline': 'OPEN-AIR SMOKEHOUSE & GRILL · KORAMANGALA',
        'sub': 'SMOKEHOUSE BARK & CHARCOAL SMASH',
        'primary': '#E67E22',
        'text_on_primary': '#000000',
        'city': 'Bangalore',
    },
    'beyondburg-inc': {
        'name': 'Beyondburg Inc.',
        'short_name': 'BEYONDBURG INC.',
        'tagline': 'SMASH BURGER CO. · ST. MARKS RD · BENGALURU',
        'sub': '450°F STEEL CAST-IRON SMASH',
        'primary': '#F5C418',
        'text_on_primary': '#000000',
        'city': 'Bangalore',
    },
    'biggies-burger': {
        'name': 'Biggies Burger',
        'short_name': 'BIGGIES BURGER',
        'tagline': 'ORIGINAL GRILLED BURGERS · BANGALORE',
        'sub': 'AUTHENTIC BEHEMOTH CHARBROIL',
        'primary': '#F26522',
        'text_on_primary': '#FFFFFF',
        'city': 'Bangalore',
    },
    'burger-bar-austin': {
        'name': 'Burger Bar on Congress',
        'short_name': 'BURGER BAR ON CONGRESS',
        'tagline': 'DOWNTOWN AUSTIN WALK-UP FLAT TOP',
        'sub': 'CONGRESS AVENUE STREET SMASH',
        'primary': '#2563EB',
        'text_on_primary': '#FFFFFF',
        'city': 'Austin',
    },
    'burger-elite': {
        'name': 'BURGER ELITE',
        'short_name': 'BURGER ELITE',
        'tagline': 'STREET SMASH ROYALE · INDIRANAGAR',
        'sub': 'DOUBLE SMASH ROYALE CRUST',
        'primary': '#7C3AED',
        'text_on_primary': '#FFFFFF',
        'city': 'Bangalore',
    },
    'burger-seigneur': {
        'name': 'Burger Seigneur',
        'short_name': 'BURGER SEIGNEUR',
        'tagline': 'ARTISANAL EUROPEAN GOURMET ATELIER',
        'sub': 'HAUTE BRIOCHE & TRUFFLE MELT',
        'primary': '#C8A96E',
        'text_on_primary': '#000000',
        'city': 'Bangalore',
    },
    'burgerman': {
        'name': 'BurgerMan',
        'short_name': 'BURGERMAN',
        'tagline': '100% FLAME-GRILLED WHOLE WHEAT BURGERS',
        'sub': 'GUILT-FREE FLAME GRILLED CRUST',
        'primary': '#15803D',
        'text_on_primary': '#FFFFFF',
        'city': 'Bangalore',
    },
    'casino-el-camino': {
        'name': 'Casino El Camino',
        'short_name': 'CASINO EL CAMINO',
        'tagline': '6TH STREET CULT ROCK BURGERS · AUSTIN',
        'sub': 'CHARBROILED VERDE CHILI SEAR',
        'primary': '#DC2626',
        'text_on_primary': '#FFFFFF',
        'city': 'Austin',
    },
    'dans-burgers': {
        'name': 'Dan\'s Hamburgers',
        'short_name': 'DAN\'S HAMBURGERS',
        'tagline': 'SINCE 1973 · AN AUSTIN ORIGINAL',
        'sub': 'FLAT-TOP SIZZLE & TEXAS TOAST',
        'primary': '#D97706',
        'text_on_primary': '#FFFFFF',
        'city': 'Austin',
    },
    'dirty-martins': {
        'name': 'Dirty Martin\'s Kum-Bak',
        'short_name': 'DIRTY MARTIN\'S KUM-BAK',
        'tagline': 'SINCE 1926 · 100 YEARS ON THE DRAG · AUSTIN',
        'sub': 'CENTENNIAL KUM-BAK CHILI CRUST',
        'primary': '#BF5700',
        'text_on_primary': '#FFFFFF',
        'city': 'Austin',
    },
    'good-flippin-burgers': {
        'name': 'Good Flippin\' Burgers',
        'short_name': 'GOOD FLIPPIN\' BURGERS',
        'tagline': 'FRESH SMASHED JUICY BURGERS · BANGALORE',
        'sub': 'FRESH SMASHED BRIOCHE PERFECTION',
        'primary': '#BE123C',
        'text_on_primary': '#FFFFFF',
        'city': 'Bangalore',
    },
    'jewboy-burgers': {
        'name': 'JewBoy Burgers',
        'short_name': 'JEWBOY BURGERS',
        'tagline': 'EL PASO BORDER MEETS DINER · AUSTIN',
        'sub': 'GRILLED ONION STEAMED SMASH',
        'primary': '#06B6D4',
        'text_on_primary': '#000000',
        'city': 'Austin',
    },
    'leons-burgers': {
        'name': 'Leon\'s Burgers & Wings',
        'short_name': 'LEON\'S BURGERS & WINGS',
        'tagline': '24-HR BUTTERMILK FRIED CHICKEN & BURGERS',
        'sub': '24-HR BUTTERMILK PERI-PERI CRUNCH',
        'primary': '#B12727',
        'text_on_primary': '#FFFFFF',
        'city': 'Bangalore',
    },
    'little-deli-pizzeria': {
        'name': 'Little Deli & Pizzeria',
        'short_name': 'LITTLE DELI & PIZZERIA',
        'tagline': 'NJ STONE-BAKED PIES & PASTRAMI SUBS · CRESTVIEW',
        'sub': 'ARTISAN STONE-BAKED NJ CRUST',
        'primary': '#166534',
        'text_on_primary': '#FFFFFF',
        'city': 'Austin',
    },
    'louis-burger': {
        'name': 'Louis Burger',
        'short_name': 'LOUIS BURGER',
        'tagline': 'CHEF ZORAWAR KALRA · CRAFT GOURMET BURGERS',
        'sub': '24K GOLD WAGYU & TRUFFLE MELT',
        'primary': '#D4AF37',
        'text_on_primary': '#000000',
        'city': 'Bangalore',
    },
    'nadc-burger': {
        'name': 'NADC Burger',
        'short_name': 'NADC BURGER',
        'tagline': '100% TEXAS WAGYU & DUCK FAT TALLOW FRIES',
        'sub': 'AKAUSHI CARAMELIZED MAILLARD CRUST',
        'primary': '#FFFFFF',
        'text_on_primary': '#000000',
        'city': 'Austin',
    },
    'original-burger-co': {
        'name': 'Original Burger Co. (OBC)',
        'short_name': 'ORIGINAL BURGER CO.',
        'tagline': 'DOUBLE SMASH & BACON JAM DINER · BANGALORE',
        'sub': 'DOUBLE SMASHED BACON JAM CRUST',
        'primary': '#2563EB',
        'text_on_primary': '#FFFFFF',
        'city': 'Bangalore',
    },
    'pedrosos-pizza': {
        'name': 'Pedroso\'s Pizza',
        'short_name': 'PEDROSO\'S PIZZA',
        'tagline': 'GRANDMA SQUARES & ROMAN STYLE PIZZA · AUSTIN',
        'sub': 'SLOW-FERMENTED ROMAN CRISP CRUST',
        'primary': '#B91C1C',
        'text_on_primary': '#FFFFFF',
        'city': 'Austin',
    },
    'pool-burger': {
        'name': 'Pool Burger',
        'short_name': 'POOL BURGER',
        'tagline': '1968 AIRSTREAM TIKI SMASH BURGERS · DEEP EDDY',
        'sub': 'AIRSTREAM TIKI DOUBLE SMASH',
        'primary': '#F43F5E',
        'text_on_primary': '#FFFFFF',
        'city': 'Austin',
    },
    'sankys-burger-house': {
        'name': 'Sanky\'s Burger House',
        'short_name': 'SANKY\'S BURGER HOUSE',
        'tagline': 'THE LATE-NIGHT CULT BURGER GARAGE · HENNUR',
        'sub': 'UNDERGROUND MONSTER SMASH CRUST',
        'primary': '#FFE500',
        'text_on_primary': '#000000',
        'city': 'Bangalore',
    },
    'simon-burgers': {
        'name': 'Simon Burgers',
        'short_name': 'SIMON BURGERS',
        'tagline': 'LATE-NIGHT SMASH BURGERS & FRIES · KAMMANAHALLI',
        'sub': 'KAMMANAHALLI MONSTER DOUBLE CRUST',
        'primary': '#DC2626',
        'text_on_primary': '#FFFFFF',
        'city': 'Bangalore',
    },
    'smash-guys': {
        'name': 'Smash Guys',
        'short_name': 'SMASH GUYS',
        'tagline': '450°F CAST-IRON SMASHED BURGERS · BANGALORE',
        'sub': 'MAXIMUM CRUNCH MAILLARD CRUST',
        'primary': '#F5C418',
        'text_on_primary': '#000000',
        'city': 'Bangalore',
    },
    'sour-duck-market': {
        'name': 'Sour Duck Market',
        'short_name': 'SOUR DUCK MARKET',
        'tagline': 'SOURDOUGH BAKERY & SMOKEHOUSE · EAST AUSTIN',
        'sub': 'NATURALLY FERMENTED SOURDOUGH BAKE',
        'primary': '#EA580C',
        'text_on_primary': '#FFFFFF',
        'city': 'Austin',
    },
    'truffles-bangalore': {
        'name': 'Truffles',
        'short_name': 'TRUFFLES',
        'tagline': 'SINCE 2004 · BANGALORE\'S ICONIC BURGERS & SHAKES',
        'sub': 'SIGNATURE AMERICAN CHEESE MELT',
        'primary': '#F5A623',
        'text_on_primary': '#000000',
        'city': 'Bangalore',
    },
}

preloader_template = '''"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 400);
          }, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 20);

    return () => clearInterval(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#08080a] text-[#f5f5f5] overflow-hidden select-none">
      {/* Dynamic Ambient Glow */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none opacity-20 animate-pulse"
        style={{ backgroundColor: "__PRIMARY__" }}
      />

      {/* Concentric Pulse Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.2, opacity: 0.5 }}
            animate={{
              scale: [0.2, 3.8],
              opacity: [0.5, 0.2, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeOut",
              delay: i * 0.9,
            }}
            className="absolute rounded-full border"
            style={{
              borderColor: "__PRIMARY__",
              width: "300px",
              height: "300px",
            }}
          />
        ))}
      </div>

      {/* Centered Brand Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 max-w-xl px-6 text-center">
        {/* Loading Counter */}
        <div
          className="w-24 h-24 rounded-full bg-[#121214] border flex items-center justify-center relative shadow-2xl"
          style={{ borderColor: "__PRIMARY__40" }}
        >
          <div
            className="absolute inset-0 rounded-full border-2 border-transparent animate-spin"
            style={{ borderTopColor: "__PRIMARY__" }}
          />
          <span className="font-mono text-xl font-bold" style={{ color: "__PRIMARY__" }}>
            {progress}%
          </span>
        </div>

        {/* Brand Identity & Craft Subtitle */}
        <div className="space-y-2">
          <h2 className="type-display text-4xl sm:text-5xl text-white tracking-wider font-extrabold">
            __BRAND_NAME__
          </h2>
          <p className="font-mono text-xs uppercase tracking-widest text-stone-400">
            __SUB__
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-56 h-1 bg-white/10 rounded-full overflow-hidden relative">
          <motion.div
            className="h-full rounded-full"
            style={{ width: `${progress}%`, backgroundColor: "__PRIMARY__" }}
          />
        </div>

        <p className="font-mono text-[10px] uppercase tracking-widest text-stone-500 pt-2">
          __TAGLINE__
        </p>
      </div>
    </div>
  );
}
'''

# Clean logo SVG: No enclosing rectangle/square box! Pure luxury typography.
def generate_clean_logo_svg(short_name, tagline, primary):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 54" fill="none">
  <text x="0" y="30" fill="{primary}" font-family="'Space Grotesk', 'Impact', sans-serif" font-size="28" font-weight="900" letter-spacing="2">{short_name}</text>
  <text x="0" y="48" fill="#A8A29E" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="700" letter-spacing="2">{tagline}</text>
</svg>
'''

# Smart auto-hiding Nav component: slides up when scrolling down, reappears when scrolling up!
nav_template = '''"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Check if past top threshold
      if (currentScrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY.current && currentScrollY > 120) {
        setIsVisible(false); // Scrolling down -> hide header
      } else {
        setIsVisible(true);  // Scrolling up -> show header
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      } ${
        isScrolled
          ? "bg-char/90 backdrop-blur-md border-b border-char-mute py-3 shadow-2xl"
          : "bg-transparent py-4"
      } text-bone`}
    >
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Brand Logo / Name (Unboxed, Pure Luxury Typography) */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-64 sm:w-80 h-10">
            <Image
              src="/logo.svg"
              alt="__BRAND_NAME__"
              fill
              unoptimized
              className="object-contain object-left group-hover:scale-[1.02] transition-transform duration-200"
              priority
            />
          </div>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest uppercase text-smoke">
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

        {/* Action CTA Button (Color Harmonized) */}
        <div className="flex items-center gap-4">
          <Link
            href="/menu"
            className="px-5 py-2 rounded-sm font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all shadow-md"
            style={{
              backgroundColor: "__PRIMARY__",
              color: "__TEXT_ON_PRIMARY__",
            }}
          >
            Full Menu →
          </Link>
        </div>
      </div>
    </header>
  );
}
'''

for slug, cfg in brands.items():
    p_path = os.path.join('projects', slug)
    if not os.path.exists(p_path):
        continue

    # 1. Update Preloader.tsx (Personalized for every single brand)
    pre_code = preloader_template.replace('__PRIMARY__', cfg['primary']).replace('__BRAND_NAME__', cfg['short_name']).replace('__SUB__', cfg['sub']).replace('__TAGLINE__', cfg['tagline'])
    with open(os.path.join(p_path, 'components', 'marketing', 'Preloader.tsx'), 'w') as f:
        f.write(pre_code)

    # 2. Update logo.svg (Unboxed, clean, no square/rectangle enclosing box)
    logo_svg = generate_clean_logo_svg(cfg['short_name'], cfg['tagline'], cfg['primary'])
    os.makedirs(os.path.join(p_path, 'public'), exist_ok=True)
    with open(os.path.join(p_path, 'public', 'logo.svg'), 'w') as f:
        f.write(logo_svg)

    # 3. Update Nav.tsx (Smart auto-hiding header on scroll down, showing on scroll up)
    nav_code = nav_template.replace('__BRAND_NAME__', cfg['name']).replace('__PRIMARY__', cfg['primary']).replace('__TEXT_ON_PRIMARY__', cfg['text_on_primary'])
    with open(os.path.join(p_path, 'components', 'marketing', 'Nav.tsx'), 'w') as f:
        f.write(nav_code)

    # 4. Clean any lingering TypeTester references to Smash Guys
    tt_path = os.path.join(p_path, 'components', 'marketing', 'TypeTester.tsx')
    if os.path.exists(tt_path):
        with open(tt_path, 'r') as f:
            tt_c = f.read()
        tt_c = tt_c.replace('SMASH GUYS', cfg['short_name']).replace('Smash Guys', cfg['name'])
        with open(tt_path, 'w') as f:
            f.write(tt_c)

    print(f"✓ Fully personalized & refined {slug}")

print("\n🎉 All 24 projects updated with personalized loading screens, unboxed logo typography, and auto-hiding headers!")
