import InteractiveBackground from "@/components/ui/InteractiveBackground";
import AtmosphereControls from "@/components/ui/AtmosphereControls";
import type { Metadata } from "next";
import LenisProvider from "@/components/providers/LenisProvider";
import CustomCursor from "@/components/marketing/CustomCursor";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pedroso's Pizza | AUSTIN",
  description: "Pedroso's Pizza — Culinary craft atelier in Austin.",
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
          <InteractiveBackground primaryColor="#D91C24" themeBase="#0e0505" />
          <CustomCursor />
          {children}
          <AtmosphereControls primaryColor="#D91C24" darkBg="#0A0A0A" lightBg="#FBF8F0" />
        </LenisProvider>
      </body>
    </html>
  );
}
