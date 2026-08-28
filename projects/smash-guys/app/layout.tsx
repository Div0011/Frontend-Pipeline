import InteractiveBackground from "@/components/ui/InteractiveBackground";
import AtmosphereControls from "@/components/ui/AtmosphereControls";
import type { Metadata } from "next";
import LenisProvider from "@/components/providers/LenisProvider";
import CustomCursor from "@/components/marketing/CustomCursor";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smash Guys | BENGALURU",
  description: "Smash Guys — Culinary craft atelier in Bengaluru.",
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
          <InteractiveBackground primaryColor="#F5C418" themeBase="#071009" />
          <CustomCursor />
          {children}
          <AtmosphereControls primaryColor="#F5C418" darkBg="#071009" lightBg="#F6F4EE" />
        </LenisProvider>
      </body>
    </html>
  );
}
