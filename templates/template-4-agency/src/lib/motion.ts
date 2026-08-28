import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const EASE = {
  outExpo: "expo.out",
  outCubic: "power3.out",
  inOut: "power2.inOut",
  cinematic: "power4.out",
} as const;

export const DURATION = {
  reveal: 1.15,
  snapMin: 0.28,
  snapMax: 0.72,
} as const;

export function revealStagger(
  targets: gsap.TweenTarget,
  trigger: Element | null,
  options?: { y?: number; stagger?: number; start?: string }
) {
  if (!trigger) return;

  return gsap.from(targets, {
    opacity: 0,
    y: options?.y ?? 36,
    duration: DURATION.reveal,
    ease: EASE.cinematic,
    stagger: options?.stagger ?? 0.08,
    scrollTrigger: {
      trigger,
      start: options?.start ?? "top 72%",
      once: true,
    },
    clearProps: "transform",
  });
}
