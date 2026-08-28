import InteractiveBackground from "@/components/ui/InteractiveBackground";
import AtmosphereControls from "@/components/ui/AtmosphereControls";
import type { Metadata } from "next";
import LenisProvider from "@/components/providers/LenisProvider";
import CustomCursor from "@/components/marketing/CustomCursor";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dan's Hamburgers | AUSTIN",
  description: "Dan's Hamburgers — Culinary craft atelier in Austin.",
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
          <InteractiveBackground primaryColor="#D97706" themeBase="#100a05" />
          <CustomCursor />
          {children}
          <AtmosphereControls primaryColor="#D97706" darkBg="#100a05" lightBg="#FAF8F2" />
        </LenisProvider>
      </body>
    </html>
  );
}
