"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLetterReveal, useWordReveal } from "@/hooks/useKineticText";
import Magnetic from "@/components/Magnetic";

gsap.registerPlugin(ScrollTrigger);

// Floating ingredients for mouse-move 3D parallax
const floatingIngredients = [
  { emoji: "🥬", speed: 0.06, size: "text-4xl sm:text-5xl", top: "12%", left: "15%", rotate: -15 },
  { emoji: "🥒", speed: -0.08, size: "text-3xl sm:text-4xl", top: "25%", left: "80%", rotate: 25 },
  { emoji: "🧀", speed: 0.04, size: "text-4xl sm:text-5xl", top: "68%", left: "8%", rotate: 12 },
  { emoji: "🧅", speed: -0.05, size: "text-3xl sm:text-4xl", top: "72%", left: "78%", rotate: -20 },
  { emoji: "✨", speed: 0.09, size: "text-2xl sm:text-3xl", top: "18%", left: "55%", rotate: 0 },
  { emoji: "★", speed: -0.07, size: "text-2xl sm:text-3xl", top: "52%", left: "88%", rotate: 45 },
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const emojiRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const burgerContainerRef = useRef<HTMLDivElement>(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; rotate: number; scale: number; color: string; char: string }[]>([]);

  // Track mouse coordinates for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2);
      const y = (e.clientY - window.innerHeight / 2);
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const kineticRef = useLetterReveal("EVERY BITE", { delay: 0.3, stagger: 0.02 });
  const tellsARef = useLetterReveal("TELLS A", { delay: 0.7, stagger: 0.02 });
  const scriptRef = useWordReveal("story", { delay: 1.2, stagger: 0.1 });

  // Scroll Trigger Parallax for elements
  useEffect(() => {
    if (!heroRef.current || !titleRef.current || !contentRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(titleRef.current, {
        y: -100,
        opacity: 0.1,
        scale: 0.95,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      if (burgerContainerRef.current) {
        gsap.to(burgerContainerRef.current, {
          y: -150,
          rotate: -5,
          opacity: 0.35,
          scale: 0.9,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.1,
          },
        });
      }

      gsap.to(contentRef.current, {
        y: -50,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "50% top",
          scrub: 0.8,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Smash Interaction
  const handleSmash = () => {
    // 1. Screen Shake effect on the entire Hero section container
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { x: -6 },
        {
          x: 6,
          duration: 0.04,
          repeat: 7,
          yoyo: true,
          ease: "sine.inOut",
          onComplete: () => gsap.set(heroRef.current, { x: 0 }),
        }
      );
    }

    // 2. Squash and stretch animation on the burger container
    if (burgerContainerRef.current) {
      gsap.timeline()
        .to(burgerContainerRef.current, { scaleX: 1.22, scaleY: 0.78, duration: 0.12, ease: "power2.out" })
        .to(burgerContainerRef.current, { scaleX: 0.85, scaleY: 1.18, duration: 0.12, ease: "power2.inOut" })
        .to(burgerContainerRef.current, { scaleX: 1.05, scaleY: 0.95, duration: 0.12, ease: "power2.inOut" })
        .to(burgerContainerRef.current, { scaleX: 1, scaleY: 1, duration: 0.25, ease: "elastic.out(1, 0.45)" });
    }

    // 3. Spawn a burst of comic book styled sparks/stars
    const colors = ["#FFC800", "#FFE066", "#E63946", "#FAF6F0"];
    const symbols = ["★", "💥", "✨", "🔥"];
    const newParticles = Array.from({ length: 18 }).map((_, i) => ({
      id: Date.now() + i,
      x: 0,
      y: 0,
      rotate: Math.random() * 360,
      scale: Math.random() * 0.7 + 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      char: symbols[Math.floor(Math.random() * symbols.length)],
    }));

    setParticles(newParticles);

    // Animate the spawned particles exploding outwards
    setTimeout(() => {
      newParticles.forEach((p, idx) => {
        const angle = (idx / 18) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
        const distance = Math.random() * 200 + 130;
        const targetX = Math.cos(angle) * distance;
        const targetY = Math.sin(angle) * distance;

        gsap.to(`#spark-${p.id}`, {
          x: targetX,
          y: targetY,
          opacity: 0,
          scale: 0,
          rotation: p.rotate + 240,
          duration: 0.85,
          ease: "power4.out",
        });
      });
    }, 15);
  };

  const handleExploreMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.triggerScreenTransition) {
      window.triggerScreenTransition(() => {
        const menuSection = document.getElementById("menu");
        if (menuSection) {
          menuSection.scrollIntoView({ behavior: "auto" });
        }
      });
    } else {
      const menuSection = document.getElementById("menu");
      if (menuSection) {
        menuSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleOrderNow = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.triggerScreenTransition) {
      window.triggerScreenTransition(() => {
        window.open("https://smashguys.in/order", "_blank", "noopener,noreferrer");
      });
    } else {
      window.open("https://smashguys.in/order", "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden dark-grid-bg text-brand-cream border-b-4 border-black"
    >
      {/* Background vignette & ambient griddle heat glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-brand-black/90 z-0" />
      <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-brand-yellow/10 blur-[120px] pointer-events-none z-0" />
      
      {/* 3D Parallax Floating Ingredients */}
      <div className="absolute inset-0 pointer-events-none z-10 w-full h-full">
        {floatingIngredients.map((item, idx) => {
          const shiftX = mousePos.x * item.speed;
          const shiftY = mousePos.y * item.speed;
          return (
            <div
              key={idx}
              className={`absolute ${item.size} select-none opacity-40 filter drop-shadow-[2px_2px_0px_rgba(0,0,0,0.5)]`}
              style={{
                top: item.top,
                left: item.left,
                transform: `translate(${shiftX}px, ${shiftY}px) rotate(${item.rotate}deg)`,
                transition: "transform 0.15s ease-out",
              }}
            >
              {item.emoji}
            </div>
          );
        })}
      </div>

      <div
        ref={contentRef}
        className="relative z-20 w-full max-w-7xl mx-auto px-6 pt-32 pb-40 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center"
      >
        {/* Left Side: Typography & CTAs */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="overflow-hidden mb-6">
            <div className="flex items-center gap-2 translate-y-full opacity-0 animate-[revealUp_0.8s_0.2s_forwards]">
              <span className="text-brand-yellow text-xs">★</span>
              <p
                className="text-xs md:text-sm uppercase tracking-[0.35em] text-brand-yellow-light"
                style={{ fontFamily: "var(--font-display)" }}
              >
                BANGALORE&apos;S PREMIER BURGER HOUSE
              </p>
              <span className="text-brand-yellow text-xs">★</span>
            </div>
          </div>

          <h1
            ref={titleRef}
            className="text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9] mb-12 select-none"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span ref={kineticRef} className="block tracking-tight text-white">
              EVERY BITE
            </span>
            <span ref={tellsARef} className="block text-brand-yellow tracking-tight mt-1">
              TELLS A
            </span>
            <span
              ref={scriptRef}
              className="block font-script text-brand-yellow-light normal-case mt-2 tracking-wide rotate-[-1deg] origin-left"
            >
              story
            </span>
          </h1>

          <div className="flex flex-wrap items-center gap-6 translate-y-full opacity-0 animate-[revealUp_0.8s_1.4s_forwards]">
            <Magnetic strength={0.25}>
              <button
                onClick={handleExploreMenu}
                className="rounded-full bg-brand-yellow border-4 border-black px-10 py-5 text-sm font-bold uppercase tracking-widest text-brand-black transition-all duration-300 hover:bg-brand-yellow-light shadow-[6px_6px_0px_#000] hover:shadow-[8px_8px_0px_#000] active:translate-y-1 active:shadow-[2px_2px_0px_#000] inline-block cursor-pointer"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Explore Menu
              </button>
            </Magnetic>
            <Magnetic strength={0.25}>
              <button
                onClick={handleOrderNow}
                className="rounded-full bg-white border-4 border-black px-10 py-5 text-sm font-bold uppercase tracking-widest text-brand-black transition-all duration-300 hover:bg-brand-cream shadow-[6px_6px_0px_#000] hover:shadow-[8px_8px_0px_#000] active:translate-y-1 active:shadow-[2px_2px_0px_#000] inline-block cursor-pointer"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Order Now
              </button>
            </Magnetic>
          </div>
        </div>

        {/* Right Side: Massive Interactive Burger Frame */}
        <div className="lg:col-span-5 relative flex items-center justify-center min-h-[450px]">
          {/* Glowing back-ring */}
          <div className="absolute w-[360px] h-[360px] sm:w-[440px] sm:h-[440px] rounded-full border-4 border-dashed border-brand-yellow/15 animate-spin-slow pointer-events-none" />

          {/* Interactive particles container */}
          <div className="absolute inset-0 pointer-events-none z-30">
            {particles.map((p) => (
              <div
                key={p.id}
                id={`spark-${p.id}`}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold z-30"
                style={{
                  color: p.color,
                  transform: `translate(0px, 0px) rotate(${p.rotate}deg) scale(${p.scale})`,
                }}
              >
                {p.char}
              </div>
            ))}
          </div>

          {/* The Hero Burger Card Container */}
          <div
            ref={burgerContainerRef}
            onClick={handleSmash}
            className="relative w-[340px] h-[340px] sm:w-[400px] sm:h-[400px] rounded-full border-[8px] border-black bg-brand-cream overflow-hidden shadow-[16px_16px_0px_#000] rotate-3 hover:rotate-0 transition-all duration-300 cursor-pointer group z-20"
          >
            {/* Inner radial gradient shine */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,200,0,0.15)_0%,transparent_70%)] pointer-events-none" />

            <img
              src="/hero-burger.png"
              alt="Smash Guys Signature Burger"
              className="w-full h-full object-cover select-none pointer-events-none scale-110 transition-transform duration-100 ease-out"
              style={{
                transform: `translate(${mousePos.x * 0.05}px, ${mousePos.y * 0.05}px)`,
              }}
            />

            {/* Hover overlay sticker */}
            <div className="absolute inset-0 bg-brand-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span
                className="bg-brand-yellow border-4 border-black text-brand-black px-6 py-2 text-md font-bold uppercase tracking-widest rotate-[-6deg] shadow-[4px_4px_0px_#000] select-none"
                style={{ fontFamily: "var(--font-display)" }}
              >
                CLICK TO SMASH
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Cinematic scrolling marquee */}
      <div className="absolute bottom-16 left-0 right-0 z-10 overflow-hidden border-y-4 border-black py-4 bg-brand-yellow select-none">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(2)].map((_, i) => (
            <span
              key={i}
              className="flex items-center gap-12 text-sm uppercase tracking-[0.25em] text-brand-black font-extrabold mx-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span>★ CRITICAL CRUST</span>
              <span>★ SMASHED HOT</span>
              <span>★ DOUBLE PATTY OBSESSION</span>
              <span>★ BANGALORE&apos;S BEST</span>
              <span>★ PURE BEEF ARTISANS</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
