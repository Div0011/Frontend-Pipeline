"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Artwork {
  id: string;
  title: string;
  artist: string;
  year: string;
  medium: string;
  category: "oils" | "sculptures" | "nocturnes";
  imageUrl: string;
  room: string;
  provenance: string;
  audioCommentary: string;
}

const artworks: Artwork[] = [
  {
    id: "1",
    title: "Echoes of Silence",
    artist: "Elena Voss",
    year: "2024",
    medium: "Oil on linen, 180 × 240 cm",
    category: "oils",
    imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop",
    room: "Gallery IV — West Wing",
    provenance: "Acquired via the Voss Estate Collection, 2024.",
    audioCommentary: "Notice how Voss balances cold ivory lilies with rich amber poppies, creating a suspended tension between decay and illumination.",
  },
  {
    id: "2",
    title: "Chromatic Drift",
    artist: "Marcus Chen",
    year: "2023",
    medium: "Acrylic on canvas, 120 × 160 cm",
    category: "oils",
    imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?q=80&w=1200&auto=format&fit=crop",
    room: "Gallery II — Modernist Corridor",
    provenance: "Gift of the Chen Foundation for Contemporary Art.",
    audioCommentary: "Chen layered over forty thin glazes of pigment, allowing ambient light to penetrate the surface paint film.",
  },
  {
    id: "3",
    title: "The Weight of Light",
    artist: "Sofia Andersson",
    year: "2024",
    medium: "Mixed media on panel, 90 × 120 cm",
    category: "sculptures",
    imageUrl: "https://images.unsplash.com/photo-1578926375605-eaf7559b1458?q=80&w=1200&auto=format&fit=crop",
    room: "East Rotunda",
    provenance: "Commissioned specifically for Aetheria's 100th anniversary.",
    audioCommentary: "Andersson used silver leaf beneath semi-transparent oil washes, mirroring the architecture of Gothic stained glass.",
  },
  {
    id: "4",
    title: "Nocturne in Amber",
    artist: "James Okonkwo",
    year: "2023",
    medium: "Photography, archival pigment print",
    category: "nocturnes",
    imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1200&auto=format&fit=crop",
    room: "Chamber VIII — Photography Wing",
    provenance: "Purchased with funds provided by the Aetheria Patron Guild.",
    audioCommentary: "Captured during a moonless night in Kyoto using 8x10 large format film with a twelve-minute exposure.",
  },
  {
    id: "5",
    title: "Solitude in Gold",
    artist: "Aurelia Laurent",
    year: "2024",
    medium: "Gold leaf & charcoal on vellum",
    category: "nocturnes",
    imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1200&auto=format&fit=crop",
    room: "Gallery I — Classical Sanctuary",
    provenance: "On permanent loan from the Laurent Heritage Trust.",
    audioCommentary: "The contrast between raw charcoal dust and 24-karat gold leaf explores the boundary between impermanence and immortality.",
  },
  {
    id: "6",
    title: "The Monolith",
    artist: "Viktor Vane",
    year: "2023",
    medium: "Polished obsidian & basalt",
    category: "sculptures",
    imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop",
    room: "Sculpture Garden Court",
    provenance: "Acquired at the Paris Biennale of Fine Arts, 2023.",
    audioCommentary: "Vane spent two years hand-honing volcanic stone into an optically smooth parabolic reflector.",
  },
];

