"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "@/components/marketing/Preloader";
import Nav from "@/components/marketing/Nav";
import CinematicHero from "@/components/marketing/CinematicHero";
import BrandManifesto from "@/components/marketing/BrandManifesto";
import ScrollytellingText from "@/components/marketing/ScrollytellingText";
import CulinaryAccordionGallery from "@/components/marketing/CulinaryAccordionGallery";
import AtelierAssembly from "@/components/marketing/AtelierAssembly";
import CinematicSmoothie from "@/components/marketing/CinematicSmoothie";
import ArchetypeShowcase from "@/components/marketing/ArchetypeShowcase";
import SignatureMenu from "@/components/marketing/SignatureMenu";
import CraftMatrixBuilder from "@/components/marketing/CraftMatrixBuilder";
import HowWeSmash from "@/components/marketing/HowWeSmash";
import RestaurantLocations from "@/components/marketing/RestaurantLocations";
import ReservationCTA from "@/components/marketing/ReservationCTA";
import Footer from "@/components/marketing/Footer";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <main className="relative z-10">
        <Nav />
        <CinematicHero />
        <BrandManifesto />
        <ScrollytellingText />
        <CulinaryAccordionGallery />
        <AtelierAssembly />
        <CinematicSmoothie />
        <ArchetypeShowcase />
        <CraftMatrixBuilder primaryColor="#FFE500" currency="$" />
        <SignatureMenu />
        <HowWeSmash />
        <RestaurantLocations />
        <ReservationCTA />
        <Footer />
      </main>
    </>
  );
}
