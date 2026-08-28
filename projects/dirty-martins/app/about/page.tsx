"use client";

import Nav from "@/components/marketing/Nav";
import Footer from "@/components/marketing/Footer";
import Image from "next/image";
import HowWeSmash from "@/components/marketing/HowWeSmash";

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="pt-24 min-h-screen bg-transparent text-[#FAF8F2] relative z-10 font-sans">
        <section className="py-20 lg:py-28 border-b border-[#C68A14]/25">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-6">
            <span className="text-xs uppercase tracking-widest font-bold block" style={{ color: "#C68A14" }}>
              CULINARY HERITAGE
            </span>
            <h1 className="type-display text-5xl sm:text-7xl md:text-8xl font-black text-black leading-none">
              BUILT ON CAST IRON.
            </h1>
            <p className="text-base sm:text-lg text-stone-700 leading-relaxed max-w-2xl font-body">
              Dirty Martin's Kum-Bak brings genuine, handcrafted culinary discipline to Austin with fresh daily prime ingredients, custom artisanal recipes, and uncompromising craft.
            </p>
          </div>
        </section>

        <section className="py-16 border-b border-[#C68A14]/25">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative h-96 rounded-2xl overflow-hidden border border-[#C68A14]/25 shadow-2xl group">
                <Image
                  src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=1000&q=80"
                  alt="Dirty Martin's Kum-Bak Craft Discipline"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 space-y-1">
                  <span className="text-[10px] uppercase tracking-widest font-bold block" style={{ color: "#C68A14" }}>
                    THE HEAT DISCIPLINE
                  </span>
                  <h3 className="type-display text-2xl text-black font-bold">
                    High-Heat Precision Sear
                  </h3>
                </div>
              </div>

              <div className="relative h-96 rounded-2xl overflow-hidden border border-[#C68A14]/25 shadow-2xl group">
                <Image
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1000&q=80"
                  alt="Dirty Martin's Kum-Bak Fresh Ingredients"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 space-y-1">
                  <span className="text-[10px] uppercase tracking-widest font-bold block" style={{ color: "#C68A14" }}>
                    BESPOKE FLAVORS
                  </span>
                  <h3 className="type-display text-2xl text-black font-bold">
                    Signature Compositions
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        <HowWeSmash />
      </main>
      <Footer />
    </>
  );
}
