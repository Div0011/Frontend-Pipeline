import type { Metadata } from "next";
import Nav from "@/components/marketing/Nav";
import Footer from "@/components/marketing/Footer";
import Image from "next/image";

export const metadata: Metadata = {
  title: "100-Year History | Dirty Martin's Kum-Bak",
  description: "The 100-year story of Dirty Martin's Kum-Bak in Austin, Texas — from Martin Kermich's dirt floor diner in 1926 to Mark Nemir's passionate stewardship.",
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="pt-24 min-h-screen bg-bone text-char">
        <section className="py-24 lg:py-32">
          <div className="mx-auto max-w-[88rem] px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="type-caption text-ember mb-4 font-bold">Austin Tradition · Est. 1926</p>
              <h1 className="type-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-8 text-char">
                100 Years of
                <br />
                <span className="text-ember">The Drag Legacy</span>
              </h1>
              <p className="type-serif text-xl text-stone leading-relaxed mb-6">
                In 1926, Martin &quot;Dirty&quot; Kermich opened Martin&apos;s Kum-Bak on dirt floors at 2808 Guadalupe Street, serving 8 counter stools across from the University of Texas.
              </p>
              <p className="type-body text-stone leading-relaxed mb-6">
                Generations of Longhorns, Austin musicians, governors, and neighborhood regulars made Dirty&apos;s their second home. When the OT Special was created in 1957 — double meat, double cheddar, and grilled onions pressed between golden buttered Texas toast — it cemented Dirty&apos;s place in Texas food royalty.
              </p>
              <p className="type-body text-stone leading-relaxed">
                Today, owner <strong className="text-char">Mark Nemir</strong> guards the 1926 recipe and the century-seasoned flat-top griddle with unwavering devotion: never changing the burger blend, never compromising on fresh hand-portioned chuck, and keeping the spirit of historic Austin burning bright.
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
                  src="/images/locations/dirty-martins.jpg"
                  alt="Historic Dirty Martin's Diner"
                  fill
                  className="editorial-image object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute bottom-6 left-6 bg-char/80 backdrop-blur-sm p-4 border border-char-mute text-bone">
                  <p className="type-caption text-yolk text-[9px]">2808 Guadalupe St</p>
                  <p className="type-display text-lg text-ink">Austin&apos;s Oldest Burger Diner</p>
                </div>
              </div>
              <div className="aspect-[4/5] relative overflow-hidden rounded-sm border border-char/10 shadow-xl">
                <Image
                  src="/hero-burger.png"
                  alt="The Legendary OT Special"
                  fill
                  className="editorial-image object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute bottom-6 left-6 bg-char/80 backdrop-blur-sm p-4 border border-char-mute text-bone">
                  <p className="type-caption text-yolk text-[9px]">The OT Special</p>
                  <p className="type-display text-lg text-ink">Double Meat on Texas Toast</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="py-24 lg:py-32 bg-bone-warm border-y border-bone-dark">
          <div className="mx-auto max-w-[88rem] px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <p className="type-caption text-ember mb-6 font-bold">The Kum-Bak Creed</p>
              <h2 className="type-display text-3xl md:text-4xl lg:text-5xl mb-8 text-char">
                Never Change What Makes Austin Great.
              </h2>
              <p className="type-serif text-xl text-stone leading-relaxed mb-6">
                Through rapid growth, high-rises, and shifting food trends, Dirty Martin&apos;s Kum-Bak stands unyielding as a living museum of authentic Texas burger craftsmanship.
              </p>
              <p className="type-caption text-char text-[10px] font-mono tracking-widest">
                THE DRAG · 2808 GUADALUPE · 1926 CENTENNIAL · AUSTIN PROUD
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
