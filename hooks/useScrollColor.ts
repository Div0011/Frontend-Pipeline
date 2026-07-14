"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollColor(
  ref: React.RefObject<HTMLElement | null>,
  stops: { start: number; end: number; bg: string; text: string }[]
) {
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    stops.forEach((stop) => {
      ScrollTrigger.create({
        trigger: el,
        start: `top ${stop.start}%`,
        end: `top ${stop.end}%`,
        onEnter: () => {
          el.style.backgroundColor = stop.bg;
          el.style.color = stop.text;
        },
        onEnterBack: () => {
          el.style.backgroundColor = stop.bg;
          el.style.color = stop.text;
        },
      });
    });
  }, [ref, stops]);
}
