"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  triggerRef: React.RefObject<HTMLElement | null>;
  items: {
    ref: React.RefObject<HTMLHeadingElement | null>;
    startProgress?: number;
    endProgress?: number;
  }[];
}

export default function VideoTextReveal({
  triggerRef,
  items,
}: TextRevealProps) {
  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const ctx = gsap.context(() => {
      items.forEach((item) => {
        const el = item.ref.current;
        if (!el) return;

        const start = item.startProgress ?? 0;
        const end = item.endProgress ?? 0.3;

        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: 60,
            letterSpacing: "0.2em",
          },
          {
            opacity: 1,
            y: 0,
            letterSpacing: "0.01em",
            duration: 1,
            scrollTrigger: {
              trigger,
              start: `top ${start * 100}%`,
              end: `top ${end * 100}%`,
              scrub: 1,
            },
          }
        );

        gsap.to(el, {
          opacity: 0,
          y: -40,
          letterSpacing: "0.15em",
          scrollTrigger: {
            trigger,
            start: `top ${(1 - end) * 100}%`,
            end: `top ${(1 - start) * 100}%`,
            scrub: 1,
          },
        });
      });
    }, trigger);

    return () => ctx.revert();
  }, [triggerRef, items]);

  return null;
}
