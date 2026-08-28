import Lenis from "lenis";

export function createLenis(): Lenis {
  return new Lenis({
    duration: 1.8,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.8,
    touchMultiplier: 1.5,
  });
}
