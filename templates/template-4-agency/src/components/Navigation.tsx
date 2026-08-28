"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const NAV_LINKS = [
  { label: "Work", index: "01", progress: 0.75 },
  { label: "Services", index: "02", progress: 0.5 },
  { label: "About", index: "03", progress: 0.25 },
  { label: "Contact", index: "04", progress: 1 },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const scrollToPanel = (progress: number) => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: total * progress, behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 z-50 flex w-full items-center justify-between px-[var(--gutter)] py-6 md:py-8">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="group flex items-baseline gap-2"
          data-cursor="HOME"
        >
          <span className="font-display text-lg font-extrabold tracking-tight text-white uppercase md:text-xl">
            VOID
          </span>
          <span className="font-mono text-[10px] tracking-[0.25em] text-[#d4ff00] uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Studio
          </span>
        </a>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="group relative flex items-center gap-4 px-1 py-2"
          data-cursor="MENU"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span className="font-mono text-[11px] font-medium tracking-[0.28em] text-white/80 uppercase transition-colors group-hover:text-[#d4ff00]">
            {menuOpen ? "Close" : "Menu"}
          </span>
          <span className="relative flex h-4 w-6 flex-col justify-center gap-[5px]">
            <span
              className={`h-px w-full bg-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                menuOpen ? "translate-y-[3px] rotate-45 bg-[#d4ff00]" : ""
              }`}
            />
            <span
              className={`h-px w-full bg-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                menuOpen ? "-translate-y-[3px] -rotate-45 bg-[#d4ff00]" : ""
              }`}
            />
          </span>
        </button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-[#060609] px-[var(--gutter)] pt-28 pb-12 md:pt-36 md:pb-16"
          >
            <div className="pointer-events-none absolute inset-0 opacity-40">
              <div className="absolute top-1/3 left-1/2 h-[50vh] w-[50vw] -translate-x-1/2 rounded-full bg-[#d4ff00]/8 blur-[120px]" />
            </div>

            <nav className="relative z-10 flex flex-col gap-2 md:gap-3">
              {NAV_LINKS.map((item, i) => (
                <motion.button
                  key={item.label}
                  type="button"
                  onClick={() => scrollToPanel(item.progress)}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.08, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex items-baseline gap-4 text-left md:gap-8"
                  data-cursor="GO"
                >
                  <span className="font-mono text-xs text-[#d4ff00]/70">{item.index}</span>
                  <span className="font-display text-[clamp(2.5rem,8vw,6.5rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-white uppercase transition-colors duration-300 group-hover:text-[#d4ff00]">
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="relative z-10 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-end md:justify-between"
            >
              <div>
                <p className="font-mono text-[10px] tracking-[0.3em] text-[#d4ff00] uppercase">
                  Inquiries
                </p>
                <a
                  href="mailto:hello@voidstudio.agency"
                  className="mt-2 block font-display text-xl font-medium text-white transition-colors hover:text-[#d4ff00] md:text-2xl"
                  data-cursor="EMAIL"
                >
                  hello@voidstudio.agency
                </a>
              </div>
              <p className="font-mono text-[10px] tracking-[0.25em] text-white/35 uppercase">
                London · Tokyo · New York
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
