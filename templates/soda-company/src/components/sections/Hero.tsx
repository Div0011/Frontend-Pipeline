"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SPECS = [
  {
    id: "outer-housing",
    label: "01 / MONOLITHIC CONSTRUCTION",
    name: "Grade-5 Titanium Shell",
    desc: "Machined from a single billet, anodized into a silence that weighs nothing.",
    range: [0.22, 0.38] as [number, number],
    position: "left-6 md:left-16 top-[28%]",
  },
  {
    id: "core-processor",
    label: "02 / NEURAL CONSCIOUSNESS",
    name: "4nm Neural Lattice",
    desc: "Fifteen billion transistors arranged in a city of logic, deciding before you think.",
    range: [0.38, 0.54] as [number, number],
    position: "right-6 md:right-16 top-[33%]",
  },
  {
    id: "haptic-engine",
    label: "03 / TACTILE VOCABULARY",
    name: "Dual-Core Haptic Driver",
    desc: "Sub-millisecond pulses translating electrical decisions into absolute feeling.",
    range: [0.54, 0.7] as [number, number],
    position: "left-6 md:left-16 bottom-[28%]",
  },
  {
    id: "battery-cell",
    label: "04 / ENERGY RESERVOIR",
    name: "Graphene Matrix Battery",
    desc: "Carbon lattice energy. Seventy-two hours of silent, unyielding strength.",
    range: [0.7, 0.86] as [number, number],
    position: "right-6 md:right-16 bottom-[33%]",
  },
];

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvas: HTMLCanvasElement
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const imgRatio = img.width / img.height;
  const canvasRatio = canvas.width / canvas.height;
  let drawWidth = canvas.width;
  let drawHeight = canvas.height;
  let drawX = 0;
  let drawY = 0;

  if (imgRatio > canvasRatio) {
    drawWidth = canvas.height * imgRatio;
    drawX = (canvas.width - drawWidth) / 2;
  } else {
    drawHeight = canvas.width / imgRatio;
    drawY = (canvas.height - drawHeight) / 2;
  }

  ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const totalFrames = 300;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(6, "0");
      img.src = `/frames/product/frame_${frameNum}.webp`;
      img.onload = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
      };
      loadedImages.push(img);
    }

    imagesRef.current = loadedImages;
  }, []);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawFrame = (index: number) => {
      const img = imagesRef.current[index];
      if (!img || !img.complete) return;
      drawCover(ctx, img, canvas);
    };

    let st: ScrollTrigger | null = null;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const currentProgress = st ? st.progress : 0;
      const frameIndex = Math.min(
        totalFrames - 1,
        Math.floor(currentProgress * totalFrames)
      );
      drawFrame(frameIndex);
    };

    if (reducedMotion) {
      resizeCanvas();
      const check = () => {
        if (imagesRef.current[0]?.complete) drawFrame(0);
        else setTimeout(check, 50);
      };
      check();
      window.addEventListener("resize", resizeCanvas);
      return () => window.removeEventListener("resize", resizeCanvas);
    }

    st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=380%",
      pin: true,
      scrub: 0.65,
      onUpdate: (self) => {
        const progress = self.progress;
        setScrollProgress(progress);
        const frameIndex = Math.min(
          totalFrames - 1,
          Math.floor(progress * totalFrames)
        );
        drawFrame(frameIndex);
      },
    });

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const checkAndDrawInitial = () => {
      if (imagesRef.current[0]?.complete) {
        drawFrame(0);
      } else {
        setTimeout(checkAndDrawInitial, 50);
      }
    };
    checkAndDrawInitial();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      st?.kill();
    };
  }, [reducedMotion]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !imagesRef.current[0]?.complete) return;
    drawCover(ctx, imagesRef.current[0], canvas);
  }, [imagesLoaded]);

  useEffect(() => {
    if (!introRef.current || reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        introRef.current!.querySelectorAll("[data-intro]"),
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 1.15,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.15,
        }
      );
    }, introRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  const getSpecStyle = (progress: number, range: [number, number]) => {
    const [start, end] = range;
    const graceStart = start - 0.04;
    const graceEnd = end + 0.04;

    if (progress < graceStart || progress > graceEnd) {
      return {
        opacity: 0,
        transform: "translate3d(0, 24px, 0) scale(0.96)",
        pointerEvents: "none" as const,
      };
    }

    let opacity = 1;
    let yOffset = 0;
    let scale = 1;

    if (progress < start) {
      const t = (progress - graceStart) / 0.04;
      opacity = t;
      yOffset = (1 - t) * 24;
      scale = 0.96 + t * 0.04;
    } else if (progress > end) {
      const t = (graceEnd - progress) / 0.04;
      opacity = t;
      yOffset = (t - 1) * 24;
      scale = 1 - (1 - t) * 0.04;
    }

    return {
      opacity,
      transform: `translate3d(0, ${yOffset}px, 0) scale(${scale})`,
      transition: reducedMotion
        ? "none"
        : "transform 0.18s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.18s linear",
      pointerEvents: (opacity > 0.1 ? "auto" : "none") as "auto" | "none",
    };
  };

  const introOpacity = Math.max(0, 1 - scrollProgress * 5.5);
  const headerOpacity = Math.max(0, 1 - scrollProgress * 6);
  const scrollHintOpacity = Math.max(0, 1 - scrollProgress * 8);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-[#050506] text-[#f3f1ec] z-20 void-vignette"
    >
      {/* Atmospheric void layers */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[#050506]" />
        <div className="animate-aurora absolute -left-[20%] top-[-10%] h-[70%] w-[70%] rounded-full bg-[radial-gradient(circle,rgba(90,110,130,0.22)_0%,transparent_68%)] blur-3xl" />
        <div className="animate-aurora absolute -right-[15%] bottom-[-5%] h-[55%] w-[55%] rounded-full bg-[radial-gradient(circle,rgba(201,166,107,0.12)_0%,transparent_70%)] blur-3xl [animation-delay:3s]" />
        <div className="absolute inset-0 bg-elemental-grid opacity-40" />
      </div>

      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-[1] h-full w-full object-cover opacity-90 mix-blend-lighten"
      />

      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            "radial-gradient(ellipse 55% 60% at 50% 48%, transparent 20%, rgba(5,5,6,0.55) 70%, rgba(5,5,6,0.92) 100%)",
        }}
        aria-hidden="true"
      />

      {imagesLoaded < totalFrames && (
        <div className="absolute top-24 left-8 z-30 flex items-center gap-2.5 border border-white/10 bg-black/50 px-4 py-2 backdrop-blur-md">
          <div className="h-1.5 w-1.5 rounded-full bg-[#c9a66b] animate-pulse" />
          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-[#f3f1ec]/70">
            Buffering anatomy · {Math.round((imagesLoaded / totalFrames) * 100)}%
          </span>
        </div>
      )}

      <header
        className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-8 py-6 select-none"
        style={{
          opacity: headerOpacity,
          pointerEvents: scrollProgress < 0.15 ? "auto" : "none",
        }}
      >
        <div className="flex items-center gap-3">
          <div className="relative flex h-2 w-2 items-center justify-center">
            <span className="absolute h-2 w-2 rounded-full bg-[#c9a66b]" />
            {!reducedMotion && (
              <span className="absolute h-2 w-2 rounded-full bg-[#c9a66b] opacity-60 animate-pulse-ring" />
            )}
          </div>
          <span className="font-display text-sm font-bold uppercase tracking-[0.28em] text-[#f3f1ec]">
            APEX
          </span>
        </div>

        <nav className="hidden items-center gap-8 font-mono text-[9px] uppercase tracking-[0.28em] text-[#f3f1ec]/55 md:flex">
          <a href="#elements" className="transition-colors hover:text-[#c9a66b]">
            Elements
          </a>
          <a href="#anatomy" className="transition-colors hover:text-[#c9a66b]">
            Anatomy
          </a>
          <a href="#covenant" className="transition-colors hover:text-[#c9a66b]">
            Covenant
          </a>
        </nav>

        <span className="border border-[#c9a66b]/50 bg-[#c9a66b]/10 px-3 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-[#c9a66b]">
          Edition 01
        </span>
      </header>

      {/* First-viewport composition: brand + headline + support + CTA */}
      <div
        ref={introRef}
        className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-[12vh] px-8 text-center md:justify-center md:pb-0 md:pt-[8vh]"
        style={{
          opacity: introOpacity,
          pointerEvents: scrollProgress < 0.18 ? "auto" : "none",
        }}
      >
        <p
          data-intro
          className="font-display text-[clamp(3.5rem,12vw,9rem)] font-extrabold uppercase leading-[0.85] tracking-[-0.03em] text-[#f3f1ec]"
        >
          APEX
        </p>
        <h1
          data-intro
          className="mt-5 max-w-2xl font-display text-[clamp(1.35rem,3.2vw,2.35rem)] font-semibold uppercase leading-tight tracking-[0.08em] text-[#f3f1ec]/90"
        >
          The Void Machined.
        </h1>
        <p
          data-intro
          className="mt-4 max-w-md font-mono text-[11px] font-light leading-relaxed tracking-wide text-[#f3f1ec]/55 sm:text-xs"
        >
          Aerospace titanium. Neural silence. An instrument forged for those who
          prefer presence over noise.
        </p>
        <div data-intro className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#covenant"
            className="border border-[#c9a66b] bg-[#c9a66b] px-7 py-3.5 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#0a0a0b] transition-colors hover:bg-[#d4b57e]"
            data-cursor="hover"
            data-cursor-label="ENTER"
          >
            Begin Covenant
          </a>
          <a
            href="#anatomy"
            className="border border-white/15 bg-white/[0.03] px-7 py-3.5 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f3f1ec]/80 backdrop-blur-sm transition-colors hover:border-[#c9a66b]/40 hover:text-[#c9a66b]"
            data-cursor="hover"
            data-cursor-label="INSPECT"
          >
            Inspect Anatomy
          </a>
        </div>
      </div>

      {/* Scroll-driven disassembly callouts */}
      <div className="pointer-events-none absolute inset-0 z-[15]">
        {SPECS.map((spec) => {
          const specStyle = getSpecStyle(scrollProgress, spec.range);
          return (
            <div
              key={spec.id}
              className={`absolute max-w-sm border border-white/10 bg-black/55 p-6 backdrop-blur-xl ${spec.position}`}
              style={specStyle}
            >
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-[#c9a66b]">
                {spec.label}
              </span>
              <h3 className="mt-1.5 font-display text-base font-bold uppercase tracking-wide text-[#f3f1ec]">
                {spec.name}
              </h3>
              <p className="mt-2 font-mono text-xs font-light leading-relaxed text-[#f3f1ec]/60">
                {spec.desc}
              </p>
              <div className="mt-4 h-px w-full overflow-hidden bg-white/10">
                <div
                  className="h-full bg-[#c9a66b]"
                  style={{
                    width: `${Math.max(
                      0,
                      Math.min(
                        100,
                        ((scrollProgress - spec.range[0]) /
                          (spec.range[1] - spec.range[0])) *
                          100
                      )
                    )}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div
        className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2"
        style={{ opacity: scrollHintOpacity }}
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#f3f1ec]/35">
          Scroll to disassemble
        </span>
        <span className="h-8 w-px bg-gradient-to-b from-[#c9a66b]/70 to-transparent" />
      </div>

      <div
        className="absolute bottom-6 right-8 z-30 flex items-center gap-3 font-mono text-[10px] text-[#f3f1ec]/45"
        style={{ opacity: scrollProgress > 0.08 ? 1 : 0 }}
      >
        <span className="uppercase tracking-[0.2em]">Explosion state</span>
        <span className="text-sm font-bold text-[#c9a66b]">
          {Math.round(scrollProgress * 100)}%
        </span>
      </div>
    </section>
  );
}
