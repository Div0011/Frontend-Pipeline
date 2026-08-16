"use client";

import { useParams } from "next/navigation";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAdaptiveTheme } from "@/components/AdaptiveThemeProvider";
import Link from "next/link";
import { useProductFromSlug } from "@/hooks/useProductSelect";
import ProductModelViewer from "@/components/three/ProductModelViewer";

gsap.registerPlugin(ScrollTrigger);

const PRODUCTS: Record<
  string,
  {
    name: string;
    tagline: string;
    description: string;
    color: string;
    gradient: string;
    features: string[];
    details: { label: string; value: string }[];
  }
> = {
  classic: {
    name: "Classic Soda",
    tagline: "The Original. Timeless Refreshment.",
    description:
      "Born from a proprietary carbonation process and aerospace-grade materials. The classic that started it all — now reimagined for the future. Every can is a masterpiece of engineering, precision-crafted for the perfect pour.",
    color: "#06D6A0",
    gradient: "linear-gradient(135deg, #06D6A0 0%, #118AB2 50%, #073B4C 100%)",
    features: [
      "Proprietary carbonation technology",
      "Aerospace-grade aluminum can",
      "Zero artificial preservatives",
      "Sourced from pristine springs",
    ],
    details: [
      { label: "Volume", value: "12oz / 355ml" },
      { label: "Calories", value: "140 per can" },
      { label: "Carbonation", value: "2.5 volumes CO₂" },
      { label: "Shelf Life", value: "18 months" },
    ],
  },
  diet: {
    name: "Diet Soda",
    tagline: "Zero Sugar. Full Flavor.",
    description:
      "All the taste you crave, none of the compromise. Engineered with zero artificial sweeteners and a flavor profile that defies expectations. The future of refreshment, today.",
    color: "#4CC9F0",
    gradient: "linear-gradient(135deg, #4CC9F0 0%, #F72585 50%, #7209B7 100%)",
    features: [
      "Zero sugar formula",
      "Natural plant-based sweeteners",
      "Enhanced flavor molecular profile",
      "Vitamin B complex infusion",
    ],
    details: [
      { label: "Volume", value: "12oz / 355ml" },
      { label: "Calories", value: "0 per can" },
      { label: "Sweeteners", value: "100% Natural" },
      { label: "Shelf Life", value: "18 months" },
    ],
  },
  cool: {
    name: "Cool Ayyd",
    tagline: "Bold. Unapologetic.",
    description:
      "For those who dare to stand out. A bold fusion of citrus and stardust that pushes boundaries and redefines what a soda can be. Not for everyone. For the bold.",
    color: "#FF8A00",
    gradient: "linear-gradient(135deg, #FF8A00 0%, #9D4EDD 50%, #FF006E 100%)",
    features: [
      "Double citrus concentration",
      "Exotic fruit extracts",
      "Adaptogenic herb infusion",
      "Limited edition release",
    ],
    details: [
      { label: "Volume", value: "12oz / 355ml" },
      { label: "Calories", value: "90 per can" },
      { label: "Citrus Level", value: "2x Standard" },
      { label: "Edition", value: "Limited Drop" },
    ],
  },
};

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = PRODUCTS[slug];
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useAdaptiveTheme();
  useProductFromSlug();

  const slugTyped = slug as "classic" | "diet" | "cool";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-reveal]"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 75%", toggleActions: "play none none none" },
        }
      );
    });
    return () => ctx.revert();
  }, [slug]);

  if (!product) {
    return (
      <main className="relative min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-6xl mb-4">Product Not Found</h1>
          <Link href="/products" className="font-mono text-sm text-white/50 hover:text-white">
            Back to Collection
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-[#050506] text-white font-sans overflow-x-hidden">
      <div ref={ref} className="relative z-10">
        <section className="relative min-h-screen flex items-center px-6 md:px-12">
          <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <span
                data-reveal
                className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] block mb-6"
                style={{ color: product.color }}
              >
                {product.name}
              </span>
              <h1
                data-reveal
                className="font-display text-[clamp(3rem,8vw,7rem)] font-normal uppercase leading-[0.8] tracking-tight mb-6"
                style={{
                  backgroundImage: product.gradient,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {product.name.split(" ")[0]}
              </h1>
              <p data-reveal className="text-base md:text-lg text-white/60 leading-relaxed max-w-lg mb-8">
                {product.tagline}
              </p>
              <p data-reveal className="text-sm text-white/50 leading-relaxed max-w-md">
                {product.description}
              </p>
            </div>
            <div className="order-1 lg:order-2 flex justify-center">
              <ProductModelViewer slug={slugTyped} />
            </div>
          </div>
        </section>

        <section className="relative z-10 py-24 px-6 md:px-12 border-t border-white/10">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <span data-reveal className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] mb-6 block" style={{ color: product.color }}>
                Specifications
              </span>
              <h2
                data-reveal
                className="font-display text-[clamp(2rem,5vw,3.5rem)] font-normal uppercase leading-[0.9] tracking-tight mb-8 text-white"
              >
                Engineered Details
              </h2>
              <div data-reveal className="grid grid-cols-2 gap-4">
                {product.details.map((detail) => (
                  <div
                    key={detail.label}
                    className="p-6 rounded-2xl border border-white/10 transition-all duration-500 hover:border-white/20"
                  >
                    <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40 mb-2">
                      {detail.label}
                    </div>
                    <div className="font-display text-xl text-white/90">{detail.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <span data-reveal className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] mb-6 block" style={{ color: product.color }}>
                Features
              </span>
              {product.features.map((feature, i) => (
                <div
                  key={feature}
                  data-reveal
                  className="p-6 rounded-2xl border border-white/10 flex items-start gap-4 transition-all duration-500 hover:border-white/20"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-500"
                    style={{ background: `${product.color}15`, border: `1px solid ${product.color}30` }}
                  >
                    <span className="font-mono text-[10px] font-bold" style={{ color: product.color }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm md:text-base text-white/70 leading-relaxed">{feature}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 py-24 px-6 md:px-12 border-t border-white/10">
          <div className="max-w-3xl mx-auto text-center">
            <h2
              data-reveal
              className="font-display text-[clamp(2.5rem,7vw,5rem)] font-normal uppercase leading-[0.9] tracking-tight mb-8 text-white"
            >
              Experience {product.name.split(" ")[0]}
            </h2>
            <p data-reveal className="text-base md:text-lg text-white/50 leading-relaxed max-w-xl mx-auto mb-12">
              Available now in select cities. Taste the future.
            </p>
            <div data-reveal className="flex items-center justify-center gap-4">
              <Link
                href="/products"
                className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/70 hover:text-white transition-colors border border-white/10 px-8 py-4 rounded-full hover:border-white/25"
              >
                All Products
              </Link>
              <Link
                href="/"
                className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/70 hover:text-white transition-colors border border-white/10 px-8 py-4 rounded-full hover:border-white/25"
              >
                Back Home
              </Link>
            </div>
          </div>
        </section>

        <footer className="border-t border-white/10 bg-black/80 backdrop-blur-2xl py-12 px-6 md:px-12">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span
                className="font-display text-xl font-extrabold uppercase tracking-[0.25em] text-transparent bg-clip-text"
                style={{ backgroundImage: theme.gradient }}
              >
                AURA SODA CO.
              </span>
              <span className="font-mono text-[9px] text-white/40 uppercase tracking-[0.2em]">
                // All Systems Zero-G
              </span>
            </div>

            <div className="flex items-center gap-8 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/products" className="hover:text-white transition-colors">
                Products
              </Link>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact
              </Link>
            </div>

            <div className="font-mono text-[9px] text-white/30 tracking-widest">
              © {new Date().getFullYear()} AURA BEVERAGE TECH.
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
