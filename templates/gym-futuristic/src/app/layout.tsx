import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "FORGE — Futuristic Fitness",
    template: "%s | FORGE",
  },
  description: "Next-generation fitness experience. Where technology meets strength.",
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />

        {/* High-priority Preload for Instant 1080p Poster & Video Asset Availability */}
        <link rel="preload" href="/videos/dumbbell-poster.jpg" as="image" type="image/jpeg" />
        <link rel="preload" href="/videos/kettlebell-poster.jpg" as="image" type="image/jpeg" />
        <link rel="preload" href="/videos/weight-plate-poster.jpg" as="image" type="image/jpeg" />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
