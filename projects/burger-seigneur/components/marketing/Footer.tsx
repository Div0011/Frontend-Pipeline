"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="py-16 px-6 sm:px-12 md:px-20 bg-char text-bone border-t border-char-mute">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4 md:col-span-2">
            <div className="relative w-56 h-10">
              <Image
                src="/logo.svg"
                alt="Burger Seigneur"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-xs text-smoke font-body max-w-sm leading-relaxed">
              Bespoke gourmet European burgers on artisanal French brioche buns. Roasted Portobello truffles, New Zealand lamb, aged Parmigiano-Reggiano, and botanical mocktails.
            </p>
            <p className="text-[11px] font-mono text-[#C8A96E]">
              470, 80 Feet Rd, Indiranagar, Bengaluru 560075
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-mono text-xs text-bone uppercase tracking-wider font-bold">
              La Carte
            </h4>
            <ul className="space-y-2 text-xs font-mono text-smoke">
              <li>
                <Link href="/menu" className="hover:text-[#C8A96E]">
                  Traiteur Portobello Truffle
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-[#C8A96E]">
                  Parisien Rosemary Lamb
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-[#C8A96E]">
                  Lucien Prime Cheeseburger
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-[#C8A96E]">
                  Rose &amp; Cardamom Elixir
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-mono text-xs text-bone uppercase tracking-wider font-bold">
              Salon &amp; Horaires
            </h4>
            <div className="text-xs font-mono text-smoke space-y-1">
              <p className="text-bone">Lundi – Dimanche: 12h – 23h30</p>
              <p>Direct Salon: (080) 4965 2555</p>
              <p>Valet Parking Available</p>
              <p>concierge@burgerseigneur.com</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-char-mute flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-smoke">
          <p>© {new Date().getFullYear()} Burger Seigneur Haute Gastronomie. All rights reserved.</p>
          <p className="text-[#C8A96E]">80 FEET ROAD · INDIRANAGAR · BENGALURU</p>
        </div>
      </div>
    </footer>
  );
}
