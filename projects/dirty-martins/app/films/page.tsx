import type { Metadata } from "next";
import Nav from "@/components/marketing/Nav";
import Footer from "@/components/marketing/Footer";
import CinematicFrame from "@/components/marketing/CinematicFrame";

export const metadata: Metadata = {
  title: "100-Year Heritage | Dirty Martin's Kum-Bak",
  description: "A visual archive celebrating 100 years of burger craft, collegiate culture, and Texas diner heritage at Dirty Martin's.",
};

const frames = [
  {
    image: "/images/locations/dirty-martins.jpg",
    title: "The Drag Since 1926",
    maskType: "organic" as const,
    textPosition: "top-right" as const,
  },
  {
    image: "/hero-burger.png",
    title: "The OT Special & Flat-Top Sear",
    maskType: "parallelogram" as const,
    textPosition: "bottom-left" as const,
  },
  {
    image: "/truffle-fries.png",
    title: "Famous Tots & Buttermilk Rings",
    maskType: "circle" as const,
    textPosition: "center-below" as const,
  },
  {
    image: "/matcha-special.png",
    title: "Burnt Orange Longhorn Shakes",
    maskType: "pill" as const,
    textPosition: "bottom-right" as const,
  },
];

export default function FilmsPage() {
  return (
    <>
      <Nav />
      <main className="pt-24 min-h-screen bg-bone text-char">
        <section className="py-24 lg:py-32">
          <div className="mx-auto max-w-[88rem] px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="type-caption text-ember mb-4 font-bold">1926 – 2026</p>
              <h1 className="type-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-8 text-char">
                Austin Diner
                <br />
                <span className="text-ember">Heritage</span>
              </h1>
              <p className="type-serif text-xl text-stone leading-relaxed max-w-xl">
                A visual tribute to 100 continuous years on The Drag — celebrating Martin Kermich, Mark Nemir, and generations of Austin burger lovers.
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
      </main>
      <Footer />
    </>
  );
}
