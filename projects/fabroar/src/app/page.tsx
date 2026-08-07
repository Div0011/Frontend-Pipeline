"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, PenLine } from "lucide-react";
import { getFeaturedProducts, getProductsByCategory } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";
import NavigationBar from "@/components/ui/NavigationBar";
import Footer from "@/components/sections/Footer";
import DoodleBackground from "@/components/ui/DoodleBackground";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   Marquee Row Component
───────────────────────────────────────────── */
function MarqueeRow({
  items,
  direction = "ltr",
  className = "",
}: {
  items: string[];
  direction?: "ltr" | "rtl";
  className?: string;
}) {
  const doubled = [...items, ...items];
  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className={direction === "ltr" ? "marquee-track-ltr" : "marquee-track-rtl"}
        style={{ gap: "3rem" }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-display text-display-lg whitespace-nowrap leading-none select-none"
          >
            {item}
            <span className="text-amber mx-6">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Ambient Orb Component
───────────────────────────────────────────── */
function AmbientOrb({
  color,
  size,
  style,
}: {
  color: string;
  size: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className="ambient-orb absolute"
      style={{
        width: size,
        height: size,
        background: color,
        ...style,
      }}
    />
  );
}

/* ─────────────────────────────────────────────
   Stats Row
───────────────────────────────────────────── */
function StatsRow() {
  const stats = [
    { number: "2K+", label: "Happy customers" },
    { number: "100%", label: "Pure cotton" },
    { number: "48h", label: "Dispatch time" },
    { number: "∞", label: "Design possibilities" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 py-6 md:py-8 border-y"
      style={{ borderColor: "rgba(255,255,255,0.08)" }}
    >
      {stats.map((s, i) => (
        <div key={i} className="text-center stat-item p-2">
          <div className="stat-number text-shimmer">{s.number}</div>
          <p className="font-ui text-[11px] sm:text-xs tracking-widest uppercase mt-1.5"
            style={{ color: "rgba(240,237,232,0.7)" }}>
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Page
───────────────────────────────────────────── */
export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const featuredRef = useRef<HTMLElement>(null);
  const transitionRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLElement>(null);
  const filmReelRef = useRef<HTMLElement>(null);
  const categoriesRef = useRef<HTMLElement>(null);
  const newsletterRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const featured = getFeaturedProducts(6);
  const menProducts = getProductsByCategory("men");
  const womenProducts = getProductsByCategory("women");
  const filmReelProducts = [...menProducts.slice(0, 4), ...womenProducts.slice(0, 4)];

  const marqueeWords = ["FABROAR", "WEAR YOUR STORY", "GRAPHIC TEES", "PURE COTTON", "CUSTOM STUDIO"];

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {

      /* ── Hero: letter by letter reveal ── */
      const heroTl = gsap.timeline({ delay: 0.2 });
      heroTl
        .from(".hero-letter-inner", {
          opacity: 0,
          y: "115%",
          stagger: 0.04,
          ease: "power4.out",
          duration: 1.2,
        })
        .from(".hero-cta", { opacity: 0, y: 24, ease: "power3.out", duration: 0.8 }, "-=0.7");

      /* ── Featured products stagger reveal ── */
      gsap.from(".featured-card", {
        scrollTrigger: {
          trigger: featuredRef.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 50,
        stagger: 0.08,
        ease: "power3.out",
        duration: 0.9,
      });

      /* ── Transition gradient: hero → dark ── */
      if (transitionRef.current) {
        gsap.fromTo(
          transitionRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: transitionRef.current,
              start: "top 90%",
              end: "bottom 20%",
              scrub: 0.5,
            },
          }
        );
      }

      /* ── Quote reveal word by word ── */
      const quoteWords = document.querySelectorAll(".quote-word");
      if (quoteWords.length) {
        gsap.fromTo(
          quoteWords,
          { opacity: 0.1, y: 24 },
          {
            scrollTrigger: {
              trigger: quoteRef.current,
              start: "top 78%",
              end: "center 45%",
              scrub: 0.5,
            },
            opacity: 1,
            y: 0,
            stagger: 0.05,
            ease: "power3.out",
          }
        );
      }

      /* ── Stats counter stagger ── */
      gsap.from(".stat-item", {
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 85%",
        },
        opacity: 0,
        y: 25,
        stagger: 0.08,
        ease: "power3.out",
        duration: 0.8,
      });

      /* ── Film reel: pinned horizontal scroll ── */
      if (filmReelRef.current) {
        const reelTrack = filmReelRef.current.querySelector(".reel-track");
        if (reelTrack) {
          gsap.to(reelTrack, {
            x: () => -(reelTrack.scrollWidth - window.innerWidth + 60),
            ease: "none",
            scrollTrigger: {
              trigger: filmReelRef.current,
              start: "top top",
              end: () => `+=${reelTrack.scrollWidth}`,
              scrub: 0.8,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
        }
      }

      /* ── Categories reveal ── */
      gsap.from(".category-link", {
        scrollTrigger: {
          trigger: categoriesRef.current,
          start: "top 82%",
        },
        opacity: 0,
        y: 35,
        stagger: 0.1,
        ease: "power3.out",
        duration: 0.8,
      });

      /* ── Newsletter reveal ── */
      gsap.from(".newsletter-content", {
        scrollTrigger: {
          trigger: newsletterRef.current,
          start: "top 85%",
        },
        opacity: 0,
        y: 25,
        ease: "power3.out",
        duration: 0.8,
      });

    });

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div className="relative min-h-screen overflow-x-hidden selection:bg-[#D4654A] selection:text-[#0F0F0F]">
      <NavigationBar />

      {/* ══════════════════════════════════════
          HERO — Warm Charcoal, Aged Cotton White wordmark
      ══════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="section-hero relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 overflow-hidden"
      >
        {/* Main content */}
        <div className="text-center w-full max-w-6xl relative z-10 px-2">
          {/* Giant wordmark */}
          <h1
            className="font-display leading-none tracking-tight mb-8 sm:mb-10 relative z-10 text-[var(--color-ink)] whitespace-nowrap select-none max-w-full overflow-visible drop-shadow-md"
            style={{ fontSize: "clamp(2.4rem, 15.2vw, 18rem)", letterSpacing: "-0.04em" }}
            data-text="FABROAR"
          >
            {"FABROAR".split("").map((letter, i) => (
              <span key={i} className="hero-letter-wrap inline-block">
                <span className="hero-letter-inner inline-block text-[var(--color-ink)]">{letter}</span>
              </span>
            ))}
          </h1>

          <div className="hero-cta flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-4 max-w-full px-2 relative z-10">
            <Link
              href="/men"
              className="group inline-flex items-center justify-center gap-3 px-6 py-4 sm:px-10 sm:py-5 bg-[#D4654A] text-[#F5F0E8] font-ui text-xs sm:text-sm font-bold tracking-[0.18em] uppercase hover:bg-[#E07A60] transition-all duration-500 relative overflow-hidden shadow-lg rounded-sm"
            >
              <span className="relative z-10 flex items-center gap-2.5">
                Explore Collection
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
            <Link
              href="/customize"
              className="group inline-flex items-center justify-center gap-3 px-6 py-4 sm:px-10 sm:py-5 border border-[#D4654A] text-[var(--color-ink)] font-ui text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase hover:bg-[#D4654A] hover:text-[#F5F0E8] transition-all duration-400 rounded-sm bg-[var(--color-surface)]/80 backdrop-blur-md shadow-md"
            >
              <PenLine size={16} />
              Design Your Own
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FEATURED PRODUCTS
      ══════════════════════════════════════ */}
      <section ref={featuredRef} className="section-featured py-10 md:py-14 relative z-10">
        <div className="container-custom">
          <div className="mb-8 md:mb-10 p-4 rounded-sm bg-[var(--color-surface)]/70 backdrop-blur-xs border border-transparent">
            <h2 className="font-display text-display-md tracking-tight mb-3 text-[var(--color-ink)]">
              Featured
            </h2>
            <p className="font-body text-[var(--color-sand)] max-w-md leading-relaxed text-sm sm:text-base">
              Pure cotton. Graphic prints. Designed to speak when words aren't enough.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featured.map((product) => (
              <div key={product.id} className="featured-card">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/men"
              className="inline-flex items-center gap-3 font-ui text-sm tracking-[0.2em] uppercase text-[#D4654A] hover:text-[#E07A60] transition-colors duration-300 group font-bold px-6 py-3 rounded bg-[var(--color-surface)]/80 backdrop-blur-xs border border-[#D4654A]/30"
            >
              View All Products
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TRANSITION: MARQUEE BAND
      ══════════════════════════════════════ */}
      <div
        ref={transitionRef}
        className="relative py-6 md:py-8 overflow-hidden z-10 bg-[var(--color-surface-2)] border-y border-[#D4654A]/20"
      >
        {/* Marquee band 1 */}
        <MarqueeRow
          items={marqueeWords}
          direction="ltr"
          className="text-[#D4654A] mb-2 font-semibold tracking-wider font-display uppercase"
        />
        <MarqueeRow
          items={["GRAPHIC", "PRINTED", "PURE COTTON", "ORIGINAL DESIGNS", "LIMITED DROPS"]}
          direction="rtl"
          className="text-[var(--color-sand)] font-semibold font-display uppercase"
        />
      </div>

      {/* ══════════════════════════════════════
          QUOTE — Warm Charcoal section
      ══════════════════════════════════════ */}
      <section
        ref={quoteRef}
        className="section-quote relative py-10 md:py-14 overflow-hidden text-[var(--color-ink)] z-10 bg-[var(--color-surface)]"
      >
        {/* Background radial highlight */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(212,101,74,0.15) 0%, transparent 100%)",
        }} />

        <div className="container-custom relative z-10 bg-[var(--color-surface-2)]/80 backdrop-blur-md p-6 sm:p-10 rounded-sm border border-[#D4654A]/20 shadow-xl">
          <div className="divider-glow mb-6" />
          <blockquote className="font-display leading-tight tracking-tight max-w-5xl whitespace-normal break-words"
            style={{ fontSize: "clamp(1.8rem, 4.8vw, 5.5rem)", letterSpacing: "-0.03em" }}
          >
            <span className="quote-word inline text-[var(--color-ink)]/40">Clothing</span>{" "}
            <span className="quote-word inline text-[var(--color-ink)]/40">is</span>{" "}
            <span className="quote-word inline text-[var(--color-ink)]/40">the</span>{" "}
            <span className="quote-word inline text-[#D4654A] font-bold underline underline-offset-8">canvas</span>{" "}
            <span className="quote-word inline text-[var(--color-ink)]/40">of</span>{" "}
            <span className="quote-word inline text-[var(--color-ink)]/40">identity.</span>
          </blockquote>
          <div className="divider-glow mt-6" />

          {/* Attribution */}
          <p className="font-ui text-xs tracking-[0.3em] uppercase mt-4 text-[var(--color-sand)]">
            — Fabroar Philosophy
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          STATS — Terracotta & Ochre
      ══════════════════════════════════════ */}
      <section className="section-filmreel py-0 relative z-10">
        <div className="container-custom" ref={statsRef}>
          <StatsRow />
        </div>
      </section>

      {/* ══════════════════════════════════════
          FILM REEL — New Arrivals
      ══════════════════════════════════════ */}
      <section
        ref={filmReelRef}
        className="section-filmreel pt-6 pb-6 md:pt-8 md:pb-8 overflow-hidden text-[var(--color-ink)] relative z-10 bg-[var(--color-surface)]"
        data-cursor-drag
      >
        <div className="container-custom mb-4">
          <span className="font-ui text-xs tracking-[0.3em] uppercase mb-1 block text-[var(--color-sand)]">
            Just dropped
          </span>
          <h2 className="font-display text-display-md tracking-tight mb-0 text-[var(--color-ink)]">
            New Arrivals
          </h2>
        </div>

        <div
          className="reel-track flex gap-6 px-4 md:px-12 will-change-transform relative z-10"
          style={{ cursor: "grab" }}
        >
          {filmReelProducts.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-[240px] sm:w-[260px] md:w-[290px] bg-[var(--color-surface-2)] border border-[#D4654A]/30 p-3 rounded-sm hover:border-[#D4654A] transition-all relative z-10 shadow-md"
            >
              <ProductCard product={product} dark />
            </div>
          ))}
        </div>

        {/* Drag hint */}
        <div className="container-custom mt-3">
          <p className="font-ui text-xs tracking-[0.25em] uppercase text-[var(--color-sand)]">
            ← Scroll to explore →
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CATEGORIES — Collections
      ══════════════════════════════════════ */}
      <section ref={categoriesRef} className="section-categories py-10 md:py-14 text-[var(--color-ink)] relative z-10 bg-[var(--color-surface)]">
        <div className="container-custom">
          <div className="mb-8">
            <span className="font-ui text-xs tracking-[0.3em] uppercase mb-2 block text-[var(--color-sand)]">
              Shop by category
            </span>
            <h2 className="font-display text-display-md tracking-tight text-[var(--color-ink)]">
              Collections
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { href: "/men", label: "Men", sub: "12 styles", image: "/images/men-black-1.webp", accent: false },
              { href: "/women", label: "Women", sub: "10 styles", image: "/images/women-graphic-1.webp", accent: true },
              { href: "/customize", label: "Custom", sub: "Your design", image: "/images/animal-1.webp", accent: false },
            ].map(({ href, label, sub, image }) => (
              <Link href={href} key={href} className="category-link group block relative z-10 overflow-hidden rounded-sm">
                {/* Background Card */}
                <div
                  className="aspect-[3/4] relative z-10 overflow-hidden bg-[var(--color-surface-2)]"
                  style={{
                    border: "1px solid rgba(212,101,74,0.3)",
                    transition: "border-color 400ms ease",
                  }}
                >
                  <Image
                    src={image}
                    alt={label}
                    fill
                    className="duotone object-cover object-center opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out z-0"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/40 transition-colors duration-500 z-10" />

                  {/* Hover scale line */}
                  <div className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full bg-[#D4654A] transition-all duration-500 ease-out z-20" />

                  {/* Text */}
                  <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 z-20">
                    <span className="font-display text-3xl sm:text-4xl md:text-5xl block mb-1.5 text-[#F5F0E8] font-bold transition-colors duration-400 drop-shadow-md">
                      {label}
                    </span>
                    <p className="font-ui text-xs tracking-[0.2em] uppercase text-[#C4A77D] drop-shadow">
                      {sub}
                    </p>
                  </div>

                  {/* Corner decoration */}
                  <div className="absolute top-6 right-6 z-20 opacity-70 group-hover:opacity-100 transition-opacity duration-400">
                    <ArrowRight size={22} className="text-[#D4654A]" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          MARQUEE SEPARATOR
      ══════════════════════════════════════ */}
      <div className="section-newsletter py-4 overflow-hidden bg-[var(--color-surface-2)] border-y border-[#D4654A]/20 relative z-10">
        <MarqueeRow
          items={["MEN", "WOMEN", "CUSTOM STUDIO", "PURE COTTON", "GRAPHIC PRINTS", "FABROAR"]}
          direction="ltr"
          className="text-[#D4654A] font-semibold tracking-wider font-display uppercase"
        />
      </div>

      {/* ══════════════════════════════════════
          NEWSLETTER
      ══════════════════════════════════════ */}
      <section ref={newsletterRef} className="section-newsletter py-10 md:py-14 text-[var(--color-ink)] relative z-10">
        <div className="container-custom max-w-2xl text-center newsletter-content relative z-10 bg-[var(--color-surface-2)]/90 backdrop-blur-md p-8 sm:p-12 border border-[#D4654A]/30 rounded-sm shadow-xl">
          {/* Terracotta dot */}
          <div className="w-2.5 h-2.5 rounded-full bg-[#D4654A] mx-auto mb-4 animate-pulse shadow-md" />

          <h2 className="font-display text-display-md tracking-tight mb-4 text-[var(--color-ink)]">
            Stay in the story
          </h2>
          <p className="font-body mb-6 leading-relaxed text-[var(--color-sand)] text-sm sm:text-base">
            Get early access to new collections and 10% off your first order.
          </p>

          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="your@email.com"
              required
              className="flex-1 px-6 py-4 font-body text-sm bg-[var(--color-surface)] border border-[#D4654A]/40 text-[var(--color-ink)] focus:outline-none focus:border-[#D4654A] transition-all duration-300 rounded-sm placeholder:text-[var(--color-sand)]/60"
            />
            <button
              type="submit"
              className="px-8 py-4 font-ui text-sm tracking-[0.2em] uppercase transition-all duration-500 relative overflow-hidden group rounded-sm bg-[#D4654A] text-[#F5F0E8] font-bold shadow-lg hover:bg-[#E07A60]"
            >
              <span className="relative z-10">Subscribe</span>
            </button>
          </form>

          <p className="font-ui text-[10px] tracking-[0.25em] uppercase mt-4 text-[var(--color-sand)]">
            No spam. Unsubscribe any time.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
