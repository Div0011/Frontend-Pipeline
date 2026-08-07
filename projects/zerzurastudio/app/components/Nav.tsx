"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Careers", href: "#careers" },
  { label: "Join", href: "#join" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScroll = useRef(0);
  const brandRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const currentScroll = window.scrollY;
      setScrolled(currentScroll > 80);

      if (currentScroll > lastScroll.current && currentScroll > 200) {
        setVisible(false);
        setMenuOpen(false);
      } else {
        setVisible(true);
      }
      lastScroll.current = currentScroll;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!brandRef.current) return;
    const ctx = gsap.context(() => {
      const letters = brandRef.current?.querySelectorAll(".nav-letter");
      if (letters && letters.length) {
        gsap.fromTo(
          letters,
          { y: 100, opacity: 0, rotateX: -90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1.2,
            stagger: 0.05,
            ease: "power4.out",
            delay: 5.8,
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className={`mx-auto max-w-7xl px-6 h-20 flex items-center justify-between transition-all duration-700 ${
        scrolled ? "bg-cinema-black/80 backdrop-blur-xl border-b border-cinema-cream/[0.06]" : "bg-transparent"
      }`}>
        <a
          href="#"
          ref={brandRef}
          className="flex items-center gap-1 nav-brand cursor-hover"
        >
          {["Z", "E", "R", "Z", "U", "R", "A"].map((char, i) => (
            <span
              key={i}
              className="nav-letter text-lg md:text-xl font-bold tracking-tight text-cinema-cream inline-block opacity-0"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {char}
            </span>
          ))}
          <span className="text-cinema-gold text-xs font-bold tracking-[0.2em] ml-1" style={{ fontFamily: "var(--font-display)" }}>
            [
          </span>
          <span className="text-cinema-text-muted text-[10px] font-bold tracking-[0.15em] hidden sm:inline-block" style={{ fontFamily: "var(--font-body)" }}>
            STUDIO
          </span>
          <span className="text-cinema-gold text-xs font-bold tracking-[0.2em]" style={{ fontFamily: "var(--font-display)" }}>
            ]
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-12">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative text-xs font-bold uppercase tracking-[0.25em] text-cinema-text-muted hover:text-cinema-gold transition-colors duration-500 cursor-hover"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <span className="relative z-10">{item.label}</span>
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cinema-gold transition-all duration-500 group-hover:w-full" />
              <span className="absolute -top-1 right-0 text-[8px] text-cinema-gold/0 group-hover:text-cinema-gold/60 transition-all duration-500">
                {item.label[0]}
              </span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <span className="hidden md:inline-block text-cinema-text-muted text-[10px] tracking-[0.2em] font-mono" style={{ fontFamily: "var(--font-mono)" }}>
            EST. 2025
          </span>
          <a
            href="#join"
            className="hidden md:inline-flex items-center gap-2 rounded-full border border-cinema-gold/40 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-cinema-gold transition-all duration-500 hover:bg-cinema-gold hover:text-cinema-black cursor-hover"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Join Us
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2 cursor-hover"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-[1px] bg-cinema-cream transition-all duration-500 ${menuOpen ? "rotate-45 translate-y-[3px]" : ""}`} />
            <span className={`block w-6 h-[1px] bg-cinema-cream transition-all duration-500 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-[1px] bg-cinema-cream transition-all duration-500 ${menuOpen ? "-rotate-45 -translate-y-[3px]" : ""}`} />
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden fixed inset-0 bg-cinema-black/95 backdrop-blur-xl z-40 transition-all duration-700 ${
          menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {NAV_ITEMS.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-3xl font-bold text-cinema-cream hover:text-cinema-gold transition-colors duration-500 cursor-hover"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
