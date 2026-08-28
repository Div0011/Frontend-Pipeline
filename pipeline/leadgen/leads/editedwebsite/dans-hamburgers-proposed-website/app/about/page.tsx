import type { Metadata } from "next";
import Nav from "@/components/marketing/Nav";
import Footer from "@/components/marketing/Footer";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Our Story | Dan's Hamburgers",
  description: "The 50+ year story of Dan's Hamburgers in Austin, Texas — from Dan & Frances Junk's first root beer stand in 1973 to Katie Congdon's enduring family legacy.",
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="pt-24 min-h-screen bg-bone">
        <section className="py-24 lg:py-32">
          <div className="mx-auto max-w-[88rem] px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="type-caption text-ember mb-4 font-bold">Austin Tradition · Est. 1973</p>
              <h1 className="type-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-8 text-char">
                Over 50 Years of
                <br />
                <span className="text-ember">Austin Heritage</span>
              </h1>
              <p className="type-serif text-xl text-stone leading-relaxed mb-6">
                In January 1973, Dan Junk and his wife Frances opened the first Dan&apos;s Hamburgers in a humble converted root beer stand on South Congress Avenue in Austin, Texas.
              </p>
              <p className="type-body text-stone leading-relaxed mb-6">
                When designing the original neon sign, they discovered that printing &quot;Junk&apos;s&quot; would cost an extra $50.00. Being practical Texas entrepreneurs, they opted for &quot;Dan&apos;s&quot; instead. That decision saved $50.00 — a sum Dan immediately turned around and invested in purchasing a secret recipe for hand-breaded buttermilk onion rings.
              </p>
              <p className="type-body text-stone leading-relaxed">
                That $50 onion ring recipe became one of the most famous pieces of Austin culinary lore. Today, Dan &amp; Frances&apos; daughter, <strong className="text-char">Katie Congdon</strong>, continues to run the business with the exact same values: 100% Certified Angus chuck, made-to-order cooking, and scratch-made Texas breakfast biscuits.
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
                  src="/hero-burger.png"
                  alt="Dan's Special Cheeseburger Tradition"
                  fill
                  className="editorial-image object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute bottom-6 left-6 bg-char/80 backdrop-blur-sm p-4 border border-char-mute">
                  <p className="type-caption text-yolk text-[9px]">100% Certified Angus Beef</p>
                  <p className="type-display text-lg text-ink">Made-to-Order on Hot Cast Iron</p>
                </div>
              </div>
              <div className="aspect-[4/5] relative overflow-hidden rounded-sm border border-char/10 shadow-xl">
                <Image
                  src="/truffle-fries.png"
                  alt="Famous $50 Onion Rings"
                  fill
                  className="editorial-image object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute bottom-6 left-6 bg-char/80 backdrop-blur-sm p-4 border border-char-mute">
                  <p className="type-caption text-yolk text-[9px]">The $50 Recipe (1973)</p>
                  <p className="type-display text-lg text-ink">Hand-Breaded Onion Rings</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="py-24 lg:py-32 bg-bone-warm border-y border-bone-dark">
          <div className="mx-auto max-w-[88rem] px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <p className="type-caption text-ember mb-6 font-bold">The Family Philosophy</p>
              <h2 className="type-display text-3xl md:text-4xl lg:text-5xl mb-8 text-char">
                Never Pre-Cook. Never Cut Corners.
              </h2>
              <p className="type-serif text-xl text-stone leading-relaxed mb-6">
                While fast food chains shifted to frozen pucks and automated conveyor belts, Dan&apos;s Hamburgers stayed faithful to the craft of the Texas diner: fresh onions sliced every morning, fresh Angus beef hand-weighed daily, and every sandwich made hot when you order it.
              </p>
              <p className="type-caption text-char text-[10px] font-mono tracking-widest">
                SOUTH CONGRESS · MANCHACA · NORTH LAMAR · AIRPORT BLVD · BUDA
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
