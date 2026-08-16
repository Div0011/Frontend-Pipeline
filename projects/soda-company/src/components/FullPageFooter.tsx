"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAdaptiveTheme } from "./AdaptiveThemeProvider";
import { useSceneStore } from "@/stores/sceneStore";
import BlurText from "@/components/reactbits/BlurText";
import ShinyText from "@/components/reactbits/ShinyText";
import PixelCard from "@/components/reactbits/PixelCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FullPageFooter() {
  const { theme } = useAdaptiveTheme();
  const footerRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 70%",
        onEnter: () => useSceneStore.getState().setActiveSection("footer"),
        onEnterBack: () => useSceneStore.getState().setActiveSection("footer"),
      });

      // Animate footer elements in
      gsap.fromTo(
        el.querySelectorAll("[data-footer-reveal]"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative w-full overflow-hidden bg-black/60 backdrop-blur-sm"
      style={{ minHeight: "100vh" }}
    >
      <PixelCard
        variant="default"
        gap={12}
        speed={40}
        colors="#06D6A0,#4CC9F0,#FF8A00,#ffffff"
        className="absolute inset-0 z-0 pointer-events-auto opacity-30"
      />

      {/* Radial glow bloom centered */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 55% at 50% 30%, ${theme.glowColor} 0%, transparent 70%)`,
          opacity: 0.35,
        }}
      />

      {/* Top Divider Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />


      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* ─── Monumental Brand Header ─── */}
        <div className="flex-1 flex flex-col items-center justify-center py-20 px-6 md:px-16 text-center">
          
          <div data-footer-reveal className="mb-6">
            <span
              className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] block mb-4"
              style={{ color: theme.accentColor }}
            >
              Alpine Bio-Facility // Zero Synthetic Interference
            </span>
            <BlurText
              text="AURA"
              delay={150}
              animateBy="letters"
              direction="bottom"
              className="font-display text-[clamp(5rem,18vw,14rem)] font-extrabold uppercase leading-[0.82] text-white select-none"
            />
            <div className="mt-2">
              <ShinyText
                text="SODA CO."
                disabled={false}
                speed={3}
                className="font-display text-[clamp(1.2rem,4vw,3rem)] font-extrabold uppercase tracking-[0.15em]"
                shineColor={theme.accentColor}
                color="rgba(255,255,255,0.4)"
              />
            </div>
          </div>

          <p data-footer-reveal className="text-sm text-white/50 font-sans max-w-sm leading-relaxed">
            The next evolution in functional hydration. Move your cursor across to reveal the matrix.
          </p>
        </div>

        {/* ─── Navigation Grid ─── */}
        <div data-footer-reveal className="px-6 md:px-16 max-w-7xl mx-auto w-full py-12 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">

            {/* Col 1: Pages */}
            <div className="space-y-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/40 block pb-2 border-b border-white/10">
                Navigate
              </span>
              <nav className="space-y-3">
                {[
                  { label: "Home", href: "/", num: "01" },
                  { label: "Products", href: "/products", num: "02" },
                  { label: "Contact", href: "/contact", num: "03" },
                ].map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="group flex items-center gap-4 text-white/70 hover:text-white transition-colors duration-300"
                  >
                    <span className="font-mono text-[9px] text-white/30 group-hover:text-white/60 transition-colors">
                      {l.num}
                    </span>
                    <span className="font-display text-xl font-bold uppercase tracking-wide group-hover:translate-x-1 transition-transform duration-300">
                      {l.label}
                    </span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Col 2: Flavors */}
            <div className="space-y-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/40 block pb-2 border-b border-white/10">
                Flavors
              </span>
              <div className="space-y-3">
                {[
                  { name: "Classic Original", color: "#06D6A0" },
                  { name: "Diet Kinetic", color: "#4CC9F0" },
                  { name: "Cool Cosmic", color: "#FF8A00" },
                ].map((f) => (
                  <Link
                    key={f.name}
                    href="/products"
                    className="flex items-center gap-3 group"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: f.color }}
                    />
                    <span
                      className="font-mono text-xs uppercase tracking-[0.15em] transition-colors duration-300 group-hover:text-white"
                      style={{ color: `${f.color}cc` }}
                    >
                      {f.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Col 3: Email Signup */}
            <div className="space-y-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/40 block pb-2 border-b border-white/10">
                Frequency Transmission
              </span>
              {sent ? (
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: theme.accentColor }} />
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-white">
                    Signal received.
                  </span>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (email) setSent(true);
                  }}
                  className="space-y-3"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@frequency.com"
                    className="w-full bg-transparent border-b border-white/20 hover:border-white/40 focus:border-white py-2 text-sm text-white placeholder-white/30 focus:outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] transition-colors duration-300"
                    style={{ color: theme.accentColor }}
                  >
                    <span>Subscribe</span>
                    <span>&rarr;</span>
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

        {/* ─── Bottom Legal Bar ─── */}
        <div className="px-6 md:px-16 py-6 border-t border-white/10 bg-black/40 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
              &copy; {new Date().getFullYear()} AURA SODA CO. — Zero Synthetic Additives. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              {[
                { label: "Twitter", href: "https://twitter.com" },
                { label: "Instagram", href: "https://instagram.com" },
                { label: "LinkedIn", href: "https://linkedin.com" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30 hover:text-white transition-colors"
                >
                  {s.label}
                </a>
              ))}
              <span
                className="w-1.5 h-1.5 rounded-full animate-ping"
                style={{ backgroundColor: theme.accentColor }}
              />
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
