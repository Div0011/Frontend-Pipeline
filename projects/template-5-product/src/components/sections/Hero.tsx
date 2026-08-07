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
    range: [0.54, 0.70] as [number, number],
    position: "left-6 md:left-16 bottom-[28%]",
  },
  {
    id: "battery-cell",
    label: "04 / ENERGY RESERVOIR",
    name: "Graphene Matrix Battery",
    desc: "Carbon lattice energy. Seventy-two hours of silent, unyielding strength.",
    range: [0.70, 0.86] as [number, number],
    position: "right-6 md:right-16 bottom-[33%]",
  },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const totalFrames = 300;

  // Preload all 300 WebP frames of the phone explosion
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

  // Set up ScrollTrigger and Canvas draw loop (runs exactly once on mount)
  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawFrame = (index: number) => {
      const img = imagesRef.current[index];
      if (!img || !img.complete) return;

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
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const currentProgress = st ? st.progress : 0;
      const frameIndex = Math.min(totalFrames - 1, Math.floor(currentProgress * totalFrames));
      drawFrame(frameIndex);
    };

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=380%",
      pin: true,
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress;
        setScrollProgress(progress);
        const frameIndex = Math.min(totalFrames - 1, Math.floor(progress * totalFrames));
        drawFrame(frameIndex);
      },
    });

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Loop until first frame is loaded, then render it
    const checkAndDrawInitial = () => {
      if (imagesRef.current[0] && imagesRef.current[0].complete) {
        drawFrame(0);
      } else {
        setTimeout(checkAndDrawInitial, 50);
      }
    };
    checkAndDrawInitial();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      st.kill();
    };
  }, []);

  // Redraw when initial loading changes
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas ? canvas.getContext("2d") : null;
    if (canvas && ctx && imagesRef.current[0]) {
      const img = imagesRef.current[0];
      if (img.complete) {
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
    }
  }, [imagesLoaded]);

  // Helper to compute fade and translation dynamically for spec overlays during scroll sequence
  const getSpecStyle = (progress: number, range: [number, number]) => {
    const [start, end] = range;
    const graceStart = start - 0.04;
    const graceEnd = end + 0.04;

    if (progress < graceStart || progress > graceEnd) {
      return { opacity: 0, transform: "translate3d(0, 20px, 0) scale(0.96)", pointerEvents: "none" as const };
    }

    let opacity = 1;
    let yOffset = 0;
    let scale = 1;

    if (progress < start) {
      // Fading In
      const t = (progress - graceStart) / 0.04; // 0 to 1
      opacity = t;
      yOffset = (1 - t) * 20;
      scale = 0.96 + t * 0.04;
    } else if (progress > end) {
      // Fading Out (continues moving upwards)
      const t = (graceEnd - progress) / 0.04; // 1 to 0
      opacity = t;
      yOffset = (t - 1) * 20;
      scale = 1.0 - (1 - t) * 0.04;
    }

    return {
      opacity,
      transform: `translate3d(0, ${yOffset}px, 0) scale(${scale})`,
      transition: "transform 0.15s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.15s linear",
      pointerEvents: (opacity > 0.1 ? "auto" : "none") as "auto" | "none",
    };
  };

  // Interpolated values for color difference animation to fade out on scroll
  const colorProgress = Math.min(1, scrollProgress / 0.15);
  const colorVal = Math.round((1 - colorProgress) * 255);
  const differenceColor = `rgb(${colorVal}, ${colorVal}, ${colorVal})`;
  const titleMarginTop = scrollProgress * -180;
  const headerOpacity = Math.max(0, 1 - scrollProgress * 6);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-[#f5f5f7] text-[#1d1d1f] border-b border-black/5 bg-noise z-20"
    >
      {/* Background Canvas: Plays the phone explosion sequence */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 h-full w-full object-cover opacity-95"
      />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 z-0 bg-elemental-grid opacity-35 pointer-events-none" />

      {/* preloader frame progress overlay */}
      {imagesLoaded < totalFrames && (
        <div className="absolute top-20 left-8 z-30 flex items-center gap-2.5 rounded-full border border-black/5 bg-white/70 px-4 py-2 backdrop-blur-md shadow-sm">
          <div className="h-2 w-2 rounded-full bg-[#d4a574] animate-pulse" />
          <span className="font-mono text-[9px] text-[#1d1d1f] font-bold tracking-widest uppercase">
            LOADING EXPLOSION TIMELINE: {Math.round((imagesLoaded / totalFrames) * 100)}%
          </span>
        </div>
      )}

      {/* Premium Navigation Header - Fades on Scroll */}
      <header
        className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-8 py-6 border-b border-black/5 bg-white/35 backdrop-blur-md select-none transition-all duration-300"
        style={{ opacity: headerOpacity, pointerEvents: scrollProgress < 0.15 ? "auto" : "none" }}
      >
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <span className="h-2 w-2 rounded-full bg-[#d4a574] absolute" />
            <span className="h-2 w-2 rounded-full bg-[#d4a574] animate-ping opacity-75" />
          </div>
          <span className="font-display text-sm font-black uppercase tracking-widest text-[#1d1d1f]">
            APEX
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 font-mono text-[9px] uppercase tracking-[0.3em] text-[#1d1d1f]/85">
          <span className="hover:text-[#d4a574] transition-colors cursor-pointer">[ CONCEPT ]</span>
          <span className="hover:text-[#d4a574] transition-colors cursor-pointer">[ ANATOMY ]</span>
          <span className="hover:text-[#d4a574] transition-colors cursor-pointer">[ COVENANT ]</span>
        </nav>

        <div className="flex items-center gap-4">
          <span className="font-mono text-[9px] text-[#1d1d1f]/60 tracking-wider hidden sm:inline">REF: Ti-6Al-4V</span>
          <span className="border border-[#d4a574] bg-[#d4a574] text-white px-3 py-1 font-mono font-bold uppercase tracking-widest text-[9px] shadow-sm">
            EDITION 01
          </span>
        </div>
      </header>

      {/* INTRODUCTORY HERO OVERLAYS - Centered Typographic Title "THE VOID MACHINED." */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-8 pointer-events-none select-none">
        <h1
          className="font-display text-5xl font-black tracking-widest uppercase text-center leading-[0.9] mix-blend-difference sm:text-6xl md:text-7xl lg:text-8xl"
          style={{
            color: differenceColor,
            marginTop: `${titleMarginTop}px`,
          }}
        >
          The Void <br />
          Machined.
        </h1>
      </div>

      {/* DISASSEMBLY SPECIFICATION OVERLAYS (Shown sequentially during scroll) */}
      <div className="absolute inset-0 z-15 pointer-events-none">
        {SPECS.map((spec) => {
          const specStyle = getSpecStyle(scrollProgress, spec.range);

          return (
            <div
              key={spec.id}
              className={`absolute p-6 rounded-lg border border-black/5 bg-white/80 shadow-md backdrop-blur-md max-w-sm w-76 md:w-84 select-none`}
              style={specStyle}
            >
              <div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#d4a574] font-extrabold">
                  {spec.label}
                </span>
                <h3 className="mt-1 font-display text-md font-bold uppercase text-[#1d1d1f]">
                  {spec.name}
                </h3>
                <p className="mt-2 text-xs text-[#1d1d1f]/70 leading-relaxed font-mono">
                  {spec.desc}
                </p>
              </div>

              {/* Progress track inside specification bubble */}
              <div className="h-0.5 bg-black/5 w-full overflow-hidden mt-4">
                <div
                  className="h-full bg-[#d4a574]"
                  style={{
                    width: `${
                      Math.max(0, Math.min(100, ((scrollProgress - spec.range[0]) / (spec.range[1] - spec.range[0])) * 100))
                    }%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Dynamic Progress indicator overlay at the bottom right */}
      <div
        className="absolute bottom-6 right-8 z-30 font-mono text-[10px] text-[#1d1d1f]/60 flex items-center gap-3 transition-opacity duration-300"
        style={{ opacity: scrollProgress > 0.08 ? 1 : 0 }}
      >
        <span>EXPLOSION STATE</span>
        <span className="text-sm font-extrabold text-[#d4a574]">
          {Math.round(scrollProgress * 100)}%
        </span>
      </div>
    </section>
  );
}
