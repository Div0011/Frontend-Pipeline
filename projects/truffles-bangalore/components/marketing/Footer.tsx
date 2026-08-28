"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="py-16 px-6 sm:px-12 md:px-20 bg-char text-bone border-t border-char-mute">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4 md:col-span-2">
            <div className="relative w-48 h-10">
              <Image
                src="/logo.svg"
                alt="Truffles Bangalore"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-xs text-smoke font-body max-w-sm leading-relaxed">
              Bangalore&apos;s landmark burger diner &amp; cafe since 2004. Famous for our All American Cheese Burgers, Sloppy Joes, Peri Peri Chicken, and Ferrero Rocher Thickshakes.
            </p>
            <p className="text-[11px] font-mono text-yolk">
              Koramangala · St. Mark&apos;s Road · Indiranagar · New BEL Road
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-mono text-xs text-bone uppercase tracking-wider font-bold">
              Burgers &amp; Shakes
            </h4>
            <ul className="space-y-2 text-xs font-mono text-smoke">
              <li>
                <Link href="/menu" className="hover:text-yolk">
                  All American Cheese Burger
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-yolk">
                  Sloppy Joe Lamb Burger
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-yolk">
                  Ferrero Rocher Thickshake
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-yolk">
                  Truffle Parmesan Fries
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-mono text-xs text-bone uppercase tracking-wider font-bold">
              Hours &amp; Contact
            </h4>
            <div className="text-xs font-mono text-smoke space-y-1">
              <p className="text-bone">Open Daily: 11:30 AM – 11:00 PM</p>
              <p>Direct: (080) 4153 6565</p>
              <p>St. Marks: (080) 4112 1160</p>
              <p>info@truffles.net.in</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-char-mute flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-smoke">
          <p>© {new Date().getFullYear()} Truffles Cafe &amp; Diner. All rights reserved.</p>
          <p className="text-yolk">BENGALURU&apos;S ORIGINAL BURGER INSTITUTION · SINCE 2004</p>
        </div>
      </div>
    </footer>
  );
}
