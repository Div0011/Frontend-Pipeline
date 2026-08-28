import os

brands = {
    'backyard-burgers': {'name': 'Backyard Burgers & Grill', 'short': 'BACKYARD BURGERS', 'sub': 'SMOKEHOUSE & GRILL', 'primary': '#E67E22', 'text': '#000000'},
    'beyondburg-inc': {'name': 'Beyondburg Inc.', 'short': 'BEYONDBURG INC.', 'sub': 'SMASH BURGER CO.', 'primary': '#F5C418', 'text': '#000000'},
    'biggies-burger': {'name': 'Biggies Burger', 'short': 'BIGGIES BURGER', 'sub': 'CHARBROIL KITCHEN', 'primary': '#F26522', 'text': '#FFFFFF'},
    'burger-bar-austin': {'name': 'Burger Bar on Congress', 'short': 'BURGER BAR', 'sub': 'DOWNTOWN AUSTIN', 'primary': '#2563EB', 'text': '#FFFFFF'},
    'burger-elite': {'name': 'BURGER ELITE', 'short': 'BURGER ELITE', 'sub': 'STREET ROYALE SMASH', 'primary': '#7C3AED', 'text': '#FFFFFF'},
    'burger-seigneur': {'name': 'Burger Seigneur', 'short': 'BURGER SEIGNEUR', 'sub': 'HAUTE ATELIER', 'primary': '#C8A96E', 'text': '#000000'},
    'burgerman': {'name': 'BurgerMan', 'short': 'BURGERMAN', 'sub': '100% FLAME-GRILLED', 'primary': '#15803D', 'text': '#FFFFFF'},
    'casino-el-camino': {'name': 'Casino El Camino', 'short': 'CASINO EL CAMINO', 'sub': '6TH STREET AUSTIN', 'primary': '#DC2626', 'text': '#FFFFFF'},
    'dans-burgers': {'name': 'Dan\'s Hamburgers', 'short': 'DAN\'S HAMBURGERS', 'sub': 'SINCE 1973 AUSTIN', 'primary': '#D97706', 'text': '#FFFFFF'},
    'dirty-martins': {'name': 'Dirty Martin\'s Kum-Bak', 'short': 'DIRTY MARTIN\'S', 'sub': 'SINCE 1926 AUSTIN', 'primary': '#BF5700', 'text': '#FFFFFF'},
    'good-flippin-burgers': {'name': 'Good Flippin\' Burgers', 'short': 'GOOD FLIPPIN\'', 'sub': 'FRESH SMASHED', 'primary': '#BE123C', 'text': '#FFFFFF'},
    'jewboy-burgers': {'name': 'JewBoy Burgers', 'short': 'JEWBOY BURGERS', 'sub': 'AUSTIN TEXAS', 'primary': '#06B6D4', 'text': '#000000'},
    'leons-burgers': {'name': 'Leon\'s Burgers & Wings', 'short': 'LEON\'S BURGERS', 'sub': '24-HR BUTTERMILK', 'primary': '#B12727', 'text': '#FFFFFF'},
    'little-deli-pizzeria': {'name': 'Little Deli & Pizzeria', 'short': 'LITTLE DELI', 'sub': 'NJ STONE PIZZERIA', 'primary': '#166534', 'text': '#FFFFFF'},
    'louis-burger': {'name': 'Louis Burger', 'short': 'LOUIS BURGER', 'sub': 'CHEF ZORAWAR KALRA', 'primary': '#D4AF37', 'text': '#000000'},
    'nadc-burger': {'name': 'NADC Burger', 'short': 'NADC BURGER', 'sub': '100% TEXAS WAGYU', 'primary': '#FFFFFF', 'text': '#000000'},
    'original-burger-co': {'name': 'Original Burger Co. (OBC)', 'short': 'ORIGINAL BURGER CO.', 'sub': 'BACON JAM SMASH', 'primary': '#2563EB', 'text': '#FFFFFF'},
    'pedrosos-pizza': {'name': 'Pedroso\'s Pizza', 'short': 'PEDROSO\'S PIZZA', 'sub': 'ROMAN & GRANDMA PIES', 'primary': '#B91C1C', 'text': '#FFFFFF'},
    'pool-burger': {'name': 'Pool Burger', 'short': 'POOL BURGER', 'sub': 'DEEP EDDY TIKI', 'primary': '#F43F5E', 'text': '#FFFFFF'},
    'sankys-burger-house': {'name': 'Sanky\'s Burger House', 'short': 'SANKY\'S BURGER HOUSE', 'sub': 'LATE-NIGHT GARAGE', 'primary': '#FFE500', 'text': '#000000'},
    'simon-burgers': {'name': 'Simon Burgers', 'short': 'SIMON BURGERS', 'sub': 'KAMMANAHALLI SMASH', 'primary': '#DC2626', 'text': '#FFFFFF'},
    'smash-guys': {'name': 'Smash Guys', 'short': 'SMASH GUYS', 'sub': '450°F CAST IRON', 'primary': '#F5C418', 'text': '#000000'},
    'sour-duck-market': {'name': 'Sour Duck Market', 'short': 'SOUR DUCK MARKET', 'sub': 'EAST AUSTIN BAKERY', 'primary': '#EA580C', 'text': '#FFFFFF'},
    'truffles-bangalore': {'name': 'Truffles', 'short': 'TRUFFLES', 'sub': 'SINCE 2004 BANGALORE', 'primary': '#F5A623', 'text': '#000000'},
}

nav_template = '''"use client";

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

      // Add background blur when scrolled past 30px
      if (currentScrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide header when scrolling down, show header when scrolling up or near top
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
        {/* Brand Logo / Pure Luxury Typographic Wordmark (Unboxed, Zero Borders) */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-64 sm:w-80 h-10">
            <Image
              src="/logo.svg"
              alt="__BRAND_NAME__"
              fill
              unoptimized
              className="object-contain object-left group-hover:opacity-90 transition-opacity duration-200"
              priority
            />
          </div>
        </Link>

        {/* Nav Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest uppercase text-stone-400">
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
            className="px-5 py-2 rounded-sm font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all shadow-md"
            style={{
              backgroundColor: "__PRIMARY__",
              color: "__TEXT_COLOR__",
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

    nav_code = nav_template.replace('__BRAND_NAME__', cfg['name']).replace('__PRIMARY__', cfg['primary']).replace('__TEXT_COLOR__', cfg['text'])
    with open(os.path.join(p_path, 'components', 'marketing', 'Nav.tsx'), 'w') as f:
        f.write(nav_code)

print("✓ Updated Nav.tsx across all 24 projects with buttery smooth auto-hide on scroll and clean unboxed typography.")
