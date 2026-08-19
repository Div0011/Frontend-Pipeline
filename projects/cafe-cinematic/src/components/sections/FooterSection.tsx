'use client';

import { Mail, Phone, MapPin, Clock, X } from 'lucide-react';

export function FooterSection() {
  return (
    <footer className="bg-cafe-dark text-white relative overflow-hidden">
      {/* Thin top border accent */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cafe-accent/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-20">
        
        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16">
          <div>
            <h2
              className="font-display text-5xl sm:text-7xl font-normal tracking-tight leading-none mb-3"
              style={{ color: 'rgba(255,255,255,0.12)' }}
            >
              CAFE
            </h2>
            <h2
              className="font-display text-5xl sm:text-7xl font-normal tracking-tight leading-none"
              style={{ color: 'rgba(255,255,255,0.12)' }}
            >
              COFFEE
            </h2>
          </div>
          <p className="text-white/40 text-sm font-mono tracking-widest uppercase max-w-xs text-right">
            Artisanal Roastery<br />Dawn Hearth Bakery<br />Soho, New York
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-white/8 mb-12" />

        {/* Info grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-sm text-white/50 mb-16">
          
          <div className="space-y-4">
            <span className="text-white/80 font-semibold uppercase tracking-wider text-xs block">Visit</span>
            <div className="flex items-start gap-2.5">
              <MapPin className="w-3.5 h-3.5 text-cafe-accent shrink-0 mt-0.5" />
              <span className="leading-relaxed">123 Coffee Lane, Arts District<br />Soho, New York, NY 10013</span>
            </div>
            <div className="flex items-start gap-2.5">
              <Clock className="w-3.5 h-3.5 text-cafe-accent shrink-0 mt-0.5" />
              <span className="leading-relaxed">Mon – Fri: 07:00 — 20:00<br />Sat – Sun: 08:00 — 21:00</span>
            </div>
          </div>

          <div className="space-y-4">
            <span className="text-white/80 font-semibold uppercase tracking-wider text-xs block">Contact</span>
            <div className="flex items-center gap-2.5">
              <Mail className="w-3.5 h-3.5 text-cafe-accent shrink-0" />
              <a href="mailto:hello@cafecoffee.com" className="hover:text-cafe-accent transition-colors">
                hello@cafecoffee.com
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-3.5 h-3.5 text-cafe-accent shrink-0" />
              <a href="tel:+12125550147" className="hover:text-cafe-accent transition-colors">
                +1 (212) 555-0147
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <span className="text-white/80 font-semibold uppercase tracking-wider text-xs block">Follow</span>
            <div className="flex items-center gap-5">
              <a href="#" className="flex items-center gap-2 hover:text-cafe-accent transition-colors">
                <X className="w-3.5 h-3.5" />
                <span>X / Twitter</span>
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-3.5 h-3.5" />
              <a href="#" className="hover:text-cafe-accent transition-colors">Newsletter</a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[0.68rem] text-white/20 font-mono tracking-wider">
          <p>&copy; {new Date().getFullYear()} CAFE COFFEE. All rights reserved.</p>
          <p className="uppercase tracking-widest">Crafted with slow intention.</p>
        </div>

      </div>
    </footer>
  );
}
