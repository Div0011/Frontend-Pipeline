"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";

const MENU_ITEMS = [
  { label: "Story", href: "#story" },
  { label: "Expertise", href: "#expertise" },
  { label: "Leadership", href: "#leadership" },
  {
    label: "Editions",
    mega: true,
    dropdown: [
      { label: "Q3 2026 Issue", href: "#" },
      { label: "Institutional Letters", href: "#" },
      { label: "Fiduciary Governance", href: "#" },
      { label: "ESG & Sustainability", href: "#" },
      { label: "Regulatory Audits", href: "#" },
      { label: "Archive Vault", href: "#" },
    ],
  },
  { label: "Credentials", href: "#contact" },
];

const CHAPTER_NAMES: Record<string, string> = {
  "chapter-02": "02 — Origins",
  "chapter-03": "03 — Practice Areas",
  "chapter-04": "04 — Forward Vision",
  contact: "05 — Contact",
};

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeChapter, setActiveChapter] = useState("");
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 40);
      setIsVisible(currentScrollY < lastScrollY.current || currentScrollY < 100);
      lastScrollY.current = currentScrollY;

      // ─── Scroll Progress ──────────────────────────────
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? (currentScrollY / maxScroll) * 100 : 0;
      setScrollProgress(progress);

      // ─── Active Chapter Detection ─────────────────────
      const sections = Object.keys(CHAPTER_NAMES);
      let currentChapter = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4) {
            currentChapter = id;
          }
        }
      }
      if (currentChapter !== activeChapter) {
        setActiveChapter(currentChapter);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeChapter]);

  return (
    <>
      {/* ─── Scroll Progress Indicator ────────────────── */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* ─── Floating Chapter Label ───────────────────── */}
      <div
        className={`chapter-label-float ${activeChapter ? "visible" : ""}`}
      >
        {activeChapter && CHAPTER_NAMES[activeChapter] && (
          <>
            <span className="chapter-active">●</span>{" "}
            {CHAPTER_NAMES[activeChapter]}
          </>
        )}
      </div>

      {/* ─── Navigation Bar ───────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0c0c0e]/95 backdrop-blur-xl border-b border-white/10 py-3 text-white shadow-2xl"
            : "bg-gradient-to-b from-[#0c0c0e]/80 to-transparent py-5 text-white"
        } ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a
              href="#"
              className="flex items-center gap-3 font-serif text-xl tracking-[0.25em] font-extrabold uppercase text-white"
            >
              <span className="font-mono text-xs text-[#c9a96e]">APEX</span>
              <span className="font-light text-white/50">// JOURNAL</span>
            </a>

            <div className="hidden md:flex items-center gap-8 font-mono text-xs">
              {MENU_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.mega && setOpenMenu(item.label)}
                  onMouseLeave={() => item.mega && setOpenMenu(null)}
                >
                  <a
                    href={item.href}
                    className="tracking-widest uppercase text-white/70 hover:text-[#c9a96e] transition-colors duration-300 font-medium"
                  >
                    {item.label}
                  </a>

                  <AnimatePresence>
                    {item.mega && openMenu === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[480px]"
                      >
                        <div className="bg-[#0c0c0e] border border-[#c9a96e]/30 p-6 shadow-2xl backdrop-blur-2xl">
                          <div className="font-mono text-[10px] tracking-widest uppercase text-[#c9a96e] mb-4 pb-2 border-b border-white/10">
                            JOURNAL ARCHIVES & REPORTS
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                            {item.dropdown?.map((sub) => (
                              <a
                                key={sub.label}
                                href={sub.href}
                                className="text-white/70 hover:text-[#c9a96e] transition-colors"
                              >
                                → {sub.label}
                              </a>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <div className="hidden md:block">
              <Button
                variant="outline"
                size="sm"
                className="rounded-none border-[#c9a96e] text-[#c9a96e] hover:bg-[#c9a96e] hover:text-black font-mono text-xs uppercase tracking-widest px-5 transition-all cursor-pointer"
              >
                Client Vault →
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

