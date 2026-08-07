"use client";

import { useState } from "react";
import Nav from "@/components/marketing/Nav";
import CinematicHero from "@/components/marketing/CinematicHero";
import BrandManifesto from "@/components/marketing/BrandManifesto";
import ScrollytellingText from "@/components/marketing/ScrollytellingText";
import AtelierAssembly from "@/components/marketing/AtelierAssembly";
import CinematicSmoothie from "@/components/marketing/CinematicSmoothie";
import SignatureMenu from "@/components/marketing/SignatureMenu";
import HowWeSmash from "@/components/marketing/HowWeSmash";
import RestaurantLocations from "@/components/marketing/RestaurantLocations";
import ReservationCTA from "@/components/marketing/ReservationCTA";
import Footer from "@/components/marketing/Footer";
import Preloader from "@/components/marketing/Preloader";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading ? (
        <Preloader onComplete={() => setLoading(false)} />
      ) : (
        <>
          <Nav />

          {/* 1. Scroll-driven cinematic hero — burger frame sequence */}
          <CinematicHero />

          {/* 2. Brand manifesto — dark section, massive text, tag ticker */}
          <BrandManifesto />

          {/* 3. Scrollytelling text — kinetic typography on light bg */}
          <ScrollytellingText />

          {/* 4. Atelier Assembly — scroll-driven burger build assembly */}
          <AtelierAssembly />

          {/* 5. Cinematic smoothie — scroll-driven smoothie frame sequence */}
          <CinematicSmoothie />

          {/* 6. Signature menu — filterable cards on bone bg */}
          <SignatureMenu />

          {/* 7. How We Smash — yellow bg, 3-step process */}
          <HowWeSmash />

          {/* 8. Locations — dark charcoal, 4 location cards */}
          <RestaurantLocations />

          {/* 9. Reservation CTA — warm bone, book a table form */}
          <ReservationCTA />

          {/* 10. Footer — dark, full restaurant footer */}
          <Footer />
        </>
      )}
    </>
  );
}
