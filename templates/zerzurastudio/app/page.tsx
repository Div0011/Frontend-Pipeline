"use client";

import { useState, lazy, Suspense } from "react";
import LenisProvider from "./components/LenisProvider";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import CinematicReveal from "./components/CinematicReveal";
import Hero3D from "./components/Hero3D";

const Hero = lazy(() => import("./components/Hero"));
const About = lazy(() => import("./components/About"));
const Projects = lazy(() => import("./components/Projects"));
const Careers = lazy(() => import("./components/Careers"));
const Join = lazy(() => import("./components/Join"));

function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-cinema-black">
      <div className="flex flex-col items-center gap-6">
        <div className="w-8 h-8 border-2 border-cinema-gold/30 border-t-cinema-gold rounded-full animate-spin" />
      </div>
    </div>
  );
}

export default function HomePage() {
  const [revealed, setRevealed] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  return (
    <LenisProvider onScroll={(progress) => setScrollProgress(progress)}>
      <CinematicReveal onComplete={() => setRevealed(true)} />

      {/* Fixed 3D background */}
      <Hero3D scrollProgress={scrollProgress} />

      {revealed && (
        <div className="relative z-10 transition-opacity duration-1000">
          <main className="relative min-h-screen antialiased">
            <Suspense fallback={<Loader />}>
              <Hero />
              <About />
              <Projects />
              <Careers />
              <Join />
            </Suspense>
            <Footer />
          </main>
        </div>
      )}
    </LenisProvider>
  );
}
