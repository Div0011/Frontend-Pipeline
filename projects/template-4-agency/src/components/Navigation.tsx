"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Navigation() {
  const [timeStr, setTimeStr] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setTimeStr(d.toLocaleTimeString("en-GB", { hour12: false, timeZone: "UTC" }) + " UTC");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { label: "01 // WORK", href: "#work" },
    { label: "02 // SERVICES", href: "#services" },
    { label: "03 // ABOUT", href: "#about" },
    { label: "04 // CONTACT", href: "#contact" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 z-50 flex w-full items-center justify-between px-6 py-6 md:px-12">
        {/* Brand Logo */}
        <a
          href="#"
          className="group flex items-center gap-3 font-mono text-sm font-black tracking-widest text-white uppercase"
          data-cursor="HOME"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#d4ff00] text-black font-black transition-transform duration-500 group-hover:rotate-180">
            V
          </div>
          <span className="text-lg tracking-tight">VOID STUDIO</span>
        </a>

        {/* Center Live Clock & Status */}
        <div className="hidden items-center gap-3 rounded-full border border-white/10 bg-black/40 px-4 py-1.5 backdrop-blur-md md:flex">
          <div className="h-2 w-2 rounded-full bg-[#d4ff00] animate-ping" />
          <span className="font-mono text-xs text-white/70">{timeStr}</span>
          <span className="font-mono text-[10px] text-[#d4ff00]">● AVAILABLE FOR Q3/Q4</span>
        </div>

        {/* Menu Toggle Trigger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="group flex items-center gap-3 rounded-full border border-white/15 bg-black/60 px-5 py-2.5 backdrop-blur-md transition-all duration-300 hover:border-[#d4ff00]/60 hover:bg-[#d4ff00]/10"
          data-cursor="MENU"
        >
          <span className="font-mono text-xs font-bold tracking-widest text-white uppercase group-hover:text-[#d4ff00]">
            {menuOpen ? "CLOSE" : "MENU"}
          </span>
          <div className="flex flex-col gap-1">
            <span
              className={`h-0.5 w-4 bg-[#d4ff00] transition-transform ${
                menuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`h-0.5 w-4 bg-white transition-opacity ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-4 bg-[#d4ff00] transition-transform ${
                menuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </div>
        </button>
      </header>

      {/* Full-Screen Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            animate={{ opacity: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            exit={{ opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-[#060609]/95 px-8 pt-32 pb-16 backdrop-blur-2xl md:px-24"
          >
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <nav className="flex flex-col gap-6">
                {navLinks.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i + 0.2, duration: 0.5 }}
                    className="font-mono text-3xl font-black uppercase text-white tracking-tight transition-all duration-300 hover:translate-x-4 hover:text-[#d4ff00] md:text-6xl"
                    data-cursor="GO"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>

              <div className="flex flex-col justify-end gap-6 border-t border-white/10 pt-8 md:border-t-0 md:border-l md:pt-0 md:pl-16">
                <span className="font-mono text-xs tracking-widest text-[#d4ff00] uppercase">
                  DIRECTORY / INQUIRIES
                </span>
                <p className="font-mono text-xl font-light text-white/80">
                  hello@voidstudio.agency
                </p>
                <div className="font-mono text-xs text-white/40">
                  LONDON // TOKYO // NEW YORK
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-8 font-mono text-xs text-white/40">
              <span>© 2026 VOID CREATIVE AGENCY</span>
              <span>DIGITAL CRAFT & MOTION DIRECTORS</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
