'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_COOKIE_FRAMES = 240;

const TIMELINE_STEPS = [
  { progress: 0.0, time: '07:00', title: 'The Hearth Awakens', desc: 'First flames. First grind. The day begins with intention.' },
  { progress: 0.3, time: '08:00', title: 'The First Pour', desc: 'Water meets micro-lot. Extraction reveals what the bean has been hiding.' },
  { progress: 0.6, time: '12:00', title: 'The Slow Ritual', desc: 'No rush. No tickets. Just a croissant, a cortado, and a moment.' },
  { progress: 0.85, time: '17:00', title: 'The Last Ember', desc: 'The oven rests. The beans rest. We close with gratitude.' },
];

const HISTORY_BLOCKS = [
  { start: 0.05, end: 0.3, eyebrow: 'ORIGIN', title: 'Born in Soho', body: 'What started as a weekend pop-up on Mulberry Street grew into a neighborhood ritual. We believed coffee deserved more than a quick exit.' },
  { start: 0.35, end: 0.6, eyebrow: 'CRAFT', title: 'Slow by design', body: 'Every pour is calibrated. Every pastry is laminated by hand. We don&apos;t do overnight proof boxes or flavor added after the fact.' },
  { start: 0.65, end: 0.9, eyebrow: 'RITUAL', title: 'A place to stay', body: 'Sunlit corners, deep work chairs, and a menu built for lingering. This isn&apos;t a turnstile—it&apos;s a haven.' },
];

export function CookieReel() {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    let loadedCount = 0;
    const imgs: HTMLImageElement[] = [];

    for (let i = 0; i < TOTAL_COOKIE_FRAMES; i++) {
      const img = new Image();
      img.src = `/cookie-frames/frame_${i}.webp`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount >= 20 && !imagesLoaded) {
          setImagesLoaded(true);
        }
      };
      imgs.push(img);
    }
    imagesRef.current = imgs;
  }, []);

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
        end: '+=350%',
        pin: true,
        scrub: 0.4,
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollProgress(progress);
          const frameIndex = Math.min(
            Math.floor(progress * (TOTAL_COOKIE_FRAMES - 1)),
            TOTAL_COOKIE_FRAMES - 1
          );
          drawFrame(frameIndex);

          // Fade-to-dark overlay at end of section
          const FADE_START = 0.85;
          if (overlayRef.current) {
            const op = progress >= FADE_START ? (progress - FADE_START) / (1 - FADE_START) : 0;
            overlayRef.current.style.opacity = String(op);
          }
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const activeStep = TIMELINE_STEPS.reduce((acc, step) => {
    if (scrollProgress >= step.progress - 0.05) return step;
    return acc;
  }, TIMELINE_STEPS[0]);

  const activeHistory = HISTORY_BLOCKS.find(
    (b) => scrollProgress >= b.start && scrollProgress < b.end
  ) || HISTORY_BLOCKS[0];

  return (
    <section
      ref={containerRef}
      id="cookies"
      className="relative h-screen w-full bg-cafe-bg overflow-hidden select-none"
    >
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

      {/* Left timeline — large, cinematic */}
      <div className="absolute left-6 sm:left-16 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-10 sm:gap-14 pointer-events-none">
        {TIMELINE_STEPS.map((step, i) => {
          const isActive = scrollProgress >= step.progress - 0.05 && scrollProgress < step.progress + 0.25;
          const isPast = scrollProgress >= step.progress + 0.25;
          return (
            <div
              key={i}
              className={`flex items-start gap-4 sm:gap-6 transition-all duration-700 ${
                isActive ? 'opacity-100 translate-x-0' : isPast ? 'opacity-30 -translate-x-1' : 'opacity-10 translate-x-2'
              }`}
            >
              <div className="flex flex-col items-center pt-2">
                <div
                  className={`w-3 h-3 rounded-full border-2 transition-all duration-500 ${
                    isActive ? 'bg-cafe-accent border-cafe-accent scale-125' : isPast ? 'bg-cafe-text border-cafe-text' : 'bg-transparent border-cafe-text/40'
                  }`}
                />
                {i < TIMELINE_STEPS.length - 1 && (
                  <div
                    className={`w-px h-10 sm:h-14 transition-all duration-500 ${
                      isPast ? 'bg-cafe-text' : 'bg-cafe-text/20'
                    }`}
                  />
                )}
              </div>
              <div className="space-y-1">
                <span
                  className={`text-xs font-body font-bold tracking-[0.22em] uppercase transition-all duration-500 ${
                    isActive ? 'text-cafe-accent' : isPast ? 'text-cafe-text' : 'text-cafe-text/40'
                  }`}
                >
                  {step.time}
                </span>
                <span
                  style={{ fontSize: 'clamp(1.1rem, 2.5vw, 2rem)' }}
                  className={`block font-display font-semibold leading-tight transition-all duration-500 ${
                    isActive ? 'text-cafe-dark' : isPast ? 'text-cafe-text/70' : 'text-cafe-text/30'
                  }`}
                >
                  {step.title}
                </span>
                <span
                  className={`block text-xs sm:text-sm font-body font-normal transition-all duration-500 ${
                    isActive ? 'text-cafe-muted' : isPast ? 'text-cafe-text/50' : 'text-cafe-text/25'
                  }`}
                >
                  {step.desc}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Right-side history reveal — scroll-driven */}
      <div
        className="absolute right-6 sm:right-16 top-1/2 -translate-y-1/2 z-20 pointer-events-none max-w-md text-right"
        style={{
          opacity: activeHistory ? 0.9 : 0,
          transform: `translateY(${activeHistory ? '0px' : '12px'})`,
        }}
      >
        <span
          className="text-xs font-body font-bold tracking-[0.22em] uppercase text-cafe-accent-dark block mb-3"
        >
          {activeHistory?.eyebrow}
        </span>
        <h3
          className="font-display font-normal text-cafe-dark leading-tight mb-4"
          style={{ fontSize: 'clamp(1.5rem, 3.5vw, 3.5rem)', letterSpacing: '-0.02em' }}
        >
          {activeHistory?.title}
        </h3>
        <p className="font-body text-sm sm:text-base leading-relaxed text-cafe-muted">
          {activeHistory?.body}
        </p>
      </div>

      <div className="absolute bottom-10 left-6 sm:left-16 z-20 pointer-events-none">
        <span className="text-[0.6rem] font-body font-bold tracking-[0.22em] uppercase" style={{ color: 'rgba(44,24,16,0.45)' }}>
          01 / {Math.round(scrollProgress * 100).toString().padStart(2, '0')}%
        </span>
      </div>
    </section>
  );
}
