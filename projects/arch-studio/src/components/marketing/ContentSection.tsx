'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

interface ContentSectionProps {
  index: number;
  title: string;
  description: string;
  href?: string;
}

export default function ContentSection({ index, title, description, href }: ContentSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-[60vh] bg-white flex items-center justify-center px-6 py-24"
    >
      <div className="max-w-2xl text-center">
        <span className="font-mono text-xs tracking-widest uppercase text-ink/40 block mb-4">
          0{index}
        </span>
        <h3 className="font-display text-3xl md:text-5xl text-ink tracking-tight mb-6">
          {title}
        </h3>
        <p className="font-sans text-base md:text-lg text-ink/60 leading-relaxed">
          {description}
        </p>
      </div>

      {href && (
        <Link
          href={href}
          className="arrow-hover absolute right-6 md:right-16 top-1/2 -translate-y-1/2 text-ink hover:text-ink/80 transition-colors"
          aria-label={`Go to ${title}`}
        >
          <svg
            className="w-8 h-8 md:w-10 md:h-10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      )}
    </section>
  );
}
