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
    default: "Dan's Hamburgers — Austin's Original Since 1973",
    template: "%s | Dan's Hamburgers",
  },
  description:
    "Dan's Hamburgers — Austin's legendary family-owned burger institution since 1973. Made-to-order certified Angus beef, world-famous $50 hand-breaded onion rings, hand-dipped malts, and homemade Texas breakfast. Four locations in Austin & Buda.",
  keywords: [
    "Dan's Hamburgers",
    "Dan's Burgers",
    "Austin burgers",
    "best burger Austin",
    "hand-breaded onion rings",
    "Austin breakfast tacos",
    "Manchaca burgers",
    "North Lamar diner",
    "Airport Blvd burgers",
    "Buda TX diner",
  ],
  authors: [{ name: "Dan & Frances Junk Legacy · Katie Congdon" }],
  openGraph: {
    title: "Dan's Hamburgers — Austin's Original Since 1973",
    description: "Made-to-order certified Angus beef burgers, hand-breaded onion rings, and full Texas breakfast served daily in Austin & Buda.",
    type: "website",
    locale: "en_US",
    url: "https://dans-hamburgers.com",
    siteName: "Dan's Hamburgers",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dan's Hamburgers — Austin's Original Since 1973",
    description: "Made-to-order certified Angus beef, hand-breaded onion rings, and homemade Texas breakfast.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FastFoodRestaurant",
    "name": "Dan's Hamburgers",
    "image": "https://dans-hamburgers.com/hero-burger.png",
    "@id": "https://dans-hamburgers.com",
    "url": "https://dans-hamburgers.com",
    "telephone": "(512) 443-6131",
    "priceRange": "$$",
    "servesCuisine": ["American", "Burgers", "Breakfast", "Diner"],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "5602 Manchaca Rd",
      "addressLocality": "Austin",
      "addressRegion": "TX",
      "postalCode": "78745",
      "addressCountry": "US"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "06:00",
        "closes": "21:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "07:00",
        "closes": "20:00"
      }
    ]
  };

  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${lora.variable} ${dmSans.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-bone text-char font-body antialiased relative min-h-screen">
        <CustomCursor />
        <div className="grain-overlay" />
        {children}
      </body>
    </html>
  );
}
