import "@/lib/polyfill";
import type { Metadata } from "next";
import { Oswald, Caveat, Inter } from "next/font/google";
import "./globals.css";
import DoodleBackground from "@/components/DoodleBackground";
import TransitionOverlay from "@/components/TransitionOverlay";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-script",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});


export const metadata: Metadata = {
  title: "Smash Guys — Burger Kitchen",
  description:
    "Bangalore's iconic smash burger kitchen. Premium burgers, sides, shakes and more.",
  keywords: ["smash burgers", "bangalore", "burger kitchen", "casual dining"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${caveat.variable} ${inter.variable} antialiased`}
    >
      <body className="bg-brand-cream text-brand-black font-body antialiased relative">
        <div className="grain-overlay" />
        <DoodleBackground />
        <TransitionOverlay />
        {children}
      </body>
    </html>
  );
}
