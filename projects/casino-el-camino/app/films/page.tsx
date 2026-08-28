import type { Metadata } from "next";
import Nav from "@/components/marketing/Nav";
import Footer from "@/components/marketing/Footer";
import CinematicFrame from "@/components/marketing/CinematicFrame";

export const metadata: Metadata = {
  title: "Visual Archive | Casino El Camino",
  description: "A visual archive celebrating 30 years of rock and roll culture, 3/4 lb flame-chargrilled burgers, and 6th Street dive bar heritage at Casino El Camino.",
};

const frames = [
  {
    image: "/images/locations/casino-el-camino.jpg",
    title: "517 E 6th St Dive Sanctuary",
    maskType: "organic" as const,
    textPosition: "top-right" as const,
  },
  {
    image: "/hero-burger.png",
    title: "3/4 lb Amarillo Burger Flame Grill",
    maskType: "parallelogram" as const,
    textPosition: "bottom-left" as const,
  },
  {
    image: "/truffle-fries.png",
    title: "Pork Verde Chili Cheese Fries",
    maskType: "circle" as const,
    textPosition: "center-below" as const,
  },
  {
    image: "/matcha-special.png",
    title: "World-Famous Loaded Bloody Mary",
    maskType: "pill" as const,
    textPosition: "bottom-right" as const,
  },
];

export default function FilmsPage() {
  return (
    <>
      <Nav />
      <main className="pt-24 min-h-screen bg-char text-ink">
        <section className="py-24 lg:py-32">
          <div className="mx-auto max-w-[88rem] px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="type-caption text-ember mb-4 font-bold">Austin, TX · Est. 1994</p>
              <h1 className="type-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-8 text-ink">
                6th Street
                <br />
                <span className="text-ember">Rock-n-Roll Archive</span>
              </h1>
              <p className="type-serif text-xl text-stone leading-relaxed max-w-xl">
                A visual tribute to Paul Eighmey, 3/4 lb chargrilled monster burgers, and 30 continuous years of authentic Austin dive bar history.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-char-soft border-y border-char-mute">
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
