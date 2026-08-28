"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Loader from "@/components/Loader";
import MuseumNav from "@/components/sections/MuseumNav";
import HeroFog from "@/components/sections/HeroFog";
import ExhibitionHero from "@/components/sections/ExhibitionHero";
import HorizontalGallerySection from "@/components/sections/HorizontalGallerySection";
import CollectionGrid from "@/components/sections/CollectionGrid";
import VisitSection from "@/components/sections/VisitSection";
import MuseumFooter from "@/components/sections/MuseumFooter";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [loading, setLoading] = useState(true);

  const handleLoadComplete = () => {
    setLoading(false);
  };

  return (
    <main className="relative z-10 text-bone">
      {loading && <Loader onComplete={handleLoadComplete} />}

      {!loading && (
        <>
          <MuseumNav />

          {/* Chapter 1: Cinematic Video Hero */}
          <HeroFog />

          {/* Chapter 2: Current Exhibition */}
          <ExhibitionHero />

          {/* Chapter 3: Featured Works — Horizontal Gallery */}
          <HorizontalGallerySection />

          {/* Chapter 4: The Collection */}
          <CollectionGrid />

          {/* Chapter 5: Visit & Experience */}
          <VisitSection />

          {/* Chapter 6: Closing */}
          <MuseumFooter />
        </>
      )}
    </main>
  );
}
