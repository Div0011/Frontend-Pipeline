import InteractiveBackground from "@/components/ui/InteractiveBackground";
import AtmosphereControls from "@/components/ui/AtmosphereControls";
import type { Metadata } from "next";
import LenisProvider from "@/components/providers/LenisProvider";
import CustomCursor from "@/components/marketing/CustomCursor";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sour Duck Market | AUSTIN",
  description: "Sour Duck Market — Culinary craft atelier in Austin.",
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
          <InteractiveBackground primaryColor="#EA580C" themeBase="#100804" />
          <CustomCursor />
          {children}
          <AtmosphereControls primaryColor="#EA580C" darkBg="#100804" lightBg="#FAF8F2" />
        </LenisProvider>
      </body>
    </html>
  );
}
