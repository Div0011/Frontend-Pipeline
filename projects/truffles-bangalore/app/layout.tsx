import InteractiveBackground from "@/components/ui/InteractiveBackground";
import AtmosphereControls from "@/components/ui/AtmosphereControls";
import type { Metadata } from "next";
import LenisProvider from "@/components/providers/LenisProvider";
import CustomCursor from "@/components/marketing/CustomCursor";
import "./globals.css";

export const metadata: Metadata = {
  title: "Truffles | BENGALURU",
  description: "Truffles — Culinary craft atelier in Bengaluru.",
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
          <InteractiveBackground primaryColor="#F5A623" themeBase="#100a06" />
          <CustomCursor />
          {children}
          <AtmosphereControls primaryColor="#F5A623" darkBg="#100a06" lightBg="#FAF8F2" />
        </LenisProvider>
      </body>
    </html>
  );
}
