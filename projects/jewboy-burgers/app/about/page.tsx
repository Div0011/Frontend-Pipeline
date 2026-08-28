import type { Metadata } from "next";
import Nav from "@/components/marketing/Nav";
import Footer from "@/components/marketing/Footer";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Mo's Story | JewBoy Burgers",
  description: "How Mo Pittle combined El Paso border cuisine with Jewish home cooking to create JewBoy Burgers in Austin, Texas.",
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="pt-24 min-h-screen bg-bone text-char">
        <section className="py-24 lg:py-32">
          <div className="mx-auto max-w-[88rem] px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="type-caption text-ember mb-4 font-bold">El Paso Roots · Austin Soul</p>
              <h1 className="type-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-8 text-char">
                Shalom Y&apos;all,
                <br />
                <span className="text-ember">Mucho Gusto!</span>
              </h1>
              <p className="type-serif text-xl text-stone leading-relaxed mb-6">
                Mo Pittle grew up in El Paso, Texas, in a Jewish family where border Mexican cooking and traditional Jewish comfort food lived side by side on the table.
              </p>
              <p className="type-body text-stone leading-relaxed mb-6">
                After moving to Austin and running a successful advertising career, Mo missed the hearty, genuine warmth of the border. In 2016, he parked a food truck on 29th Street and started serving smashed Angus chuck pressed into onions, scratch potato latkes, and Hatch green chile queso.
              </p>
              <p className="type-body text-stone leading-relaxed">
                When he created <strong className="text-char">&quot;The Oy Vey Goy&quot;</strong> — crowning an onion-smashed patty with a hot crispy potato latke, bacon, and melted cheddar — burger enthusiasts went wild. Today, the Airport Boulevard flagship is a thriving hub of warmth, great humor, and unforgettable food.
              </p>
            </div>
          </div>
        </section>

        {/* Visual Images */}
        <section className="py-16">
          <div className="mx-auto max-w-[88rem] px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="aspect-[4/5] relative overflow-hidden rounded-sm border border-char/10 shadow-xl">
                <Image
                  src="/images/locations/jewboy-burgers.jpg"
                  alt="JewBoy Burgers Airport Blvd"
                  fill
                  className="editorial-image object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute bottom-6 left-6 bg-char/80 backdrop-blur-sm p-4 border border-char-mute text-bone">
                  <p className="type-caption text-yolk text-[9px]">5111 Airport Blvd</p>
                  <p className="type-display text-lg text-ink">Airport Blvd Flagship</p>
                </div>
              </div>
              <div className="aspect-[4/5] relative overflow-hidden rounded-sm border border-char/10 shadow-xl">
                <Image
                  src="/hero-burger.png"
                  alt="The Legendary Oy Vey Goy"
                  fill
                  className="editorial-image object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute bottom-6 left-6 bg-char/80 backdrop-blur-sm p-4 border border-char-mute text-bone">
                  <p className="type-caption text-yolk text-[9px]">The Oy Vey Goy</p>
                  <p className="type-display text-lg text-ink">Latke Smash Burger</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="py-24 lg:py-32 bg-bone-warm border-y border-bone-dark">
          <div className="mx-auto max-w-[88rem] px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <p className="type-caption text-ember mb-6 font-bold">The JewBoy Philosophy</p>
              <h2 className="type-display text-3xl md:text-4xl lg:text-5xl mb-8 text-char">
                Food Made with Heart, Humor &amp; Heritage.
              </h2>
              <p className="type-serif text-xl text-stone leading-relaxed mb-6">
                We believe food should bring people together from every background, culture, and corner of Texas. Come as you are, eat with your hands, and leave with a smile.
              </p>
              <p className="type-caption text-char text-[10px] font-mono tracking-widest">
                AIRPORT BLVD · SHALOM Y&apos;ALL · MUCHO GUSTO · AUSTIN TEXAS
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
