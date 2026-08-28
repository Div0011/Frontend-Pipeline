import type { Metadata } from "next";
import Nav from "@/components/marketing/Nav";
import Footer from "@/components/marketing/Footer";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Our Story | NADC BURGER",
  description: "The story behind NADC BURGER — from humble beginnings to Bangalore's most iconic burger kitchen.",
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="pt-24">
        <section className="py-24 lg:py-32">
          <div className="mx-auto max-w-[88rem] px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="type-caption text-gold mb-4">Our Story</p>
              <h1 className="type-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-8">
                Built in
                <br />
                <span className="text-gold">public</span>
              </h1>
              <p className="type-serif text-xl text-stone leading-relaxed mb-6">
                NADC BURGER started with a simple idea: to bring world-class smashburgers to Bangalore. But we didn&apos;t just want to open a restaurant — we wanted to build a brand in full view of our community.
              </p>
              <p className="type-body text-stone leading-relaxed">
                Our journey has been documented every step of the way, from the first prototype burger to the opening of our flagship location in Indiranagar. This isn&apos;t just a restaurant — it&apos;s a story we&apos;ve shared with our community from day one.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-[88rem] px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="aspect-[4/5] relative overflow-hidden">
              <Image
                src="/hero-burger.png"
                alt="NADC BURGER Story"
                fill
                className="editorial-image object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="aspect-[4/5] relative overflow-hidden">
              <Image
                src="/truffle-fries.png"
                alt="NADC BURGER Kitchen"
                fill
                className="editorial-image object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 lg:py-32 bg-cream-dark/30">
          <div className="mx-auto max-w-[88rem] px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <p className="type-caption text-gold mb-6">Philosophy</p>
              <h2 className="type-display text-3xl md:text-4xl mb-8">
                Precision, passion, and the perfect patty
              </h2>
              <p className="type-serif text-xl text-stone leading-relaxed">
                Every NADC BURGER burger is a testament to our obsession with quality. We source the finest ingredients, perfect our techniques through countless iterations, and never compromise on the final product.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
