"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".footer-item");
      gsap.from(items, {
        opacity: 0,
        yPercent: 14,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.06,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 90%",
          once: true,
        },
        clearProps: "transform",
      });
    });

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={ref}
      className="border-t border-white/10 bg-black px-6 py-12 text-white md:px-16"
    >
      <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center footer-item">
        <div>
          <div className="flex items-center gap-3 font-mono text-xl font-black uppercase text-white">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-[#d4ff00] text-xs font-black text-black">
              V
            </span>
            VOID STUDIO
          </div>
          <p className="mt-1 font-mono text-xs text-white/40">
            Digital Craft & Motion Direction Atelier
          </p>
        </div>

        <div className="flex flex-wrap gap-8 font-mono text-xs text-white/60">
          <a href="#work" className="hover:text-[#d4ff00]">WORK</a>
          <a href="#services" className="hover:text-[#d4ff00]">SERVICES</a>
          <a href="#about" className="hover:text-[#d4ff00]">ABOUT</a>
          <a href="#contact" className="hover:text-[#d4ff00]">CONTACT</a>
        </div>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 font-mono text-xs font-bold text-white/70 backdrop-blur-sm transition hover:border-[#d4ff00] hover:text-[#d4ff00]"
          data-cursor="TOP"
        >
          TOP ↑
        </button>
      </div>

      <div className="footer-item mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 font-mono text-[10px] uppercase text-white/30 sm:flex-row">
        <span>© 2026 VOID CREATIVE AGENCY. ALL RIGHTS RESERVED.</span>
        <span>NEXT.JS + TAILWIND + GSAP + LENIS SCROLL PHYSICS</span>
      </div>
    </footer>
  );
}
