"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ELEMENTS = [
  {
    symbol: "Ti",
    number: "22",
    name: "Aerospace Titanium",
    desc: "Forged in the vacuum where stars die, now wrapped around a glass heart.",
  },
  {
    symbol: "C",
    number: "06",
    name: "Graphene Matrix",
    desc: "A carbon lattice so dense it redefines what strength means.",
  },
  {
    symbol: "Si",
    number: "14",
    name: "Quantum Silicon",
    desc: "Carved at four nanometers. Forty-five trillion operations per second.",
  },
  {
    symbol: "Al₂O₃",
    number: "13",
    name: "Sapphire Crystal",
    desc: "Harder than steel. Clearer than air. The only shield strong enough to disappear.",
  },
];

export default function ParallaxShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const phone1WrapRef = useRef<HTMLDivElement>(null);
  const phone2WrapRef = useRef<HTMLDivElement>(null);
  const textWrapRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      if (textWrapRef.current) textWrapRef.current.style.opacity = "1";
      return;
    }

    const ctx = gsap.context(() => {
      if (textWrapRef.current) {
        gsap.fromTo(
          textWrapRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "top 40%",
              scrub: 1.1,
            },
          }
        );
      }

      if (phone1WrapRef.current) {
        gsap.fromTo(
          phone1WrapRef.current,
          { y: 140, rotate: -4, scale: 0.94 },
          {
            y: -90,
            rotate: 3,
            scale: 1.02,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.4,
            },
          }
        );
      }

      if (phone2WrapRef.current) {
        gsap.fromTo(
          phone2WrapRef.current,
          { y: -80, scale: 0.92, rotate: 2 },
          {
            y: 110,
            scale: 1.05,
            rotate: -2,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.65,
            },
          }
        );
      }

      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            ease: "none",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              end: "top 50%",
              scrub: 1,
            },
          }
        );
      }

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          y: -40,
          opacity: 0.7,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="elements"
      ref={sectionRef}
      className="relative z-20 min-h-screen overflow-hidden border-t border-white/5 bg-[#050506] px-6 py-32 text-[#f3f1ec] bg-noise"
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,166,107,0.14)_0%,transparent_70%)] blur-2xl opacity-50"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-elemental-grid opacity-50" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div ref={textWrapRef} className="max-w-3xl space-y-5 opacity-0 select-none">
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.28em] text-[#c9a66b]">
            03 / Elemental Suspension
          </span>
          <h2 className="font-display text-4xl font-extrabold uppercase leading-[0.92] tracking-tight text-[#f3f1ec] md:text-6xl lg:text-7xl">
            Elements
            <br />
            <span className="text-[#f3f1ec]/28">suspended in void.</span>
          </h2>
          <p className="max-w-xl font-mono text-xs font-light leading-relaxed text-[#f3f1ec]/55 sm:text-sm">
            Not components — the elemental vocabulary of a machine that speaks in
            a frequency only the patient can hear.
          </p>
        </div>

        <div className="mt-24 grid grid-cols-1 items-center gap-14 lg:grid-cols-12">
          <div className="relative flex items-center justify-center lg:col-span-6">
            <div
              ref={phone1WrapRef}
              className="animate-float-drift relative aspect-[3/4] w-full max-w-[400px] overflow-hidden border border-white/10 bg-[#0c0c0e]/80 shadow-[0_40px_100px_rgba(0,0,0,0.55)] backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(138,154,170,0.12),transparent_60%)]" />
              <div className="absolute top-4 left-4 z-20 border border-white/10 bg-black/50 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#c9a66b] backdrop-blur-md">
                Frame — Grade 5 Titanium
              </div>
              <Image
                src="/images/parallax-phone-1.png"
                alt="Titanium frame render"
                fill
                className="object-contain p-6"
                sizes="(max-width: 768px) 100vw, 500px"
              />
            </div>
          </div>

          <div className="space-y-8 lg:col-span-6">
            <div
              ref={phone2WrapRef}
              className="relative ml-auto aspect-[16/10] w-full max-w-[450px] overflow-hidden border border-white/10 bg-[#0c0c0e]/80 shadow-[0_30px_80px_rgba(0,0,0,0.5)] backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(201,166,107,0.1),transparent_55%)]" />
              <div className="absolute top-4 left-4 z-20 border border-white/10 bg-black/50 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#c9a66b] backdrop-blur-md">
                Optical Aperture & Camera Matrix
              </div>
              <Image
                src="/images/parallax-phone-2.png"
                alt="Macro optics render"
                fill
                className="object-contain p-4"
                sizes="(max-width: 1200px) 100vw, 500px"
              />
            </div>

            <div ref={cardsRef} className="grid grid-cols-2 gap-3">
              {ELEMENTS.map((item) => (
                <div
                  key={item.symbol}
                  className="border border-white/8 bg-white/[0.03] p-5 transition-colors duration-300 hover:border-[#c9a66b]/35 hover:bg-white/[0.05]"
                >
                  <div className="flex items-center justify-between border-b border-white/8 pb-2">
                    <span className="font-mono text-xl font-bold text-[#f3f1ec]">
                      {item.symbol}
                    </span>
                    <span className="font-mono text-[9px] font-semibold text-[#f3f1ec]/35">
                      {item.number}
                    </span>
                  </div>
                  <div className="mt-2.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#f3f1ec]/90">
                    {item.name}
                  </div>
                  <div className="mt-1 font-mono text-[11px] font-light leading-relaxed text-[#f3f1ec]/45">
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
