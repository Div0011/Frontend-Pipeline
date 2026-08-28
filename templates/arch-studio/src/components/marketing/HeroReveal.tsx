'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
      }, 0);

      tl.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
      }, 0.2);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[120vh] bg-white flex items-center justify-center overflow-hidden"
    >
      <div className="sticky top-0 h-[100svh] w-full flex flex-col items-center justify-center px-6">
        <h1
          ref={titleRef}
          className="font-display text-6xl sm:text-8xl md:text-9xl tracking-tighter text-ink opacity-0 translate-y-8"
        >
          FORMA
        </h1>
        <p
          ref={subtitleRef}
          className="mt-6 font-mono text-xs tracking-widest uppercase text-ink/50 opacity-0 translate-y-4"
        >
          Architecture Studio
        </p>
      </div>
    </div>
  );
}
