"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitWords } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export default function ChapterFour() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll<HTMLElement>(
          ".split-word > span"
        );
        if (words.length) {
          gsap.set(words, { y: 48, opacity: 0 });
          gsap.to(words, {
            y: 0,
            opacity: 1,
            duration: 1.15,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 72%", once: true },
          });
        }
      }

      gsap.from(el.querySelectorAll(".ch4-meta"), {
        opacity: 0,
        y: 24,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 70%", once: true },
      });

      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { clipPath: "inset(0 0 100% 0)", scale: 1.06 },
          {
            clipPath: "inset(0 0 0% 0)",
            scale: 1,
            duration: 1.6,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top 78%",
              once: true,
            },
          }
        );

        gsap.to(imageRef.current.querySelector("img"), {
          y: 40,
          ease: "none",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (contentRef.current) {
        gsap.from(contentRef.current.querySelectorAll(".ch4-line"), {
          opacity: 0,
          y: 22,
          duration: 0.9,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            once: true,
          },
        });
      }

      if (statementRef.current) {
        gsap.from(statementRef.current, {
          opacity: 0,
          y: 30,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statementRef.current,
            start: "top 85%",
            once: true,
          },
        });
      }
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="chapter-04"
      ref={sectionRef}
      className="relative py-32 md:py-44 bg-chapter-4 overflow-hidden"
    >
      {/* Warm slate glow — no violet */}
      <div className="atmosphere-glow bottom-[-14vw] right-[-8vw] bg-[#3a3228]" />
      <div className="absolute inset-0 bg-architectural-plane pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="mb-20 md:mb-28">
          <div className="ch4-meta chapter-number mb-2">04</div>
          <div className="ch4-meta flex items-center gap-4 mb-7">
            <span className="chapter-rule" />
            <span className="chapter-label">Vision</span>
          </div>
          <h2
            ref={headingRef}
            className="font-serif text-[clamp(2.5rem,6vw,4.75rem)] font-semibold tracking-tight leading-[0.95] max-w-3xl"
            dangerouslySetInnerHTML={{
              __html: splitWords("Forward, without haste."),
            }}
          />
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div
            ref={imageRef}
            className="lg:col-span-7 media-frame aspect-[5/4] overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1400&q=80"
              alt="Modern architectural interior"
              className="w-full h-[115%] object-cover opacity-85 saturate-[0.75] -mt-[5%]"
            />
          </div>

          <div ref={contentRef} className="lg:col-span-5 space-y-6">
            <span className="ch4-line font-mono text-[10px] uppercase tracking-[0.35em] text-accent block">
              Strategic Outlook
            </span>
            <p className="ch4-line text-base text-muted-foreground font-light leading-relaxed">
              Entering a fourth decade, Apex remains committed to disciplined
              capital stewardship — patient, structured, and institutionally
              rigorous.
            </p>
            <div className="ch4-line metal-line w-full max-w-[10rem]" />
            <p className="ch4-line text-sm text-muted-foreground font-light leading-relaxed">
              Our horizon encompasses sustainable frameworks, next-generation
              fiduciary governance, and partnerships that span markets without
              diluting mandate.
            </p>
          </div>
        </div>

        <p
          ref={statementRef}
          className="mt-24 md:mt-32 font-serif text-[clamp(1.75rem,4vw,3rem)] font-medium leading-snug text-foreground/90 max-w-4xl"
        >
          We do not chase the next cycle.
          <span className="text-accent italic"> We design for the ones after.</span>
        </p>
      </div>
    </section>
  );
}
