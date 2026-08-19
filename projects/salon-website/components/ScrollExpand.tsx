'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
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
  src = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1600&auto=format&fit=crop',
  alt = 'Editorial showcase',
  title = 'HAUTE COIFFURE',
  scrollHint = 'Défiler pour révéler',
  mediaZoom = 1.3,
  startWidth = 46,
  startHeight = 60,
  startRadius = 24,
  endRadius = 0,
  overlayScrim = 0.45,
  children,
}: ScrollExpandProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const frame = frameRef.current;
    const img = imageRef.current;
    const content = contentRef.current;
    if (!container || !frame) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=160%',
          pin: true,
          scrub: 0.8,
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
          width: '100vw',
          height: '100vh',
          borderRadius: `${endRadius}px`,
          ease: 'power2.inOut',
        },
        0
      );

      if (img) {
        tl.fromTo(
          img,
          { scale: mediaZoom },
          { scale: 1.0, ease: 'power2.inOut' },
          0
        );
      }

      if (content) {
        tl.fromTo(
          content,
          { opacity: 1, y: 0 },
          { opacity: 0, y: -40, ease: 'power2.in' },
          0.35
        );
      }
    });

    return () => ctx.revert();
  }, [startWidth, startHeight, startRadius, endRadius, mediaZoom]);

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#09090a',
      }}
    >
      <div
        ref={frameRef}
        style={{
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 30px 80px rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Background Image */}
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />

        {/* Dark Scrim */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `rgba(9, 9, 10, ${overlayScrim})`,
            pointerEvents: 'none',
          }}
        />

        {/* Initial Overlay Title & Scroll Hint */}
        <div
          ref={contentRef}
          style={{
            position: 'relative',
            zIndex: 10,
            textAlign: 'center',
            padding: '2rem',
            maxWidth: '640px',
            color: '#fcfbf9',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.68rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: '#e6c687',
              display: 'block',
              marginBottom: '1rem',
            }}
          >
            {scrollHint}
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 300,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              lineHeight: 1,
              marginBottom: '1rem',
            }}
          >
            {title}
          </h2>
          {children}
        </div>
      </div>
    </section>
  );
}
