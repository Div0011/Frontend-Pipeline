"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GRID_COLS = 8;
const GRID_ROWS = 5;
const CELL_W = 100 / GRID_COLS;
const CELL_H = 100 / GRID_ROWS;

function GridMover({ col, row }: { col: number; row: number }) {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const delay = (col + row) * 0.08;
    const drift = 18 + ((col * row) / (GRID_COLS * GRID_ROWS)) * 22;
    const rotate = ((col + row) % 2 === 0 ? 1 : -1) * (12 + Math.random() * 18);

    gsap.fromTo(
      el,
      { x: 0, y: 0, rotate: 0, opacity: 0 },
      {
        x: `+=${drift * (col % 2 === 0 ? 1 : -1)}`,
        y: `+=${drift * (row % 2 === 0 ? 1 : -1)}`,
        rotate,
        opacity: 0.35,
        duration: 1.6,
        delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      }
    );
  }, [col, row]);

  const shapes = [
    <div key="d" className="w-1.5 h-1.5 bg-white/80 rounded-full" />,
    <div key="l" className="w-4 h-px bg-white/60" />,
    <div key="p" className="flex items-center justify-center">
      <div className="w-3 h-px bg-white/60 absolute" />
      <div className="h-3 w-px bg-white/60 absolute" />
    </div>,
    <div key="s" className="w-2 h-2 border border-white/50 rotate-45" />,
    <div key="c" className="w-2 h-2 rounded-full border border-white/40" />,
  ];

  const shape = shapes[(col + row) % shapes.length];

  return (
    <div
      ref={elRef}
      className="grid-mover absolute flex items-center justify-center"
      style={{
        left: `${col * CELL_W}%`,
        top: `${row * CELL_H}%`,
        width: `${CELL_W}%`,
        height: `${CELL_H}%`,
      }}
    >
      {shape}
    </div>
  );
}

