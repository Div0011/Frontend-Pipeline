"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useMuseumMotion() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const handleResize = () => ScrollTrigger.refresh();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, containerRef);

    return () => ctx.revert();
  }, []);
}

interface ScrollRevealOptions {
  y?: number;
  opacity?: number;
  duration?: number;
  stagger?: number;
  ease?: string;
  scrub?: boolean | number;
  start?: string;
  end?: string;
  pin?: boolean;
  pinSpacing?: boolean;
}

export function useScrollReveal(
  trigger: string | Element,
  options: ScrollRevealOptions = {}
) {
  const defaults: ScrollRevealOptions = {
    y: 60,
    opacity: 0,
    duration: 0.8,
    stagger: 0,
    ease: "expo.out",
    scrub: false,
    start: "top 85%",
    end: "bottom 20%",
    pin: false,
    pinSpacing: true,
  };

  const config = { ...defaults, ...options };

  useEffect(() => {
    const elements =
      typeof trigger === "string"
        ? document.querySelectorAll(trigger)
        : [trigger];

    if (!elements.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elements,
        {
          y: config.y,
          opacity: config.opacity,
        },
        {
          y: 0,
          opacity: 1,
          duration: config.duration,
          stagger: config.stagger,
          ease: config.ease as gsap.EaseString,
          scrollTrigger: {
            trigger: typeof trigger === "string" ? trigger : trigger,
            start: config.start,
            end: config.end,
            scrub: config.scrub,
            pin: config.pin,
            pinSpacing: config.pinSpacing,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [trigger, JSON.stringify(config)]);
}

export function useSpotlight() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      document.documentElement.style.setProperty("--spotlight-x", `${x}%`);
      document.documentElement.style.setProperty("--spotlight-y", `${y}%`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
}

export function useParallax(
  ref: React.RefObject<HTMLElement | null>,
  speed: number,
  direction: "y" | "x" = "y"
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        [direction]: -100 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [ref, speed, direction]);
}
