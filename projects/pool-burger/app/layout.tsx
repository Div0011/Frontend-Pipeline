import InteractiveBackground from "@/components/ui/InteractiveBackground";
import AtmosphereControls from "@/components/ui/AtmosphereControls";
import type { Metadata } from "next";
import LenisProvider from "@/components/providers/LenisProvider";
import CustomCursor from "@/components/marketing/CustomCursor";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pool Burger | AUSTIN",
  description: "Pool Burger — Culinary craft atelier in Austin.",
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
          <InteractiveBackground primaryColor="#F43F5E" themeBase="#0f0509" />
          <CustomCursor />
          {children}
          <AtmosphereControls primaryColor="#F43F5E" darkBg="#0f0509" lightBg="#F7F5F0" />
        </LenisProvider>
      </body>
    </html>
  );
}
