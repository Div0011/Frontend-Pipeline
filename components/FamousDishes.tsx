"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const dishes = [
  {
    title: "OG SMASH",
    subtitle: "SIGNATURE FAVORITE",
    image: "/hero-burger.png",
    bg: "#FFC800",
    desc: "Double crispy beef patties, melted cheddar, house dill pickles, and griddled onions on a toasted buttered brioche bun.",
  },
  {
    title: "TRUFFLE FRIES",
    subtitle: "GOURMET CRISPY SIDES",
    image: "/truffle-fries.png",
    bg: "#E63946",
    desc: "Golden-brown skin-on fries tossed in truffle oil, dusted with freshly grated parmesan cheese and fresh green parsley.",
  },
  {
    title: "MATCHA SPECIAL",
    subtitle: "CRAFT BEVERAGES",
    image: "/matcha-special.png",
    bg: "#2E7D32",
    desc: "Layered luxury iced tea: premium Japanese Uji matcha float over fresh milk and house strawberry-raspberry coulis.",
  },
  {
    title: "MONK MOUSSE",
    subtitle: "HOUSE DESSERTS",
    image: "/old-monk-mousse.png",
    bg: "#8D6E63",
    desc: "Decadent dark chocolate mousse whipped with a hint of Old Monk rum, topped with heavy cocoa dust and a fresh berry.",
  },
];

export default function FamousDishes() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Initialize start positions via GSAP to avoid React state-mismatch on render
      dishes.forEach((_, i) => {
        if (i === 0) {
          gsap.set(cardRefs.current[i], { yPercent: 0, opacity: 1, scale: 1 });
          gsap.set(textRefs.current[i], { xPercent: 0, opacity: 1 });
          gsap.set(imageRefs.current[i], { yPercent: 0, scale: 1.05 });
        } else {
          gsap.set(cardRefs.current[i], { yPercent: 100, opacity: 1, scale: 1 });
          gsap.set(textRefs.current[i], { xPercent: 80, opacity: 0 });
          gsap.set(imageRefs.current[i], { yPercent: 15, scale: 1.15 });
        }
      });

      // 2. Create the scroll scrub timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=2600",
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      // 3. Build sequence triggers
      dishes.forEach((_, i) => {
        if (i === 0) return;

        const card = cardRefs.current[i];
        const prevCard = cardRefs.current[i - 1];
        const text = textRefs.current[i];
        const prevText = textRefs.current[i - 1];
        const img = imageRefs.current[i];

        const timelinePosition = (i - 1) * 1.5;

        // Slide the current card up
        tl.to(
          card,
          {
            yPercent: 0,
            ease: "none",
          },
          timelinePosition
        );

        // Slide the current image down for inner parallax
        if (img) {
          tl.to(
            img,
            {
              yPercent: 0,
              scale: 1.05,
              ease: "none",
            },
            timelinePosition
          );
        }

        // Push the previous card up/back slightly
        if (prevCard) {
          tl.to(
            prevCard,
            {
              yPercent: -15,
              scale: 0.95,
              opacity: 0.4,
              ease: "none",
            },
            timelinePosition
          );
        }

        // Animate the text reveals
        if (prevText) {
          tl.to(
            prevText,
            {
              opacity: 0,
              xPercent: -30,
              ease: "none",
            },
            timelinePosition
          );
        }

        if (text) {
          tl.to(
            text,
            {
              xPercent: 0,
              opacity: 1,
              ease: "none",
            },
            timelinePosition + 0.2
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#0b0b0b] text-brand-cream overflow-hidden border-b-4 border-black z-10"
    >
      <div ref={containerRef} className="relative w-full h-full min-h-screen">
        {dishes.map((dish, i) => (
          <div
            key={dish.title}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="absolute inset-0 w-full h-full min-h-screen flex items-center justify-center p-6 sm:p-12 bg-gradient-to-b from-[#121212] to-[#0a0a0a]"
            style={{ zIndex: 10 + i }}
          >
            {/* Visual Backlight */}
            <div
              className="absolute w-[450px] h-[450px] rounded-full blur-[140px] pointer-events-none opacity-20 -z-10"
              style={{ backgroundColor: dish.bg }}
            />

            {/* Giant Background Monospace Title */}
            <div className="absolute top-[10%] left-0 right-0 text-center pointer-events-none -z-10 select-none overflow-hidden h-36">
              <span
                className="text-[12rem] md:text-[18rem] font-extrabold text-white/[0.02] tracking-tighter block uppercase leading-none"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {dish.title}
              </span>
            </div>

            <div className="w-full max-w-6xl grid lg:grid-cols-12 gap-8 lg:gap-16 items-center relative z-10">
              {/* Left Side: Photo Frame */}
              <div className="lg:col-span-6 flex justify-center">
                <div
                  className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] rounded-3xl border-8 border-black overflow-hidden shadow-[12px_12px_0px_#000] rotate-[-2deg]"
                  style={{ backgroundColor: dish.bg + "20" }}
                >
                  <img
                    ref={(el) => {
                      imageRefs.current[i] = el;
                    }}
                    src={dish.image}
                    alt={dish.title}
                    className="w-full h-full object-cover select-none pointer-events-none"
                  />
                </div>
              </div>

              {/* Right Side: Titles & Text */}
              <div
                ref={(el) => {
                  textRefs.current[i] = el;
                }}
                className="lg:col-span-6 flex flex-col justify-center text-left"
              >
                <span
                  className="text-xs uppercase tracking-[0.3em] mb-4 font-bold"
                  style={{ color: dish.bg, fontFamily: "var(--font-display)" }}
                >
                  {dish.subtitle}
                </span>
                <h2
                  className="text-5xl md:text-7xl font-bold leading-none mb-6 text-white uppercase tracking-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {dish.title}
                </h2>
                <div
                  className="p-6 rounded-2xl border-4 border-black bg-[#161616] shadow-[8px_8px_0px_#000] max-w-xl"
                  style={{ transform: "rotate(1deg)" }}
                >
                  <p
                    className="text-md text-brand-cream/80 leading-relaxed"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {dish.desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
