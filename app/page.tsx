"use client";

import { useState } from "react";
import LenisProvider from "@/components/LenisProvider";
import Reveal from "@/components/Reveal";
import ScrollProgress from "@/components/ScrollProgress";
import SmashEntrance from "@/components/SmashEntrance";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Sections from "@/components/Sections";
import Footer from "@/components/Footer";
import DraggableStickers from "@/components/DraggableStickers";

export default function HomePage() {
  const [entered, setEntered] = useState(false);

  return (
    <LenisProvider>
      <ScrollProgress />
      {!entered && <SmashEntrance onComplete={() => setEntered(true)} />}
      <div className={entered ? "opacity-100" : "opacity-0 transition-opacity duration-500"}>
        <main className="relative min-h-screen antialiased">
          <DraggableStickers />
          <Nav />
          <Hero />
          <Sections />
          <Footer />
        </main>
      </div>
    </LenisProvider>
  );
}
