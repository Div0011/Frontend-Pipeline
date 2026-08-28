'use client';

import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './shared/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface FogTransitionProps {
  className?: string;
  heightVh?: number;
}

export function FogTransition({ className, heightVh = 100 }: FogTransitionProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const fogRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const fog = fogRef.current;
    if (!wrap || !fog || prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.set(fog, {
        scale: 1,
        opacity: 0,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: 'top top',
          end: `+=${heightVh}vh`,
          pin: true,
          scrub: 0.25,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(fog, {
        opacity: 1,
        scale: 1.05,
        duration: 0.45,
        ease: 'power2.inOut',
      })
      .to(fog, {
        opacity: 1,
        scale: 1.1,
        duration: 0.2,
        ease: 'none',
      })
      .to(fog, {
        scale: 1.4,
        opacity: 0,
        duration: 0.35,
        ease: 'power2.out',
      });
    }, wrap);

    return () => ctx.revert();
  }, [prefersReduced, heightVh]);

  if (prefersReduced) return null;

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        margin: 0,
        padding: 0,
        background: 'transparent',
        zIndex: 50,
      }}
      aria-hidden="true"
    >
      {/* Localized right-corner fog effect */}
      <div
        ref={fogRef}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '45vw',
          height: '100vh',
          background:
            'radial-gradient(circle at 100% 0%, rgba(255,255,255,0.95) 0%, rgba(240,240,255,0.6) 35%, rgba(255,255,255,0) 70%)',
          willChange: 'transform, opacity',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
