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

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      // Heading split-word reveal
      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll<HTMLElement>(".split-word > span");
        if (words.length) {
          gsap.set(words, { y: 40, opacity: 0 });
          gsap.to(words, {
            y: 0,
            opacity: 1,
            duration: 1.0,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 75%", once: true },
          });
        }
      }

      // Label + chapter number reveal
      gsap.from(el.querySelectorAll(".ch4h > *:not(h2)"), {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 70%", once: true },
      });

      // Image reveal with clip-path
      if (imageRef.current) {
        gsap.from(imageRef.current, {
          clipPath: "inset(0 0 100% 0)",
          duration: 1.4,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 75%",
            once: true,
          },
        });
      }

      // Content stagger
      if (contentRef.current) {
        gsap.from(contentRef.current.querySelectorAll("p, span"), {
          opacity: 0,
          y: 20,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
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
      className="relative py-32 md:py-48 bg-chapter-4 overflow-hidden"
    >
      <div className="atmosphere-glow bottom-[-15vw] right-[-10vw] bg-violet-800" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="ch4h mb-20 md:mb-24">
          <div className="chapter-number mb-4">04</div>
          <div className="flex items-center gap-3 font-mono text-[10px] font-semibold tracking-[0.35em] text-accent uppercase mb-6">
            <span className="h-px w-8 bg-accent/60" />
            FUTURE
          </div>
          <h2
            ref={headingRef}
            className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight"
            dangerouslySetInnerHTML={{
              __html: splitWords("Forward Vision"),
            }}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center mt-16">
          <div
            ref={imageRef}
            className="aspect-[5/4] bg-card border border-border/40 overflow-hidden editorial-shadow"
          >
            <div className="w-full h-full bg-gradient-to-br from-accent/10 to-transparent flex items-center justify-center">
              <span className="font-serif text-8xl font-bold text-accent/20">
                04
              </span>
            </div>
          </div>
          <div ref={contentRef} className="space-y-6">
            <span className="font-mono text-[10px] uppercase tracking-widest text-accent font-bold">
              Strategic Outlook
            </span>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              As we enter our fourth decade, Apex Group remains committed to
              disciplined capital stewardship.
            </p>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              Our forward vision encompasses sustainable investment frameworks,
              next-generation fiduciary governance, and expanded institutional
              partnerships across global markets.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

