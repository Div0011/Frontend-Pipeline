import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollScrub<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  to: gsap.TweenVars,
  start = "top bottom",
  end = "bottom top",
  scrub = 1
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

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
