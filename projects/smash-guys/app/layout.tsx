import type { Metadata } from "next";
import { Bebas_Neue, Lora, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/marketing/CustomCursor";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Smash Guys — Bangalore's Premier Smash Burger Kitchen",
    template: "%s | Smash Guys",
  },
  description:
    "Smash Guys — Bangalore's iconic smash burger kitchen. Double-smashed patties, cast-iron caramelized crust, and artisan drinks. Locations in Indiranagar, Bellandur, RMV & Whitefield.",
  keywords: [
    "smash burgers", "bangalore", "best burger bangalore",
    "smashguys", "indiranagar restaurant", "gourmet burgers",
  ],
  authors: [{ name: "Popo Ventures" }],
  openGraph: {
    title: "Smash Guys — Bangalore's Premier Smash Burger Kitchen",
    description: "Double-smashed patties, 230°C cast-iron sear, artisan drinks. Bangalore's favourite burger kitchen.",
    type: "website",
    locale: "en_IN",
    url: "https://www.smashguys.in",
    siteName: "Smash Guys",
  },
  twitter: {
    card: "summary_large_image",
    title: "Smash Guys — Bangalore's Premier Smash Burger Kitchen",
    description: "Double-smashed patties, 230°C cast-iron sear, artisan drinks.",
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
      className={`${bebasNeue.variable} ${lora.variable} ${dmSans.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="bg-bone text-char font-body antialiased relative min-h-screen">
        <CustomCursor />
        <div className="grain-overlay" />
        {children}
      </body>
    </html>
  );
}

