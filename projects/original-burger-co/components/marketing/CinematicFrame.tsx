"use client";

import { useRef, useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ------------------------------------------------------------------ */
/*  Mask configs with organic easing curves                           */
/* ------------------------------------------------------------------ */

const MASK_CONFIGS = {
  organic: {
    from: "60% 40% 30% 70% / 60% 30% 70% 40%",
    to: "55% 45% 35% 65% / 55% 35% 65% 45%",
    entrance: { x: -80, opacity: 0 },
    easing: "sine.inOut",
  },
  parallelogram: {
    from: "polygon(12% 0%, 100% 0%, 88% 100%, 0% 100%)",
    to: "polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)",
    entrance: { x: 80, opacity: 0 },
    easing: "sine.inOut",
  },
  circle: {
    from: "50%",
    to: "48%",
    entrance: { scale: 0.85, rotate: -6, opacity: 0 },
    easing: "sine.inOut",
  },
  pill: {
    from: "9999px",
    to: "9999px",
    entrance: { x: -80, opacity: 0 },
    easing: "sine.inOut",
  },
} as const;

type MaskType = keyof typeof MASK_CONFIGS;
type TextPosition = "top-right" | "bottom-left" | "center-below" | "bottom-right";

interface CinematicFrameProps {
  image: string;
  title: string;
  subtitle?: string;
  index: number;
  maskType?: MaskType;
  textPosition?: TextPosition;
  chapterLabel?: string;
}

export default function CinematicFrame({
  image,
  title,
  subtitle,
  index,
  maskType = "organic",
  textPosition = "top-right",
  chapterLabel,
}: CinematicFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const chapterRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const config = MASK_CONFIGS[maskType];

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.fromTo(
          frameRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
          }
        );
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: frameRef.current,
          start: "top 85%",
          end: "bottom 20%",
          scrub: 1.2,
        },
      });

      /* Entrance */
      tl.fromTo(
        frameRef.current,
        { ...config.entrance },
        {
          x: 0,
          y: 0,
          scale: 1,
          rotate: 0,
          opacity: 1,
          ease: "none",
          duration: 0.3,
        },
        0
      );

      /* Breathing mask */
      if (maskType === "circle" || maskType === "organic") {
        tl.fromTo(
          maskRef.current,
          { borderRadius: config.from },
          {
            borderRadius: config.to,
            ease: config.easing,
            duration: 1.2,
          },
          0
        );
      } else if (maskType === "parallelogram") {
        tl.fromTo(
          maskRef.current,
          { clipPath: config.from },
          {
            clipPath: config.to,
            ease: config.easing,
            duration: 1.2,
          },
          0
        );
      }

      /* Ken Burns with directional drift */
      tl.fromTo(
        imgRef.current,
        { scale: 1.15, xPercent: -4, yPercent: -3 },
        {
          scale: 1.22,
          xPercent: 4,
          yPercent: 3,
          ease: "none",
          duration: 1.2,
        },
        0
      );

      /* Chapter number reveal */
      if (chapterRef.current) {
        tl.fromTo(
          chapterRef.current,
          { opacity: 0, y: 30, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "power2.out",
            duration: 0.4,
          },
          0.15
        );
      }
    }, frameRef);

    return () => ctx.revert();
  }, [maskType, config.easing]);

  const maskClass =
    maskType === "circle"
      ? "overflow-hidden aspect-square rounded-full"
      : maskType === "pill"
      ? "overflow-hidden rounded-t-full rounded-b-full"
      : "overflow-hidden";

  const textPositionClass = {
    "top-right": "top-8 right-0 text-right",
    "bottom-left": "bottom-8 left-0 text-left",
    "center-below": "static mt-6 text-center mx-auto",
    "bottom-right": "bottom-8 right-0 text-right",
  }[textPosition];

  return (
    <div
      ref={frameRef}
      className="relative w-full max-w-xl mx-auto group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Chapter number — architectural element */}
      <div
        ref={chapterRef}
        className="absolute -top-12 -left-4 lg:-left-8 z-20 pointer-events-none select-none"
      >
        <span className="type-display text-6xl lg:text-7xl text-ink/[0.04] leading-none">
          {String(index).padStart(2, "0")}
        </span>
      </div>

      {/* Unified film grain + vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.035] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "200px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr from-ink/20 via-transparent to-ink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Mask container */}
      <div
        ref={maskRef}
        className={maskClass}
        style={
          maskType === "organic"
            ? { borderRadius: config.from }
            : maskType === "parallelogram"
            ? { clipPath: config.from }
            : undefined
        }
      >
        <img
          ref={imgRef}
          src={image}
          alt={title}
          decoding="async"
          loading="eager"
          className="w-full h-full object-cover will-change-transform shadow-2xl"
          style={{ aspectRatio: "4/5" }}
        />
      </div>

      {/* Cursor cue */}
      <div
        className={`absolute inset-0 z-20 flex items-center justify-center pointer-events-none transition-opacity duration-500 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="type-caption text-cream text-xs tracking-[0.3em] uppercase bg-ink/40 backdrop-blur-sm px-4 py-2 rounded-full">
          View
        </span>
      </div>

      {/* Text overlay */}
      <div
        className={
          textPosition === "center-below"
            ? textPositionClass
            : `absolute ${textPositionClass}`
        }
      >
        {chapterLabel && (
          <span className="block text-xs tracking-[0.2em] uppercase text-gold mb-2">
            {chapterLabel}
          </span>
        )}
        <span className="block text-xs tracking-[0.25em] uppercase opacity-50 mb-2">
          {String(index).padStart(2, "0")}
        </span>
        <h3 className="type-display text-2xl group-hover:text-gold transition-colors duration-500">
          {title}
        </h3>
        {subtitle && (
          <p className="type-body text-stone text-sm mt-1">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
