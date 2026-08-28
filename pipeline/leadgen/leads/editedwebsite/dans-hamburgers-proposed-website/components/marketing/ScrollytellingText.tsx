"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useAnimation } from "framer-motion";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

function InteractiveWord({ text, className = "" }: { text: string; className?: string }) {
  const [hoveredChar, setHoveredChar] = useState<number | null>(null);
  return (
    <span className={`inline-flex flex-wrap justify-center ${className}`}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          onMouseEnter={() => setHoveredChar(i)}
          onMouseLeave={() => setHoveredChar(null)}
          animate={{
            y: hoveredChar === i ? -10 : 0,
            color: hoveredChar === i ? "#C42B1C" : "",
            scale: hoveredChar === i ? 1.15 : 1,
          }}
          transition={{ type: "spring", stiffness: 350, damping: 15 }}
          className="inline-block cursor-default select-none transition-colors duration-150"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

export default function ScrollytellingText() {
  const sectionRef = useRef<HTMLElement>(null);
  const word1Ref = useRef<HTMLHeadingElement>(null);
  const word2Ref = useRef<HTMLHeadingElement>(null);
  const word3Ref = useRef<HTMLHeadingElement>(null);

  const controls = useAnimation();
  const [isPressing, setIsPressing] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      // Word 1
      gsap.fromTo(word1Ref.current,
        { letterSpacing: "0.5em", opacity: 0.05, scale: 0.92 },
        {
          letterSpacing: "0.01em",
          opacity: 1,
          scale: 1,
          scrollTrigger: {
            trigger: word1Ref.current,
            start: "top 80%",
            end: "top 40%",
            scrub: 1,
          },
        }
      );

      // Word 2
      gsap.fromTo(word2Ref.current,
        { skewX: -20, x: -120, opacity: 0 },
        {
          skewX: 0,
          x: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: word2Ref.current,
            start: "top 85%",
            end: "top 45%",
            scrub: 1.2,
          },
        }
      );

      // Word 3: color shift from charcoal to Dan's red
      gsap.fromTo(word3Ref.current,
        { y: 80, opacity: 0, color: "#181514" },
        {
          y: 0,
          opacity: 1,
          color: "#C42B1C",
          scrollTrigger: {
            trigger: word3Ref.current,
            start: "top 90%",
            end: "top 50%",
            scrub: 1.5,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handlePressStart = () => {
    setIsPressing(true);
    controls.start({
      scaleY: 0.28,
      scaleX: 1.35,
      y: 35,
      transition: { duration: 3.0, ease: "easeInOut" }
    });
  };

  const handlePressEnd = () => {
    setIsPressing(false);
    controls.start({
      scaleY: [0.28, 1.45, 0.75, 1.2, 0.9, 1.05, 1.0],
      scaleX: [1.35, 0.65, 1.2, 0.85, 1.08, 0.96, 1.0],
      y: 0,
      transition: { 
        duration: 1.2, 
        ease: "easeOut",
        times: [0, 0.2, 0.4, 0.6, 0.8, 0.95, 1]
      }
    });
  };

  return (
    <section
      ref={sectionRef}
      className="py-32 md:py-48 bg-bone border-y border-bone-dark overflow-hidden relative select-none"
    >
      <div className="max-w-[88rem] mx-auto px-6 lg:px-8">
        <div className="space-y-20 md:space-y-32">

          {/* Statement 1 */}
          <div className="text-center">
            <p className="type-caption text-ember mb-5">Click &amp; Hold to Press Fresh Angus</p>
            <motion.h2
              ref={word1Ref}
              animate={controls}
              onMouseDown={handlePressStart}
              onMouseUp={handlePressEnd}
              onMouseLeave={() => isPressing && handlePressEnd()}
              onTouchStart={handlePressStart}
              onTouchEnd={handlePressEnd}
              className="type-display text-6xl sm:text-8xl lg:text-[10rem] xl:text-[12rem] leading-[0.88] uppercase text-char cursor-pointer select-none origin-bottom"
            >
              <InteractiveWord text="MADE TO ORDER" />
            </motion.h2>
          </div>

          {/* Statement 2 */}
          <div className="max-w-6xl mx-auto text-left pl-4 sm:pl-0">
            <p className="type-caption text-smoke mb-5">Famous $50 Onion Ring Recipe</p>
            <h2
              ref={word2Ref}
              className="type-serif text-4xl sm:text-6xl lg:text-7xl xl:text-8xl italic text-char leading-[1.1] hover:text-ember transition-colors duration-500 cursor-default"
            >
              Real hand-breaded rings &amp; Angus chuck.<br className="hidden md:block" />
              Austin&apos;s staple since 1973.
            </h2>
          </div>

          {/* Statement 3 */}
          <div className="text-center">
            <p className="type-caption text-smoke mb-5">Over 50 Years of Austin Love</p>
            <h2
              ref={word3Ref}
              className="type-display text-6xl sm:text-8xl lg:text-[10rem] xl:text-[12rem] leading-[0.88] uppercase"
            >
              <InteractiveWord text="PURE AUSTIN" />
            </h2>
          </div>

        </div>
      </div>
    </section>
  );
}
