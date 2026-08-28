import type { Metadata } from "next";
import Nav from "@/components/marketing/Nav";
import Footer from "@/components/marketing/Footer";
import Image from "next/image";
import { locations } from "@/lib/data";

export const metadata: Metadata = {
  title: "Locations | Dan's Hamburgers",
  description: "Find Dan's Hamburgers locations in Austin and Buda, Texas. Visit Manchaca Rd, North Lamar Blvd, Airport Blvd, or Buda Historic for made-to-order Angus burgers and breakfast.",
};

export default function LocationsPage() {
  return (
    <>
      <Nav />
      <main className="pt-24 min-h-screen bg-bone">
        <section className="py-24 lg:py-32">
          <div className="mx-auto max-w-[88rem] px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="type-caption text-ember mb-4 font-bold">Find Your Nearest Dan&apos;s</p>
              <h1 className="type-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-8 text-char">
                4 Greater Austin
                <br />
                <span className="text-ember">Locations</span>
              </h1>
              <p className="type-serif text-xl text-stone leading-relaxed">
                Four convenient locations across Austin and Buda, each serving the same legendary made-to-order burgers, hand-breaded onion rings, and scratch-made breakfast biscuits.
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
                  className="group bg-bone-warm border border-bone-dark p-6 rounded-sm shadow-md hover:border-ember transition-all duration-300"
                >
                  <div className="aspect-[16/9] relative overflow-hidden mb-6 rounded-sm">
                    <Image
                      src={location.image}
                      alt={location.name}
                      fill
                      className="editorial-image object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-char/80 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="type-caption text-yolk text-xs mb-1 font-mono">{location.city}</p>
                      <h3 className="type-display text-3xl text-bone">{location.name}</h3>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="type-body text-char font-medium text-base">{location.address}</p>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-ember" />
                      <p className="type-caption text-smoke text-xs font-mono">{location.hours}</p>
                    </div>
                    <div className="pt-2 flex justify-between items-center border-t border-bone-dark">
                      <a
                        href={`tel:${location.phone.replace(/[^0-9]/g, "")}`}
                        className="type-display text-xl text-ember hover:underline font-bold"
                      >
                        {location.phone}
                      </a>
                      <a
                        href={`tel:${location.phone.replace(/[^0-9]/g, "")}`}
                        className="btn-red text-[9px] py-2 px-4 rounded-sm"
                      >
                        Call In Pickup 📞
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Large Orders & Catering */}
        <section className="py-24 lg:py-32 bg-char text-bone border-t border-char-mute">
          <div className="mx-auto max-w-[88rem] px-6 lg:px-8 text-center">
            <p className="type-caption text-yolk mb-4 font-bold">Large Orders &amp; Family Gatherings</p>
            <h2 className="type-display text-4xl md:text-5xl lg:text-6xl mb-8 text-ink">
              Feed the Whole Office or Team
            </h2>
            <p className="type-serif text-xl text-stone max-w-2xl mx-auto mb-8 leading-relaxed">
              Planning a breakfast taco morning, corporate lunch, or family celebration? Call your nearest Dan&apos;s location directly to place large group orders.
            </p>
            <a
              href="mailto:info@dans-hamburgers.com"
              className="inline-flex items-center gap-3 bg-ember text-bone px-8 py-4 type-caption text-xs font-bold hover:bg-ember-light transition-all duration-500 shadow-xl"
            >
              Email info@dans-hamburgers.com →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
