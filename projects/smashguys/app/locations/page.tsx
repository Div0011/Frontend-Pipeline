import type { Metadata } from "next";
import Nav from "@/components/marketing/Nav";
import Footer from "@/components/marketing/Footer";
import Image from "next/image";
import { locations } from "@/lib/data";

export const metadata: Metadata = {
  title: "Locations | Smash Guys",
  description: "Find Smash Guys locations across Bangalore. Visit us in Indiranagar, Bellandur, RMV, and Whitefield.",
};

export default function LocationsPage() {
  return (
    <>
      <Nav />
      <main className="pt-24">
        <section className="py-24 lg:py-32">
          <div className="mx-auto max-w-[88rem] px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="type-caption text-gold mb-4">Visit Us</p>
              <h1 className="type-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-8">
                Our
                <span className="text-gold"> locations</span>
              </h1>
              <p className="type-serif text-xl text-stone leading-relaxed">
                Four locations across Bangalore, each designed to offer the same exceptional experience in a unique setting.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-[88rem] px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {locations.map((location) => (
                <div
                  key={location.id}
                  className="group cursor-pointer"
                >
                  <div className="aspect-[16/9] relative overflow-hidden mb-6">
                  <Image
                    src="/hero-burger.png"
                    alt={location.name}
                    fill
                    className="editorial-image object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="type-caption text-cream text-xs mb-2">{location.city}</p>
                    <h3 className="type-display text-2xl text-cream">{location.name}</h3>
                  </div>
                </div>
                  <div className="space-y-2">
                    <p className="type-body text-stone">{location.address}</p>
                    <p className="type-caption text-mist text-xs">{location.hours}</p>
                    <p className="type-caption text-mist text-xs">{location.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 lg:py-32 bg-cream-dark/30">
          <div className="mx-auto max-w-[88rem] px-6 lg:px-8 text-center">
            <p className="type-caption text-gold mb-4">Get in Touch</p>
            <h2 className="type-display text-3xl md:text-4xl mb-8">
              Private Events
            </h2>
            <p className="type-serif text-xl text-stone max-w-2xl mx-auto mb-8">
              Looking to host a private event? Our spaces are available for corporate gatherings, celebrations, and special occasions.
            </p>
            <a
              href="mailto:events@smashguys.in"
              className="inline-flex items-center gap-3 border border-ink/20 text-ink px-8 py-4 type-caption text-xs hover:border-ink hover:bg-ink hover:text-cream transition-all duration-500"
            >
              Enquire Now
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
