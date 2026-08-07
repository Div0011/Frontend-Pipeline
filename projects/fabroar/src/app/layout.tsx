import type { Metadata, Viewport } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import LenisProvider from "@/components/ui/LenisProvider";
import FilmGrainOverlay from "@/components/ui/FilmGrainOverlay";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CartDrawer from "@/components/ui/CartDrawer";
import Loader from "@/components/ui/Loader";
import DoodleBackground from "@/components/ui/DoodleBackground";
import { ThemeProvider } from "@/context/ThemeContext";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

const internacionalAlt = localFont({
  src: "../../public/fonts/InternacionalAlt-Bold.otf",
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Fabroar — Graphic T-Shirts for Men & Women",
    template: "%s — Fabroar",
  },
  description:
    "Premium graphic printed pure cotton T-shirts. Shop men's and women's collections or design your own custom tee.",
  keywords: ["t-shirts", "graphic tees", "cotton t-shirts", "men's fashion", "women's fashion", "custom t-shirts"],
  authors: [{ name: "Fabroar" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://fabroar.com",
    siteName: "Fabroar",
    title: "Fabroar — Graphic T-Shirts for Men & Women",
    description:
      "Premium graphic printed pure cotton T-shirts. Shop men's and women's collections or design your own custom tee.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fabroar — Graphic T-Shirts for Men & Women",
    description:
      "Premium graphic printed pure cotton T-shirts. Shop men's and women's collections or design your own custom tee.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${internacionalAlt.variable} ${inter.variable}`}
    >
      <body className="bg-[#0F0F0F] text-[#F5F0E8] antialiased relative transition-colors duration-300">
        <ThemeProvider>
          <DoodleBackground />
          <Loader />
          <LenisProvider>
            <ScrollProgress />
            <CustomCursor />
            {children}
            <FilmGrainOverlay />
            <CartDrawer />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
