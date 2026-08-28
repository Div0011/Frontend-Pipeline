"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

interface IngredientLayer {
  id: string;
  name: string;
  desc: string;
  color: string;
  startPct: number;
  endPct: number;
  svg: React.ReactNode;
}

const INGREDIENTS: IngredientLayer[] = [
  {
    id: "crown",
    name: "TOASTED SESAME CROWN",
    desc: "Soft baker's bun toasted golden on a buttered griddle with yellow mustard & Dan's famous dressing.",
    color: "#E5A93C",
    startPct: 0.70,
    endPct: 0.85,
    svg: (
      <svg className="w-48 h-24 sm:w-56 sm:h-28 drop-shadow-2xl" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 90C10 40 50 10 100 10C150 10 190 40 190 90H10Z" fill="#E5A93C" stroke="#181514" strokeWidth="4" />
        <ellipse cx="100" cy="90" rx="90" ry="8" fill="#D39223" stroke="#181514" strokeWidth="3" />
        <circle cx="50" cy="45" r="2.5" fill="#FAF7F0" />
        <circle cx="80" cy="30" r="2.5" fill="#FAF7F0" />
        <circle cx="105" cy="25" r="2.5" fill="#FAF7F0" />
        <circle cx="130" cy="35" r="2.5" fill="#FAF7F0" />
        <circle cx="160" cy="55" r="2.5" fill="#FAF7F0" />
      </svg>
    ),
  },
  {
    id: "pickles",
    name: "CRINKLE PICKLES & TEXAS ONIONS",
    desc: "Tart crinkle-cut dill pickles, sweet white onion slices, and fresh Texas jalapeños.",
    color: "#7BA84F",
    startPct: 0.58,
    endPct: 0.70,
    svg: (
      <div className="flex gap-3 sm:gap-4">
        <svg className="w-12 h-6 sm:w-16 sm:h-8 drop-shadow-md" viewBox="0 0 60 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="30" cy="15" rx="25" ry="12" fill="#7BA84F" stroke="#181514" strokeWidth="3" />
          <ellipse cx="30" cy="15" rx="15" ry="7" fill="#5F883B" />
        </svg>
        <svg className="w-12 h-6 sm:w-16 sm:h-8 drop-shadow-md" viewBox="0 0 60 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="30" cy="15" rx="25" ry="12" fill="#7BA84F" stroke="#181514" strokeWidth="3" />
          <ellipse cx="30" cy="15" rx="15" ry="7" fill="#5F883B" />
        </svg>
      </div>
    ),
  },
  {
    id: "cheese",
    name: "MELTED AMERICAN CHEDDAR",
    desc: "Thick slice of American cheddar melted directly over the steaming hot beef patty.",
    color: "#F5A623",
    startPct: 0.44,
    endPct: 0.58,
    svg: (
      <svg className="w-50 h-10 sm:w-58 sm:h-12 drop-shadow-lg" viewBox="0 0 210 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 10C25 5 185 5 205 10C205 10 190 28 170 28C150 28 135 15 105 35C75 15 60 28 40 28C20 28 5 10 5 10Z" fill="#F5A623" stroke="#181514" strokeWidth="3.5" />
      </svg>
    ),
  },
  {
    id: "patty",
    name: "100% CERTIFIED ANGUS CHUCK",
    desc: "Fresh, never-frozen Angus beef griddled made-to-order on hot seasoned cast iron.",
    color: "#4A271C",
    startPct: 0.20,
    endPct: 0.44,
    svg: (
      <svg className="w-52 h-14 sm:w-60 sm:h-16 drop-shadow-xl" viewBox="0 0 220 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 25C10 10 30 5 110 5C190 5 210 10 210 25C210 40 190 45 110 45C30 45 10 40 10 25Z" fill="#3D2016" stroke="#181514" strokeWidth="4" />
        <path d="M15 28C25 38 45 28 65 35C85 28 105 38 125 32C145 38 175 28 195 38" stroke="#F5A623" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "heel",
    name: "GRIDDLED HEEL BUN",
    desc: "Buttered bun bottom toasted until crisp enough to support the juiciest burger in Austin.",
    color: "#E5A93C",
    startPct: 0.0,
    endPct: 0.20,
    svg: (
      <svg className="w-48 h-10 sm:w-56 sm:h-12 drop-shadow-lg" viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 10C10 10 40 5 100 5C160 5 190 10 190 10V25C190 35 160 38 100 38C40 38 10 35 10 25V10Z" fill="#D39223" stroke="#181514" strokeWidth="4" />
        <ellipse cx="100" cy="10" rx="90" ry="6" fill="#E5A93C" stroke="#181514" strokeWidth="3" />
      </svg>
    ),
  },
];

export default function AtelierAssembly() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef  = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const section = sectionRef.current;
    if (!section) return;

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.2,
      onUpdate: (self) => {
        setProgress(self.progress);
      },
    });

    return () => st.kill();
  }, []);

  const activeIng = INGREDIENTS.find(
    (ing) => progress >= ing.startPct && progress <= ing.endPct
  ) || (progress > 0.85 ? INGREDIENTS[0] : INGREDIENTS[INGREDIENTS.length - 1]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-char"
      style={{ height: "250vh" }}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col lg:flex-row items-center justify-between px-6 lg:px-16 py-8 lg:py-12 gap-6 lg:gap-8 z-10"
      >
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#C42B1C_1px,transparent_1px),linear-gradient(to_bottom,#C42B1C_1px,transparent_1px)] [background-size:40px_40px] pointer-events-none" />

        {/* Left Side: Sourcing details */}
        <div className="w-full lg:w-[40%] space-y-4 lg:space-y-6 z-10 flex flex-col justify-center min-h-[160px] lg:min-h-[220px] text-center lg:text-left mt-8 lg:mt-0">
          <div>
            <span className="type-caption text-ember text-[8px] sm:text-[9px] tracking-widest block mb-1">
              THE 1973 BURGER ANATOMY
            </span>
            <h2 className="type-display text-3xl sm:text-5xl lg:text-6xl text-ink leading-none">
              DAN&apos;S SPECIAL<br className="hidden lg:block" /> STACK
            </h2>
          </div>

          <div className="border-l-2 lg:border-l-2 border-ember pl-4 lg:pl-5 py-1.5 space-y-1 lg:space-y-2 text-left mx-auto lg:mx-0 max-w-sm">
            <h3 className="type-display text-xl sm:text-2xl text-yolk">
              {activeIng.name}
            </h3>
            <p className="type-serif text-stone text-xs sm:text-base leading-relaxed">
              {activeIng.desc}
            </p>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-3 font-mono text-[8px] sm:text-[9px] text-smoke">
            <span className="text-ember font-bold">ASSEMBLING CLASSIC</span>
            <span className="h-3 w-px bg-char-mute" />
            <span>{Math.round(progress * 100)}% COMPLETED</span>
          </div>
        </div>

        {/* Center: Burger Visualizer */}
        <div className="w-full lg:w-[50%] h-[45vh] lg:h-full relative flex items-center justify-center z-10 mb-8 lg:mb-0">
          <div className="relative flex flex-col items-center justify-center h-72 lg:h-96 w-full">
            {INGREDIENTS.map((ing, idx) => {
              const spacing = isMobile ? 24 : 45;
              const targetY = (idx - 2) * spacing;

              let y = -500;
              let opacity = 0;
              let scale = isMobile ? 0.75 : 0.8;

              if (progress >= ing.endPct) {
                y = targetY;
                opacity = 1;
                scale = isMobile ? 0.85 : 1;
              } else if (progress >= ing.startPct) {
                const sliceProgress = (progress - ing.startPct) / (ing.endPct - ing.startPct);
                const easeIn = Math.pow(sliceProgress, 3);
                y = -500 + (targetY - (-500)) * easeIn;
                opacity = sliceProgress;
                scale = (isMobile ? 0.75 : 0.8) + (0.1 * sliceProgress);
              }

              return (
                <div
                  key={ing.id}
                  className="absolute transition-transform duration-75"
                  style={{
                    transform: `translateY(${y}px) scale(${scale})`,
                    opacity: opacity,
                    zIndex: INGREDIENTS.length - idx,
                  }}
                >
                  {ing.svg}
                </div>
              );
            })}

            <div 
              className="absolute bottom-6 w-48 sm:w-64 h-2.5 bg-char-mute/40 rounded-full blur-sm transition-all duration-300 pointer-events-none"
              style={{
                opacity: progress > 0.15 ? 0.8 : 0,
                transform: `scale(${0.5 + progress * 0.5})`,
              }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
