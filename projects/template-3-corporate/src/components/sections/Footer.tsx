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
      // ─── Large Marquee Text Entrance ──────────────────
      if (marqueeRef.current) {
        const chars = marqueeRef.current.querySelectorAll(".split-char");
        if (chars.length) {
          gsap.set(chars, { y: 80, opacity: 0 });
          gsap.to(chars, {
            y: 0,
            opacity: 1,
            duration: 1.4,
            stagger: 0.02,
            ease: "expo.out",
            scrollTrigger: {
              trigger: el,
              start: "top 70%",
              once: true,
            },
          });
        } else {
          // Fallback: simple fade-up
          gsap.from(marqueeRef.current, {
            y: 60,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 75%", once: true },
          });
        }
      }

      // ─── Subtitle ──────────────────────────────────────
      if (subtitleRef.current) {
        gsap.from(subtitleRef.current, {
          y: 30,
          opacity: 0,
          duration: 1.0,
          ease: "power3.out",
          delay: 0.3,
          scrollTrigger: { trigger: el, start: "top 70%", once: true },
        });
      }

      // ─── Links ─────────────────────────────────────────
      if (linksRef.current) {
        gsap.from(linksRef.current.querySelectorAll("a"), {
          y: 20,
          opacity: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.5,
          scrollTrigger: { trigger: el, start: "top 65%", once: true },
        });
      }

      // ─── Bottom Bar ────────────────────────────────────
      if (bottomRef.current) {
        gsap.from(bottomRef.current, {
          opacity: 0,
          duration: 0.8,
          delay: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 60%", once: true },
        });
      }

      // ─── Scroll Top ────────────────────────────────────
      if (scrollTopRef.current) {
        gsap.from(scrollTopRef.current, {
          opacity: 0,
          x: 20,
          duration: 0.8,
          delay: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 60%", once: true },
        });
      }

      // ─── Decorative Gradient Pulse ─────────────────────
      if (decorRef.current) {
        gsap.to(decorRef.current, {
          opacity: 0.15,
          scale: 1.1,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  // Split the marquee text into characters
  const marqueeText = "Apex Group";
  const marqueeChars = marqueeText.split("").map((char, i) => (
    <span key={i} className="split-char inline-block">
      {char === " " ? "\u00A0" : char}
    </span>
  ));

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={sectionRef}
      className="footer-cinematic border-t border-white/5"
    >
      {/* ─── Decorative Background Gradient ──────────────── */}
      <div
        ref={decorRef}
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 60%, rgba(201,169,110,0.2) 0%, transparent 60%)",
        }}
      />

      {/* ─── Magazine Grid Subtle Overlay ───────────────── */}
      <div className="absolute inset-0 bg-magazine-grid opacity-20 pointer-events-none z-[1]" />

      {/* ─── Main Cinematic Content ─────────────────────── */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-20 min-h-screen w-full">
        {/* Large Marquee Title */}
        <h1
          ref={marqueeRef}
          className="footer-marquee"
        >
          {marqueeChars}
          <br />
          <span className="accent">Est. 1987</span>
        </h1>

        {/* Subtitle */}
        <div ref={subtitleRef} className="footer-subtitle">
          Institutional Capital · Generational Stewardship
        </div>

        {/* Separator Line */}
        <div className="w-16 h-[1px] bg-accent/40 my-8" />

        {/* Links */}
        <div ref={linksRef} className="footer-links">
          <a href="#story">Our Story</a>
          <a href="#expertise">Expertise</a>
          <a href="#leadership">Leadership</a>
          <a href="#contact">Inquiry</a>
          <a href="#">FCA / SEC Disclosures</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Fiduciary Code</a>
        </div>

        {/* Office line */}
        <div className="font-mono text-[10px] tracking-[0.3em] text-white/30 mt-8 uppercase text-center z-2">
          New York · London · Zurich · Singapore
        </div>
      </div>

      {/* ─── Bottom Copyright ────────────────────────────── */}
      <div ref={bottomRef} className="footer-bottom">
        © 2026 APEX GROUP HOLDINGS. ALL EDITORIAL & REGULATORY RIGHTS RESERVED.
      </div>

      {/* ─── Scroll to Top ───────────────────────────────── */}
      <div
        ref={scrollTopRef}
        className="footer-scroll-top"
        onClick={handleScrollTop}
      >
        ↑ Back to Top
      </div>
    </footer>
  );
}

