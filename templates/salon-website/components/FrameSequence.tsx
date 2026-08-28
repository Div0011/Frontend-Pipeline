'use client';

import React, { useRef, useLayoutEffect, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './shared/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface FrameSequenceProps {
  folder: string;
  poster?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  scrimOpacity?: number;
  pinDistanceVh?: number;
  id?: string;
  isHero?: boolean;
  footerMode?: boolean;
  textFadeStart?: number;
  textFadeEnd?: number;
  fadeOutStart?: number;
  fadeInDuration?: number;
}

export function FrameSequence({
  folder,
  poster,
  className,
  style,
  children,
  scrimOpacity = 0,
  pinDistanceVh = 140,
  id,
  isHero = false,
  footerMode = false,
  textFadeStart,
  textFadeEnd,
  fadeOutStart = 0.85,
  fadeInDuration = 0.15,
}: FrameSequenceProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [canvasOpacity, setCanvasOpacity] = useState(0);
  const readyRef = useRef(false);

  useEffect(() => {
    if (prefersReduced) return;
    let isCancelled = false;

    async function loadAndPreload() {
      try {
        const mod = await import('../lib/frame-manifest.json');
        const manifest = mod.default || mod;
        const framePaths: string[] = (manifest as Record<string, string[]>)[folder] || [];

        if (!framePaths || framePaths.length === 0) return;

        const loadedImages: HTMLImageElement[] = new Array(framePaths.length);
        let count = 0;
        let hasError = false;

        const markReady = () => {
          if (readyRef.current) return;
          readyRef.current = true;
          setImages(loadedImages);
          setIsReady(true);
          setCanvasOpacity(1);
        };

        framePaths.forEach((path, idx) => {
          const img = new Image();
          img.src = path;
          img.onload = () => {
            if (isCancelled) return;
            loadedImages[idx] = img;
            count++;
            if (count === framePaths.length) {
              markReady();
            }
          };
          img.onerror = () => {
            if (isCancelled) return;
            hasError = true;
            count++;
            loadedImages[idx] = img;
            if (count === framePaths.length) {
              markReady();
            }
          };
        });

        const fallbackTimer = setTimeout(() => {
          if (!readyRef.current && count > 0) {
            markReady();
          }
        }, 4000);
      } catch (err) {
        console.error('Failed loading frame sequence:', err);
      }
    }

    loadAndPreload();
    return () => {
      isCancelled = true;
    };
  }, [folder, prefersReduced]);

  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !images || images.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = images[index] || images.find((i) => i && i.complete);
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
  };

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (isReady) {
        renderFrame(0);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isReady, images]);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const content = contentRef.current;

    if (!wrap || prefersReduced || !isReady || images.length === 0) return;

    const maxFrame = images.length - 1;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: 'top top',
          end: `+=${pinDistanceVh}vh`,
          pin: true,
          scrub: 0.15,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(maxFrame, Math.floor(self.progress * maxFrame));
            renderFrame(idx);
          },
        },
      });

      renderFrame(0);

      if (content) {
        if (isHero && textFadeStart !== undefined && textFadeEnd !== undefined) {
          gsap.set(content, { opacity: 0, y: 30 });
          tl.to(
            content,
            { opacity: 1, y: 0, ease: 'power2.out', duration: textFadeEnd - textFadeStart },
            textFadeStart
          );
        } else if (footerMode) {
          gsap.set(content, { opacity: 0, y: 40 });
          tl.to(content, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, 0.65);
        } else {
          gsap.set(content, { opacity: 0, y: 30 });
          tl.to(content, { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }, 0.08);
          tl.to(content, { opacity: 0, y: -30, duration: 0.25, ease: 'power2.in' }, fadeOutStart);
        }
      }

      // Fade out canvas at end for crossfade
      const canvas = canvasRef.current;
      if (canvas && fadeOutStart !== undefined && fadeOutStart < 1) {
        tl.to(canvas, { opacity: 0, duration: fadeInDuration, ease: 'power2.inOut' }, fadeOutStart);
      }
    }, wrap);

    return () => ctx.revert();
  }, [isReady, images, pinDistanceVh, prefersReduced, isHero, footerMode, textFadeStart, textFadeEnd, fadeOutStart, fadeInDuration]);

  return (
    <section
      id={id}
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
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          pointerEvents: 'none',
          zIndex: 1,
          opacity: canvasOpacity,
          transition: 'opacity 0.8s ease',
        }}
      />

      {/* Light scrim for text legibility */}
      {scrimOpacity > 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse at center, rgba(255,255,255,${scrimOpacity * 0.3}) 0%, rgba(255,255,255,${scrimOpacity * 0.7}) 90%)`,
            pointerEvents: 'none',
            zIndex: 5,
          }}
        />
      )}

      {children && (
        <div
          ref={contentRef}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            pointerEvents: 'none',
            opacity: 0,
          }}
        >
          {children}
        </div>
      )}
    </section>
  );
}
