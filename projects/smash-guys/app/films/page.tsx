import type { Metadata } from "next";
import Nav from "@/components/marketing/Nav";
import Footer from "@/components/marketing/Footer";
import CinematicFrame from "@/components/marketing/CinematicFrame";

export const metadata: Metadata = {
  title: "Films | Smash Guys",
  description: "A curated series of visual stories capturing the craft, culture, and cinema of Smash Guys.",
};

const frames = [
  {
    image: "/hero-burger.png",
    title: "Silence of the Ghats",
    maskType: "organic" as const,
    textPosition: "top-right" as const,
  },
  {
    image: "/truffle-fries.png",
    title: "The Last Monsoon",
    maskType: "parallelogram" as const,
    textPosition: "bottom-left" as const,
  },
  {
    image: "/matcha-special.png",
    title: "After the Light",
    maskType: "circle" as const,
    textPosition: "center-below" as const,
  },
  {
    image: "/old-monk-mousse.png",
    title: "Benares Shadows",
    maskType: "pill" as const,
    textPosition: "bottom-right" as const,
  },
];

export default function FilmsPage() {
  return (
    <>
      <Nav />
      <main className="pt-24">
        <section className="py-24 lg:py-32">
          <div className="mx-auto max-w-[88rem] px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="type-caption text-gold mb-4">In Frames</p>
              <h1 className="type-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-8">
                Visual
                <br />
                <span className="text-gold">Stories</span>
              </h1>
              <p className="type-serif text-xl text-stone leading-relaxed max-w-xl">
                A curated series where craft, cuisine, and cinema converge — each frame a chapter in the Smash Guys narrative.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-cream-dark/30">
          <div className="mx-auto max-w-[88rem] px-6 lg:px-8">
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

        <section className="py-24 lg:py-32">
          <div className="mx-auto max-w-[88rem] px-6 lg:px-8 text-center">
            <p className="type-caption text-gold mb-4">The Series</p>
            <h2 className="type-display text-3xl md:text-4xl mb-8">
              Four chapters. One kitchen.
            </h2>
            <p className="type-serif text-xl text-stone max-w-2xl mx-auto">
              Each frame captures a different moment in our journey — from the quiet precision of the kitchen to the vibrant energy of the dining room.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
