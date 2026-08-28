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
                alt="Sanky's Burger House"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-xs text-smoke font-body max-w-sm leading-relaxed">
              Bengaluru&apos;s cult late-night burger garage. Double monster patties, runny fried eggs, molten cheddar, gunpowder crinkle fries, and Nutella brownie thickshakes.
            </p>
            <p className="text-[11px] font-mono text-yolk">
              50, Hennur Main Rd, opp. Jyothi School, St Thomas Town, Bengaluru 560084
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-mono text-xs text-bone uppercase tracking-wider font-bold">
              Burgers &amp; Shakes
            </h4>
            <ul className="space-y-2 text-xs font-mono text-smoke">
              <li>
                <Link href="/menu" className="hover:text-yolk">
                  The Monster Double Beast
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-yolk">
                  Hennur Firecracker Chicken
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-yolk">
                  Nutella Brownie Shake
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-yolk">
                  Gunpowder Crinkle Fries
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-mono text-xs text-bone uppercase tracking-wider font-bold">
              Hours &amp; Location
            </h4>
            <div className="text-xs font-mono text-smoke space-y-1">
              <p className="text-bone">Open Daily: 4:00 PM – 1:30 AM</p>
              <p>Direct Counter: (098) 8673 8143</p>
              <p>Opp. Jyothi School, Hennur</p>
              <p>Late Night Takeaway Available</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-char-mute flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-smoke">
          <p>© {new Date().getFullYear()} Sanky&apos;s Burger House. All rights reserved.</p>
          <p className="text-yolk">BENGALURU LATE-NIGHT CULT BURGER GARAGE</p>
        </div>
      </div>
    </footer>
  );
}
