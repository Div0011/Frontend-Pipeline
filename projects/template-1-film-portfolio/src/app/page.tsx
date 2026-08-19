import Hero from "@/components/Hero";
import AnimationHistory from "@/components/AnimationHistory";
import Footer from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import LenisProvider from "@/components/LenisProvider";

export default function Home() {
  return (
    <LenisProvider>
      <main className="flex flex-1 flex-col bg-[#0c0b0a] text-white selection:bg-[#c9a96e] selection:text-black min-h-screen">
        <CustomCursor />
        <Hero />
        <AnimationHistory />
        <Footer />
      </main>
    </LenisProvider>
  );
}



