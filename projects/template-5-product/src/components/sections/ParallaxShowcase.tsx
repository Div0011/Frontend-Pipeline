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
    desc: "Carved at four nanometers. Forty-five trillion operations per second. Thinking before you ask.",
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

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (textWrapRef.current) {
        gsap.fromTo(
          textWrapRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              end: "top 35%",
              scrub: 1,
            },
          }
        );
      }

      if (phone1WrapRef.current) {
        gsap.fromTo(
          phone1WrapRef.current,
          { y: 100, rotate: -2 },
          {
            y: -60,
            rotate: 2,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.3,
            },
          }
        );
      }

      if (phone2WrapRef.current) {
        gsap.fromTo(
          phone2WrapRef.current,
          { y: -60, scale: 0.97 },
          {
            y: 80,
            scale: 1.03,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#f5f5f7] text-[#1d1d1f] bg-elemental-grid py-28 px-6 border-t border-black/5 z-20 bg-noise"
    >
      <div className="mx-auto max-w-7xl relative z-10">
        <div ref={textWrapRef} className="max-w-3xl space-y-4 opacity-0 select-none">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white px-3.5 py-1 shadow-sm">
            <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#d4a574]">
              03 / ELEMENTAL SUSPENSION
            </span>
          </div>
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-[#1d1d1f] md:text-6xl lg:text-7xl uppercase leading-none">
            Elements <br />
            <span className="text-black/25">suspended in void.</span>
          </h2>
          <p className="text-xs sm:text-sm font-light text-[#1d1d1f]/75 leading-relaxed max-w-xl font-mono">
            They are not components. They are the elemental vocabulary of a machine that speaks in a frequency only the patient can hear.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6 relative flex justify-center items-center">
            <div
              ref={phone1WrapRef}
              className="relative w-full max-w-[400px] aspect-[3/4] border border-black/5 bg-white shadow-lg overflow-hidden p-6"
            >
              <div className="absolute top-4 left-4 z-20 font-mono text-[9px] uppercase tracking-widest text-[#d4a574] border border-black/5 px-2.5 py-1 bg-[#f5f5f7] font-bold">
                FRAME — GRADE 5 TITANIUM
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

          <div className="lg:col-span-6 space-y-6">
            <div
              ref={phone2WrapRef}
              className="relative w-full max-w-[450px] aspect-[16/10] border border-black/5 bg-white shadow-lg overflow-hidden ml-auto"
            >
              <div className="absolute top-4 left-4 z-20 font-mono text-[9px] uppercase tracking-widest text-[#d4a574] border border-black/5 px-2.5 py-1 bg-[#f5f5f7] font-bold">
                OPTICAL APERTURE & CAMERA MATRIX
              </div>
              <Image
                src="/images/parallax-phone-2.png"
                alt="Macro optics render"
                fill
                className="object-contain p-4"
                sizes="(max-width: 1200px) 100vw, 500px"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {ELEMENTS.map((item) => (
                <div
                  key={item.symbol}
                  className="border border-black/5 bg-white p-5 transition-all duration-300 hover:border-[#d4a574]/40 shadow-sm"
                >
                  <div className="flex items-center justify-between border-b border-black/5 pb-2">
                    <span className="font-mono text-xl font-bold text-[#1d1d1f]">{item.symbol}</span>
                    <span className="font-mono text-[9px] text-[#1d1d1f]/45 font-bold">{item.number}</span>
                  </div>
                  <div className="mt-2.5 font-mono text-[10px] font-bold text-[#1d1d1f] uppercase tracking-wider">
                    {item.name}
                  </div>
                  <div className="mt-1 text-[11px] text-[#1d1d1f]/65 leading-relaxed font-mono font-light">
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
