"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="py-16 px-6 sm:px-12 md:px-20 bg-char text-bone border-t border-char-mute">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4 md:col-span-2">
            <div className="relative w-52 h-12">
              <Image
                src="/logo.svg"
                alt="Little Deli & Pizzeria"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-xs text-smoke font-body max-w-sm leading-relaxed">
              Austin&apos;s neighborhood East Coast deli and Jersey-style thin crust pizzeria since 1993. Hot pastrami, homemade potato salads, NY cookies, and wood-fired pizza.
            </p>
            <p className="text-[11px] font-mono text-[#166534]">
              7101-A Woodrow Ave (Crestview) &amp; 1804 Briarcliff Blvd (Windsor Park)
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-mono text-xs text-bone uppercase tracking-wider font-bold">
              Deli &amp; Pizza
            </h4>
            <ul className="space-y-2 text-xs font-mono text-smoke">
              <li>
                <Link href="/menu" className="hover:text-[#166534]">
                  Hot Pastrami Reuben
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-[#166534]">
                  Classic Italian Sub
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-[#166534]">
                  Jersey City Cheese Pie
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-[#166534]">
                  Black &amp; White Cookie
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-mono text-xs text-bone uppercase tracking-wider font-bold">
              Locations &amp; Contact
            </h4>
            <div className="text-xs font-mono text-smoke space-y-1">
              <p className="text-bone">Mon – Sat: 11 AM – 9 PM</p>
              <p>Crestview: (512) 467-7402</p>
              <p>Windsor Park: (512) 220-8346</p>
              <p>info@littledeliandpizza.com</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-char-mute flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-smoke">
          <p>© {new Date().getFullYear()} Little Deli &amp; Pizzeria. All rights reserved.</p>
          <p className="text-[#166534]">AUSTIN NEIGHBORHOOD INSTITUTION · SINCE 1993</p>
        </div>
      </div>
    </footer>
  );
}
