"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const featuredWorks = [
  {
    id: "f1",
    title: "Echoes of Silence",
    artist: "Elena Voss",
    year: "2024",
    medium: "Oil on linen, 180 × 240 cm",
    imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "f2",
    title: "Shadows in Marble",
    artist: "Antoine Moreau",
    year: "2023",
    medium: "Carved Carrara marble & light projection",
    imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "f3",
    title: "Celestial Void",
    artist: "Kaelen Vance",
    year: "2024",
    medium: "Atmospheric lens matrix & gold leaf",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "f4",
    title: "Nocturne in Amber",
    artist: "James Okonkwo",
    year: "2023",
    medium: "Photography, archival pigment print",
    imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "f5",
    title: "Solitude in Gold",
    artist: "Aurelia Laurent",
    year: "2024",
    medium: "Gold leaf & charcoal on vellum",
    imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function HorizontalGallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track || !isClient) return;

    const ctx = gsap.context(() => {
      const scrollWidth = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
    });

    return () => ctx.revert();
  }, [isClient]);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative h-screen w-full overflow-hidden bg-void border-b border-stone/10"
    >
      {/* Section Header */}
      <div className="absolute top-0 left-0 right-0 z-20 px-[8vw] py-8 flex justify-between items-end pointer-events-none">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber mb-2">
            Horizontal Gallery
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-light text-bone">
            Featured Works
          </h2>
        </div>
        <p className="font-sans text-xs text-bone-dim hidden md:block">
          Scroll horizontally to explore →
        </p>
      </div>

      {/* Horizontal Track */}
      <div
        ref={trackRef}
        className="flex items-center h-full gap-8 md:gap-12 px-[8vw]"
        style={{ width: "fit-content" }}
      >
        {featuredWorks.map((work, index) => (
          <div
            key={work.id}
            className="relative flex-shrink-0 w-[75vw] md:w-[45vw] h-[70vh] group"
            data-cursor-artwork
          >
            {/* Image */}
            <div className="relative w-full h-full overflow-hidden rounded-sm border border-white/5 shadow-2xl">
              <img
                src={work.imageUrl}
                alt={work.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{
                  filter: "contrast(1.05) saturate(0.9) brightness(0.95)",
                }}
              />
              {/* Vignette */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  boxShadow: "inset 0 0 200px rgba(10,10,10,0.8)",
                }}
              />
            </div>

            {/* Floating Label */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-void via-void/80 to-transparent translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <div className="museum-label">
                <h3 className="museum-label__title text-2xl md:text-3xl">{work.title}</h3>
                <p className="museum-label__artist mt-1">{work.artist}</p>
                <p className="museum-label__meta mt-2">
                  {work.year} · {work.medium}
                </p>
              </div>
            </div>

            {/* Index Marker */}
            <div className="absolute top-4 right-4 font-mono text-xs text-amber/60">
              0{index + 1}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
