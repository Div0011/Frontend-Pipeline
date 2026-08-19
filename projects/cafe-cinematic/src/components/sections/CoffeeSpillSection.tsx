'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Fix overlay to bg-cafe-bg (#F7F4F0) — matches CookieReel's background for a
// seamless colour-matched dissolve instead of a dark flash between sections.
const OVERLAY_COLOR = '#F7F4F0';

export function CoffeeSpillSection() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    video.load();

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: '+=150%',
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          video.style.opacity = '1';
          if (video.duration && isFinite(video.duration)) {
            video.currentTime = progress * video.duration;
          }
          // Fade to warm cream (bg-cafe-bg) so the next section (About) appears seamlessly
          const FADE_START = 0.82;
          if (overlayRef.current) {
            const op = progress >= FADE_START ? (progress - FADE_START) / (1 - FADE_START) : 0;
            overlayRef.current.style.opacity = String(op);
          }
        },
        onLeaveBack: () => { video.style.opacity = '0'; },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
      style={{ background: '#1A0F0A' }}
    >
      <video
        ref={videoRef}
        src="/videos/Coffee_spilling_filling_screen_1080p_202608181659.mp4"
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ opacity: 0 }}
      />

      {/* Chapter tag */}
      <div className="absolute bottom-10 left-8 sm:left-12 z-10 pointer-events-none">
        <span
          className="text-[0.6rem] font-body font-bold tracking-[0.28em] uppercase"
          style={{ color: 'rgba(255,255,255,0.35)' }}
        >
          03 / COFFEE CRAFT
        </span>
      </div>

      {/* Fade-to-warm-cream overlay — matches About section's background */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-30 pointer-events-none"
        style={{ opacity: 0, background: OVERLAY_COLOR }}
      />
    </section>
  );
}
