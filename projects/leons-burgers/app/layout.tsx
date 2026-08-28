import InteractiveBackground from "@/components/ui/InteractiveBackground";
import AtmosphereControls from "@/components/ui/AtmosphereControls";
import type { Metadata } from "next";
import LenisProvider from "@/components/providers/LenisProvider";
import CustomCursor from "@/components/marketing/CustomCursor";
import "./globals.css";

export const metadata: Metadata = {
  title: "Leon's Burgers & Wings | BENGALURU",
  description: "Leon's Burgers & Wings — Culinary craft atelier in Bengaluru.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-[#070709] text-[#FAF8F2] overflow-x-hidden transition-colors duration-500">
        <LenisProvider>
          <InteractiveBackground primaryColor="#B12727" themeBase="#0e0606" />
          <CustomCursor />
          {children}
          <AtmosphereControls primaryColor="#B12727" darkBg="#0e0606" lightBg="#F7F5F0" />
        </LenisProvider>
      </body>
    </html>
  );
}
