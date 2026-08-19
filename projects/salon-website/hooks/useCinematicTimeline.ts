import { useLayoutEffect, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../components/shared/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export interface TimelineRefs {
  masterWrap: RefObject<HTMLDivElement | null>;
  canvasWrap: RefObject<HTMLDivElement | null>;
  mist: RefObject<HTMLDivElement | null>;
  crossfade: RefObject<HTMLDivElement | null>;
  hero: RefObject<HTMLDivElement | null>;
  story: RefObject<HTMLDivElement | null>;
  about: RefObject<HTMLDivElement | null>;
  catalogue: RefObject<HTMLDivElement | null>;
  booking: RefObject<HTMLDivElement | null>;
  outroFooter: RefObject<HTMLDivElement | null>;
}

export function useCinematicTimeline(
  refs: TimelineRefs,
  isReady: boolean,
  videoBuffers: HTMLImageElement[][],
  drawFrame: (vIdx: number, fIdx: number) => void,
  onActiveSectionChange?: (sectionKey: string) => void
) {
  const prefersReduced = useReducedMotion();

  useLayoutEffect(() => {
    const {
      masterWrap,
      mist,
      crossfade,
      hero,
      story,
      about,
      catalogue,
      booking,
      outroFooter,
    } = refs;

    if (!masterWrap.current || prefersReduced || !isReady) return;

    const ctx = gsap.context(() => {
      // Set initial states with explicit visibility and pointerEvents
      if (mist.current) gsap.set(mist.current, { opacity: 0, pointerEvents: 'none' });
      if (crossfade.current) gsap.set(crossfade.current, { opacity: 0, pointerEvents: 'none' });
      
      if (hero.current) gsap.set(hero.current, { opacity: 1, y: 0, visibility: 'visible', pointerEvents: 'auto' });
      if (story.current) gsap.set(story.current, { opacity: 0, y: 30, visibility: 'hidden', pointerEvents: 'none' });
      if (about.current) gsap.set(about.current, { opacity: 0, y: 30, visibility: 'hidden', pointerEvents: 'none' });
      if (catalogue.current) gsap.set(catalogue.current, { opacity: 0, y: 30, visibility: 'hidden', pointerEvents: 'none' });
      if (booking.current) gsap.set(booking.current, { opacity: 0, y: 30, visibility: 'hidden', pointerEvents: 'none' });
      if (outroFooter.current) gsap.set(outroFooter.current, { opacity: 0, y: 30, visibility: 'hidden', pointerEvents: 'none' });

      // Track buffer lengths safely
      const l0 = (videoBuffers[0] && videoBuffers[0].length) || 192;
      const l1 = (videoBuffers[1] && videoBuffers[1].length) || 240;
      const l2 = (videoBuffers[2] && videoBuffers[2].length) || 240;
      const l3 = (videoBuffers[3] && videoBuffers[3].length) || 240;

      let lastSection = 'hero';

      const masterTL = gsap.timeline({
        scrollTrigger: {
          id: 'cinematic-master-timeline',
          trigger: masterWrap.current,
          start: 'top top',
          end: '+6500vh',
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;

            // ── VIDEO 1: 0.00 → 0.22 (HERO) ──
            if (p <= 0.22) {
              const localP = Math.min(1.0, Math.max(0.0, p / 0.22));
              const f = Math.min(l0 - 1, Math.floor(localP * (l0 - 1) + 0.5));
              drawFrame(0, f);

              if (lastSection !== 'hero') {
                lastSection = 'hero';
                onActiveSectionChange?.('hero');
              }
            }
            // ── VIDEO 2: 0.22 → 0.50 (STORY + ABOUT) ──
            else if (p > 0.22 && p <= 0.50) {
              const localP = Math.min(1.0, Math.max(0.0, (p - 0.22) / 0.28));
              const f = Math.min(l1 - 1, Math.floor(localP * (l1 - 1) + 0.5));
              drawFrame(1, f);

              const currentSec = p <= 0.36 ? 'story' : 'about';
              if (lastSection !== currentSec) {
                lastSection = currentSec;
                onActiveSectionChange?.(currentSec);
              }
            }
            // ── VIDEO 3: 0.50 → 0.78 (CATALOGUE + BOOKING) ──
            else if (p > 0.50 && p <= 0.78) {
              const localP = Math.min(1.0, Math.max(0.0, (p - 0.50) / 0.28));
              const f = Math.min(l2 - 1, Math.floor(localP * (l2 - 1) + 0.5));
              drawFrame(2, f);

              const currentSec = p <= 0.64 ? 'catalogue' : 'booking';
              if (lastSection !== currentSec) {
                lastSection = currentSec;
                onActiveSectionChange?.(currentSec);
              }
            }
            // ── VIDEO 4: 0.78 → 1.00 (OUTRO + FOOTER - SCROLLS TO LAST FRAME) ──
            else {
              const localP = Math.min(1.0, Math.max(0.0, (p - 0.78) / 0.22));
              const f = Math.min(l3 - 1, Math.floor(localP * (l3 - 1) + 0.5));
              drawFrame(3, f);

              if (lastSection !== 'outro') {
                lastSection = 'outro';
                onActiveSectionChange?.('outro');
              }
            }
          },
        },
      });

      // ─────────────────────────────────────────────────────────
      // 1. HERO ANIMATIONS (0.00 → 0.22)
      // ─────────────────────────────────────────────────────────
      if (hero.current) {
        masterTL
          .to(
            hero.current,
            {
              opacity: 0,
              y: -35,
              duration: 0.05,
              ease: 'power2.in',
            },
            0.17
          )
          .set(hero.current, { visibility: 'hidden', pointerEvents: 'none' }, 0.22);
      }

      // Transition 1: Mist into Video 2 (0.20 → 0.22)
      if (mist.current) {
        masterTL
          .to(mist.current, { opacity: 0.6, duration: 0.02, ease: 'power1.in' }, 0.20)
          .to(mist.current, { opacity: 0, duration: 0.02, ease: 'power1.out' }, 0.22);
      }

      // ─────────────────────────────────────────────────────────
      // 2A. STORY ANIMATIONS (0.22 → 0.36)
      // ─────────────────────────────────────────────────────────
      if (story.current) {
        masterTL
          .set(story.current, { visibility: 'visible', pointerEvents: 'auto' }, 0.225)
          .fromTo(
            story.current,
            { opacity: 0, y: 35 },
            { opacity: 1, y: 0, duration: 0.04, ease: 'power2.out' },
            0.23
          )
          .to(
            story.current,
            { opacity: 0, y: -30, duration: 0.03, ease: 'power2.in' },
            0.33
          )
          .set(story.current, { visibility: 'hidden', pointerEvents: 'none' }, 0.36);
      }

      // ─────────────────────────────────────────────────────────
      // 2B. ABOUT ANIMATIONS (0.36 → 0.50)
      // ─────────────────────────────────────────────────────────
      if (about.current) {
        masterTL
          .set(about.current, { visibility: 'visible', pointerEvents: 'auto' }, 0.365)
          .fromTo(
            about.current,
            { opacity: 0, y: 35 },
            { opacity: 1, y: 0, duration: 0.04, ease: 'power2.out' },
            0.37
          )
          .to(
            about.current,
            { opacity: 0, y: -30, duration: 0.03, ease: 'power2.in' },
            0.47
          )
          .set(about.current, { visibility: 'hidden', pointerEvents: 'none' }, 0.50);
      }

      // Transition 2: Crossfade into Video 3 (0.48 → 0.50)
      if (crossfade.current) {
        masterTL
          .to(crossfade.current, { opacity: 0.6, duration: 0.02, ease: 'power1.in' }, 0.48)
          .to(crossfade.current, { opacity: 0, duration: 0.02, ease: 'power1.out' }, 0.50);
      }

      // ─────────────────────────────────────────────────────────
      // 3A. CATALOGUE ANIMATIONS (0.50 → 0.64)
      // ─────────────────────────────────────────────────────────
      if (catalogue.current) {
        masterTL
          .set(catalogue.current, { visibility: 'visible', pointerEvents: 'auto' }, 0.505)
          .fromTo(
            catalogue.current,
            { opacity: 0, y: 35 },
            { opacity: 1, y: 0, duration: 0.04, ease: 'power2.out' },
            0.51
          )
          .to(
            catalogue.current,
            { opacity: 0, y: -30, duration: 0.03, ease: 'power2.in' },
            0.61
          )
          .set(catalogue.current, { visibility: 'hidden', pointerEvents: 'none' }, 0.64);
      }

      // ─────────────────────────────────────────────────────────
      // 3B. BOOKING ANIMATIONS (0.64 → 0.78)
      // ─────────────────────────────────────────────────────────
      if (booking.current) {
        masterTL
          .set(booking.current, { visibility: 'visible', pointerEvents: 'auto' }, 0.645)
          .fromTo(
            booking.current,
            { opacity: 0, y: 35 },
            { opacity: 1, y: 0, duration: 0.04, ease: 'power2.out' },
            0.65
          )
          .to(
            booking.current,
            { opacity: 0, y: -30, duration: 0.03, ease: 'power2.in' },
            0.75
          )
          .set(booking.current, { visibility: 'hidden', pointerEvents: 'none' }, 0.78);
      }

      // Transition 3: Mist into Video 4 (0.76 → 0.78)
      if (mist.current) {
        masterTL
          .to(mist.current, { opacity: 0.6, duration: 0.02, ease: 'power1.in' }, 0.76)
          .to(mist.current, { opacity: 0, duration: 0.02, ease: 'power1.out' }, 0.78);
      }

      // ─────────────────────────────────────────────────────────
      // 4. OUTRO & FOOTER ANIMATIONS (0.78 → 1.00)
      // ─────────────────────────────────────────────────────────
      if (outroFooter.current) {
        masterTL
          .set(outroFooter.current, { visibility: 'visible', pointerEvents: 'auto' }, 0.785)
          .fromTo(
            outroFooter.current,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.05, ease: 'power2.out' },
            0.79
          );
      }

      // Ensure ScrollTrigger refreshes accurately
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    });

    return () => {
      ctx.revert();
    };
  }, [isReady, videoBuffers, prefersReduced, drawFrame, onActiveSectionChange]);
}
