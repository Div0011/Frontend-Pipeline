"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAdaptiveTheme } from "./AdaptiveThemeProvider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FrameScrubSectionProps {
  frameCount?: number;
  framePrefix?: string;
  frameExtension?: string;
  batchSize?: number;
}

export default function VideoScrub({
  frameCount = 100,
  framePrefix = "/frames/can_swirl/frame_",
  frameExtension = "jpg",
  batchSize = 20,
}: FrameScrubSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useAdaptiveTheme();

  const [activeChapter, setActiveChapter] = useState<1 | 2 | 3>(1);
  const [chapterOpacities, setChapterOpacities] = useState({ ch1: 1, ch2: 0, ch3: 0 });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const images: HTMLImageElement[] = new Array(frameCount).fill(null) as HTMLImageElement[];
    let loadedCount = 0;
    let currentBatch = 0;

    const drawFrame = (frameIndex: number) => {
      const img = images[frameIndex];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      const imgAspect = img.width / img.height;
      const canvasAspect = width / height;

      let drawW, drawH;
      if (canvasAspect > imgAspect) {
        drawW = width;
        drawH = width / imgAspect;
      } else {
        drawH = height;
        drawW = height * imgAspect;
      }

      const drawX = (width - drawW) / 2;
      const drawY = (height - drawH) / 2;

      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, drawX, drawY, drawW, drawH);
      ctx.restore();
    };

    const loadBatch = (batchIndex: number) => {
      const start = batchIndex * batchSize;
      const end = Math.min(start + batchSize, frameCount);

      for (let i = start; i < end; i++) {
        const img = new Image();
        const paddedNum = (i + 1).toString().padStart(3, "0");
        img.src = `${framePrefix}${paddedNum}.${frameExtension}`;
        img.onload = () => {
          loadedCount++;
          images[i] = img;
          if (loadedCount === 1) {
            drawFrame(0);
          }
        };
        img.onerror = () => {
          loadedCount++;
        };
        images[i] = img;
      }
    };

    const scheduleNextBatch = () => {
      if (currentBatch * batchSize < frameCount) {
        setTimeout(() => {
          loadBatch(currentBatch);
          currentBatch++;
          scheduleNextBatch();
        }, 0);
      }
    };

    scheduleNextBatch();

    const frameObj = { frame: 0 };

    const ctxGsap = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const targetFrame = Math.min(frameCount - 1, Math.floor(progress * (frameCount - 1)));
          frameObj.frame = targetFrame;
          drawFrame(targetFrame);

          let ch1 = 0, ch2 = 0, ch3 = 0;
          if (progress <= 0.35) {
            ch1 = progress < 0.28 ? 1 : Math.max(0, 1 - (progress - 0.28) / 0.07);
          } else if (progress > 0.35 && progress <= 0.70) {
            ch2 = progress < 0.42
              ? (progress - 0.35) / 0.07
              : progress > 0.63
              ? 1 - (progress - 0.63) / 0.07
              : 1;
          } else {
            ch3 = progress < 0.77 ? (progress - 0.70) / 0.07 : 1;
          }

          setChapterOpacities({
            ch1: Math.max(0, Math.min(1, ch1)),
            ch2: Math.max(0, Math.min(1, ch2)),
            ch3: Math.max(0, Math.min(1, ch3)),
          });
        },
      });

      const handleResize = () => drawFrame(frameObj.frame);
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    });

    return () => {
      ctxGsap.revert();
    };
  }, [frameCount, framePrefix, frameExtension, batchSize]);

  return (
    <div ref={containerRef} className="relative w-full h-[320vh] bg-[#07020d]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center pointer-events-none">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover"
          style={{
            filter: "brightness(0.72) contrast(1.15) saturate(1.1)",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0314] via-transparent to-[#0d0314] opacity-80" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#0d0314]/50 to-[#0d0314] opacity-90" />

        <div className="absolute inset-0 max-w-7xl mx-auto px-6 md:px-16 flex items-center justify-between pointer-events-none z-10">
          
          <div
            className="absolute left-6 md:left-16 max-w-xl p-8 md:p-12 rounded-3xl bg-black/60 border border-white/15 backdrop-blur-2xl transition-all duration-300 pointer-events-auto"
            style={{
              opacity: chapterOpacities.ch1,
              transform: `translateY(${(1 - chapterOpacities.ch1) * 30}px) scale(${0.95 + chapterOpacities.ch1 * 0.05})`,
              pointerEvents: chapterOpacities.ch1 > 0.2 ? "auto" : "none",
            }}
          >
            <span
              className="font-mono text-[10px] font-bold uppercase tracking-[0.35em] block mb-3"
              style={{ color: theme.accentColor }}
            >
              Chapter 01 // Molecular Velocity
            </span>
            <h2 className="font-display text-[clamp(2.5rem,7vw,5rem)] font-extrabold uppercase leading-[0.92] text-white mb-4">
              Born From <span className="text-transparent bg-clip-text" style={{ backgroundImage: theme.gradient }}>Chaos</span>
            </h2>
            <p className="text-sm md:text-base text-white/80 leading-relaxed font-sans">
              We stripped carbonation back to its raw atomic elements. Eliminating artificial syrups, phosphoric acids, and glucose spikes in favor of molecular botanical science.
            </p>
          </div>

          <div
            className="absolute right-6 md:right-16 max-w-xl text-right p-8 md:p-12 rounded-3xl bg-black/60 border border-white/15 backdrop-blur-2xl transition-all duration-300 pointer-events-auto"
            style={{
              opacity: chapterOpacities.ch2,
              transform: `translateY(${(1 - chapterOpacities.ch2) * 30}px) scale(${0.95 + chapterOpacities.ch2 * 0.05})`,
              pointerEvents: chapterOpacities.ch2 > 0.2 ? "auto" : "none",
            }}
          >
            <span
              className="font-mono text-[10px] font-bold uppercase tracking-[0.35em] block mb-3"
              style={{ color: theme.accentColor }}
            >
              Chapter 02 // Pure Glacial Extraction
            </span>
            <h2 className="font-display text-[clamp(2.5rem,7vw,5rem)] font-extrabold uppercase leading-[0.92] text-white mb-4">
              Crafted With <span className="text-transparent bg-clip-text" style={{ backgroundImage: theme.gradient }}>Precision</span>
            </h2>
            <p className="text-sm md:text-base text-white/80 leading-relaxed font-sans ml-auto">
              Hand-harvested cold-pressed citrus essences infused with 4,000m alpine springs at 3.2 atmospheres of micron-level effervescence. Zero synthetic additives.
            </p>
          </div>

          <div
            className="absolute inset-x-6 md:inset-x-0 mx-auto max-w-2xl text-center p-8 md:p-12 rounded-3xl bg-black/60 border border-white/15 backdrop-blur-2xl transition-all duration-300 pointer-events-auto"
            style={{
              opacity: chapterOpacities.ch3,
              transform: `translateY(${(1 - chapterOpacities.ch3) * 30}px) scale(${0.95 + chapterOpacities.ch3 * 0.05})`,
              pointerEvents: chapterOpacities.ch3 > 0.2 ? "auto" : "none",
            }}
          >
            <span
              className="font-mono text-[10px] font-bold uppercase tracking-[0.35em] block mb-3"
              style={{ color: theme.accentColor }}
            >
              Chapter 03 // The Eruption
            </span>
            <h2 className="font-display text-[clamp(2.8rem,8vw,5.5rem)] font-extrabold uppercase leading-[0.9] text-white mb-4">
              AURA — <span className="text-transparent bg-clip-text" style={{ backgroundImage: theme.gradient }}>The Revolution</span>
            </h2>
            <p className="text-sm md:text-base text-white/80 leading-relaxed font-sans max-w-lg mx-auto">
              This is not just soda. This is the molecular future of hydration—adaptogenic monk fruit, electrolytes, and zero crash.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
