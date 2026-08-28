"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initGSAP, revealOnScroll, staggerReveal } from "@/lib/motion/gsap";
import { locations } from "@/lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const cinematicVideos = [
  {
    id: "flame-grill",
    title: "Cast Iron Griddle Sizzle",
    director: "Austin Kitchen",
    category: "Made-To-Order Sear",
    url: "https://player.vimeo.com/external/459389137.sd.mp4?s=d00e5746764516beee47c94c9f131a9c14ad5db9&profile_id=139&oauth2_token_id=57447761",
    poster: "/hero-burger.png",
  },
  {
    id: "patty-press",
    title: "Fresh 100% Angus Chuck",
    director: "Dan's Kitchens",
    category: "Hand-Weighed Daily",
    url: "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c02afdc23fcc2efd8de0b13d33db8257&profile_id=139&oauth2_token_id=57447761",
    poster: "/truffle-fries.png",
  },
  {
    id: "burger-craft",
    title: "The $50 Onion Rings",
    director: "Since 1973",
    category: "Hand-Breaded Daily",
    url: "https://player.vimeo.com/external/435674703.sd.mp4?s=7fdf18e19e7db7565780d6ccb3a165df8b776269&profile_id=139&oauth2_token_id=57447761",
    poster: "/matcha-special.png",
  },
  {
    id: "pouring-craft",
    title: "Hand-Dipped Texas Malts",
    director: "Soda Fountain",
    category: "Fountain Classics",
    url: "https://player.vimeo.com/external/384761655.sd.mp4?s=3c64c7604f86d88b4886676cf20a2e5d9c159c44&profile_id=139&oauth2_token_id=57447761",
    poster: "/old-monk-mousse.png",
  },
];

