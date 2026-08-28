import type { Metadata } from "next";
import Nav from "@/components/marketing/Nav";
import Footer from "@/components/marketing/Footer";
import CinematicFrame from "@/components/marketing/CinematicFrame";

export const metadata: Metadata = {
  title: "Border Visuals | JewBoy Burgers",
  description: "A visual archive celebrating El Paso border culture, crispy potato latkes, and Austin burger craftsmanship at JewBoy Burgers.",
};

const frames = [
  {
    image: "/images/locations/jewboy-burgers.jpg",
    title: "5111 Airport Blvd Flagship",
    maskType: "organic" as const,
    textPosition: "top-right" as const,
  },
  {
    image: "/hero-burger.png",
    title: "The Oy Vey Goy Latke Burger",
    maskType: "parallelogram" as const,
    textPosition: "bottom-left" as const,
  },
  {
    image: "/truffle-fries.png",
    title: "Scratch Latkes & Green Chile Queso",
    maskType: "circle" as const,
    textPosition: "center-below" as const,
  },
  {
    image: "/matcha-special.png",
    title: "Mexican Chocolate Churro Shake",
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
              <p className="type-caption text-ember mb-4 font-bold">Austin, TX · Shalom Y&apos;all</p>
              <h1 className="type-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-8 text-char">
                Border Burger
                <br />
                <span className="text-ember">Heritage</span>
              </h1>
              <p className="type-serif text-xl text-stone leading-relaxed max-w-xl">
                A visual tribute to Mo Pittle, El Paso border cuisine, and the warmth of JewBoy Burgers on Airport Boulevard.
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
