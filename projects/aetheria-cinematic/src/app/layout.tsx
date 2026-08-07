import type { Metadata } from "next";
import "./globals.css";
import { Cormorant_Garamond, Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import LenisProvider from "@/components/ui/LenisProvider";
import FilmGrainOverlay from "@/components/ui/FilmGrainOverlay";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aetheria Museum — Where Light Becomes Art",
  description:
    "Aetheria Museum presents a curated journey through contemporary and classical masterworks. Experience art as architecture, light as narrative.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="bg-void text-bone antialiased textured-bg">
        <LenisProvider>
          <ScrollProgress />
          <CustomCursor />
          {children}
          <FilmGrainOverlay />
        </LenisProvider>
      </body>
    </html>
  );
}
