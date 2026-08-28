import InteractiveBackground from "@/components/ui/InteractiveBackground";
import AtmosphereControls from "@/components/ui/AtmosphereControls";
import type { Metadata } from "next";
import LenisProvider from "@/components/providers/LenisProvider";
import CustomCursor from "@/components/marketing/CustomCursor";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dirty Martin's Kum-Bak | AUSTIN",
  description: "Dirty Martin's Kum-Bak — Culinary craft atelier in Austin.",
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
          <InteractiveBackground primaryColor="#BF5700" themeBase="#100804" />
          <CustomCursor />
          {children}
          <AtmosphereControls primaryColor="#BF5700" darkBg="#100804" lightBg="#FAF8F2" />
        </LenisProvider>
      </body>
    </html>
  );
}
