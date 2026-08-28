"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Exhibition {
  id: string;
  title: string;
  artist: string;
  year: string;
  medium: string;
  imageUrl: string;
  description: string;
  location: string;
}

const exhibitions: Exhibition[] = [
  {
    id: "1",
    title: "The Geometry of Silence",
    artist: "Elena Voss",
    year: "2024",
    medium: "Oil on linen, 180 × 240 cm",
    imageUrl: "/images/exhibition-hero.jpg",
    description: "An exploration of negative space, shadow boundaries, and luminosity in modern classical portraiture.",
    location: "Grand Gallery — West Wing",
  },
  {
    id: "2",
    title: "Shadows in Marble",
    artist: "Antoine Moreau",
    year: "2023",
    medium: "Carved Carrara marble & light projection",
    imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=2000&auto=format&fit=crop",
    description: "Chisel strokes captured in perpetual stillness, illuminated by shifting light angles.",
    location: "Chamber II — East Atrium",
  },
  {
    id: "3",
    title: "Celestial Void",
    artist: "Kaelen Vance",
    year: "2024",
    medium: "Atmospheric lens matrix & gold leaf",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2000&auto=format&fit=crop",
    description: "A cosmic study of deep space optics, gold leaf reflection, and light absorption.",
    location: "Rotunda Sanctuary",
  },
];

export default function ExhibitionHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const floatingCardRef = useRef<HTMLDivElement>(null);

  const [activeExhibitionIndex, setActiveExhibitionIndex] = useState(0);
  const activeExhibition = exhibitions[activeExhibitionIndex];

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const mid = midRef.current;
    const fg = fgRef.current;
    const content = contentRef.current;
    const spotlight = spotlightRef.current;
    const floatingCard = floatingCardRef.current;
    if (!section || !bg || !mid || !fg || !content) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=120%",
        pin: true,
        pinSpacing: true,
        scrub: 1.2,
      });

      gsap.fromTo(
        bg,
        { y: 0, scale: 1 },
        {
          y: -80,
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );

      gsap.fromTo(
        mid,
        { y: 40, scale: 0.96 },
        {
          y: -40,
          scale: 1.02,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );

      gsap.fromTo(
        fg,
        { opacity: 0.2 },
        {
          opacity: 0.7,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top center",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );

      gsap.fromTo(
        content,
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: -60,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );

      if (spotlight) {
        gsap.to(spotlight, {
          opacity: 0.7,
          scale: 1.05,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      if (floatingCard) {
        gsap.to(floatingCard, {
          y: -80,
          rotate: -4,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 1.4,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const spotlight = spotlightRef.current;
    if (!spotlight) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      spotlight.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(201, 169, 110, 0.2) 0%, rgba(201, 169, 110, 0.05) 40%, transparent 70%)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="exhibition"
      className="relative h-screen w-full overflow-hidden bg-void"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 dof-layer--background"
        style={{
          backgroundImage: `url(${activeExhibition.imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div
        ref={midRef}
        className="absolute inset-0 flex items-center justify-center dof-layer--midground"
      >
        <div className="relative w-[85vw] md:w-[70vw] aspect-[16/10]">
          <img
            src={activeExhibition.imageUrl}
            alt={activeExhibition.title}
            className="w-full h-full object-cover"
            style={{
              filter: "contrast(1.05) saturate(0.9) brightness(0.95)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              boxShadow: "inset 0 0 200px rgba(10,10,10,0.8)",
            }}
          />
        </div>
      </div>

      <div
        ref={fgRef}
        className="absolute inset-0 fog-layer opacity-40"
        style={{ mixBlendMode: "multiply" }}
      />

      <div
        ref={spotlightRef}
        className="absolute inset-0 pointer-events-none z-15 opacity-60"
        style={{
          background: "radial-gradient(circle at 50% 30%, rgba(201, 169, 110, 0.2) 0%, transparent 60%)",
          transition: "background 0.3s ease-out",
        }}
      />

      <div
        ref={floatingCardRef}
        className="absolute top-1/2 -right-6 md:right-12 z-30 bg-[#141414]/90 border border-white/10 p-5 shadow-2xl font-mono text-xs hidden lg:block backdrop-blur-md"
      >
        <div className="text-[10px] text-amber uppercase font-bold tracking-widest">CURRENT EXHIBITION</div>
        <div className="text-white font-extrabold text-sm mt-0.5 max-w-[200px]">{activeExhibition.title}</div>
        <div className="text-white/50 text-[10px] mt-1">{activeExhibition.artist} · {activeExhibition.year}</div>
      </div>

      <div
        ref={contentRef}
        className="absolute inset-0 flex items-end z-20 pointer-events-none"
      >
        <div className="w-full px-[8vw] pb-24 md:pb-32">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber mb-4">
              Current Exhibition
            </p>
            <h2 className="font-display text-5xl md:text-7xl font-light leading-[1.05] tracking-[-0.02em] text-bone mb-4">
              {activeExhibition.title}
            </h2>
            <div className="museum-label">
              <p className="museum-label__artist">{activeExhibition.artist}</p>
              <p className="museum-label__meta mt-1">
                {activeExhibition.year} · {activeExhibition.medium}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
