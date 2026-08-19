"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Reveal({
  children,
  className = "",
  stagger = false,
  offset = 35,
  threshold = "94%",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: boolean;
  offset?: number;
  threshold?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const targets = stagger ? Array.from(ref.current?.children || []) : ref.current;
      if (!targets || (Array.isArray(targets) && targets.length === 0)) return;

      gsap.fromTo(
        targets,
        { opacity: 0, y: offset },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: stagger ? 0.08 : 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: `top ${threshold}`,
            toggleActions: "play none none reverse",
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, [stagger, offset, threshold]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
