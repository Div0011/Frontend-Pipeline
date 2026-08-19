"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";

const MENU_ITEMS = [
  { label: "Origins", href: "#chapter-02" },
  { label: "Practice", href: "#chapter-03" },
  { label: "Vision", href: "#chapter-04" },
  {
    label: "Atelier",
    mega: true,
    dropdown: [
      { label: "Institutional Letters", href: "#" },
      { label: "Fiduciary Governance", href: "#" },
      { label: "ESG Stewardship", href: "#" },
      { label: "Regulatory Archive", href: "#" },
    ],
  },
  { label: "Contact", href: "#contact" },
];

const CHAPTER_NAMES: Record<string, string> = {
  "chapter-02": "02 — Origins",
  "chapter-03": "03 — Practice",
  "chapter-04": "04 — Vision",
  contact: "05 — Inquiry",
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
      setScrolled(currentScrollY > 48);
      setIsVisible(currentScrollY < lastScrollY.current || currentScrollY < 120);
      lastScrollY.current = currentScrollY;

      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? (currentScrollY / maxScroll) * 100 : 0;
      setScrollProgress(progress);

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
      setActiveChapter(currentChapter);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      <div className={`chapter-label-float ${activeChapter ? "visible" : ""}`}>
        {activeChapter && CHAPTER_NAMES[activeChapter] && (
          <>
            <span className="chapter-active">●</span> {CHAPTER_NAMES[activeChapter]}
          </>
        )}
      </div>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/90 backdrop-blur-xl border-b border-border/80 py-2"
            : "bg-gradient-to-b from-background/70 to-transparent py-4"
        } ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex items-center justify-between h-14">
            <a
              href="#"
              className="flex items-baseline gap-2 font-serif text-lg tracking-[0.22em] font-semibold uppercase text-foreground"
              data-cursor-hover
            >
              Apex
              <span className="font-mono text-[9px] tracking-[0.35em] text-accent font-normal">
                Group
              </span>
            </a>

            <div className="hidden md:flex items-center gap-9 font-mono text-[11px]">
              {MENU_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.mega && setOpenMenu(item.label)}
                  onMouseLeave={() => item.mega && setOpenMenu(null)}
                >
                  <a
                    href={item.href}
                    className="tracking-[0.22em] uppercase text-muted-foreground hover:text-accent transition-colors duration-300"
                    data-cursor-hover
                  >
                    {item.label}
                  </a>

                  <AnimatePresence>
                    {item.mega && openMenu === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.22 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[360px]"
                      >
                        <div className="bg-card border border-border p-5 shadow-2xl backdrop-blur-2xl">
                          <div className="font-mono text-[9px] tracking-[0.35em] uppercase text-accent mb-4 pb-2 border-b border-border">
                            Private Atelier
                          </div>
                          <div className="grid grid-cols-1 gap-3 text-[11px] font-mono">
                            {item.dropdown?.map((sub) => (
                              <a
                                key={sub.label}
                                href={sub.href}
                                className="text-muted-foreground hover:text-accent transition-colors"
                                data-cursor-hover
                              >
                                {sub.label}
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
                className="rounded-none border-accent/60 text-accent hover:bg-accent hover:text-background font-mono text-[10px] uppercase tracking-[0.25em] px-5 cursor-pointer"
                data-cursor-hover
              >
                Client Access
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
