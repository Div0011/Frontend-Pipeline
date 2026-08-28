import InteractiveBackground from "@/components/ui/InteractiveBackground";
import type { Metadata } from "next";
import LenisProvider from "@/components/providers/LenisProvider";
import CustomCursor from "@/components/marketing/CustomCursor";
import "./globals.css";

export const metadata: Metadata = {
  title: "Original Burger Co. (OBC) | DOUBLE SMASH & BACON JAM DINER · BANGALORE",
  description: "Original Burger Co. (OBC) — DOUBLE SMASHED BACON JAM CRUST. Serving Bangalore.",
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
