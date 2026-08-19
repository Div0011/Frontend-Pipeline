import LenisProvider from "@/components/LenisProvider";
import Hero from "@/components/sections/Hero";
import ParallaxShowcase from "@/components/sections/ParallaxShowcase";
import HotspotExplorer from "@/components/sections/HotspotExplorer";
import TechSpecs from "@/components/sections/TechSpecs";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <LenisProvider>
      <main className="relative min-h-screen bg-transparent">
        <Hero />
        <ParallaxShowcase />
        <HotspotExplorer />
        <TechSpecs />
        <Footer />
      </main>
    </LenisProvider>
  );
}
