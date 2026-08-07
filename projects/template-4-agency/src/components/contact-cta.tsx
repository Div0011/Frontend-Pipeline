"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RefreshCw } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ContactCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".contact-main > *");
      gsap.from(items, {
        opacity: 0,
        yPercent: 14,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
        clearProps: "transform",
      });
    });

    return () => ctx.revert();
  }, []);

  const loopBackToHero = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-full w-full flex flex-col justify-center items-center px-12 text-center"
    >
      <div className="absolute top-1/2 left-1/2 -z-10 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4ff00]/10 blur-[100px]" />

      <div className="contact-main">
        <span className="font-mono text-xs font-bold tracking-[0.3em] text-[#d4ff00] uppercase">
          COMMISSION // START A PROJECT
        </span>

        <h2 className="mt-4 font-mono text-4xl font-black uppercase text-white tracking-tighter md:text-7xl lg:text-8xl leading-none">
          HAVE A PROJECT <br />
          <span className="text-[#d4ff00]">IN MIND?</span>
        </h2>

        <p className="mx-auto mt-4 max-w-lg font-mono text-xs text-white/60 md:text-sm">
          We collaborate with bold brands and ambitious teams looking to build award-winning cinematic websites.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="mailto:hello@voidstudio.agency"
            className="group flex items-center gap-3 rounded-full bg-[#d4ff00] px-8 py-4 font-mono text-xs font-black uppercase tracking-widest text-black shadow-[0_0_30px_rgba(212,255,0,0.25)] transition-all duration-300 hover:scale-105 hover:bg-white"
            data-cursor="EMAIL"
          >
            <span>hello@voidstudio.agency</span>
            <span className="transition-transform group-hover:translate-x-2">→</span>
          </a>

          <button
            onClick={loopBackToHero}
            className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-4 font-mono text-xs font-bold tracking-widest text-white/80 transition-all duration-300 hover:border-[#d4ff00] hover:text-[#d4ff00]"
            data-cursor="LOOP"
          >
            <RefreshCw className="h-4 w-4 transition-transform duration-500 group-hover:rotate-180" />
            <span>RELOOP HERO</span>
          </button>
        </div>
      </div>
    </section>
  );
}
