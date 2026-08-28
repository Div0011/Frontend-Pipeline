import type { Metadata } from "next";
import Nav from "@/components/marketing/Nav";
import Footer from "@/components/marketing/Footer";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Paul's Story | Casino El Camino",
  description: "The 30-year rock-and-roll history of Casino El Camino on East 6th Street in Austin, Texas.",
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="pt-24 min-h-screen bg-char text-ink">
        <section className="py-24 lg:py-32">
          <div className="mx-auto max-w-[88rem] px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="type-caption text-ember mb-4 font-bold">6th Street Rock &amp; Roll · Est. 1994</p>
              <h1 className="type-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-8 text-ink">
                30 Years of
                <br />
                <span className="text-ember">Austin Rock &amp; Roll</span>
              </h1>
              <p className="type-serif text-xl text-stone leading-relaxed mb-6">
                In 1994, Paul Eighmey opened Casino El Camino at 517 East 6th Street with a vintage jukebox, monster movie posters, and a fierce commitment to serving Austin&apos;s heaviest, most flavorful chargrilled burgers.
              </p>
              <p className="type-body text-stone leading-relaxed mb-6">
                While trendy bars opened and closed around it, Casino remained unchanged: dark lighting, loud rock music, friendly bartenders, and flame-grilled 3/4 lb Angus beef patties blistered with fresh roasted serranos and covered in bubbling jalapeño jack cheese.
              </p>
              <p className="type-body text-stone leading-relaxed">
                Featured on <strong className="text-ember">Diners, Drive-Ins and Dives</strong> and celebrated by food critics worldwide, Casino El Camino is a living monument to the authentic, independent spirit of downtown Austin.
              </p>
            </div>
          </div>
        </section>

        {/* Visual Images */}
        <section className="py-16">
          <div className="mx-auto max-w-[88rem] px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="aspect-[4/5] relative overflow-hidden rounded-sm border border-char-mute shadow-[0_0_25px_rgba(0,230,118,0.2)]">
                <Image
                  src="/images/locations/casino-el-camino.jpg"
                  alt="Casino El Camino 6th Street"
                  fill
                  className="editorial-image object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute bottom-6 left-6 bg-char/90 backdrop-blur-sm p-4 border border-ember text-bone">
                  <p className="type-caption text-ember text-[9px]">517 E 6th St</p>
                  <p className="type-display text-lg text-ink">6th Street Dive Bar &amp; Grill</p>
                </div>
              </div>
              <div className="aspect-[4/5] relative overflow-hidden rounded-sm border border-char-mute shadow-xl">
                <Image
                  src="/hero-burger.png"
                  alt="The Legendary Amarillo Burger"
                  fill
                  className="editorial-image object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute bottom-6 left-6 bg-char/90 backdrop-blur-sm p-4 border border-ember text-bone">
                  <p className="type-caption text-ember text-[9px]">The Amarillo Burger</p>
                  <p className="type-display text-lg text-ink">3/4 lb Flame Chargrilled Monster</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="py-24 lg:py-32 bg-char-soft border-y border-char-mute">
          <div className="mx-auto max-w-[88rem] px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <p className="type-caption text-ember mb-6 font-bold">The Casino Creed</p>
              <h2 className="type-display text-3xl md:text-4xl lg:text-5xl mb-8 text-ink">
                No Posers. No Shortcuts. Just Flame &amp; Flavor.
              </h2>
              <p className="type-serif text-xl text-stone leading-relaxed mb-6">
                We believe in big portions, honest ingredients, unpretentious hospitality, and cold drinks poured without nonsense.
              </p>
              <p className="type-caption text-ember text-[10px] font-mono tracking-widest">
                517 E 6TH ST · LIVE FLAME CHARGRILL · AUSTIN TEXAS · EST. 1994
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
