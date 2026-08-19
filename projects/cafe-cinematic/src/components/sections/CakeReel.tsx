'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_CAKE_FRAMES = 240; // 0 to 239

const ARTISANAL_CAKES = [
  { id: 'basque', name: 'Basque Burnt Caramel', price: '$8.50' },
  { id: 'matcha', name: 'Matcha & Yuzu Cloud', price: '$9.00' },
  { id: 'chocolate', name: 'Valrhona Dark Ganache', price: '$8.75' },
  { id: 'honey', name: 'Honey Lavender Sponge', price: '$7.50' },
  { id: 'carrot', name: 'Spiced Walnut Cake', price: '$8.00' },
];

const CAKE_ANNOTATIONS = [
  { start: 0.05, end: 0.4, text: 'OVEN · 240°C', y: '12%' },
  { start: 0.4, end: 0.75, text: 'FRESH OUT', y: '55%' },
  { start: 0.75, end: 0.95, text: 'HEARTH TO COUNTER', y: '78%' },
];

export function CakeReel() {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [activeFrame, setActiveFrame] = useState(0);
  const [activeCakeIndex, setActiveCakeIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Preload cake frames
  useEffect(() => {
    let loadedCount = 0;
    const imgs: HTMLImageElement[] = [];

    for (let i = 0; i < TOTAL_CAKE_FRAMES; i++) {
      const img = new Image();
      img.src = `/cake-frames/frame_${i}.webp`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount >= 25 && !imagesLoaded) {
          setImagesLoaded(true);
        }
      };
      imgs.push(img);
    }
    imagesRef.current = imgs;
  }, []);

  // Draw cake frame
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = width / height;
    let renderW = width;
    let renderH = height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      renderW = width;
      renderH = width / imgRatio;
      offsetY = (height - renderH) / 2;
    } else {
      renderH = height;
      renderW = height * imgRatio;
      offsetX = (width - renderW) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
  };

  // Resize listener
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(0);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [imagesLoaded]);

  // NOTE: No imagesLoaded dependency — ScrollTrigger must be created on mount
  // (in DOM order) so GSAP pin spacers are calculated correctly.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: '+=250%',
        pin: true,
        scrub: 0.4,
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollProgress(progress);
          const frameIndex = Math.min(
            Math.floor(progress * (TOTAL_CAKE_FRAMES - 1)),
            TOTAL_CAKE_FRAMES - 1
          );

          setActiveFrame(frameIndex);
          drawFrame(frameIndex);

          // Fade-to-dark overlay at end
          const FADE_START = 0.85;
          if (overlayRef.current) {
            const op = progress >= FADE_START ? (progress - FADE_START) / (1 - FADE_START) : 0;
            overlayRef.current.style.opacity = String(op);
          }

          // Cycle active cake in second half
          if (frameIndex >= 120) {
            const cakeProg = (frameIndex - 120) / (TOTAL_CAKE_FRAMES - 120);
            const idx = Math.min(
              Math.floor(cakeProg * ARTISANAL_CAKES.length),
              ARTISANAL_CAKES.length - 1
            );
            setActiveCakeIndex(idx);
          }
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const activeAnnotation = CAKE_ANNOTATIONS.find(
    (a) => scrollProgress >= a.start && scrollProgress < a.end
  ) || CAKE_ANNOTATIONS[0];

  return (
    <section
      ref={containerRef}
      id="cakes"
      className="relative h-screen w-full bg-cafe-bg overflow-hidden select-none"
    >
      {/* 2D Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      />

      {/* Fade-to-dark overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-cafe-dark z-30 pointer-events-none"
        style={{ opacity: 0 }}
      />

      {/* Spatial floating annotation near oven/cake */}
      <div
        className="absolute left-8 sm:left-16 z-10 pointer-events-none transition-all duration-700"
        style={{
          top: activeAnnotation.y,
          opacity: activeAnnotation ? 0.9 : 0,
        }}
      >
        <span
          className="text-[0.62rem] font-body font-bold tracking-[0.22em] uppercase text-white/80"
          style={{ textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}
        >
          {activeAnnotation?.text}
        </span>
      </div>

      {/* Floating cake showcase */}
      <div className="absolute bottom-24 right-8 sm:right-16 z-20 pointer-events-auto transition-all duration-500">
          <div className="space-y-2 max-w-xs">
            <div className="space-y-1">
              <h3
                className="font-display text-3xl sm:text-4xl font-black text-white leading-tight"
                style={{
                  textShadow: '0 3px 15px rgba(0,0,0,0.5)',
                }}
              >
                {ARTISANAL_CAKES[activeCakeIndex].name}
              </h3>
              <span
                className="font-display text-xl font-bold text-white/85"
                style={{
                  textShadow: '0 2px 8px rgba(0,0,0,0.4)',
                }}
              >
                {ARTISANAL_CAKES[activeCakeIndex].price}
              </span>
            </div>

            {/* Mini cake selector dots */}
            <div className="flex items-center gap-2 pt-1">
              {ARTISANAL_CAKES.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCakeIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === activeCakeIndex
                      ? 'w-7 bg-white/90 border border-white/30'
                      : 'w-2 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Select ${c.name}`}
                />
              ))}
            </div>
          </div>
        </div>

      {/* Bottom-right context — minimal */}
      <div className="absolute bottom-8 right-8 sm:right-12 z-10 pointer-events-none select-none text-right">
        <span
          className="text-[0.6rem] font-body font-bold tracking-[0.22em] uppercase"
          style={{ color: 'rgba(255,255,255,0.45)', textShadow: '0 1px 6px rgba(0,0,0,0.4)' }}
        >
          03 / {Math.round(scrollProgress * 100)}%
        </span>
      </div>
    </section>
  );
}
