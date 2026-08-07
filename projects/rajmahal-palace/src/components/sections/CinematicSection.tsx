"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CinematicSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  animation?: "fade-up" | "fade-in" | "scale-in" | "clip-up";
  triggerStart?: string;
  triggerEnd?: string;
  stagger?: number;
  duration?: number;
  delay?: number;
}

export default function CinematicSection({
  children,
  className = "",
  id,
  animation = "fade-up",
  triggerStart = "top 75%",
  triggerEnd = "bottom 25%",
  stagger = 0.15,
  duration = 1.2,
  delay = 0,
}: CinematicSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const targets = section.querySelectorAll("[data-animate]");
      if (targets.length === 0) return;

      const fromVars: gsap.TweenVars = {};
      const toVars: gsap.TweenVars = {
        duration,
        stagger,
        delay,
        ease: "power4.out",
        scrollTrigger: {
          trigger: section,
          start: triggerStart,
          end: triggerEnd,
          toggleActions: "play none none reverse",
        },
      };

      switch (animation) {
        case "fade-up":
          fromVars.y = 60;
          fromVars.opacity = 0;
          break;
        case "fade-in":
          fromVars.opacity = 0;
          break;
        case "scale-in":
          fromVars.scale = 0.92;
          fromVars.opacity = 0;
          break;
        case "clip-up":
          fromVars.yPercent = 110;
          fromVars.opacity = 0;
          break;
      }

      gsap.set(targets, fromVars);
      gsap.to(targets, { ...toVars, ...fromVars, overwrite: true });
    });

    return () => ctx.revert();
  }, [animation, triggerStart, triggerEnd, stagger, duration, delay]);

  return (
    <section ref={sectionRef} id={id} className={className}>
      {children}
    </section>
  );
}