function Philosophy() {
  const ref = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    initGSAP();
    revealOnScroll(ref.current!);

    const ctx = gsap.context(() => {
      gsap.fromTo(imgRef.current,
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="section-cinematic bg-bone">
      <div className="mx-auto max-w-[88rem] px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 lg:col-start-2">
            <p className="type-caption text-ember mb-6 font-bold">50 Years of Quality</p>
            <h2 className="type-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-8 text-char">
              Fresh Angus chuck in
              <br />
              <span className="text-ember">every single bite</span>
            </h2>
            <div className="space-y-6">
              <p className="type-serif text-xl text-stone leading-relaxed">
                We believe Austin deserves an honest, made-to-order burger without pre-cooking, shortcuts, or compromises.
              </p>
              <p className="type-body text-stone">
                Every Dan&apos;s patty is 100% Certified Angus chuck, seared hot on seasoned cast-iron griddles just like Dan &amp; Frances Junk started doing in 1973.
              </p>
            </div>
            <Link
              href="/about"
              className="inline-flex items-center gap-3 mt-8 type-caption text-xs text-char hover:text-ember transition-colors duration-500 group font-bold"
            >
              Read our 50-year story
              <span className="group-hover:translate-x-1 transition-transform duration-500">→</span>
            </Link>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="aspect-[3/4] relative overflow-hidden rounded-sm border border-char/10 shadow-2xl">
              <Image
                ref={imgRef}
                src="/hero-burger.png"
                alt="Dan's Hamburgers Philosophy"
                fill
                className="object-cover scale-110"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-bone p-6 border border-bone-dark rounded-sm shadow-lg">
              <p className="type-display text-3xl text-ember font-sans">1973</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Films() {
  const ref = useRef<HTMLElement>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  useEffect(() => {
    initGSAP();
    staggerReveal(".film-card", 0.12);
  }, []);

  return (
    <section ref={ref} className="section-cinematic bg-bone-warm border-t border-bone-dark">
      <div className="mx-auto max-w-[88rem] px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <p className="type-caption text-ember mb-4 font-sans font-bold">IN MOTION</p>
            <h2 className="type-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-char">
              Austin Kitchen Broadcasts
            </h2>
          </div>
          <p className="type-body text-stone max-w-md mt-4 md:mt-0 leading-relaxed">
            Visual archive of griddle searing, fresh buttermilk battering, and our 50-year diner tradition. Click cards to view.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cinematicVideos.map((video) => (
            <motion.div
              key={video.id}
              className="film-card group cursor-pointer"
              onClick={() => setActiveVideo(video.url)}
            >
              <div className="aspect-[3/4] relative overflow-hidden mb-4 rounded-sm border border-bone-dark shadow-md">
                <video
                  src={video.url}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  muted
                  loop
                  playsInline
                  autoPlay
                />
                <div className="absolute inset-0 bg-char/10 group-hover:bg-transparent transition-colors duration-700" />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-char/90 to-transparent">
                  <p className="type-caption text-bone text-xs font-sans">{video.category}</p>
                </div>
              </div>
              <div>
                <h3 className="type-display text-xl group-hover:text-ember transition-colors duration-500 text-char">
                  {video.title}
                </h3>
                <p className="type-body text-stone text-sm mt-1 font-sans">
                  {video.director}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-55 bg-char/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
            onClick={() => setActiveVideo(null)}
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-6 right-6 type-caption text-xs text-bone hover:text-[#E52421] border border-bone/20 hover:border-bone px-4 py-2 transition-all duration-300 z-60 font-sans"
            >
              Close Broadcast ✕
            </button>
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[80rem] aspect-[16/9] relative bg-char overflow-hidden border border-char-mute rounded-sm shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src={activeVideo}
                className="w-full h-full object-cover"
                controls
                autoPlay
                loop
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Locations() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    initGSAP();
    staggerReveal(".location-card", 0.15);
  }, []);

  return (
    <section ref={ref} className="section-cinematic bg-bone border-t border-bone-dark">
      <div className="mx-auto max-w-[88rem] px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="type-caption text-ember mb-4 font-sans font-bold">AUSTIN &amp; BUDA</p>
          <h2 className="type-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-char">
            Our 4 Locations
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {locations.map((location) => (
            <motion.div
              key={location.id}
              className="location-card group cursor-pointer bg-bone-warm p-6 rounded-sm border border-bone-dark shadow-md hover:border-ember transition-colors"
            >
              <Link href={`/locations`} className="block">
                <div className="aspect-[16/9] relative overflow-hidden mb-6 rounded-sm">
                  <Image
                    src={location.image}
                    alt={location.name}
                    fill
                    className="editorial-image object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-char/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="type-caption text-[#E52421] text-xs mb-1 font-sans">{location.city}</p>
                    <h3 className="type-display text-2xl text-bone">{location.name}</h3>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="type-body text-char font-medium">{location.address}</p>
                    <p className="type-caption text-smoke text-xs mt-1 font-sans">{location.hours}</p>
                  </div>
                  <span className="type-caption text-ember text-xs group-hover:translate-x-1 transition-transform duration-500 font-sans font-bold">
                    Details →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  const ref = useRef<HTMLElement>(null);
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [reserved, setReserved] = useState(false);

  useEffect(() => {
    initGSAP();
    revealOnScroll(ref.current!);
  }, []);

  return (
    <section ref={ref} className="section-cinematic bg-bone-warm relative overflow-hidden border-t border-bone-dark">
      <div className="relative z-10 mx-auto max-w-[88rem] px-6 lg:px-8 text-center">
        <p className="type-caption text-ember mb-6 font-sans uppercase font-bold">AUSTIN TRADITION SINCE 1973</p>
        <h2 className="type-display text-4xl md:text-5xl lg:text-7xl leading-[1.05] mb-8 text-char">
          Ready to taste
          <br />
          <span className="text-ember">the Dan&apos;s difference?</span>
        </h2>
        <p className="type-serif text-xl text-stone max-w-2xl mx-auto mb-12 leading-relaxed">
          Visit any of our 4 Austin &amp; Buda locations, or call ahead for fresh pickup. Hand-pressed Angus chuck, famous $50 onion rings, and homemade Texas breakfast await.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setIsReserveModalOpen(true)}
            className="btn-red px-10 py-5 text-xs font-sans font-bold shadow-xl"
          >
            Call Ahead or Reserve Table →
          </button>
          <Link
            href="/menu"
            className="btn-outline px-10 py-5 text-xs font-sans font-bold"
          >
            Explore Full Menu
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {isReserveModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-55 bg-char/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setIsReserveModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-bone border border-bone-dark max-w-lg w-full p-8 rounded-sm shadow-2xl relative text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsReserveModalOpen(false)}
                className="absolute top-4 right-4 text-xs font-sans text-smoke hover:text-char"
              >
                ✕ CLOSE
              </button>

              {!reserved ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setReserved(true);
                  }}
                  className="space-y-6"
                >
                  <p className="type-caption text-ember font-sans font-bold">GROUP &amp; PICKUP ORDERS</p>
                  <h3 className="type-display text-3xl text-char">Reserve Your Table</h3>
                  
                  <div className="space-y-4 font-sans text-xs text-stone">
                    <div>
                      <label className="block mb-1 text-char font-bold">GUEST NAME</label>
                      <input
                        required
                        type="text"
                        placeholder="Katie Congdon"
                        className="w-full bg-bone-warm border border-bone-dark p-3 rounded-sm text-char focus:outline-none focus:border-ember"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-1 text-char font-bold">PARTY SIZE</label>
                        <select className="w-full bg-bone-warm border border-bone-dark p-3 rounded-sm text-char focus:outline-none focus:border-ember">
                          <option>2 Guests</option>
                          <option>4 Guests</option>
                          <option>6 Guests</option>
                          <option>8+ Guests</option>
                        </select>
                      </div>
                      <div>
                        <label className="block mb-1 text-char font-bold">STORE</label>
                        <select className="w-full bg-bone-warm border border-bone-dark p-3 rounded-sm text-char focus:outline-none focus:border-ember">
                          <option>Manchaca Rd</option>
                          <option>North Lamar Blvd</option>
                          <option>Airport Blvd</option>
                          <option>Buda Historic</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-red py-4 text-xs font-sans font-bold"
                  >
                    Confirm Table Request →
                  </button>
                </form>
              ) : (
                <div className="text-center py-8 space-y-4">
                  <p className="type-caption text-ember font-sans font-bold">REQUEST RECEIVED</p>
                  <h3 className="type-display text-4xl text-char">We&apos;ll See You Soon!</h3>
                  <p className="type-serif text-stone">
                    Your table request at Dan&apos;s Hamburgers has been submitted.
                  </p>
                  <button
                    onClick={() => {
                      setReserved(false);
                      setIsReserveModalOpen(false);
                    }}
                    className="mt-4 btn-char px-6 py-3 text-xs font-sans uppercase"
                  >
                    Done
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default function Sections() {
  return (
    <>
      <Philosophy />
      <Films />
      <Locations />
      <CTA />
    </>
  );
}
