"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import OpticalDevices from "./OpticalDevices";
import MultiplaneCel from "./MultiplaneCel";
import { Play, Film, Award, Tv, Sparkles, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CHAPTERS = [
  { id: "chapter-1", num: "01", title: "Early Ways of Showing Motion", era: "30,000 B.C. – 1500 A.D." },
  { id: "chapter-2", num: "02", title: "Animation Before Film", era: "1600 – 1877" },
  { id: "chapter-3", num: "03", title: "The Silent Era", era: "1900 – 1930" },
  { id: "chapter-4", num: "04", title: "The Golden Age of Animation", era: "1930s – 1950s" },
  { id: "chapter-5", num: "05", title: "The American Television Era", era: "1960s – 1980s" },
  { id: "chapter-6", num: "06", title: "Modern American & CGI Era", era: "1980 – 2026" },
];

const TV_SHOWS = [
  { year: "1960", title: "The Flintstones", desc: "First animated series to broadcast on prime-time American television.", icon: "🦴" },
  { year: "1961", title: "Yogi Bear", desc: "Popular Hanna-Barbera spin-off that captivated national weekend TV.", icon: "🐻" },
  { year: "1964", title: "The Pink Phink", desc: "DePatie-Freleng wins the Academy Award for Best Animated Short.", icon: "🐆" },
  { year: "1972", title: "Fritz the Cat", desc: "Ralph Bakshi directs the first X-rated adult animated feature film.", icon: "🐱" },
];

export default function AnimationHistory() {
  const [activeTvIndex, setActiveTvIndex] = useState(0);
  const [cgiSliderPos, setCgiSliderPos] = useState(50);
  const [selectedFilm, setSelectedFilm] = useState<{ title: string; year: string; videoUrl: string } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // GSAP ScrollTrigger Background Color Transition & Scroll Reveals
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Scroll Reveal for Section Headers & Cards
      const revealElements = containerRef.current?.querySelectorAll("[data-scroll-reveal]");
      revealElements?.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Background Color Tint Shift on Chapter 2 and Chapter 4
      const ch2 = containerRef.current?.querySelector("#chapter-2");
      if (ch2) {
        gsap.to(containerRef.current, {
          backgroundColor: "#161412",
          scrollTrigger: {
            trigger: ch2,
            start: "top 50%",
            end: "bottom 50%",
            scrub: 1,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#0a0a0c] text-white selection:bg-[#c9a96e] selection:text-black transition-colors duration-700">
      {/* Time-Travel Floating Bar */}
      <div className="sticky top-20 z-40 bg-[#0e0d0c]/90 backdrop-blur-xl border-y border-[#c9a96e]/30 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto gap-6 scrollbar-none font-mono text-xs">
          <span className="text-[#c9a96e] font-bold uppercase tracking-widest flex items-center gap-2 shrink-0">
            <Film className="w-3.5 h-3.5" /> ERA NAVIGATOR:
          </span>
          <div className="flex items-center gap-6">
            {CHAPTERS.map((ch) => (
              <a
                key={ch.id}
                href={`#${ch.id}`}
                className="text-white/60 hover:text-[#c9a96e] transition-colors whitespace-nowrap uppercase tracking-wider"
              >
                <span className="text-[#c9a96e] font-bold mr-1">{ch.num}.</span> {ch.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-32">
        {/* Intro Prologue Section */}
        <section data-scroll-reveal className="bg-vintage-parchment border border-[#c9a96e]/30 p-8 sm:p-12 shadow-2xl relative">
          <div className="max-w-3xl space-y-6">
            <span className="font-mono text-xs text-[#c9a96e] uppercase tracking-[0.3em] font-bold">
              HISTORICAL PROLOGUE // THE MAGIC OF MOTION
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white leading-tight">
              Animation Is Everywhere.
            </h2>
            <p className="drop-cap font-serif text-lg leading-relaxed text-white/80 font-light">
              You don&rsquo;t have to be a cartoonist to have animation be a big part of your life. Animation is everywhere—in our homes, schools, work, and everywhere there&rsquo;s a screen. From the earliest bronze-age pottery leaps to Disney&rsquo;s Hand-Drawn Classics and Pixar&rsquo;s 3D CGI masterpieces, this is the story of human imagination brought to life.
            </p>
          </div>
        </section>

        {/* Chapter 01 */}
        <section id="chapter-1" className="space-y-12 pt-8">
          <div data-scroll-reveal className="border-b border-[#c9a96e]/30 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="w-10 h-10 rounded-full gold-seal flex items-center justify-center font-mono text-black font-extrabold text-sm mb-3">
                01
              </div>
              <span className="font-mono text-xs text-[#c9a96e] uppercase tracking-widest font-bold">
                30,000 B.C. – 1500 A.D.
              </span>
              <h2 className="font-serif text-4xl sm:text-6xl font-bold uppercase text-white mt-1">
                Early Ways of Showing Motion
              </h2>
            </div>
            <p className="font-mono text-xs text-white/60 max-w-md leading-relaxed">
              Archeological artifacts prove humans attempted to depict motion long before cameras existed.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div data-scroll-reveal className="bg-[#121110] border border-white/10 p-6 space-y-4">
              <div className="font-mono text-xs text-[#c9a96e]">3,000 B.C. // SHAHR-E SUKHTEH, IRAN</div>
              <h3 className="font-serif text-2xl font-bold text-white">The Leaping Goats Pottery Bowl</h3>
              <div className="aspect-[16/10] relative border border-white/10 bg-black overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=1000&q=80"
                  alt="Ancient pottery motion depictions"
                  fill
                  className="object-cover filter contrast-125"
                />
              </div>
              <p className="text-xs text-white/70 font-mono font-light leading-relaxed">
                A bronze-age earthenware bowl featuring five sequential drawings of a goat leaping to eat leaves from a tree—the earliest known example of sequential animation.
              </p>
            </div>

            <div data-scroll-reveal className="bg-[#121110] border border-white/10 p-6 space-y-4">
              <div className="font-mono text-xs text-[#c9a96e]">1500 A.D. // LEONARDO DA VINCI</div>
              <h3 className="font-serif text-2xl font-bold text-white">The Vitruvian Man Movement</h3>
              <div className="aspect-[16/10] relative border border-white/10 bg-black overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1000&q=80"
                  alt="Da Vinci Vitruvian Man Anatomy"
                  fill
                  className="object-cover filter sepia-[0.4]"
                />
              </div>
              <p className="text-xs text-white/70 font-mono font-light leading-relaxed">
                Leonardo da Vinci&rsquo;s famous anatomical drawing illustrates multiple superimposed arm and leg positions to imply continuous kinematic motion.
              </p>
            </div>
          </div>
        </section>

        {/* Chapter 02: Optical Devices */}
        <section id="chapter-2" className="space-y-12 pt-8">
          <div data-scroll-reveal className="border-b border-[#c9a96e]/30 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="w-10 h-10 rounded-full gold-seal flex items-center justify-center font-mono text-black font-extrabold text-sm mb-3">
                02
              </div>
              <span className="font-mono text-xs text-[#c9a96e] uppercase tracking-widest font-bold">
                1600 – 1877
              </span>
              <h2 className="font-serif text-4xl sm:text-6xl font-bold uppercase text-white mt-1">
                Animation Before Film
              </h2>
            </div>
            <p className="font-mono text-xs text-white/60 max-w-md leading-relaxed">
              With the Industrial Revolution came mechanical devices that created moving projected optical illusions.
            </p>
          </div>

          <div data-scroll-reveal>
            <OpticalDevices />
          </div>
        </section>

        {/* Chapter 03: The Silent Era */}
        <section id="chapter-3" className="space-y-12 pt-8">
          <div data-scroll-reveal className="border-b border-[#c9a96e]/30 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="w-10 h-10 rounded-full gold-seal flex items-center justify-center font-mono text-black font-extrabold text-sm mb-3">
                03
              </div>
              <span className="font-mono text-xs text-[#c9a96e] uppercase tracking-widest font-bold">
                1900 – 1930
              </span>
              <h2 className="font-serif text-4xl sm:text-6xl font-bold uppercase text-white mt-1">
                The Silent Era
              </h2>
            </div>
            <p className="font-mono text-xs text-white/60 max-w-md leading-relaxed">
              The birth of theatrical cartoons, hand-drawn animation, and Mickey Mouse in Steamboat Willie (1928).
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div data-scroll-reveal className="bg-[#121110] border border-white/10 p-6 space-y-4">
              <span className="font-mono text-[10px] text-[#c9a96e]">1906 // J. STUART BLACKTON</span>
              <h4 className="font-serif text-xl font-bold">Humorous Phases of Funny Faces</h4>
              <p className="text-xs text-white/60 font-mono leading-relaxed">
                Recognized as the first entirely animated film on standard motion-picture stock, using stop-motion photography on blackboard chalk drawings.
              </p>
            </div>

            <div data-scroll-reveal className="bg-[#121110] border border-white/10 p-6 space-y-4">
              <span className="font-mono text-[10px] text-[#c9a96e]">1908 // ÉMILE CORTET (ÉMILE Cohl)</span>
              <h4 className="font-serif text-xl font-bold">Fantasmagorie</h4>
              <p className="text-xs text-white/60 font-mono leading-relaxed">
                Created using 700 individual hand drawings photographed onto negative film, widely regarded by historians as the first traditional animated cartoon.
              </p>
            </div>

            <div data-scroll-reveal className="bg-[#121110] border border-white/10 p-6 space-y-4">
              <span className="font-mono text-[10px] text-[#c9a96e]">1914 // WINDSOR MCCAY</span>
              <h4 className="font-serif text-xl font-bold">Gertie the Dinosaur</h4>
              <p className="text-xs text-white/60 font-mono leading-relaxed">
                The first animated cartoon featuring a distinct, appealing character with personality and emotional keyframes.
              </p>
            </div>
          </div>

          {/* Steamboat Willie Showcase */}
          <div data-scroll-reveal className="bg-[#151412] border border-[#c9a96e]/40 p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="font-mono text-xs text-[#c9a96e] uppercase tracking-widest font-bold">
                  1928 // SOUND-ON-FILM REVOLUTION
                </span>
                <h3 className="font-serif text-3xl md:text-5xl font-bold uppercase">
                  Steamboat Willie
                </h3>
                <p className="font-mono text-xs text-white/70 leading-relaxed font-light">
                  Featuring Mickey Mouse, <em className="text-[#c9a96e]">Steamboat Willie</em> was the first cartoon released with fully synchronized sound printed directly on the film strip.
                </p>
                <button
                  onClick={() =>
                    setSelectedFilm({
                      title: "Steamboat Willie",
                      year: "1928",
                      videoUrl: "https://cdn.coverr.co/videos/coverr-cinematic-night-lights-4421/1080p.mp4",
                    })
                  }
                  className="mt-4 flex items-center gap-3 bg-[#c9a96e] hover:bg-[#b8985d] text-black font-mono text-xs font-bold uppercase tracking-widest px-6 py-3 transition-colors cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-black" /> WATCH RESTORED 1928 REEL
                </button>
              </div>

              <div className="lg:col-span-5 aspect-video relative border-2 border-[#c9a96e] overflow-hidden bg-black shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1000&q=80"
                  alt="Steamboat Willie vintage reel frame"
                  fill
                  className="object-cover filter grayscale contrast-150"
                />
              </div>
            </div>
          </div>

          {/* Walt Disney Tribute Spotlight */}
          <div data-scroll-reveal className="bg-vintage-parchment border border-[#c9a96e]/30 p-8 sm:p-12 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#c9a96e]/30 pb-6 gap-6">
              <div>
                <span className="font-mono text-[10px] text-[#c9a96e] font-bold uppercase tracking-widest">
                  FEATURED ANIMATOR SPOTLIGHT
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white uppercase mt-1">
                  Walt Disney (1901 – 1966)
                </h3>
              </div>

              <blockquote className="font-serif text-lg italic text-[#c9a96e] border-l-2 border-[#c9a96e] pl-4 max-w-md">
                &ldquo;If you can dream it, you can do it.&rdquo;
              </blockquote>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-center">
              <div className="bg-[#0e0d0c] border border-white/10 p-6">
                <div className="font-serif text-4xl font-bold text-[#c9a96e] mb-1">22</div>
                <div className="text-[10px] text-white/60 uppercase tracking-widest">ACADEMY AWARDS WON</div>
              </div>
              <div className="bg-[#0e0d0c] border border-white/10 p-6">
                <div className="font-serif text-4xl font-bold text-[#c9a96e] mb-1">7</div>
                <div className="text-[10px] text-white/60 uppercase tracking-widest">EMMY AWARDS HONORS</div>
              </div>
              <div className="bg-[#0e0d0c] border border-white/10 p-6">
                <div className="font-serif text-4xl font-bold text-[#c9a96e] mb-1">59</div>
                <div className="text-[10px] text-white/60 uppercase tracking-widest">CAREER OSCAR NOMINATIONS</div>
              </div>
            </div>
          </div>
        </section>

        {/* Chapter 04: Golden Age */}
        <section id="chapter-4" className="space-y-12 pt-8">
          <div data-scroll-reveal className="border-b border-[#c9a96e]/30 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="w-10 h-10 rounded-full gold-seal flex items-center justify-center font-mono text-black font-extrabold text-sm mb-3">
                04
              </div>
              <span className="font-mono text-xs text-[#c9a96e] uppercase tracking-widest font-bold">
                1930s – 1950s
              </span>
              <h2 className="font-serif text-4xl sm:text-6xl font-bold uppercase text-white mt-1">
                The Golden Age of Animation
              </h2>
            </div>
            <p className="font-mono text-xs text-white/60 max-w-md leading-relaxed">
              Defined by the rise of Disney features, Warner Brothers (Bugs Bunny), MGM (Tom & Jerry), and Fleischer.
            </p>
          </div>

          <div data-scroll-reveal>
            <MultiplaneCel />
          </div>
        </section>

        {/* Chapter 05: Television Era */}
        <section id="chapter-5" className="space-y-12 pt-8">
          <div data-scroll-reveal className="border-b border-[#c9a96e]/30 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="w-10 h-10 rounded-full gold-seal flex items-center justify-center font-mono text-black font-extrabold text-sm mb-3">
                05
              </div>
              <span className="font-mono text-xs text-[#c9a96e] uppercase tracking-widest font-bold">
                1960s – 1980s
              </span>
              <h2 className="font-serif text-4xl sm:text-6xl font-bold uppercase text-white mt-1">
                The American Television Era
              </h2>
            </div>
            <p className="font-mono text-xs text-white/60 max-w-md leading-relaxed">
              Cartoons adapted to American living rooms with Hanna-Barbera, Nickelodeon, and limited-animation techniques.
            </p>
          </div>

          {/* Interactive Retro TV Tube Tuner */}
          <div data-scroll-reveal className="bg-[#121110] border border-white/10 p-8 md:p-12">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 bg-black border-8 border-[#262420] rounded-3xl p-6 relative crt-scanlines shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/20 pb-3 mb-6 font-mono text-xs text-[#c9a96e]">
                  <span className="flex items-center gap-2 font-bold"><Tv className="w-4 h-4" /> RETRO CRT TUBE // CHANNEL 0{activeTvIndex + 1}</span>
                  <span>{TV_SHOWS[activeTvIndex].year}</span>
                </div>
                <div className="aspect-video bg-[#1a1917] border border-white/10 flex flex-col items-center justify-center p-6 text-center space-y-4">
                  <div className="text-6xl">{TV_SHOWS[activeTvIndex].icon}</div>
                  <h4 className="font-serif text-3xl font-bold text-white uppercase">{TV_SHOWS[activeTvIndex].title}</h4>
                  <p className="font-mono text-xs text-white/70 max-w-md leading-relaxed">{TV_SHOWS[activeTvIndex].desc}</p>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4 font-mono text-xs">
                <span className="text-[#c9a96e] font-bold uppercase tracking-widest">TUNE TV CHANNELS:</span>
                <div className="space-y-3">
                  {TV_SHOWS.map((show, idx) => (
                    <button
                      key={show.title}
                      onClick={() => setActiveTvIndex(idx)}
                      className={`w-full text-left p-4 border transition-all cursor-pointer ${
                        activeTvIndex === idx
                          ? "border-[#c9a96e] bg-[#c9a96e]/10 text-white font-bold"
                          : "border-white/10 bg-black/40 text-white/60 hover:border-white/30"
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-[#c9a96e]">CHAN 0{idx + 1}</span>
                        <span>{show.year}</span>
                      </div>
                      <div className="font-serif text-lg font-bold text-white">{show.title}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Chapter 06: Modern CGI Era */}
        <section id="chapter-6" className="space-y-12 pt-8">
          <div data-scroll-reveal className="border-b border-[#c9a96e]/30 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="w-10 h-10 rounded-full gold-seal flex items-center justify-center font-mono text-black font-extrabold text-sm mb-3">
                06
              </div>
              <span className="font-mono text-xs text-[#c9a96e] uppercase tracking-widest font-bold">
                1980 – 2026
              </span>
              <h2 className="font-serif text-4xl sm:text-6xl font-bold uppercase text-white mt-1">
                Modern CGI & 3D Era
              </h2>
            </div>
            <p className="font-mono text-xs text-white/60 max-w-md leading-relaxed">
              Computer-generated imagery revolutionized animation, replacing hand drawing with 3D polygon modeling & volumetric rendering.
            </p>
          </div>

          {/* 3D Wireframe vs Rendered CGI Interactive Slider */}
          <div data-scroll-reveal className="bg-[#121110] border border-[#c9a96e]/30 p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4 font-mono text-xs">
              <span className="text-[#c9a96e] font-bold uppercase tracking-widest flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> INTERACTIVE CGI COMPARISON SLIDER: TOY STORY (1995)
              </span>
              <span className="text-white/50">SLIDE LEFT TO VIEW WIREFRAME MESH</span>
            </div>

            <div className="relative aspect-video w-full border border-white/20 overflow-hidden bg-black select-none">
              {/* Rendered View */}
              <Image
                src="https://images.unsplash.com/photo-1536440136628-849c177e76bf?w=1600&q=90"
                alt="Full CGI Rendered Scene"
                fill
                className="object-cover"
              />

              {/* Wireframe Overlay View */}
              <div
                className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-[#c9a96e] bg-black"
                style={{ width: `${cgiSliderPos}%` }}
              >
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src="https://images.unsplash.com/photo-1509198377868-475647b2a1e5?w=1600&q=90"
                    alt="Wireframe Mesh Polygon Model"
                    fill
                    className="object-cover filter grayscale contrast-200 invert"
                  />
                </div>
              </div>

              {/* Range Input Control overlay */}
              <input
                type="range"
                min="0"
                max="100"
                value={cgiSliderPos}
                onChange={(e) => setCgiSliderPos(Number(e.target.value))}
                className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-30"
              />
            </div>
          </div>
        </section>
      </div>

      {/* Video Modal Lightbox */}
      {selectedFilm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl p-4 sm:p-8">
          <div className="relative w-full max-w-4xl bg-[#0c0c0e] border border-[#c9a96e] shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#070709]">
              <div className="font-mono text-xs text-[#c9a96e] tracking-widest uppercase font-bold flex items-center gap-2">
                <Film className="w-4 h-4" /> PLAYING HISTORICAL FILM: {selectedFilm.title} ({selectedFilm.year})
              </div>
              <button
                onClick={() => setSelectedFilm(null)}
                className="p-2 text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="aspect-video relative bg-black">
              <video src={selectedFilm.videoUrl} controls autoPlay className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

