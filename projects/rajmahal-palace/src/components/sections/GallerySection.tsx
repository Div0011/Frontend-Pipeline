"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MandalaIcon, SectionDivider } from "../ui/JaaliOverlay";
import WatermarkVideo from "../video/WatermarkVideo";

gsap.registerPlugin(ScrollTrigger);

const GALLERY_ITEMS = [
  {
    id: "infinity-pool",
    title: "ROYAL INFINITY OASIS",
    subtitle: "Overlooking the Aravalli Hills at Sunset",
    image: "/media/infinity-pool.jpeg",
    tag: "POOL & COURTYARD",
    desc: "Swim along heated emerald waters framed by hand-carved marble jaali screens. Signature cocktails served on submerged daybeds.",
  },
  {
    id: "guest-room",
    title: "THE MAHARAJA SUITE",
    subtitle: "Palace Gardens & City Skyline Views",
    image: "/media/guest-room.jpeg",
    tag: "ROYAL SANCTUARY",
    desc: "3,800 sq.ft of pure indulgence. Private marble plunge pool, 24k gold embroidered silks, and dedicated royal butler service.",
  },
  {
    id: "palace-exterior",
    title: "TWILIGHT ILLUMINATIONS",
    subtitle: "1,000 Oil Lamps Lit at Dusk",
    image: "/media/palace-exterior.jpeg",
    tag: "HERITAGE ARCHITECTURE",
    desc: "As night falls over Rajasthan, the palace glows under warm torchlights, accompanied by live sitar recitals in the central courtyard.",
  },
  {
    id: "grand-lobby",
    title: "THE GRAND MARBLE LOBBY",
    subtitle: "High Vaulted Arches & Chandelier Grandeur",
    image: "/media/grand-lobby.jpeg",
    tag: "ARRIVAL",
    desc: "A breathtaking welcome under 40-foot vaulted ceilings, hand-painted frescoes, and crystal chandeliers brought from Venice in 1890.",
  },
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll(".gallery-item");
      if (!items) return;

      gsap.set(items, { y: 80, opacity: 0 });
      gsap.to(items, {
        y: 0,
        opacity: 1,
        duration: 1.4,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery-section"
      className="relative w-full py-24 md:py-32 px-6 md:px-16 bg-[#160306] text-[#faf0ca] z-10"
    >
      <WatermarkVideo
        src="/media/indian-pattern.mp4"
        opacity={0.08}
        zIndex={0}
      />

      <div className="relative z-10">
        <SectionDivider label="PALACE SANCTUARY" />

        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#f5d061] block mb-3 font-semibold">
            CHAPTER IV — THE PALACE EXPERIENCE
          </span>
          <h2 className="font-display text-4xl md:text-6xl text-[#f5d061] tracking-tight leading-tight">
            CURATED HERITAGE <br />
            <span className="italic text-[#faf0ca] font-normal">MOMENTS</span>
          </h2>
          <p className="font-body text-sm text-[#faf0ca]/70 mt-4 leading-relaxed font-light">
            Immersion into centuries of royal grandeur, modern wellness, and Michelin-inspired Indian gastronomy.
          </p>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {GALLERY_ITEMS.map((item, idx) => (
            <div
              key={item.id}
              className="gallery-item group relative bg-[#20060a]/80 border border-[#f5d061]/25 overflow-hidden backdrop-blur-md transition-all duration-500 hover:border-[#f5d061] hover:shadow-[0_0_40px_rgba(245,208,97,0.25)]"
            >
              <div className="relative h-72 md:h-96 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#160306] via-[#160306]/30 to-transparent" />

                <span className="absolute top-4 left-4 font-mono text-[9px] uppercase tracking-[0.3em] bg-[#160306]/90 border border-[#f5d061]/40 px-3 py-1 text-[#f5d061]">
                  {item.tag}
                </span>

                <div className="absolute inset-0 bg-[#160306]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="text-center p-6">
                    <p className="font-display text-2xl md:text-3xl text-[#f5d061] mb-2">{item.title}</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#faf0ca]/70">{item.subtitle}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-3">
                <h3 className="font-display text-xl md:text-2xl text-[#f5d061] group-hover:text-[#ffdf7a] transition-colors leading-tight">
                  {item.title}
                </h3>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#f5d061]/70">
                  {item.subtitle}
                </p>
                <p className="font-body text-xs text-[#faf0ca]/70 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto mt-16 p-8 md:p-12 bg-gradient-to-r from-[#20060a] via-[#2a080d] to-[#20060a] border border-[#f5d061]/30 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#f5d061] font-mono text-[10px] uppercase tracking-[0.3em]">
              <span className="w-4 h-px bg-[#f5d061]" /> GASTRONOMY & WELLNESS <span className="w-4 h-px bg-[#f5d061]" />
            </div>
            <h3 className="font-display text-3xl md:text-4xl text-[#f5d061]">
              ROYAL THALI & AYURVEDIC SPA
            </h3>
            <p className="font-body text-xs text-[#faf0ca]/80 leading-relaxed font-light">
              Indulge in 24-course royal Thali feasts prepared by hereditary royal chefs, followed by 5,000-year-old Ayurvedic herbal therapies at Jharokha Spa.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 font-mono text-center">
            <div className="p-5 border border-[#f5d061]/20 bg-[#160306]/60">
              <p className="font-display text-2xl text-[#f5d061]">SURYA DINING</p>
              <p className="text-[9px] uppercase tracking-widest text-[#faf0ca]/50 mt-1">Michelin Heritage</p>
            </div>
            <div className="p-5 border border-[#f5d061]/20 bg-[#160306]/60">
              <p className="font-display text-2xl text-[#f5d061]">AMRIT SPA</p>
              <p className="text-[9px] uppercase tracking-widest text-[#faf0ca]/50 mt-1">Ayurveda Wellness</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
