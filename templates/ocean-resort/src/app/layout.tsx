import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "AZURE SHORE — Luxury Oceanfront Resort",
    template: "%s | Azure Shore",
  },
  description: "An extraordinary oceanfront sanctuary where crystal waters meet pristine beaches. Experience unparalleled luxury, world-class amenities, and the rhythm of the sea.",
  keywords: ["luxury resort", "oceanfront", "beach", "premium", "vacation", "spa", "ocean", "tropical"],
  authors: [{ name: "Azure Shore Resort" }],
  openGraph: {
    title: "Azure Shore Resort",
    description: "Where the ocean meets luxury.",
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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0a3d62] text-[#f5f0e6] selection:bg-[#48d1cc] selection:text-[#0a3d62] antialiased">
        {children}
      </body>
    </html>
  );
}
