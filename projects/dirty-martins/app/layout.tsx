import InteractiveBackground from "@/components/ui/InteractiveBackground";
import AtmosphereControls from "@/components/ui/AtmosphereControls";
import type { Metadata } from "next";
import LenisProvider from "@/components/providers/LenisProvider";
import CustomCursor from "@/components/marketing/CustomCursor";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dirty Martin's Kum-Bak | AUSTIN",
  description: "Dirty Martin's Kum-Bak — Historic 1926 Culinary Craft in Austin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className="antialiased overflow-x-hidden bg-white text-black transition-colors duration-500">
        <LenisProvider>
          <InteractiveBackground primaryColor="#C68A14" themeBase="#FFFFFF" />
          <CustomCursor />
          {children}
          <AtmosphereControls primaryColor="#C68A14" darkBg="#FFFFFF" lightBg="#FAF8F2" />
        </LenisProvider>
      </body>
    </html>
  );
}
