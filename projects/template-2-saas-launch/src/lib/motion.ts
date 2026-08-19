import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useScrollScrub<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  to: gsap.TweenVars,
  start = "top bottom",
  end = "bottom top",
  scrub = 1
) {
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        ...to,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start,
          end,
          scrub,
        },
      });
    });

    return () => ctx.revert();
  }, [ref, start, end, scrub, to]);
}

export function useParallax<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  y: number,
  start = "top bottom",
  end = "bottom top"
) {
  return useScrollScrub(ref, { y }, start, end, 1);
}

/** Cinematic section reveal — fade + rise on scroll enter */
export function useCinematicReveal<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  options?: {
    y?: number;
    duration?: number;
    stagger?: number;
    start?: string;
    childSelector?: string;
  }
) {
  const {
    y = 48,
    duration = 1.1,
    stagger = 0.1,
    start = "top 82%",
    childSelector,
  } = options ?? {};

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { clearProps: "all" });
      if (childSelector) {
        gsap.set(el.querySelectorAll(childSelector), { clearProps: "all" });
      }
      return;
    }

    const targets = childSelector
      ? el.querySelectorAll(childSelector)
      : [el];

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [ref, y, duration, stagger, start, childSelector]);
}

export function useHeroEntrance(
  containerRef: React.RefObject<HTMLElement | null>,
  selectors: string[]
) {
  const ran = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || ran.current) return;
    ran.current = true;

    if (prefersReducedMotion()) {
      selectors.forEach((sel) => {
        gsap.set(container.querySelectorAll(sel), { opacity: 1, y: 0, clearProps: "transform" });
      });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      selectors.forEach((sel, i) => {
        tl.fromTo(
          container.querySelectorAll(sel),
          { opacity: 0, y: i === 0 ? 20 : 36 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.08 },
          i === 0 ? 0.15 : "-=0.55"
        );
      });
    }, container);

    return () => ctx.revert();
  }, [containerRef, selectors]);
}
