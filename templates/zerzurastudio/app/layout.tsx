import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat, JetBrains_Mono } from "next/font/google";
import "./styles/globals.css";
import LenisProvider from "./components/LenisProvider";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import CinematicOverlay from "./components/CinematicOverlay";
import CustomCursor from "./components/CustomCursor";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Zerzura Studio | Social Community",
    template: "%s | Zerzura Studio",
  },
  description:
    "Let's build a community to change the world. At Zerzura Studio, we craft tools to grant wishes and fulfill dreams.",
  keywords: ["zerzura", "studio", "social", "community", "creative", "entertainment", "AI"],
  authors: [{ name: "Zerzura Studio" }],
  openGraph: {
    title: "Zerzura Studio | Social Community",
    description: "Let's build a community to change the world. At Zerzura Studio, we craft tools to grant wishes and fulfill dreams.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zerzura Studio | Social Community",
    description: "Let's build a community to change the world. At Zerzura Studio, we craft tools to grant wishes and fulfill dreams.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${montserrat.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="bg-cinema-black text-cinema-text font-body antialiased overflow-x-hidden">
        <CustomCursor />
        <CinematicOverlay />
        <LenisProvider>
          <Nav />
          {children}
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
