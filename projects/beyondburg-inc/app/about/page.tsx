"use client";

import Nav from "@/components/marketing/Nav";
import Footer from "@/components/marketing/Footer";
import Image from "next/image";
import HowWeSmash from "@/components/marketing/HowWeSmash";

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="pt-24 min-h-screen bg-transparent text-[#FAF8F2] relative z-10">
        <section className="py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-6">
            <span className="font-mono text-xs text-[#F5C418] uppercase tracking-widest font-bold block">
              OUR CULT SMASH HERITAGE // BENGALURU
            </span>
            <h1 className="type-display text-5xl md:text-7xl font-extrabold text-white">
              BUILT ON CAST IRON.
            </h1>
            <p className="type-serif text-lg md:text-xl text-stone-300 leading-relaxed max-w-2xl">
              Beyondburg Inc. started with a radical culinary goal: to bring genuine, razor-thin lace-edge smash burgers to Bangalore with uncompromised prime cuts, custom Martin&apos;s potato rolls, and hand-spun Lotus Biscoff malts.
            </p>
          </div>
        </section>

        {/* Visual Story Showcase */}
        <section className="py-12 border-y border-white/10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative h-96 rounded-2xl overflow-hidden border border-white/15 shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=1000&q=80"
                  alt="Beyondburg Smash Craft"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 space-y-1">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#F5C418] font-bold">
                    THE SIZZLE DISCIPLINE
                  </span>
                  <h3 className="type-display text-2xl text-white font-bold">
                    450°F High-Heat Sear
                  </h3>
                </div>
              </div>

              <div className="relative h-96 rounded-2xl overflow-hidden border border-white/15 shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1000&q=80"
                  alt="Beyondburg Buns & Malts"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 space-y-1">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#F5C418] font-bold">
                    CRAFT SWEET REWARDS
                  </span>
                  <h3 className="type-display text-2xl text-white font-bold">
                    Lotus Biscoff Double Spun Malts
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Craft Science Component */}
        <HowWeSmash />
      </main>
      <Footer />
    </>
  );
}
