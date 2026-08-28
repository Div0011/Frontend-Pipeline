"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="py-16 px-6 sm:px-12 md:px-20 bg-char text-bone border-t border-char-mute">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4 md:col-span-2">
            <div className="relative w-52 h-10">
              <Image
                src="/logo.svg"
                alt="Beyondburg Inc."
                fill
                className="object-contain"
              />
            </div>
            <p className="text-xs text-smoke font-body max-w-sm leading-relaxed">
              Bengaluru&apos;s cult smash burger kitchen. Smashed dual patties with crispy lace edges, Nashville hot chicken, animal-style loaded fries, and Lotus Biscoff malts.
            </p>
            <p className="text-[11px] font-mono text-yolk">
              16/1, House of Lords, St. Mark&apos;s Rd &amp; Indiranagar, Bengaluru
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-mono text-xs text-bone uppercase tracking-wider font-bold">
              Smash &amp; Shakes
            </h4>
            <ul className="space-y-2 text-xs font-mono text-smoke">
              <li>
                <Link href="/menu" className="hover:text-yolk">
                  The OG Double Smash
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-yolk">
                  Nashville Hot Fried Chicken
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-yolk">
                  Lotus Biscoff Malt Shake
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-yolk">
                  Animal Style Crinkle Fries
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-mono text-xs text-bone uppercase tracking-wider font-bold">
              Outlets &amp; Contact
            </h4>
            <div className="text-xs font-mono text-smoke space-y-1">
              <p className="text-bone">Open Daily: 12:00 PM – 11:30 PM</p>
              <p>St. Marks: (090) 7296 4242</p>
              <p>Indiranagar: (090) 7122 2263</p>
              <p>contact@beyondburginc.com</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-char-mute flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-smoke">
          <p>© {new Date().getFullYear()} Beyondburg Inc. All rights reserved.</p>
          <p className="text-yolk">BENGALURU SMASH BURGER REVOLUTION</p>
        </div>
      </div>
    </footer>
  );
}
