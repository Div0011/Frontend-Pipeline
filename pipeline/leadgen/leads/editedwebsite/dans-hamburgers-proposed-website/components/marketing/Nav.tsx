"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getLenis } from "@/lib/motion/lenis";

const TABS = [
  { href: "/menu", label: "Menu", sub: "Complete Austin kitchen board: Angus burgers, famous onion rings, malts & breakfast" },
  { href: "/about", label: "Our Story", sub: "50+ years of Austin heritage, Dan & Frances Junk, and the $50 recipe" },
  { href: "/locations", label: "Locations", sub: "4 Austin & Buda locations: Manchaca, North Lamar, Airport & Buda" },
  { href: "/reservations", label: "Orders & Events", sub: "Call-ahead pickup, private parties, and table bookings" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (menuOpen) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-bone/90 backdrop-blur-md border-b border-char/10 py-1"
            : "bg-transparent py-2"
        }`}
      >
        <div className="max-w-[88rem] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 lg:h-20">
            <Link href="/" className="group flex items-center gap-3">
              <div className="w-8 h-8 bg-ember rounded-sm flex items-center justify-center text-bone font-bold text-sm tracking-wider shadow-md group-hover:scale-105 transition-transform duration-300">
                D
              </div>
              <div className="flex flex-col">
                <span
                  className="type-display text-2xl sm:text-3xl text-char tracking-wide leading-none"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Dan&apos;s Hamburgers
                </span>
                <span className="type-label text-[8px] text-ember font-bold tracking-widest">
                  AUSTIN, TEXAS · EST. 1973
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-6">
              <Link
                href="/menu"
                className="hidden md:inline-flex btn-red text-[10px] py-2.5 px-5 rounded-sm"
              >
                Full Menu →
              </Link>
              <button
                onClick={() => setMenuOpen(true)}
                className="type-caption text-[10px] tracking-widest uppercase text-char hover:text-ember transition-colors duration-300 font-bold px-3 py-1.5 border border-char/15 hover:border-ember"
              >
                MENU ☰
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-char flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            <div className="flex items-center justify-between px-6 lg:px-8 h-20 border-b border-char-mute flex-shrink-0">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 bg-ember rounded-sm flex items-center justify-center text-bone font-bold text-xs">
                  D
                </span>
                <span className="type-display text-2xl text-ink">Dan&apos;s Hamburgers</span>
              </div>
              <button
                onClick={closeMenu}
                className="type-caption text-[10px] tracking-widest text-smoke hover:text-ink transition-colors duration-300"
              >
                CLOSE ✕
              </button>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 px-6 lg:px-8 py-12 lg:py-20 overflow-y-auto">
              <div className="lg:col-span-7 flex flex-col justify-center">
                <div className="space-y-0">
                  {TABS.map((tab, i) => {
                    const isHovered = hoveredTab === i;
                    return (
                      <motion.div
                        key={tab.href}
                        layout
                        onHoverStart={() => setHoveredTab(i)}
                        onHoverEnd={() => setHoveredTab(null)}
                        className="border-b border-char-mute last:border-b-0"
                      >
                        <Link
                          href={tab.href}
                          onClick={closeMenu}
                          className="group flex flex-col md:flex-row md:items-end md:justify-between py-6 md:py-8 block"
                        >
                          <div className="flex items-baseline gap-6">
                            <span className="type-label text-[9px] text-smoke">0{i + 1}</span>
                            <motion.span
                              layout
                              className={`type-display text-4xl sm:text-5xl lg:text-7xl transition-colors duration-300 ${
                                isHovered ? "text-yolk" : "text-ink"
                              }`}
                            >
                              {tab.label}
                            </motion.span>
                          </div>
                          <motion.div
                            layout
                            initial={{ opacity: 0, height: 0 }}
                            animate={{
                              opacity: isHovered ? 1 : 0,
                              height: isHovered ? "auto" : 0,
                            }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="type-serif text-stone text-sm md:text-base mt-2 md:mt-0 max-w-md">
                              {tab.sub}
                            </p>
                          </motion.div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between">
                <div className="hidden lg:block">
                  <p className="type-caption text-yolk mb-6">Austin Tradition · Est. 1973</p>
                  <h3 className="type-display text-6xl xl:text-7xl text-ink leading-[0.9] mb-6">
                    FRESH<br />EVERY DAY
                  </h3>
                  <p className="type-serif text-stone text-lg leading-relaxed max-w-sm mb-10">
                    Made-to-order Angus chuck burgers, hand-breaded onion rings, and scratch biscuits. 
                    Serving South Austin, North Lamar, Airport Blvd, and Buda.
                  </p>
                  <Link
                    href="/menu"
                    onClick={closeMenu}
                    className="inline-flex items-center gap-3 bg-ember text-bone px-8 py-5 type-caption text-[11px] hover:bg-ember-light transition-colors duration-300"
                  >
                    View Full Menu →
                  </Link>
                </div>

                <div className="lg:hidden mt-8">
                  <Link
                    href="/menu"
                    onClick={closeMenu}
                    className="block w-full bg-ember text-bone text-center py-4 type-caption text-[11px]"
                  >
                    View Full Menu →
                  </Link>
                </div>

                <div className="hidden lg:block mt-auto">
                  <div className="flex flex-wrap gap-4">
                    {["Facebook", "Phone: (512) 443-6131", "info@dans-hamburgers.com"].map((s) => (
                      <span key={s} className="type-label text-smoke text-[9px]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
