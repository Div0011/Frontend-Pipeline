"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="py-16 px-6 sm:px-12 md:px-20 bg-char text-bone border-t border-char-mute">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-2">
            <div className="relative w-48 h-12">
              <Image
                src="/logo.svg"
                alt="Pedroso's Pizza"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-xs text-smoke font-body max-w-sm leading-relaxed">
              Austin&apos;s home for authentic New York, Grandma-style, and Sicilian artisan pan pizzas. 72-hour sourdough fermentation baked fresh on stone deck hearths.
            </p>
            <p className="text-[11px] font-mono text-[#B91C1C]">
              2207 Justin Ln Suite D &amp; 3850 Airport Blvd · Austin, TX
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs text-bone uppercase tracking-wider font-bold">
              Menu &amp; Patios
            </h4>
            <ul className="space-y-2 text-xs font-mono text-smoke">
              <li>
                <Link href="/menu" className="hover:text-ember">
                  Grandma Squares
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-ember">
                  Brooklyn NY Slices
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-ember">
                  Sicilian Pepperoni
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-ember">
                  Garlic Knots &amp; Cannoli
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs text-bone uppercase tracking-wider font-bold">
              Hours &amp; Orders
            </h4>
            <div className="text-xs font-mono text-smoke space-y-1">
              <p className="text-bone">Tue – Sun: 12 PM – 9 PM</p>
              <p>Justin Lane: (737) 600-1107</p>
              <p>Airport Blvd: (512) 676-7368</p>
              <p>Email: info@pedrosospizza.com</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-char-mute flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-smoke">
          <p>© {new Date().getFullYear()} Pedroso&apos;s Pizza. All rights reserved.</p>
          <p className="text-[#B91C1C]">AUTHENTIC NY PIZZA CRAFT · AUSTIN, TEXAS</p>
        </div>
      </div>
    </footer>
  );
}
