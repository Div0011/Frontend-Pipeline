import type { Metadata } from "next";
import Nav from "@/components/marketing/Nav";
import Footer from "@/components/marketing/Footer";
import CinematicFrame from "@/components/marketing/CinematicFrame";

export const metadata: Metadata = {
  title: "Heritage Visuals | Dan's Hamburgers",
  description: "A visual archive capturing the 50+ year craft, culture, and diner legacy of Dan's Hamburgers in Austin, Texas.",
};

const frames = [
  {
    image: "/hero-burger.png",
    title: "South Congress Roots (1973)",
    maskType: "organic" as const,
    textPosition: "top-right" as const,
  },
  {
    image: "/truffle-fries.png",
    title: "The $50 Onion Ring Craft",
    maskType: "parallelogram" as const,
    textPosition: "bottom-left" as const,
  },
  {
    image: "/matcha-special.png",
    title: "Texas Breakfast Biscuits & Gravy",
    maskType: "circle" as const,
    textPosition: "center-below" as const,
  },
  {
    image: "/old-monk-mousse.png",
    title: "Hand-Dipped Texas Malts",
    maskType: "pill" as const,
    textPosition: "bottom-right" as const,
  },
];

export default function FilmsPage() {
  return (
    <>
      <Nav />
      <main className="pt-24 min-h-screen bg-bone">
        <section className="py-24 lg:py-32">
          <div className="mx-auto max-w-[88rem] px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="type-caption text-ember mb-4 font-bold">In Frames</p>
              <h1 className="type-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-8 text-char">
                Austin Diner
                <br />
                <span className="text-ember">Heritage</span>
              </h1>
              <p className="type-serif text-xl text-stone leading-relaxed max-w-xl">
                A visual tribute to 50+ years of Austin food culture — where honest ingredients, cast-iron searing, and family values converge.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-bone-warm border-y border-bone-dark">
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
            <p className="type-caption text-ember mb-4 font-bold">50 Years Strong</p>
            <h2 className="type-display text-3xl md:text-4xl lg:text-5xl mb-8 text-char">
              Four Stores. One Family Tradition.
            </h2>
            <p className="type-serif text-xl text-stone max-w-2xl mx-auto leading-relaxed">
              Every burger, every hand-breaded onion ring, and every scratch buttermilk biscuit carries forward Dan &amp; Frances Junk&apos;s proud Texas legacy.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
