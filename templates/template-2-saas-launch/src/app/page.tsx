"use client";

import dynamic from "next/dynamic";
import Navigation from "@/components/Navigation";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Features from "@/components/sections/Features";
import Pricing from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";
import Cta from "@/components/sections/Cta";
import Footer from "@/components/sections/Footer";

const LenisProvider = dynamic(() => import("@/components/LenisProvider"), { ssr: false });

export default function Home() {
  return (
    <LenisProvider>
      <main className="relative min-h-screen bg-background text-foreground antialiased">
        <div className="film-grain" aria-hidden="true" />
        <Navigation />
        <Hero />
        <Stats />
        <Features />
        <Pricing />
        <Testimonials />
        <Cta />
        <Footer />
      </main>
    </LenisProvider>
  );
}
