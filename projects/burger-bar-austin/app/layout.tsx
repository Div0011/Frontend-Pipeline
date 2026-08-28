import InteractiveBackground from "@/components/ui/InteractiveBackground";
import AtmosphereControls from "@/components/ui/AtmosphereControls";
import type { Metadata } from "next";
import LenisProvider from "@/components/providers/LenisProvider";
import CustomCursor from "@/components/marketing/CustomCursor";
import "./globals.css";

export const metadata: Metadata = {
  title: "Burger Bar on Congress | AUSTIN",
  description: "Burger Bar on Congress — Culinary craft atelier in Austin.",
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
          <InteractiveBackground primaryColor="#2563EB" themeBase="#060a12" />
          <CustomCursor />
          {children}
          <AtmosphereControls primaryColor="#2563EB" darkBg="#060a12" lightBg="#FAF8F2" />
        </LenisProvider>
      </body>
    </html>
  );
}
