'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { coffeePourSound } from '@/lib/soundFx';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_HERO_FRAMES = 192; // 0 to 191

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [nameProgress, setNameProgress] = useState(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastScrollTime = useRef(Date.now());
  const lastProgress = useRef(0);

  // Preload frames
  useEffect(() => {
    let loadedCount = 0;
    const imgs: HTMLImageElement[] = [];

    for (let i = 0; i < TOTAL_HERO_FRAMES; i++) {
      const img = new Image();
      img.src = `/hero-frames/frame_${i}.webp`;
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

  // Draw frame on canvas
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

  // Canvas resize
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

  // Scroll frame scrubbing & dynamic liquid pouring audio
  // NOTE: No imagesLoaded dependency — ScrollTrigger must be created on mount
  // (in DOM order) so GSAP calculates pin spacers correctly for all sections below.
  // drawFrame already null-checks images, so it's safe before images finish loading.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: '+=220%',
        pin: true,
        scrub: 0.4,
        onUpdate: (self) => {
          const progress = self.progress;
          const frameIndex = Math.min(
            Math.floor(progress * (TOTAL_HERO_FRAMES - 1)),
            TOTAL_HERO_FRAMES - 1
          );

          drawFrame(frameIndex);

          // Fade-to-cream overlay — matches CookieReel's bg-cafe-bg for a seamless
          // colour-matched dissolve (no dark flash between sections)
          const FADE_START = 0.82;
          if (overlayRef.current) {
            const overlayOpacity = progress >= FADE_START
              ? (progress - FADE_START) / (1 - FADE_START)
              : 0;
            overlayRef.current.style.opacity = String(overlayOpacity);
          }

          // Liquid Pouring Sound
          const now = Date.now();
          const dt = Math.max(16, now - lastScrollTime.current);
          const dProg = Math.abs(progress - lastProgress.current);
          const velocity = (dProg / dt) * 1000;
          lastScrollTime.current = now;
          lastProgress.current = progress;

          if (frameIndex >= 8 && frameIndex <= 145 && velocity > 0.05) {
            const streamIntensity = Math.min(1.0, velocity * 0.8 + 0.3);
            coffeePourSound.setPourIntensity(streamIntensity);
          } else {
            coffeePourSound.stop();
          }

          // Show Website Name smoothly (frame 110 to 150)
          if (frameIndex >= 105) {
            const nProg = Math.min(1, (frameIndex - 105) / 28);
            setNameProgress(nProg);
          } else {
            setNameProgress(0);
          }
        },
        onLeave: () => coffeePourSound.stop(),
        onLeaveBack: () => coffeePourSound.stop(),
      });
    }, container);

    return () => {
      ctx.revert();
      coffeePourSound.stop();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full bg-cafe-dark overflow-hidden flex flex-col justify-start items-center pt-32 sm:pt-36"
    >
      {/* 2D Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      />

      {/* Name Reveal */}
      <div className="relative z-10 text-center px-6 max-w-5xl pointer-events-none select-none">
        <h1
          className="font-display font-black tracking-tight text-white leading-none"
          style={{
            fontSize: 'clamp(4rem, 13vw, 14rem)',
            opacity: nameProgress,
            transform: `translateY(${(1 - nameProgress) * 30}px)`,
            letterSpacing: '-0.03em',
            textShadow: '0 4px 40px rgba(0,0,0,0.5)',
          }}
        >
          CAFE COFFEE
        </h1>
      </div>

      {/* Fade-to-cream overlay — matches CookieReel background */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-30 pointer-events-none"
        style={{ opacity: 0, background: '#F7F4F0' }}
      />
    </section>
  );
}
