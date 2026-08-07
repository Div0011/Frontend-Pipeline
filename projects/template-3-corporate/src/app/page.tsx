"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Navigation from "@/components/sections/Navigation";
import Hero from "@/components/sections/Hero";
import ChapterTwo from "@/components/sections/ChapterTwo";
import ChapterThree from "@/components/sections/ChapterThree";
import ChapterFour from "@/components/sections/ChapterFour";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

const LenisProvider = dynamic(() => import("@/components/providers/LenisProvider"), { ssr: false });
const BackgroundScene = dynamic(() => import("@/components/three/BackgroundScene"), { ssr: false });
const Preloader = dynamic(() => import("@/components/sections/Preloader"), { ssr: false });

export default function Home() {
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ─── Custom Cursor ──────────────────────────────────
    const ring = cursorRingRef.current;
    const dot = cursorDotRef.current;
    if (!ring || !dot) return;

    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0,
      });
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleHover = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(
        "a, button, input, textarea, select, [data-cursor-hover]"
      );
      if (target) {
        ring.classList.add("hovering");
      } else {
        ring.classList.remove("hovering");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleHover);
    };
  }, []);

  return (
    <>
      {/* ─── Preloader ─────────────────────────────────── */}
      <Preloader />

      {/* ─── Film Grain Overlay ────────────────────────── */}
      <div className="film-grain" aria-hidden="true" />

      {/* ─── Cursor-Reveal Background ──────────────────── */}
      <BackgroundScene />

      {/* ─── Custom Cursor ─────────────────────────────── */}
      <div
        ref={cursorRingRef}
        className="cursor-ring"
        style={{ display: "none" }}
      />
      <div
        ref={cursorDotRef}
        className="cursor-dot"
        style={{ display: "none" }}
      />

      {/* ─── Main Content ──────────────────────────────── */}
      <LenisProvider>
        <Navigation />
        <main className="relative">
          <Hero />
          <ChapterTwo />
          <ChapterThree />
          <ChapterFour />
          <Contact />
          <Footer />
        </main>
      </LenisProvider>
    </>
  );
}

