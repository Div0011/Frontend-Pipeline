"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import NavigationBar from "@/components/ui/NavigationBar";
import Footer from "@/components/sections/Footer";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".about-line", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 30,
        stagger: 0.05,
        ease: "expo.out",
        duration: 0.6,
      });

      gsap.from(".about-image", {
        scrollTrigger: {
          trigger: ".about-image-wrapper",
          start: "top 80%",
        },
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
        ease: "expo.out",
        duration: 1.2,
      });
    });

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div className="min-h-screen">
      <NavigationBar />

      <section ref={sectionRef} className="pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div>
              <h1 className="font-display text-display-lg tracking-tight mb-8">
                <span className="about-line block">We make clothes</span>
                <span className="about-line block">for people who have</span>
                <span className="about-line block text-amber">something to say.</span>
              </h1>
              <div className="space-y-6 font-body text-ink-muted">
                <p className="about-line">
                  Fabroar was born from a simple belief: what you wear is an extension of who you are. Every graphic, every print, every stitch is designed to amplify your voice.
                </p>
                <p className="about-line">
                  We work with pure cotton because comfort is non-negotiable. We design graphics that matter because fashion should say something. From our studio in India to your wardrobe, every tee is made to last.
                </p>
                <p className="about-line">
                  This is clothing for the curious, the bold, and the unapologetically authentic.
                </p>
              </div>
            </div>

            <div className="about-image-wrapper">
              <div className="about-image aspect-[3/4] bg-surface-2 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="font-display text-6xl text-amber/20">F</p>
                    <p className="font-ui text-sm text-ink-dim mt-2 tracking-widest uppercase">
                      Est. 2025
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="mt-24 md:mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/men" className="group">
              <div className="aspect-[4/5] bg-surface-2 relative overflow-hidden mb-4">
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-500" />
                <div className="absolute bottom-6 left-6">
                  <span className="font-display text-3xl text-ink group-hover:text-amber transition-colors duration-300">
                    Men
                  </span>
                  <p className="font-ui text-sm text-ink-muted mt-1">12 styles</p>
                </div>
              </div>
            </Link>
            <Link href="/women" className="group">
              <div className="aspect-[4/5] bg-surface-2 relative overflow-hidden mb-4">
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-500" />
                <div className="absolute bottom-6 left-6">
                  <span className="font-display text-3xl text-ink group-hover:text-amber transition-colors duration-300">
                    Women
                  </span>
                  <p className="font-ui text-sm text-ink-muted mt-1">10 styles</p>
                </div>
              </div>
            </Link>
            <Link href="/customize" className="group">
              <div className="aspect-[4/5] bg-surface-2 relative overflow-hidden mb-4">
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-500" />
                <div className="absolute bottom-6 left-6">
                  <span className="font-display text-3xl text-ink group-hover:text-amber transition-colors duration-300">
                    Custom
                  </span>
                  <p className="font-ui text-sm text-ink-muted mt-1">Your design</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Contact Info */}
          <div className="mt-24 md:mt-32 text-center">
            <h2 className="font-display text-display-md tracking-tight mb-4">
              Get in touch
            </h2>
            <p className="font-body text-ink-muted mb-8">
              info@fabroar.com
            </p>
            <p className="font-ui text-sm text-ink-muted">
              Call us: +91 9695106107
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
