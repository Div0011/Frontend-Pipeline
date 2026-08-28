"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollTopRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (marqueeRef.current) {
        const chars = marqueeRef.current.querySelectorAll(".split-char");
        if (chars.length) {
          gsap.set(chars, { y: 90, opacity: 0 });
          gsap.to(chars, {
            y: 0,
            opacity: 1,
            duration: 1.5,
            stagger: 0.022,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 68%", once: true },
          });
        } else {
          gsap.from(marqueeRef.current, {
            y: 60,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 75%", once: true },
          });
        }
      }

      gsap.from(subtitleRef.current, {
        y: 24,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 65%", once: true },
      });

      if (linksRef.current) {
        gsap.from(linksRef.current.querySelectorAll("a"), {
          y: 18,
          opacity: 0,
          duration: 0.75,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 60%", once: true },
        });
      }

      gsap.from([bottomRef.current, scrollTopRef.current], {
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 55%", once: true },
      });

      if (decorRef.current) {
        gsap.to(decorRef.current, {
          opacity: 0.18,
          scale: 1.08,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  const marqueeText = "Apex";
  const marqueeChars = marqueeText.split("").map((char, i) => (
    <span key={i} className="split-char inline-block">
      {char}
    </span>
  ));

  return (
    <footer ref={sectionRef} className="footer-cinematic border-t border-border/40">
      <div
        ref={decorRef}
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 55%, rgba(196,165,116,0.22) 0%, transparent 58%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-24 min-h-screen w-full">
        <h1 ref={marqueeRef} className="footer-marquee tracking-[0.08em]">
          {marqueeChars}
        </h1>
        <p className="font-serif text-[clamp(1.5rem,4vw,2.75rem)] text-accent italic font-normal mt-2">
          Est. 1987
        </p>

        <div ref={subtitleRef} className="footer-subtitle mt-8">
          Institutional Capital · Generational Stewardship
        </div>

        <div className="metal-line w-24 my-10" />

        <div ref={linksRef} className="footer-links">
          <a href="#chapter-02" data-cursor-hover>
            Origins
          </a>
          <a href="#chapter-03" data-cursor-hover>
            Practice
          </a>
          <a href="#chapter-04" data-cursor-hover>
            Vision
          </a>
          <a href="#contact" data-cursor-hover>
            Inquiry
          </a>
          <a href="#" data-cursor-hover>
            Disclosures
          </a>
          <a href="#" data-cursor-hover>
            Privacy
          </a>
        </div>

        <div className="font-mono text-[10px] tracking-[0.35em] text-foreground/25 mt-10 uppercase text-center">
          New York · London · Zurich · Singapore
        </div>
      </div>

      <div ref={bottomRef} className="footer-bottom">
        © 2026 Apex Group Holdings. All rights reserved.
      </div>

      <div
        ref={scrollTopRef}
        className="footer-scroll-top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        data-cursor-hover
      >
        ↑ Top
      </div>
    </footer>
  );
}
