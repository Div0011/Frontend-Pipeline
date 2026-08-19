import type { Metadata } from "next";
import { Syne, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "NexaFlow — Edge Infrastructure for High-Velocity Teams",
  description:
    "Deploy, observe, and scale at the edge. Sub-second deployments, 99.999% uptime, zero cold starts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
    >
      <body
        className={`${ibmPlexSans.className} font-sans antialiased selection:bg-primary/30 selection:text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