export default function CollectionGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [activeCategory, setActiveCategory] = useState<"all" | "oils" | "sculptures" | "nocturnes">("all");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const filteredArtworks = activeCategory === "all"
    ? artworks
    : artworks.filter((a) => a.category === activeCategory);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !isClient) return;

    const ctx = gsap.context(() => {
      const items = section.querySelectorAll(".artwork-card");
      gsap.fromTo(
        items,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            scrub: false,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [isClient, activeCategory]);

  const handleKeyDown = (e: React.KeyboardEvent, artwork: Artwork) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setSelectedArtwork(artwork);
    }
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="collection"
        className="relative py-section-desktop px-[8vw] bg-void border-b border-stone/10"
      >
        {/* Section Header */}
        <div className="max-w-content mx-auto mb-12 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-amber mb-4">
              The Permanent Collection
            </p>
            <h2 className="font-display text-4xl md:text-6xl font-light leading-[1.05] tracking-[-0.02em] text-bone max-w-2xl">
              Curated masterworks across six gallery chambers
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-charcoal/60 p-1.5 rounded-full border border-stone/30">
            {[
              { id: "all", label: "All Works" },
              { id: "oils", label: "Master Oils" },
              { id: "sculptures", label: "Sculptural" },
              { id: "nocturnes", label: "Nocturnes" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as typeof activeCategory)}
                className={`px-4 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === tab.id
                    ? "bg-amber text-void font-bold shadow-md"
                    : "text-bone-dim hover:text-bone"
                }`}
                data-cursor-text
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="max-w-content mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
          {filteredArtworks.map((artwork, index) => (
            <div
              key={artwork.id}
              className={`
                artwork-card group relative cursor-pointer
                ${index === 0 ? "md:col-span-7 md:row-span-2" : ""}
                ${index === 1 ? "md:col-span-5" : ""}
                ${index === 2 ? "md:col-span-5 md:col-start-6" : ""}
                ${index === 3 ? "md:col-span-4" : ""}
                ${index === 4 ? "md:col-span-4" : ""}
                ${index === 5 ? "md:col-span-4" : ""}
              `}
              onClick={() => setSelectedArtwork(artwork)}
              onKeyDown={(e) => handleKeyDown(e, artwork)}
              role="button"
              tabIndex={0}
              aria-label={`View ${artwork.title} by ${artwork.artist}`}
              data-cursor-artwork
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-charcoal rounded-sm border border-white/5 shadow-xl">
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{
                    filter: "contrast(1.05) saturate(0.92) brightness(0.95)",
                  }}
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-void/0 group-hover:bg-void/40 transition-colors duration-500" />

                {/* Room Location Tag */}
                <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-void/70 backdrop-blur-md rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-amber">
                    {artwork.room}
                  </span>
                </div>

                {/* Museum Label — Reveals on Hover */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-t from-void via-void/90 to-transparent">
                  <div className="museum-label">
                    <h3 className="museum-label__title text-2xl md:text-3xl text-bone">
                      {artwork.title}
                    </h3>
                    <p className="museum-label__artist text-bone-dim mt-1">{artwork.artist}</p>
                    <p className="museum-label__meta mt-2 text-amber/80">
                      {artwork.year} · {artwork.medium}
                    </p>
                  </div>
                </div>

                {/* Amber accent line */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-amber scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Image Zoom Modal — "The Viewing Room" */}
      {selectedArtwork && (
        <div
          className="fixed inset-0 z-[95] bg-void/98 backdrop-blur-2xl flex items-center justify-center p-6 md:p-12 animate-[fadeIn_0.3s_ease-out]"
          onClick={() => {
            setSelectedArtwork(null);
            setIsPlayingAudio(false);
          }}
          role="dialog"
          aria-modal="true"
          aria-label={`Viewing room: ${selectedArtwork.title}`}
        >
          <button
            className="absolute top-8 right-8 font-sans text-xs uppercase tracking-[0.25em] text-bone-dim hover:text-amber transition-colors px-4 py-2 border border-stone/30 rounded-full"
            onClick={() => {
              setSelectedArtwork(null);
              setIsPlayingAudio(false);
            }}
            data-cursor-text
          >
            Close Room
          </button>

          <div
            className="relative max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Artwork Display */}
            <div className="lg:col-span-7 flex justify-center">
              <img
                src={selectedArtwork.imageUrl}
                alt={selectedArtwork.title}
                className="w-full h-auto max-h-[70vh] object-contain rounded-sm shadow-2xl border border-white/10"
                style={{
                  filter: "contrast(1.06) saturate(0.92) brightness(0.95)",
                }}
              />
            </div>

            {/* Curator Details & Provenance */}
            <div className="lg:col-span-5 text-left space-y-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-amber">
                  {selectedArtwork.room}
                </span>
                <h3 className="font-display text-3xl md:text-5xl font-light text-bone mt-2">
                  {selectedArtwork.title}
                </h3>
                <p className="museum-label__artist text-lg text-bone-dim mt-1">
                  {selectedArtwork.artist}
                </p>
                <p className="museum-label__meta text-xs text-amber/90 mt-2">
                  {selectedArtwork.year} · {selectedArtwork.medium}
                </p>
              </div>

              {/* Provenance */}
              <div className="border-t border-stone/20 pt-4">
                <h4 className="font-sans text-[10px] uppercase tracking-[0.25em] text-bone mb-2">
                  Provenance & Acquisition
                </h4>
                <p className="font-body text-bone-dim text-sm font-light leading-relaxed">
                  {selectedArtwork.provenance}
                </p>
              </div>

              {/* Curator Audio Guide Player */}
              <div className="border-t border-stone/20 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-sans text-[10px] uppercase tracking-[0.25em] text-amber">
                    Curator's Commentary
                  </h4>
                  <button
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className="flex items-center gap-2 px-3 py-1 rounded-full border border-amber/40 text-[10px] font-mono uppercase tracking-widest text-amber hover:bg-amber/10 transition-colors"
                  >
                    <span>{isPlayingAudio ? "Pause Audio" : "Listen (0:45)"}</span>
                  </button>
                </div>
                <p className="font-body text-bone-dim text-sm font-light italic leading-relaxed bg-charcoal/50 p-4 rounded-sm border border-white/5">
                  "{selectedArtwork.audioCommentary}"
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
