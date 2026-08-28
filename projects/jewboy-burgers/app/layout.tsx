import InteractiveBackground from "@/components/ui/InteractiveBackground";
import AtmosphereControls from "@/components/ui/AtmosphereControls";
import type { Metadata } from "next";
import LenisProvider from "@/components/providers/LenisProvider";
import CustomCursor from "@/components/marketing/CustomCursor";
import "./globals.css";

export const metadata: Metadata = {
  title: "JewBoy Burgers | AUSTIN",
  description: "JewBoy Burgers — Culinary craft atelier in Austin.",
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
          <InteractiveBackground primaryColor="#FFFFFF" themeBase="#050c10" />
          <CustomCursor />
          {children}
          <AtmosphereControls primaryColor="#FFFFFF" darkBg="#0A0A0A" lightBg="#FFFFFF" />
        </LenisProvider>
      </body>
    </html>
  );
}
