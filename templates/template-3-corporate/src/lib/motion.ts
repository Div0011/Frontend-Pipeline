import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Motion Tokens ──────────────────────────────────────────
export const tokens = {
  reveal: { duration: 1.25, ease: "power3.out", y: 36 },
  scrub: { duration: 1.0, ease: "none" },
  hero: { duration: 1.9, ease: "expo.out" },
  morph: { duration: 1.35, ease: "power4.inOut" },
  stagger: { char: 0.028, word: 0.09, grid: 0.12, section: 0.16 },
  spring: { stiffness: 380, damping: 12 },
  frame: { total: 300, quality: 80 },
};

// ─── Split Text Utilities ───────────────────────────────────

/** Splits a string into character-level <span>s */
export function splitChars(text: string): string {
  return text
    .split("")
    .map((char) => `<span class="split-char">${char === " " ? "&nbsp;" : char}</span>`)
    .join("");
}

/** Splits a string into word-level <span>s */
export function splitWords(text: string): string {
  return text
    .split(" ")
    .map((word) => `<span class="split-word"><span>${word}</span></span>`)
    .join(" ");
}

/** GSAP animation: reveal split-chars with stagger */
export function animateSplitChars(
  el: HTMLElement | null,
  { delay = 0, stagger = 0.025, duration = 1.2, ease = "expo.out", y = 40 } = {}
) {
  if (!el) return;
  const chars = el.querySelectorAll<HTMLElement>(".split-char");
  if (!chars.length) return;
  gsap.set(chars, { y, opacity: 0 });
  return gsap.to(chars, {
    y: 0,
    opacity: 1,
    duration,
    ease,
    stagger,
    delay,
  });
}

/** GSAP animation: reveal split-words with stagger */
export function animateSplitWords(
  el: HTMLElement | null,
  { delay = 0, stagger = 0.08, duration = 1.0, ease = "power3.out", y = 30 } = {}
) {
  if (!el) return;
  const words = el.querySelectorAll<HTMLElement>(".split-word > span");
  if (!words.length) return;
  gsap.set(words, { y, opacity: 0 });
  return gsap.to(words, {
    y: 0,
    opacity: 1,
    duration,
    ease,
    stagger,
    delay,
  });
}

// ─── Scroll-Triggered Reveal Factory ────────────────────────

/** Creates a ScrollTrigger reveal for a set of elements */
export function createScrollReveal(
  trigger: HTMLElement | string,
  targets: HTMLElement | string,
  { start = "top 80%", stagger = 0.1, y = 30, duration = 1.0 } = {}
) {
  return gsap.from(targets, {
    y,
    opacity: 0,
    duration,
    stagger,
    ease: "power3.out",
    scrollTrigger: { trigger, start, once: true },
  });
}

// ─── Counter Animation ─────────────────────────────────────

export function animateCounter(
  el: HTMLElement | null,
  { from = 0, to = 100, duration = 2.0, delay = 0 } = {}
) {
  if (!el) return;
  return gsap.fromTo(
    el,
    { textContent: from },
    {
      textContent: to,
      duration,
      ease: "power2.out",
      delay,
      snap: { textContent: 1 },
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
    }
  );
}

// ─── Reduced Motion Hook ───────────────────────────────────

export function getReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
