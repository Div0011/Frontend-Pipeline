"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useLetterReveal(
  text: string,
  options: { delay?: number; y?: number; stagger?: number } = {}
) {
  const ref = useRef<HTMLSpanElement>(null);
  const { delay = 0, y = 40, stagger = 0.03 } = options;

  useEffect(() => {
    if (!ref.current) return;
    const chars = text.split("");
    ref.current.innerHTML = chars
      .map(
        (char) =>
          `<span style="display:inline-block;transform:translateY(${y}px);opacity:0;transition:transform 0.6s cubic-bezier(0.16,1,0.3,1),opacity 0.6s ease;">${char === " " ? "&nbsp;" : char}</span>`
      )
      .join("");

    const spans = ref.current.querySelectorAll("span");
    const ctx = gsap.context(() => {
      gsap.to(spans, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [text, delay, y, stagger]);

  return ref;
}

export function useWordReveal(
  text: string,
  options: { delay?: number; y?: number; stagger?: number } = {}
) {
  const ref = useRef<HTMLSpanElement>(null);
  const { delay = 0, y = 30, stagger = 0.05 } = options;
  const words = text.split(" ");

  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = words
      .map(
        (word) =>
          `<span style="display:inline-block;transform:translateY(${y}px);opacity:0;transition:transform 0.7s cubic-bezier(0.16,1,0.3,1),opacity 0.7s ease;margin-right:0.3em;">${word}</span>`
      )
      .join("");

    const spans = ref.current.querySelectorAll("span");
    const ctx = gsap.context(() => {
      gsap.to(spans, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [text, delay, y, stagger]);

  return ref;
}
