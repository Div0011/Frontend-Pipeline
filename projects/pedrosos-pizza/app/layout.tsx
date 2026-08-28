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
          <InteractiveBackground primaryColor="#B91C1C" themeBase="#0e0505" />
          <CustomCursor />
          {children}
          <AtmosphereControls primaryColor="#B91C1C" darkBg="#0e0505" lightBg="#FAF8F2" />
        </LenisProvider>
      </body>
    </html>
  );
}
