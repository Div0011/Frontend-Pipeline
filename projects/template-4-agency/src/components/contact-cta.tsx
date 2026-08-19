"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export default function ContactCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".contact-reveal", {
        opacity: 0,
        y: 40,
        duration: 1.15,
        ease: EASE.cinematic,
        stagger: 0.1,
        scrollTrigger: {
          trigger: document.body,
          start: () => `${ScrollTrigger.maxScroll(window) * 0.85}px`,
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative flex w-full flex-col items-center justify-center px-[var(--gutter)] py-10 text-center"
    >
      <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(212,255,0,0.07)] blur-[110px]" />

      <p className="contact-reveal stagger-item font-mono text-[11px] font-medium tracking-[0.35em] text-[#d4ff00] uppercase">
        Commission
      </p>

      <h2 className="contact-reveal stagger-item mt-5 font-display text-[clamp(2.5rem,8vw,6.5rem)] font-extrabold leading-[0.92] tracking-[-0.045em] text-white">
        Have a project
        <br />
        <span className="text-[#d4ff00]">in mind?</span>
      </h2>

      <p className="contact-reveal stagger-item mx-auto mt-6 max-w-md text-sm font-light leading-relaxed text-white/55 md:text-[15px]">
        We partner with bold brands building award-worthy cinematic sites — from first frame to final frame.
      </p>

      <div className="contact-reveal stagger-item mt-10">
        <a
          href="mailto:hello@voidstudio.agency"
          className="group inline-flex items-center gap-4 bg-[#d4ff00] px-8 py-4 font-mono text-[11px] font-bold tracking-[0.22em] text-black uppercase transition-transform duration-500 hover:translate-y-[-2px]"
          data-cursor="EMAIL"
        >
          hello@voidstudio.agency
          <span className="transition-transform duration-500 group-hover:translate-x-1.5" aria-hidden>
            →
          </span>
        </a>
      </div>
    </section>
  );
}
