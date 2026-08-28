"use client";

import { Waves, Compass, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#094067] text-[#f5f0e6] pt-20 pb-12 px-6 md:px-16 border-t border-[#48d1cc]/30 overflow-hidden">
      <div className="water-caustic-overlay opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#48d1cc]/20">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#48d1cc]/20 border border-[#48d1cc] flex items-center justify-center text-[#48d1cc]">
                <Waves className="w-6 h-6 animate-pulse" />
              </div>
              <span className="font-display text-2xl tracking-wider text-[#f5f0e6] font-semibold">
                AZURE SHORE
              </span>
            </div>

            <p className="font-body text-sm text-[#f5f0e6]/80 leading-relaxed font-light max-w-md">
              A private oceanfront sanctuary in the North Malé Atoll. Designed for soul-restoration, biophilic architectural luxury, and eternal marine conservation.
            </p>

            <div className="flex items-center gap-3 font-mono text-xs text-[#48d1cc]">
              <MapPin className="w-4 h-4" />
              <span>NORTH MALÉ ATOLL, REPUBLIC OF MALDIVES</span>
            </div>
          </div>

          {/* Links Col 1 */}
          <div className="md:col-span-3 space-y-4">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#e5c378] font-semibold block mb-2">
              EXPLORE RESORT
            </span>
            <ul className="space-y-2.5 font-mono text-xs text-[#f5f0e6]/80">
              <li><a href="#hero-section" className="hover:text-[#48d1cc] transition-colors">Underwater Emergence</a></li>
              <li><a href="#history-section" className="hover:text-[#48d1cc] transition-colors">Heritage & Conservation</a></li>
              <li><a href="#villas-section" className="hover:text-[#48d1cc] transition-colors">Overwater Suites</a></li>
              <li><a href="#finale-section" className="hover:text-[#48d1cc] transition-colors">Aerial Visual Reveal</a></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#e5c378] font-semibold block mb-2">
              PRIVATE CONCIERGE
            </span>

            <p className="font-body text-xs text-[#f5f0e6]/70 leading-relaxed">
              Subscribe for exclusive private charter announcements & seasonal villa releases.
            </p>

            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-full bg-[#1e6091]/60 border border-[#48d1cc]/40 text-xs font-body text-[#f5f0e6] placeholder:text-[#f5f0e6]/50 focus:border-[#48d1cc] outline-none"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-full bg-[#48d1cc] text-[#094067] font-mono text-xs font-bold hover:bg-[#e0f7fa] transition-colors shrink-0"
              >
                JOIN
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-widest text-[#90e0ef]/70">
          <span>© 2026 AZURE SHORE RESORT & SPA. ALL RIGHTS RESERVED.</span>
          <div className="flex items-center gap-6">
            <span>TERMS & PRIVACY</span>
            <span>ECO-CERTIFIED BY GREEN GLOBE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
