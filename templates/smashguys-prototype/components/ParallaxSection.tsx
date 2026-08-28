"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxSection({
  children,
  speed = 0.5,
  className = "",
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const el = ref.current!;
      const bg = el.querySelector(".parallax-bg");
      const fg = el.querySelector(".parallax-fg");

      if (bg) {
        gsap.fromTo(
          bg,
          { y: () => -(el.offsetHeight * speed * 0.6) },
          {
            y: () => el.offsetHeight * speed * 0.6,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.4,
            },
          }
        );
      }

      if (fg) {
        gsap.fromTo(
          fg,
          { y: () => -(el.offsetHeight * speed * 1.4) },
          {
            y: () => el.offsetHeight * speed * 1.4,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.4,
            },
          }
        );
      }
    }, ref);
    return () => ctx.revert();
  }, [speed]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
