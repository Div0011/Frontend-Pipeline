import InteractiveBackground from "@/components/ui/InteractiveBackground";
import AtmosphereControls from "@/components/ui/AtmosphereControls";
import type { Metadata } from "next";
import LenisProvider from "@/components/providers/LenisProvider";
import CustomCursor from "@/components/marketing/CustomCursor";
import "./globals.css";

export const metadata: Metadata = {
  title: "Louis Burger | BENGALURU",
  description: "Louis Burger — Culinary craft atelier in Bengaluru.",
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
          <InteractiveBackground primaryColor="#D4AF37" themeBase="#0d0b06" />
          <CustomCursor />
          {children}
          <AtmosphereControls primaryColor="#D4AF37" darkBg="#0d0b06" lightBg="#FAF8F2" />
        </LenisProvider>
      </body>
    </html>
  );
}
