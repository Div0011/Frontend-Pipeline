"use client";

import Nav from "@/components/marketing/Nav";
import Footer from "@/components/marketing/Footer";
import CinematicFrame from "@/components/marketing/CinematicFrame";

const frames = [
  {
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=1200&q=80",
    title: "The Searing 450°F Horizon",
    maskType: "organic" as const,
    textPosition: "top-right" as const,
  },
  {
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200&q=80",
    title: "Double Butter Cloche Steam",
    maskType: "parallelogram" as const,
    textPosition: "bottom-left" as const,
  },
  {
    image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=1200&q=80",
    title: "Artisanal Reduction Craft",
    maskType: "circle" as const,
    textPosition: "center-below" as const,
  },
  {
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=1200&q=80",
    title: "Crisp Golden Companion",
    maskType: "pill" as const,
    textPosition: "bottom-right" as const,
  },
];

export default function FilmsPage() {
  return (
    <>
      <Nav />
      <main className="pt-24 min-h-screen bg-transparent text-[#FAF8F2] relative z-10 font-sans">
        <section className="py-20 lg:py-28 border-b border-white/10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-4">
            <span className="text-xs uppercase tracking-widest font-bold block" style={{ color: "#166534" }}>
              CINEMATIC GALLERY
            </span>
            <h1 className="type-display text-5xl sm:text-7xl md:text-8xl font-black text-white">
              CRAFT CHRONICLES
            </h1>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col gap-24">
              {frames.map((frame, i) => (
                <div key={frame.title}>
                  <CinematicFrame
                    image={frame.image}
                    title={frame.title}
                    index={i + 1}
                    maskType={frame.maskType}
                    textPosition={frame.textPosition}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
