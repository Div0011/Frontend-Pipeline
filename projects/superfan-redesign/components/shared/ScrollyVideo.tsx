'use client';

import React, { useRef, useState, useCallback, useLayoutEffect, useMemo, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './useReducedMotion';
import { Zap, ShieldCheck, VolumeX, Sparkles, Wind, Clock, Award, Battery } from 'lucide-react';

export interface ScrollyStage {
  range: [number, number];
  badge: string;
  headline: string;
  body: string;
  icon?: React.ReactNode;
}

interface ScrollyVideoProps {
  videoSrc: string;
  stages: ScrollyStage[];
  bgHex?: string;
  overlayGrad?: string;
  scrollMultiplier?: number;
  chapterLabel?: string;
  chapterTitle?: string;
  ariaLabel?: string;
  heroElement?: React.ReactNode;
  poster?: string;
  sectionId?: string;
  priority?: boolean;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  'ZERO-TURBULENCE INTAKE': <Wind size={13} color="#00c8f8" />,
  'DUST SUPPRESSION TECH': <ShieldCheck size={13} color="#00c8f8" />,
  'ACOUSTIC SILENCE': <VolumeX size={13} color="#00c8f8" />,
  'ENVIRONMENTAL SEAL': <Award size={13} color="#00c8f8" />,
  'SUSTAINABLE DESIGN': <Battery size={13} color="#00c8f8" />,
  'LAYER 01': <Sparkles size={13} color="#00c8f8" />,
  'LAYER 02': <Zap size={13} color="#00c8f8" />,
  'LAYER 03': <ShieldCheck size={13} color="#00c8f8" />,
  'LAYER 04': <VolumeX size={13} color="#00c8f8" />,
  'LAYER 05': <Battery size={13} color="#00c8f8" />,
  'CONVERGENCE': <Clock size={13} color="#00c8f8" />,
  'CINEMATIC HERO': <Sparkles size={13} color="#00c8f8" />,
  'CHAPTER I': <Wind size={13} color="#00c8f8" />,
  'CHAPTER II': <Zap size={13} color="#00c8f8" />,
  'CHAPTER III': <VolumeX size={13} color="#00c8f8" />,
  'CHAPTER IV': <ShieldCheck size={13} color="#00c8f8" />,
};

// Compute smooth opacity for a given stage range
function getStageOpacity(enter: number, exit: number, progress: number, fadeWindow = 0.055): number {
  if (progress < enter - fadeWindow || progress > exit + fadeWindow) return 0;
  if (progress >= enter - fadeWindow && progress < enter) {
    return (progress - (enter - fadeWindow)) / fadeWindow;
  }
  if (progress > exit && progress <= exit + fadeWindow) {
    return (exit + fadeWindow - progress) / fadeWindow;
  }
  return 1;
}

export const ScrollyVideo: React.FC<ScrollyVideoProps> = ({
  videoSrc,
  stages,
  bgHex = '#020c1b',
  overlayGrad = 'radial-gradient(circle at center, rgba(2,12,27,0.1) 0%, rgba(2,12,27,0.9) 75%)',
  scrollMultiplier = 1.8,
  chapterLabel,
  chapterTitle,
  ariaLabel,
  heroElement,
  poster,
  sectionId,
  priority = false,
}) => {
  const pinWrapRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  // One ref per stage — keyed by index
  const stageEls = useRef<(HTMLDivElement | null)[]>([]);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [loadedSrc, setLoadedSrc] = useState<string>('');
  const [isReady, setIsReady] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(priority);
  const prefersReduced = useReducedMotion();

  // Intersection Observer to lazy-load video
  useEffect(() => {
    if (priority || typeof window === 'undefined' || prefersReduced) {
      setShouldLoad(true);
      return;
    }
    const pinWrap = pinWrapRef.current;
    if (!pinWrap) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '120px',
      }
    );

    observer.observe(pinWrap);
    return () => observer.disconnect();
  }, [priority, prefersReduced]);

  // Video preloader into memory (Blob URL)
  useEffect(() => {
    if (!shouldLoad) return;
    let active = true;
    let objectUrl = '';

    const preload = async () => {
      try {
        const response = await fetch(videoSrc);
        const blob = await response.blob();
        if (!active) return;
        objectUrl = URL.createObjectURL(blob);
        setLoadedSrc(objectUrl);
        setIsReady(true);
      } catch (err) {
        console.error("Failed to preload video:", err);
        // Fallback to original source if fetch fails
        if (active) {
          setLoadedSrc(videoSrc);
          setIsReady(true);
        }
      }
    };

    setIsReady(false);
    preload();

    return () => {
      active = false;
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [shouldLoad, videoSrc]);

  // Active stage index
  const activeStageIndex = useMemo(() => {
    let best = 0;
    let bestOp = -1;
    stages.forEach((s, i) => {
      const op = getStageOpacity(s.range[0], s.range[1], scrollProgress);
      if (op > bestOp) { bestOp = op; best = i; }
    });
    return best;
  }, [scrollProgress, stages]);

  // GSAP ScrollTrigger setup
  useLayoutEffect(() => {
    if (typeof window === 'undefined' || prefersReduced) {
      if (prefersReduced) videoRef.current?.play().catch(() => {});
      return;
    }
    gsap.registerPlugin(ScrollTrigger);

    const pinWrap = pinWrapRef.current;
    const video = videoRef.current;
    if (!pinWrap || !video) return;

    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';

    const st = ScrollTrigger.create({
      trigger: pinWrap,
      start: 'top top',
      end: `+=${scrollMultiplier * 100}%`,
      pin: true,
      scrub: 0.35,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      },
      onToggle: (self) => {
        if (self.isActive) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
    });

    // Play continuously if already active on load
    if (st.isActive) {
      video.play().catch(() => {});
    }

    return () => {
      st.kill();
    };
  }, [scrollMultiplier, prefersReduced]);

  // GSAP per-stage element animation — critical fix for overlap
  useEffect(() => {
    if (typeof window === 'undefined' || prefersReduced) return;

    stages.forEach((stage, idx) => {
      const el = stageEls.current[idx];
      if (!el) return;
      const opacity = getStageOpacity(stage.range[0], stage.range[1], scrollProgress);
      const isVisible = opacity > 0.001;

      gsap.to(el, {
        opacity,
        y: isVisible ? 0 : 18,
        scale: 0.96 + 0.04 * opacity,
        filter: `blur(${isVisible ? 0 : 3}px)`,
        duration: 0.18,
        ease: 'power2.out',
        overwrite: true,
        // CRITICAL: also set display/pointerEvents to prevent invisible text from interfering
        pointerEvents: isVisible ? 'auto' : 'none',
      });

      // Set visibility to prevent any layout interference
      el.style.visibility = isVisible ? 'visible' : 'hidden';
    });
  }, [scrollProgress, stages, prefersReduced]);

  // Vertical progress rail fill (% through all stages)
  const railFill = Math.round(scrollProgress * 100);

  return (
    <section
      id={sectionId}
      style={{
        background: bgHex,
        color: '#ffffff',
        margin: 0,
        padding: 0,
        position: 'relative',
      }}
      aria-label={ariaLabel || chapterTitle || 'Scroll-driven pinned video section'}
    >
      {/* GSAP Pinned Wrapper */}
      <div
        ref={pinWrapRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        {/* Background Video */}
        <video
          ref={videoRef}
          src={loadedSrc || videoSrc}
          preload="auto"
          muted
          playsInline
          loop
          disablePictureInPicture
          aria-label={videoSrc}
          poster={videoSrc.replace(/\.mp4$/, '-poster.webp')}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            pointerEvents: 'none',
            opacity: isReady ? 1 : 0,
            transition: 'opacity 0.8s ease',
          }}
        >
          <source src={loadedSrc || videoSrc} type="video/mp4" />
          <p>Your browser does not support video.</p>
        </video>

        {/* Preloader fallback */}
        {!isReady && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: bgHex,
              backgroundImage: poster ? `url(${poster})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.45)',
            }}
          />
        )}

        {/* Dark Vignette Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: overlayGrad,
            pointerEvents: 'none',
            zIndex: 10,
          }}
        />

        {/* Bottom edge gradient for depth */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '30%',
            background: `linear-gradient(to top, ${bgHex} 0%, transparent 100%)`,
            pointerEvents: 'none',
            zIndex: 11,
          }}
        />

        {/* Chapter Label — top left corner */}
        {chapterLabel && (
          <div
            style={{
              position: 'absolute',
              top: '2rem',
              left: '2.5rem',
              zIndex: 25,
              fontFamily: 'var(--font-ui)',
              fontSize: '0.58rem',
              letterSpacing: '0.18em',
              color: 'rgba(0, 200, 248, 0.55)',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
            className="hidden sm:flex"
          >
            <span style={{ opacity: 0.4 }}>●</span>
            {chapterLabel}
          </div>
        )}



        {/* CENTER STAGE CONTENT — CRITICAL: Only one visible at a time */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            pointerEvents: 'none',
          }}
        >
          {/* Stage Text Container */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '780px',
              padding: '0 1.5rem',
              // Fixed height prevents layout shift between stages
              minHeight: '240px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {stages.map((stage, idx) => {
              return (
                <div
                  key={`stage-${idx}`}
                  ref={(el) => { stageEls.current[idx] = el; }}
                  data-cursor="default"
                  style={{
                    // CRITICAL: Use absolute positioning + pointer-events:none for invisible stages
                    // This prevents ALL invisible stages from occupying space or capturing events
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    // Initial state: invisible and hidden — GSAP will animate
                    opacity: 0,
                    visibility: 'hidden',
                    pointerEvents: 'none',
                    willChange: 'opacity, transform, filter',
                  }}
                >
                  {/* Badge */}
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.58rem',
                      fontFamily: 'var(--font-ui)',
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color: '#00c8f8',
                      fontWeight: 700,
                      backgroundColor: 'rgba(2, 12, 27, 0.9)',
                      padding: '0.3rem 1.1rem',
                      borderRadius: '9999px',
                      border: '1px solid rgba(0, 200, 248, 0.35)',
                      marginBottom: '1.25rem',
                      backdropFilter: 'blur(20px)',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
                    }}
                  >
                    {stage.icon || ICON_MAP[stage.badge] || <Sparkles size={12} color="#00c8f8" />}
                    {stage.badge}
                  </div>

                  {/* Headline */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(2.2rem, 5vw, 4rem)',
                      fontWeight: 300,
                      lineHeight: 1.0,
                      color: '#ffffff',
                      marginBottom: '1rem',
                      textShadow: '0 4px 40px rgba(0,0,0,0.95)',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {stage.headline}
                  </h3>

                  {/* Body */}
                  <p
                    style={{
                      fontSize: '0.98rem',
                      color: 'rgba(255, 255, 255, 0.88)',
                      lineHeight: 1.65,
                      maxWidth: '580px',
                      margin: '0 auto',
                      textShadow: '0 2px 14px rgba(0,0,0,0.98)',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    {stage.body}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Stage dot progress indicator — centered below text */}
          <div
            style={{
              marginTop: '3rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            {stages.map((_, idx) => {
              const s = stages[idx];
              const isActive = scrollProgress >= s.range[0] && scrollProgress <= s.range[1];
              const hasPassed = scrollProgress > s.range[1];
              return (
                <div
                  key={`dot-${idx}`}
                  style={{
                    width: isActive ? '32px' : hasPassed ? '14px' : '7px',
                    height: '4px',
                    borderRadius: '9999px',
                    background: isActive
                      ? 'linear-gradient(90deg, #0052cc, #00c8f8)'
                      : hasPassed
                        ? 'rgba(0, 200, 248, 0.35)'
                        : 'rgba(255, 255, 255, 0.18)',
                    transition: 'width 0.45s var(--ease-expo-out), background 0.3s ease',
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* VERTICAL PROGRESS RAIL — right edge */}
        <div
          className="hidden md:flex"
          style={{
            position: 'absolute',
            right: '2rem',
            top: '50%',
            transform: 'translateY(-50%)',
            height: '160px',
            width: '1px',
            background: 'rgba(255,255,255,0.08)',
            zIndex: 25,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Fill */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${railFill}%`,
              background: 'linear-gradient(to bottom, #0052cc, #00c8f8)',
              transition: 'height 0.1s ease',
              borderRadius: '1px',
            }}
          />
          {/* Percentage label */}
          <div
            style={{
              position: 'absolute',
              bottom: '-1.5rem',
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: 'var(--font-ui)',
              fontSize: '0.5rem',
              letterSpacing: '0.1em',
              color: 'rgba(0,200,248,0.5)',
              whiteSpace: 'nowrap',
            }}
          >
            {railFill}%
          </div>
        </div>

        {/* Hero element (CTA links) — pinned to bottom */}
        {heroElement && (
          <div
            style={{
              position: 'absolute',
              bottom: '3.5rem',
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              zIndex: 30,
              opacity: scrollProgress < 0.08 ? 1 : Math.max(0, 1 - (scrollProgress - 0.08) / 0.12),
              transition: 'opacity 0.3s ease',
              pointerEvents: scrollProgress < 0.2 ? 'auto' : 'none',
            }}
          >
            {heroElement}
          </div>
        )}
      </div>
    </section>
  );
};