export default function HeroFog() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const floatingCard1Ref = useRef<HTMLDivElement>(null);
  const floatingCard2Ref = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !isClient) return;

    const ctx = gsap.context(() => {
      if (heroTextRef.current) {
        gsap.to(heroTextRef.current, {
          y: -60,
          opacity: 0.2,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "center top",
            scrub: true,
          },
        });
      }

      if (floatingCard1Ref.current) {
        gsap.to(floatingCard1Ref.current, {
          y: -120,
          rotate: -8,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      if (floatingCard2Ref.current) {
        gsap.to(floatingCard2Ref.current, {
          y: 140,
          rotate: 12,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }
    });

    return () => ctx.revert();
  }, [isClient]);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-[#0a0a0a] text-white px-6 py-12 md:px-16 border-b border-white/10"
    >
      <div className="absolute inset-0 z-0 bg-elemental-grid opacity-60 pointer-events-none" />

      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {Array.from({ length: GRID_ROWS }).map((_, row) =>
          Array.from({ length: GRID_COLS }).map((_, col) => (
            <GridMover key={`${col}-${row}`} col={col} row={row} />
          ))
        )}
      </div>

      <video
        ref={videoRef}
        className="absolute inset-0 z-0 h-full w-full object-cover opacity-40"
        autoPlay
        loop
        muted
        playsInline
        poster="/images/exhibition-hero.jpg"
      >
        <source src="/videos/orbit.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0a0a0a]/60 via-[#0a0a0a]/40 to-[#0a0a0a]/90 pointer-events-none" />

      <div className="relative z-20 flex items-center justify-between border-b border-white/10 pb-5">
        <div className="flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#d4a574] animate-ping" />
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-white font-bold">
            Aetheria Museum // Prime Collection
          </span>
        </div>
        <div className="flex items-center gap-6 font-mono text-[11px] text-white/60">
          <span className="hidden md:inline">Est. New York 1924</span>
          <span className="hidden md:inline font-bold">Institutional Trust</span>
          <span className="border border-[#d4a574] bg-[#d4a574] text-black px-3 py-1 font-bold uppercase tracking-widest text-[10px]">
            Now Viewing
          </span>
        </div>
      </div>

      <div className="relative z-20 my-auto grid grid-cols-1 items-center gap-12 py-12 lg:grid-cols-12">
        <div ref={heroTextRef} className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d4a574]/30 bg-[#141414]/80 px-4 py-1.5 backdrop-blur-md">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#d4a574]">
              Cinematic Exhibition
            </span>
          </div>

          <h1 className="font-display text-5xl font-black tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl leading-[0.92] uppercase">
            The <br />
            <span className="text-white/30">Void</span> <br />
            Machined.
          </h1>

          <p className="max-w-xl text-base font-light text-white/70 leading-relaxed font-mono">
            Born from a single extrusion of aerospace-grade titanium. Cold, monolithic, absolute. Every surface finished to tolerances so fine they exist beyond touch. This is not minimalism. This is the machine stripped to its essential gesture.
          </p>

          <div className="grid grid-cols-3 gap-4 max-w-md pt-4">
            <div className="border border-white/10 bg-[#141414]/80 p-4 shadow-lg hover:border-[#d4a574]/50 transition-colors backdrop-blur-sm">
              <div className="font-mono text-[10px] text-[#d4a574] uppercase tracking-wider font-bold">Mass</div>
              <div className="mt-1 font-mono text-lg font-extrabold text-white">164g</div>
              <div className="font-mono text-[9px] text-white/40 leading-tight">of absolute gravity</div>
            </div>
            <div className="border border-white/10 bg-[#141414]/80 p-4 shadow-lg hover:border-[#d4a574]/50 transition-colors backdrop-blur-sm">
              <div className="font-mono text-[10px] text-[#d4a574] uppercase tracking-wider font-bold">Grade</div>
              <div className="mt-1 font-mono text-lg font-extrabold text-white">Ti-6Al-4V</div>
              <div className="font-mono text-[9px] text-white/40 leading-tight">the alloy of orbital frames</div>
            </div>
            <div className="border border-white/10 bg-[#141414]/80 p-4 shadow-lg hover:border-[#d4a574]/50 transition-colors backdrop-blur-sm">
              <div className="font-mono text-[10px] text-[#d4a574] uppercase tracking-wider font-bold">Finish</div>
              <div className="mt-1 font-mono text-lg font-extrabold text-white">Ceramic</div>
              <div className="font-mono text-[9px] text-white/40 leading-tight">harder than most metals</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 relative flex items-center justify-center min-h-[480px]">
          <div
            ref={floatingCard1Ref}
            className="absolute -top-6 left-2 z-30 bg-[#141414]/90 border border-white/10 p-4 shadow-2xl font-mono text-xs hidden sm:block backdrop-blur-md"
          >
            <div className="text-[10px] text-[#d4a574] uppercase font-bold tracking-widest">OPTICAL APERTURE</div>
            <div className="text-white font-extrabold text-sm mt-0.5">200 MP SINGULARITY</div>
          </div>

          <div
            ref={floatingCard2Ref}
            className="absolute -bottom-6 right-2 z-30 bg-white text-black p-4 shadow-2xl font-mono text-xs hidden sm:block"
          >
            <div className="text-[10px] text-black/50 uppercase font-bold tracking-widest">NEURAL MESH</div>
            <div className="text-[#d4a574] font-extrabold text-sm mt-0.5">3nm CONSCIOUSNESS CORE</div>
          </div>

          <div
            className="relative z-20 w-full max-w-[380px] aspect-[4/5] drop-shadow-2xl"
            style={{
              transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0px)`,
              transition: "transform 0.2s ease-out",
            }}
          >
            <Image
              src="/images/hero-phone.png"
              alt="APEX ELEM-01 White Titanium Phone"
              fill
              className="object-contain filter contrast-110"
              priority
              sizes="(max-width: 768px) 100vw, 450px"
            />
          </div>
        </div>
      </div>

      <div className="relative z-20 flex items-center justify-between border-t border-white/10 pt-5">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#d4a574]">
            DESCEND INTO THE ANATOMY
          </span>
          <span className="font-mono text-sm text-white font-bold animate-bounce">↓</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-white/50 font-light">RITUAL PRICE</span>
          <span className="font-mono text-base font-extrabold text-white border-b-2 border-white pb-0.5">
            $1,299 USD
          </span>
        </div>
      </div>
    </section>
  );
}
