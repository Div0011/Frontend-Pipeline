'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from './LenisProvider';
import { useFrameLoader } from '../hooks/useFrameLoader';
import { useCinematicTimeline } from '../hooks/useCinematicTimeline';
import { Header } from './Header';
import OptionWheel from './OptionWheel';
import { MinimalHero } from './sections/MinimalHero';
import { StorySection } from './sections/StorySection';
import { AboutSection } from './sections/AboutSection';
import { CatalogueSection } from './sections/CatalogueSection';
import { BookingSection } from './sections/BookingSection';
import { OutroFooterSection } from './sections/OutroFooterSection';

gsap.registerPlugin(ScrollTrigger);

const WHEEL_ITEMS = ['Overview', 'Heritage', 'Atelier', 'Rituals', 'Booking', 'Contact'];

const SECTION_INDEX_MAP: Record<string, number> = {
  hero: 0,
  story: 1,
  about: 2,
  catalogue: 3,
  booking: 4,
  outro: 5,
};

export function CinematicViewportEngine() {
  const masterWrapRef = useRef<HTMLDivElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Transitions
  const mistRef = useRef<HTMLDivElement>(null);
  const crossfadeRef = useRef<HTMLDivElement>(null);

  // Section Refs
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const catalogueRef = useRef<HTMLDivElement>(null);
  const bookingRef = useRef<HTMLDivElement>(null);
  const outroFooterRef = useRef<HTMLDivElement>(null);

  const [activeSection, setActiveSection] = useState('hero');
  const lenisRef = useLenis();

  const { isReady, videoBuffers, loadProgress } = useFrameLoader();
  const currentRenderState = useRef({ vIdx: 0, fIdx: 0 });

  // High-performance canvas frame drawer
  const drawFrame = useCallback((vIdx: number, fIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !videoBuffers || !videoBuffers[vIdx]) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const buffer = videoBuffers[vIdx];
    if (!buffer || buffer.length === 0) return;

    const maxF = buffer.length - 1;
    const clampedF = Math.max(0, Math.min(maxF, Math.floor(fIdx)));
    const img = buffer[clampedF] || buffer.find((i) => i && i.complete);
    if (!img) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth || 1920;
    const ih = img.naturalHeight || 1080;

    const scale = Math.max(cw / iw, ch / ih);
    const nw = iw * scale;
    const nh = ih * scale;
    const cx = (cw - nw) / 2;
    const cy = (ch - nh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, cx, cy, nw, nh);

    currentRenderState.current = { vIdx, fIdx: clampedF };
  }, [videoBuffers]);

  // Draw initial frame as soon as buffer is ready
  useEffect(() => {
    if (isReady && videoBuffers[0] && videoBuffers[0].length > 0 && videoBuffers[0][0]) {
      drawFrame(0, 0);
    }
  }, [isReady, videoBuffers, drawFrame]);

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(currentRenderState.current.vIdx, currentRenderState.current.fIdx);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isReady, videoBuffers, drawFrame]);

  // Exact section jumping using GSAP ScrollTrigger timeline bounds
  const handleJumpToSection = useCallback((sectionKey: string) => {
    const sectionProgressMap: Record<string, number> = {
      hero: 0.0,
      story: 0.27,
      about: 0.41,
      catalogue: 0.55,
      booking: 0.69,
      outro: 0.88,
    };

    const targetP = sectionProgressMap[sectionKey] ?? 0;
    const st = ScrollTrigger.getById('cinematic-master-timeline');

    let targetY = 0;
    if (st && st.end > st.start) {
      targetY = st.start + (st.end - st.start) * targetP;
    } else {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      targetY = targetP * maxScroll;
    }

    if (lenisRef.current) {
      lenisRef.current.scrollTo(targetY, {
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  }, [lenisRef]);

  const handleWheelSelect = useCallback((index: number) => {
    const keyMap = ['hero', 'story', 'about', 'catalogue', 'booking', 'outro'];
    const selectedKey = keyMap[index] || 'hero';
    handleJumpToSection(selectedKey);
  }, [handleJumpToSection]);

  // Connect GSAP Master Timeline
  useCinematicTimeline(
    {
      masterWrap: masterWrapRef,
      canvasWrap: canvasWrapRef,
      mist: mistRef,
      crossfade: crossfadeRef,
      hero: heroRef,
      story: storyRef,
      about: aboutRef,
      catalogue: catalogueRef,
      booking: bookingRef,
      outroFooter: outroFooterRef,
    },
    isReady,
    videoBuffers,
    drawFrame,
    (sec) => setActiveSection(sec)
  );

  return (
    <>
      {/* Sleek Minimal Floating Header: ONLY LUMIÈRE brand name */}
      <Header
        activeSection={activeSection}
        onNavigate={handleJumpToSection}
      />

      {/* Right Side Collapsible Monochromatic OptionWheel Menu */}
      <OptionWheel
        items={WHEEL_ITEMS}
        defaultSelected={SECTION_INDEX_MAP[activeSection] ?? 0}
        side="right"
        fontSize={1.7}
        spacing={1.2}
        curve={1}
        tilt={6}
        blur={2}
        fade={0.25}
        activeColor="#ffffff"
        textColor="#888888"
        draggable
        onSelect={handleWheelSelect}
      />

      {/* Main Scrollytelling Pinned Master Wrapper */}
      <div
        ref={masterWrapRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          backgroundColor: '#09090a',
        }}
      >
        {/* Fullscreen Video Frames Canvas */}
        <div
          ref={canvasWrapRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 10,
          }}
        >
          <canvas
            ref={canvasRef}
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>

        {/* Subtle Frame Edge Fog / Vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at center, transparent 70%, rgba(9, 9, 10, 0.35) 100%)',
            pointerEvents: 'none',
            zIndex: 15,
          }}
        />

        {/* Seamless feathered watermark blend (centered over star) */}
        <div
          style={{
            position: 'absolute',
            bottom: '6.8%',
            right: '3.6%',
            width: '130px',
            height: '130px',
            borderRadius: '50%',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            maskImage: 'radial-gradient(circle at center, black 45%, transparent 85%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 45%, transparent 85%)',
            pointerEvents: 'none',
            zIndex: 16,
          }}
        />

        {/* Golden Mist Transition Overlay */}
        <div
          ref={mistRef}
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.15) 0%, rgba(9, 9, 10, 0.95) 80%)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            pointerEvents: 'none',
            zIndex: 25,
            opacity: 0,
          }}
        />

        {/* Crossfade Transition Overlay */}
        <div
          ref={crossfadeRef}
          style={{
            position: 'absolute',
            inset: 0,
            background: '#09090a',
            pointerEvents: 'none',
            zIndex: 26,
            opacity: 0,
          }}
        />

        {/* ─── 6 MINIMALIST SECTION OVERLAYS ─── */}
        {/* Video 1: Hero (Holds only website name) */}
        <MinimalHero ref={heroRef} />

        {/* Video 2A: The Story */}
        <StorySection ref={storyRef} />

        {/* Video 2B: The Atelier */}
        <AboutSection ref={aboutRef} />

        {/* Video 3A: The Catalogue */}
        <CatalogueSection ref={catalogueRef} />

        {/* Video 3B: The Booking */}
        <BookingSection ref={bookingRef} />

        {/* Video 4: Outro & Coordinates */}
        <OutroFooterSection
          ref={outroFooterRef}
          onScrollTop={() => handleJumpToSection('hero')}
        />

        {/* Discrete Loading Indicator */}
        {!isReady && loadProgress < 100 && (
          <div
            style={{
              position: 'fixed',
              bottom: '2rem',
              left: '2.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              zIndex: 999,
            }}
          >
            <div
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                animation: 'pulse 1.5s infinite',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(255, 255, 255, 0.7)',
              }}
            >
              Loading {loadProgress}%
            </span>
          </div>
        )}
      </div>
    </>
  );
}
