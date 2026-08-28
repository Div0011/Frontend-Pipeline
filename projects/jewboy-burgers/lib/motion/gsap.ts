import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const initGSAP = () => {
  if (typeof window === "undefined") return;

  gsap.defaults({
    ease: "expo.out",
    duration: 1.2,
  });

  ScrollTrigger.defaults({
    toggleActions: "play none none reverse",
  });
};

export const animateOnScroll = (
  elements: string | Element | Element[],
  animation: gsap.TweenVars
) => {
  if (typeof window === "undefined") return;

  gsap.fromTo(elements, { opacity: 0, y: 40 }, {
    ...animation,
    scrollTrigger: {
      trigger: elements,
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
  });
};

export const revealOnScroll = (elements: string | Element | Element[]) => {
  if (typeof window === "undefined") return;

  gsap.fromTo(elements, 
    { opacity: 0, y: 60, scale: 0.98 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.4,
      ease: "expo.out",
      scrollTrigger: {
        trigger: elements,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    }
  );
};

export const staggerReveal = (elements: string | Element | Element[], stagger = 0.15) => {
  if (typeof window === "undefined") return;

  gsap.fromTo(elements,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 1.2,
      stagger,
      ease: "expo.out",
      scrollTrigger: {
        trigger: elements,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    }
  );
};
