import InteractiveBackground from "@/components/ui/InteractiveBackground";
import AtmosphereControls from "@/components/ui/AtmosphereControls";
import type { Metadata } from "next";
import LenisProvider from "@/components/providers/LenisProvider";
import CustomCursor from "@/components/marketing/CustomCursor";
import "./globals.css";

export const metadata: Metadata = {
  title: "BURGER ELITE | BENGALURU",
  description: "BURGER ELITE — Culinary craft atelier in Bengaluru.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-[#070709] text-[#FAF8F2] overflow-x-hidden transition-colors duration-500">
        <LenisProvider>
          <InteractiveBackground primaryColor="#7C3AED" themeBase="#0b0614" />
          <CustomCursor />
          {children}
          <AtmosphereControls primaryColor="#7C3AED" darkBg="#0b0614" lightBg="#F7F5F0" />
        </LenisProvider>
      </body>
    </html>
  );
}
