"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollExpandProps {
  src?: string;
  alt?: string;
  title?: string;
  scrollHint?: string;
  useWindowScroll?: boolean;
  mediaZoom?: number;
  startWidth?: number;
  startHeight?: number;
  startRadius?: number;
  endRadius?: number;
  scrollDistance?: number;
  holdDistance?: number;
  smoothing?: number;
  overlayScrim?: number;
  enabled?: boolean;
  children?: React.ReactNode;
}

export default function ScrollExpand({
  src = "/images/soda_editorial_1.png",
  alt = "Product visual showcase",
  title = "BUILT TO SCALE",
  scrollHint = "Scroll inside the frame",
  mediaZoom = 1.25,
  startWidth = 46,
  startHeight = 60,
  startRadius = 28,
  endRadius = 0,
  overlayScrim = 0.4,
  children,
}: ScrollExpandProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const frame = frameRef.current;
    const img = imageRef.current;
    const content = contentRef.current;
    if (!container || !frame) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=180%",
          pin: true,
          scrub: 0.8,
          onUpdate: (self) => {
            setProgress(self.progress);
          },
        },
      });

      tl.fromTo(
        frame,
        {
          width: `${startWidth}vw`,
          height: `${startHeight}vh`,
          borderRadius: `${startRadius}px`,
        },
        {
          width: "100vw",
          height: "100vh",
          borderRadius: `${endRadius}px`,
          ease: "power2.inOut",
        },
        0
      );

      if (img) {
        tl.fromTo(
          img,
          { scale: mediaZoom },
          { scale: 1.0, ease: "power2.inOut" },
          0
        );
      }

      if (content) {
        tl.fromTo(
          content,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, ease: "power3.out" },
          0.35
        );
      }
    }, container);

    return () => ctx.revert();
  }, [startWidth, startHeight, startRadius, endRadius, mediaZoom]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden z-20"
    >
      <div
        ref={frameRef}
        className="relative overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)] border border-white/15 backdrop-blur-md flex items-center justify-center transition-all"
        style={{
          width: `${startWidth}vw`,
          height: `${startHeight}vh`,
          borderRadius: `${startRadius}px`,
        }}
      >
        <div ref={imageRef} className="absolute inset-0 w-full h-full">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"
            style={{ opacity: overlayScrim }}
          />
        </div>

        {/* Content layer inside expanding frame */}
        <div
          ref={contentRef}
          className="relative z-10 max-w-3xl px-8 text-center text-white"
        >
          {title && (
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-emerald-400 block mb-3">
              {title}
            </span>
          )}
          {children ? (
            children
          ) : (
            <>
              <h2 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold uppercase leading-[0.92] tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/60">
                Every Molecule, Refined.
              </h2>
              <p className="text-sm md:text-base text-white/70 max-w-xl mx-auto font-sans leading-relaxed">
                The frame expands as you scroll, revealing the full aerospace aluminum anatomy and
                micron-level effervescence.
              </p>
            </>
          )}
        </div>

        {/* Scroll hint badge */}
        {scrollHint && progress < 0.25 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 font-mono text-[9px] uppercase tracking-[0.25em] text-white/60">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>{scrollHint}</span>
          </div>
        )}
      </div>
    </div>
  );
}
