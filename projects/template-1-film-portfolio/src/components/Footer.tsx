"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const LINKS = [
  { label: "Contact", href: "mailto:studio@author.film" },
  { label: "Instagram", href: "#" },
  { label: "Vimeo", href: "#" },
  { label: "Showreel", href: "#archive" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const markRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!footerRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        markRef.current,
        { opacity: 0, y: 60, letterSpacing: "0.2em" },
        {
          opacity: 1,
          y: 0,
          letterSpacing: "0.08em",
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative z-20 overflow-hidden border-t border-[#c9a96e]/20 bg-[#050403]"
    >
      <div className="pointer-events-none absolute inset-0 projector-beam opacity-40" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="gutter-padding relative mx-auto max-w-[1400px] py-20 md:py-28">
        <div className="mb-16 flex flex-col gap-10 border-b border-[#c9a96e]/15 pb-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#c9a96e]">
              Next Projection
            </p>
            <p className="mt-4 font-display text-2xl font-light leading-snug text-[#ebe6dc]/80 md:text-3xl">
              Commission a feature, commercial, or animated short for the next season.
            </p>
          </div>
          <a
            href="mailto:studio@author.film"
            className="interactive inline-flex items-center gap-3 border border-[#c9a96e] bg-[#c9a96e] px-7 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-[#080706] transition-colors hover:bg-[#e0c48a]"
          >
            Book a Call
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <p
          ref={markRef}
          className="font-display text-[clamp(3.5rem,14vw,11rem)] font-bold uppercase leading-[0.85] tracking-tight text-[#ebe6dc]"
        >
          Author
        </p>

        <div className="mt-14 flex flex-col gap-10 md:mt-20 md:flex-row md:items-center md:justify-between">
          <nav className="flex flex-wrap gap-x-8 gap-y-4">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="interactive font-mono text-[11px] uppercase tracking-[0.3em] text-[#c9a96e] transition-colors hover:text-[#ebe6dc]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/35 md:items-end">
            <span>Projection Room · Est. Studio</span>
            <span>&copy; {new Date().getFullYear()} // All Rights Reserved</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
