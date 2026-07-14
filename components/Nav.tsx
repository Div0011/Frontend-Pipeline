"use client";

import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "@/components/Magnetic";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: "Menu", href: "#menu" },
  { label: "Locations", href: "#locations" },
  { label: "Order", href: "#order" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const brand = document.querySelector(".nav-brand");
      const letters = brand?.querySelectorAll(".nav-letter");
      if (letters && letters.length) {
        gsap.fromTo(
          letters,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.03,
            ease: "power3.out",
            scrollTrigger: {
              trigger: brand,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-brand-cream/85 backdrop-blur-md border-b border-brand-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 nav-brand">
          {"SMASHGUYS".split("").map((char, i) => (
            <span
              key={i}
              className="nav-letter text-2xl font-bold tracking-tight text-brand-black inline-block"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {char === "G" ? (
                <span className="text-brand-yellow-dark">{char}</span>
              ) : (
                char
              )}
            </span>
          ))}
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item, i) => (
            <Magnetic key={item.href} strength={0.15}>
              <a
                href={item.href}
                className="text-sm tracking-wide text-brand-text-muted hover:text-brand-black transition-colors duration-300 relative group"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <span className="inline-block">{item.label}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-yellow transition-all duration-300 group-hover:w-full" />
              </a>
            </Magnetic>
          ))}
        </nav>

        <Magnetic strength={0.2}>
          <a
            href="#order"
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-brand-yellow px-5 py-2.5 text-sm font-semibold text-brand-black transition-all duration-300 hover:bg-brand-yellow-light hover:shadow-[0_0_25px_rgba(255,200,0,0.35)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Order Now
          </a>
        </Magnetic>
      </div>
    </header>
  );
}
