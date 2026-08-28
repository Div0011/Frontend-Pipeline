import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Signature scroll reveal used across editorial sections */
export function revealOnScroll(
  root: HTMLElement | null,
  selector = "[data-scroll-reveal]"
) {
  if (!root || prefersReducedMotion()) return () => {};

  const ctx = gsap.context(() => {
    root.querySelectorAll(selector).forEach((el) => {
      const delay = Number((el as HTMLElement).dataset.revealDelay ?? 0);
      gsap.fromTo(
        el,
        { opacity: 0, y: 56, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.15,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, root);

  return () => ctx.revert();
}

/** Horizontal wipe / letterbox transition between major blocks */
export function sectionLetterbox(
  trigger: Element | null,
  bars: Element[]
) {
  if (!trigger || prefersReducedMotion() || bars.length === 0) return () => {};

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start: "top 80%",
      end: "top 20%",
      scrub: 1.2,
    },
  });

  tl.fromTo(
    bars,
    { scaleX: 0 },
    { scaleX: 1, transformOrigin: "left center", ease: "none", stagger: 0.08 }
  );

  return () => {
    tl.scrollTrigger?.kill();
    tl.kill();
  };
}
