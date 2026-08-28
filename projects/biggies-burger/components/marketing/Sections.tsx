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

// High-end cinematic cooking/dining videos
const cinematicVideos = [
  {
    id: "flame-grill",
    title: "The Sizzle & Heat",
    director: "Bangalore Lab",
    category: "Atmospheric Sizzle",
    url: "https://player.vimeo.com/external/459389137.sd.mp4?s=d00e5746764516beee47c94c9f131a9c14ad5db9&profile_id=139&oauth2_token_id=57447761",
    poster: "/hero-burger.png",
  },
  {
    id: "patty-press",
    title: "Precision Shaping",
    director: "Cuisine Atelier",
    category: "Patty Preparation",
    url: "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c02afdc23fcc2efd8de0b13d33db8257&profile_id=139&oauth2_token_id=57447761",
    poster: "/truffle-fries.png",
  },
  {
    id: "burger-craft",
    title: "Assembly & Details",
    director: "Frames Ind.",
    category: "Culinary Build",
    url: "https://player.vimeo.com/external/435674703.sd.mp4?s=7fdf18e19e7db7565780d6ccb3a165df8b776269&profile_id=139&oauth2_token_id=57447761",
    poster: "/matcha-special.png",
  },
  {
    id: "pouring-craft",
    title: "The Fluid Touch",
    director: "Studio Nari",
    category: "Aesthetic Pour",
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
    <section ref={ref} className="section-cinematic bg-cream">
      <div className="mx-auto max-w-[88rem] px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 lg:col-start-2">
            <p className="type-caption text-gold mb-6">Philosophy</p>
            <h2 className="type-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-8 text-ink">
              Precision in
              <br />
              <span className="text-gold">every bite</span>
            </h2>
            <div className="space-y-6">
              <p className="type-serif text-xl text-stone leading-relaxed">
                We believe the perfect burger is not an accident. It is the result of meticulous craft — from the source of our beef to the final garnish.
              </p>
              <p className="type-body text-stone">
                Each BIGGIES BURGER patty is smashed at precisely 230°C on a cast-iron griddle. The result is a caramelized crust that gives way to a juicy, flavorful interior.
              </p>
            </div>
            <Link
              href="/about"
              className="inline-flex items-center gap-3 mt-8 type-caption text-xs text-ink hover:text-gold transition-colors duration-500 group"
            >
              Our story
              <span className="group-hover:translate-x-1 transition-transform duration-500">→</span>
            </Link>
          </div>

          <div className="lg:col-span-5 relative" data-cursor="explore">
            <div className="aspect-[3/4] relative overflow-hidden rounded-sm border border-ink/5 shadow-2xl">
              <Image
                ref={imgRef}
                src="/hero-burger.png"
                alt="BIGGIES BURGER Philosophy"
                fill
                className="object-cover scale-110"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-cream p-6 border border-ink/5 rounded-sm shadow-lg">
              <p className="type-display text-3xl text-gold font-mono">01</p>
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
    <section ref={ref} className="section-cinematic bg-cream border-t border-ink/5">
      <div className="mx-auto max-w-[88rem] px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <p className="type-caption text-gold mb-4 font-mono">IN MOTION</p>
            <h2 className="type-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-ink">
              Atelier Broadcasts
            </h2>
          </div>
          <p className="type-body text-stone max-w-md mt-4 md:mt-0 leading-relaxed">
            Visual documentation of griddle kinetics, ingredient textures, and brand storytelling. Click cards to launch full screen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cinematicVideos.map((video) => (
            <motion.div
              key={video.id}
              className="film-card group cursor-pointer"
              onClick={() => setActiveVideo(video.url)}
              data-cursor="play"
            >
              <div className="aspect-[3/4] relative overflow-hidden mb-4 rounded-sm border border-ink/5">
                <video
                  src={video.url}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  muted
                  loop
                  playsInline
                  autoPlay
                />
                <div className="absolute inset-0 bg-ink/10 group-hover:bg-ink/0 transition-colors duration-700" />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-cream-dark/95 to-transparent">
                  <p className="type-caption text-ink text-xs font-mono">{video.category}</p>
                </div>
              </div>
              <div>
                <h3 className="type-display text-xl group-hover:text-gold transition-colors duration-500 text-ink">
                  {video.title}
                </h3>
                <p className="type-body text-stone text-sm mt-1 font-mono">
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
            className="fixed inset-0 z-55 bg-cream/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
            onClick={() => setActiveVideo(null)}
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-6 right-6 type-caption text-xs text-ink hover:text-gold border border-ink/20 hover:border-ink px-4 py-2 transition-all duration-300 z-60 font-mono"
            >
              Close Broadcast ✕
            </button>
            <motion.div
              initial={{ scale: 0.95, y: 20, filter: "blur(4px)" }}
              animate={{ scale: 1, y: 0, filter: "blur(0px)" }}
              exit={{ scale: 0.95, y: 20, filter: "blur(4px)" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[80rem] aspect-[16/9] relative bg-ink overflow-hidden border border-ink/10 rounded-sm shadow-2xl"
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
    <section ref={ref} className="section-cinematic bg-cream-dark/20 border-t border-ink/5">
      <div className="mx-auto max-w-[88rem] px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="type-caption text-gold mb-4 font-mono">VISIT US</p>
          <h2 className="type-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-ink">
            Our Ateliers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {locations.map((location) => (
            <motion.div
              key={location.id}
              className="location-card group cursor-pointer glass-card p-6 rounded-sm border border-ink/5"
              data-cursor="visit"
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
                  <div className="absolute inset-0 bg-gradient-to-t from-cream-dark/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="type-caption text-ink text-xs mb-2 font-mono">{location.city}</p>
                    <h3 className="type-display text-2xl text-ink">{location.name}</h3>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="type-body text-stone">{location.address}</p>
                    <p className="type-caption text-mist text-xs mt-1 font-mono">{location.hours}</p>
                  </div>
                  <span className="type-caption text-gold text-xs group-hover:translate-x-1 transition-transform duration-500 font-mono">
                    Map →
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
    <section ref={ref} className="section-cinematic bg-cream relative overflow-hidden border-t border-ink/5">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gold/20 to-transparent" />
      </div>
      <div className="relative z-10 mx-auto max-w-[88rem] px-6 lg:px-8 text-center">
        <p className="type-caption text-gold mb-6 font-mono uppercase">ATELIER EXPERIENCE</p>
        <h2 className="type-display text-4xl md:text-5xl lg:text-7xl leading-[1.05] mb-8 text-ink">
          Ready to taste
          <br />
          <span className="text-gold">the difference?</span>
        </h2>
        <p className="type-serif text-xl text-stone max-w-2xl mx-auto mb-12 leading-relaxed">
          Join us for an unforgettable dining experience. Reserve your table and discover why BIGGIES BURGER is Bangalore&apos;s premier burger kitchen.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setIsReserveModalOpen(true)}
            className="group inline-flex items-center gap-3 bg-gold text-ink px-10 py-5 type-caption text-xs font-mono hover:bg-ink hover:text-cream transition-colors duration-500 shadow-xl"
          >
            Make a Reservation
            <span className="group-hover:translate-x-1 transition-transform duration-500">→</span>
          </button>
          <Link
            href="/menu"
            className="inline-flex items-center gap-3 border border-ink/20 text-ink px-10 py-5 type-caption text-xs hover:border-ink hover:bg-ink hover:text-cream transition-all duration-500 font-mono"
          >
            Explore Menu
          </Link>
        </div>
      </div>

      {/* Reservation Interactive Modal */}
      <AnimatePresence>
        {isReserveModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-55 bg-ink/70 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setIsReserveModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-cream border border-ink/10 max-w-lg w-full p-8 rounded-sm shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsReserveModalOpen(false)}
                className="absolute top-4 right-4 text-xs font-mono text-mist hover:text-ink"
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
                  <p className="type-caption text-gold font-mono">TABLE RESERVATION</p>
                  <h3 className="type-display text-3xl text-ink">Reserve Your Atelier Specimen</h3>
                  
                  <div className="space-y-4 font-mono text-xs text-stone">
                    <div>
                      <label className="block mb-1">GUEST NAME</label>
                      <input
                        required
                        type="text"
                        placeholder="Alex Rivera"
                        className="w-full bg-cream-dark/30 border border-ink/10 p-3 rounded-sm text-ink focus:outline-none focus:border-gold"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-1">GUESTS</label>
                        <select className="w-full bg-cream-dark/30 border border-ink/10 p-3 rounded-sm text-ink focus:outline-none focus:border-gold">
                          <option>2 Guests</option>
                          <option>4 Guests</option>
                          <option>6 Guests</option>
                          <option>8+ Guests</option>
                        </select>
                      </div>
                      <div>
                        <label className="block mb-1">LOCATION</label>
                        <select className="w-full bg-cream-dark/30 border border-ink/10 p-3 rounded-sm text-ink focus:outline-none focus:border-gold">
                          <option>Indiranagar (12th Main)</option>
                          <option>Whitefield (Miraya Rose)</option>
                          <option>Bellandur (Ecoworld)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-ink text-cream py-4 type-caption text-xs font-mono hover:bg-gold hover:text-ink transition-colors duration-500"
                  >
                    Confirm Reservation →
                  </button>
                </form>
              ) : (
                <div className="text-center py-8 space-y-4">
                  <p className="type-caption text-gold font-mono">RESERVATION CONFIRMED</p>
                  <h3 className="type-display text-4xl text-ink">See You Soon</h3>
                  <p className="type-serif text-stone">
                    Your table at BIGGIES BURGER Atelier has been reserved. A confirmation SMS has been dispatched.
                  </p>
                  <button
                    onClick={() => {
                      setReserved(false);
                      setIsReserveModalOpen(false);
                    }}
                    className="mt-4 bg-ink text-cream px-6 py-3 text-xs font-mono uppercase"
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
