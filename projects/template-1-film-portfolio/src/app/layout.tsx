import type { Metadata } from "next";
import { Syne, Cinzel, Inter, Geist_Mono } from "next/font/google";
import { LenisProvider } from "@/components/providers/LenisProvider";
import Preloader from "@/components/Preloader";
import { CustomCursor } from "@/components/CustomCursor";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

const cinzel = Cinzel({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Author — Cinematic Film Portfolio",
  description: "Creative / Film Portfolio by Author",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${cinzel.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white font-syne">
        <CustomCursor />
        <Preloader />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
