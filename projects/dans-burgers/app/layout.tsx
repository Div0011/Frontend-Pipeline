import InteractiveBackground from "@/components/ui/InteractiveBackground";
import type { Metadata } from "next";
import LenisProvider from "@/components/providers/LenisProvider";
import CustomCursor from "@/components/marketing/CustomCursor";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dan's Hamburgers | SINCE 1973 · AN AUSTIN ORIGINAL",
  description: "Dan's Hamburgers — FLAT-TOP SIZZLE & TEXAS TOAST. Serving Austin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-[#070709] text-[#FAF8F2] overflow-x-hidden">
        <LenisProvider>
          <InteractiveBackground />
          <CustomCursor />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
