"use client";

import React, { useEffect, useRef, Suspense, useState } from "react";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAdaptiveTheme } from "@/components/AdaptiveThemeProvider";
import { useSceneStore } from "@/stores/sceneStore";
import { PRODUCT_INFO, PRODUCT_SLUGS, ProductSlug } from "@/config/sceneConfig";
import ScrollReveal from "@/components/ScrollReveal";
import BlurText from "@/components/reactbits/BlurText";
import ShinyText from "@/components/reactbits/ShinyText";
import FullPageFooter from "@/components/FullPageFooter";
import SodaCan from "@/components/three/SodaCan";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─────────────── Error Boundary for 3D Canvases ─────────────── */
class CanvasErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: Error) { console.warn("3D canvas error:", error.message); }
  render() {
    if (this.state.hasError) return this.props.fallback ?? null;
    return this.props.children;
  }
}

/* ─────────────── Single Canvas per product (lazy-mounted) ─────────────── */
function ProductCan3D({ slug }: { slug: ProductSlug }) {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Lazy-mount the canvas only when scrolled into view
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setMounted(true); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full h-[500px] md:h-[700px] relative overflow-visible z-20 drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
      {mounted && (
        <CanvasErrorBoundary>
          <Canvas
            camera={{ position: [0, 0, 5.5], fov: 38 }}
            gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
            dpr={[1, 1.5]}
            className="w-full h-full"
          >
            <ambientLight intensity={1.8} />
            <hemisphereLight args={["#ffffff", "#221133", 1.5]} />
            <directionalLight position={[5, 8, 5]} intensity={2.8} />
            <directionalLight position={[-5, -4, -3]} intensity={1.5} color="#4CC9F0" />
            <spotLight position={[0, 10, 0]} intensity={3.5} angle={0.6} penumbra={1} />
            <pointLight position={[0, -2.5, 2]} intensity={1.0} color="#ffffff" />
            <Suspense fallback={null}>
              <SodaCan slug={slug} isIsolated={true} />
            </Suspense>
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={1.6}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={(Math.PI * 2) / 3}
            />
          </Canvas>
        </CanvasErrorBoundary>
      )}
    </div>
  );
}


/* ─────────────── Zig-Zag Product Row ─────────────── */
function ProductSpread({ slug, index }: { slug: ProductSlug; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const item = PRODUCT_INFO[slug];
  // Index 0: Can on Left, Content on Right
  // Index 1: Can on Right, Content on Left
  // Index 2: Can on Left, Content on Right
  const isCanOnRight = index % 2 === 1;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-spread-reveal]"),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
            end: "bottom 25%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center py-28 px-6 md:px-16 overflow-hidden"
    >
      {/* Background Giant Name (Behind the Can) */}
      <div className="absolute top-16 md:top-32 left-1/2 -translate-x-1/2 w-full flex justify-center z-0 pointer-events-none">
        <BlurText
          text={item.name}
          delay={80}
          animateBy="letters"
          direction="bottom"
          className="font-display text-[clamp(2rem,9vw,10rem)] font-extrabold uppercase leading-[0.8] text-white/40 tracking-widest whitespace-nowrap flex-nowrap drop-shadow-2xl"
        />
      </div>

      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between relative z-10">
        
        {/* If Can is on Left, render 3D model in first col */}
        {!isCanOnRight && (
          <div data-spread-reveal className="w-full md:w-[55%] relative z-20 order-1">
            <ProductCan3D slug={slug} />
          </div>
        )}

        {/* Product Content Column */}
        <div data-spread-reveal className={`w-full md:w-[55%] space-y-8 relative z-10 ${isCanOnRight ? "order-1 md:-mr-[10%]" : "order-2 md:-ml-[10%]"}`}>
          <div className="relative">
            <div className="mt-4">
              <ShinyText
                text={item.tagline}
                disabled={false}
                speed={3}
                className="font-mono text-sm uppercase tracking-[0.2em]"
                shineColor={item.accentColor}
                color="rgba(255,255,255,0.6)"
              />
            </div>
          </div>

          <ScrollReveal baseOpacity={0.15} enableBlur baseRotation={2} blurStrength={6}>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed font-sans font-light">
              {item.description}
            </p>
          </ScrollReveal>

          {/* Removed Tasting Matrix and Specs Grid for Minimalism */}

          {/* Order Action Buttons */}
          <div className="flex items-center gap-6 pt-2 relative z-30">
            <Link
              href="/contact"
              className="magnetic-button"
              style={{ borderColor: item.accentColor }}
            >
              Order 12-Pack &bull; {item.price}
            </Link>
            <Link
              href="/contact"
              className="font-mono text-xs uppercase tracking-[0.2em] text-white/60 hover:text-white underline underline-offset-4 transition-colors"
            >
              Request Sample &rarr;
            </Link>
          </div>
        </div>

        {/* If Can is on Right, render 3D model in second col */}
        {isCanOnRight && (
          <div data-spread-reveal className="w-full md:w-[55%] relative z-20 order-2">
            <ProductCan3D slug={slug} />
          </div>
        )}

      </div>
    </section>
  );
}

export default function ProductsPage() {
  const { theme } = useAdaptiveTheme();
  const setActiveSection = useSceneStore((s) => s.setActiveSection);

  useEffect(() => {
    setActiveSection("products");
  }, [setActiveSection]);

  return (
    <main className="relative min-h-screen text-[#f3f1ec] bg-transparent">
      {/* Hero Header */}
      <div className="relative min-h-[55vh] flex flex-col items-center justify-center pt-36 pb-20 px-6 text-center overflow-hidden">
        {/* Radial glow bloom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 70% 60% at 50% 40%, ${theme.glowColor} 0%, transparent 70%)`,
            opacity: 0.25,
          }}
        />

        {/* Top accent line removed */}

        <div className="relative z-10 max-w-4xl mx-auto space-y-5">
          {/* Pill badge removed for minimalism */}
          <BlurText
            text="The Collection"
            delay={100}
            animateBy="letters"
            direction="bottom"
            className="font-display text-[clamp(2.5rem,8vw,7.5rem)] font-extrabold uppercase leading-[0.85] text-white block tracking-wide whitespace-nowrap flex-nowrap"
          />
        </div>
      </div>

      {/* Zig-Zag 3D Product Spreads */}
      <div className="relative">
        {PRODUCT_SLUGS.map((slug, idx) => (
          <ProductSpread key={slug} slug={slug} index={idx} />
        ))}
      </div>

      {/* Same Full Page Footer */}
      <FullPageFooter />
    </main>
  );
}
