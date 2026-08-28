"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

export interface MorphSliderItem {
  image: string;
  caption?: string;
  title?: string;
  subtitle?: string;
  tag?: string;
}

export interface MorphSliderProps {
  items: MorphSliderItem[];
  transition?: "melt" | "liquid" | "fade" | "glitch";
  intensity?: number;
  aberration?: number;
  drift?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  overlayColor?: string;
  duration?: number;
  ease?: string;
  scale?: number;
  loop?: boolean;
  radius?: number;
  showCaptions?: boolean;
  showControls?: boolean;
  showIndicators?: boolean;
  className?: string;
}

export default function MorphSlider({
  items,
  transition = "melt",
  intensity = 0.55,
  aberration = 0.35,
  drift = 0.4,
  autoplay = false,
  autoplayDelay = 4,
  overlayColor = "#05060a",
  duration = 1.1,
  scale = 2.4,
  loop = true,
  radius = 16,
  showCaptions = true,
  showControls = true,
  showIndicators = true,
  className = "",
}: MorphSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isMorphing, setIsMorphing] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const filterId = useRef(`morph-filter-${Math.random().toString(36).substring(2, 9)}`);
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null);
  const displacementRef = useRef<SVGFEDisplacementMapElement>(null);

  const goToSlide = useCallback(
    (index: number, dir: "next" | "prev" = "next") => {
      if (isMorphing || index === currentIndex) return;
      setPrevIndex(currentIndex);
      setCurrentIndex(index);
      setDirection(dir);
      setIsMorphing(true);

      // Trigger Morph Turbulence Animation
      let startTime = performance.now();
      const animDuration = duration * 1000;

      const animateMorph = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / animDuration, 1);
        // Sine wave bell curve for distortion peak at 50%
        const curve = Math.sin(progress * Math.PI);

        if (displacementRef.current && turbulenceRef.current) {
          const currentScale = curve * intensity * 80 * (scale / 2);
          displacementRef.current.setAttribute("scale", currentScale.toString());
          turbulenceRef.current.setAttribute(
            "baseFrequency",
            `${0.02 + curve * 0.08} ${0.03 + curve * 0.05}`
          );
        }

        if (progress < 1) {
          requestAnimationFrame(animateMorph);
        } else {
          setIsMorphing(false);
          if (displacementRef.current) {
            displacementRef.current.setAttribute("scale", "0");
          }
        }
      };

      requestAnimationFrame(animateMorph);
    },
    [currentIndex, isMorphing, duration, intensity, scale]
  );

  const nextSlide = useCallback(() => {
    let next = currentIndex + 1;
    if (next >= items.length) {
      if (!loop) return;
      next = 0;
    }
    goToSlide(next, "next");
  }, [currentIndex, items.length, loop, goToSlide]);

  const prevSlide = useCallback(() => {
    let prev = currentIndex - 1;
    if (prev < 0) {
      if (!loop) return;
      prev = items.length - 1;
    }
    goToSlide(prev, "prev");
  }, [currentIndex, items.length, loop, goToSlide]);

  // Autoplay handler
  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(() => {
      nextSlide();
    }, autoplayDelay * 1000);
    return () => clearInterval(timer);
  }, [autoplay, autoplayDelay, nextSlide]);

  const currentItem = items[currentIndex];

  return (
    <div
      className={`relative w-full h-full overflow-hidden select-none group ${className}`}
      style={{ borderRadius: `${radius}px` }}
    >
      {/* SVG Liquid Distortion & Aberration Filter */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id={filterId.current} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              ref={turbulenceRef}
              type="fractalNoise"
              baseFrequency="0.02 0.03"
              numOctaves="3"
              result="noise"
            />
            <feDisplacementMap
              ref={displacementRef}
              in="SourceGraphic"
              in2="noise"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            {/* Chromatic aberration RGB offset */}
            {aberration > 0 && (
              <>
                <feOffset in="displaced" dx={isMorphing ? aberration * 8 : 0} dy="0" result="red" />
                <feOffset in="displaced" dx={isMorphing ? -aberration * 8 : 0} dy="0" result="blue" />
                <feBlend in="red" in2="blue" mode="screen" />
              </>
            )}
          </filter>
        </defs>
      </svg>

      {/* Slide Image Layer with Liquid SVG Filter */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          filter: isMorphing ? `url(#${filterId.current})` : "none",
          transform: isMorphing ? `scale(${1 + drift * 0.05})` : "scale(1)",
          transition: `transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1)`,
        }}
      >
        <Image
          key={currentIndex}
          src={currentItem.image}
          alt={currentItem.title || currentItem.caption || "Morph Slide"}
          fill
          sizes="(max-width: 1200px) 100vw, 1600px"
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Cinematic Gradient Overlays */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          background: `linear-gradient(to top, ${overlayColor} 0%, rgba(5,6,10,0.4) 50%, transparent 100%)`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, transparent 40%, ${overlayColor} 100%)`,
          opacity: 0.6,
        }}
      />

      {/* Captions Overlay */}
      {showCaptions && (
        <div className="absolute inset-x-0 bottom-0 p-8 sm:p-12 z-20 flex flex-col justify-end">
          <div className="max-w-2xl space-y-3">
            {currentItem.tag && (
              <span className="font-mono text-xs uppercase tracking-widest px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[#B12727] border border-white/20 inline-block">
                {currentItem.tag}
              </span>
            )}
            {currentItem.title && (
              <h3 className="type-display text-4xl sm:text-5xl lg:text-6xl text-white font-bold leading-tight drop-shadow-lg">
                {currentItem.title}
              </h3>
            )}
            {currentItem.caption && (
              <p className="type-serif text-sm sm:text-base text-stone-200 leading-relaxed max-w-xl drop-shadow">
                {currentItem.caption}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Controls: Next / Prev buttons */}
      {showControls && (
        <div className="absolute inset-y-0 inset-x-6 flex items-center justify-between pointer-events-none z-30">
          <button
            onClick={prevSlide}
            disabled={isMorphing}
            className="w-12 h-12 rounded-full bg-black/40 hover:bg-white hover:text-black text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-300 pointer-events-auto shadow-2xl hover:scale-110 active:scale-95 disabled:opacity-40"
            aria-label="Previous Slide"
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            disabled={isMorphing}
            className="w-12 h-12 rounded-full bg-black/40 hover:bg-white hover:text-black text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-300 pointer-events-auto shadow-2xl hover:scale-110 active:scale-95 disabled:opacity-40"
            aria-label="Next Slide"
          >
            →
          </button>
        </div>
      )}

      {/* Indicators / Progress Pills */}
      {showIndicators && (
        <div className="absolute top-6 right-6 z-30 flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                currentIndex === idx ? "w-8 bg-[#B12727]" : "w-2 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
          <span className="font-mono text-[10px] text-stone-300 ml-2 font-bold">
            {(currentIndex + 1).toString().padStart(2, "0")} / {items.length.toString().padStart(2, "0")}
          </span>
        </div>
      )}
    </div>
  );
}
