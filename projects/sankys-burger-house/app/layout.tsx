import InteractiveBackground from "@/components/ui/InteractiveBackground";
import AtmosphereControls from "@/components/ui/AtmosphereControls";
import type { Metadata } from "next";
import LenisProvider from "@/components/providers/LenisProvider";
import CustomCursor from "@/components/marketing/CustomCursor";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sanky's Burger House | BENGALURU",
  description: "Sanky's Burger House — Culinary craft atelier in Bengaluru.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased overflow-x-hidden transition-colors duration-500">
        <LenisProvider>
          <InteractiveBackground primaryColor="#FFE500" themeBase="#08080a" />
          <CustomCursor />
          {children}
          <AtmosphereControls primaryColor="#FFE500" darkBg="#08080a" lightBg="#FAF8F2" />
        </LenisProvider>
      </body>
    </html>
  );
}
