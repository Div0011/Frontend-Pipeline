import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "RAAJMAHAL PALACE & RESORT — Ultra-Luxury Indian Heritage Sanctuary",
    template: "%s | RAAJMAHAL PALACE",
  },
  description: "An extraordinary sanctuary where royal Indian heritage meets modern ultra-luxury hospitality. Experience grand palaces, private infinity pools, and regal dining in Jaipur.",
  keywords: ["luxury hotel", "Jaipur", "heritage palace", "royal suites", "India", "ultra-luxury", "infinity pool", "Ayurvedic spa"],
  authors: [{ name: "Raajmahal Palace" }],
  openGraph: {
    title: "Raajmahal Palace & Resort",
    description: "A 16th-century royal palace reimagined for the contemporary connoisseur.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;600;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Montserrat:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#160306] text-[#faf0ca] selection:bg-[#f5d061] selection:text-[#160306] antialiased">
        {children}
      </body>
    </html>
  );
}
