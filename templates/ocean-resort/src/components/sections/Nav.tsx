"use client";

import { useState } from "react";
import { Compass, Waves, Calendar } from "lucide-react";

interface NavProps {
  onOpenBooking: () => void;
}

export default function Nav({ onOpenBooking }: NavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300">
      <nav className="max-w-7xl mx-auto glass-nav rounded-full px-6 py-3.5 flex items-center justify-between border-[#48d1cc]/30 shadow-lg">
        
        {/* Brand Logo */}
        <a href="#hero-section" className="flex items-center gap-3 group cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-[#48d1cc]/20 border border-[#48d1cc]/60 flex items-center justify-center text-[#48d1cc] group-hover:scale-110 transition-transform">
            <Waves className="w-5 h-5 animate-pulse" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-display text-lg tracking-wider text-[#f5f0e6] font-semibold leading-none">
              AZURE SHORE
            </span>
            <span className="font-mono text-[9px] text-[#48d1cc] uppercase tracking-[0.3em] font-medium mt-0.5">
              MALDIVES
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-[#f5f0e6]/80">
          <a href="#hero-section" className="hover:text-[#48d1cc] transition-colors">
            THE SANCTUARY
          </a>
          <a href="#history-section" className="hover:text-[#48d1cc] transition-colors">
            HERITAGE
          </a>
          <a href="#villas-section" className="hover:text-[#48d1cc] transition-colors">
            ACCOMMODATIONS
          </a>
          <a href="#finale-section" className="hover:text-[#48d1cc] transition-colors">
            AERIAL REVEAL
          </a>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenBooking}
            className="px-6 py-2.5 rounded-full bg-[#48d1cc] text-[#094067] font-mono text-xs uppercase tracking-widest font-bold shadow-[0_0_20px_rgba(72,209,204,0.4)] hover:bg-[#e0f7fa] hover:scale-105 transition-all duration-300 cursor-pointer flex items-center gap-2"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>RESERVE</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
