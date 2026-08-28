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
    title: "Lotus Biscoff Velvet Reduction",
    maskType: "circle" as const,
    textPosition: "center-below" as const,
  },
  {
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=1200&q=80",
    title: "Animal Crinkle Gold Dust",
    maskType: "pill" as const,
    textPosition: "bottom-right" as const,
  },
];

export default function FilmsPage() {
  return (
    <>
      <Nav />
      <main className="pt-24 min-h-screen bg-transparent text-[#FAF8F2] relative z-10">
        <section className="py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-4">
            <span className="font-mono text-xs text-[#F5C418] uppercase tracking-widest font-bold block">
              BEYONDBURG INC. // CINEMATIC SERIES
            </span>
            <h1 className="type-display text-5xl md:text-7xl font-extrabold text-white">
              THE SMASH CHRONICLES
            </h1>
            <p className="font-mono text-xs text-stone-300 max-w-xl">
              A curated series where craft, cuisine, and cinema converge — each frame capturing the intense craft of our Bangalore kitchens.
            </p>
          </div>
        </section>

        <section className="py-16 border-t border-white/10">
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
