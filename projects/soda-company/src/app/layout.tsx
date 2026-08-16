import { Space_Grotesk, Outfit, Space_Mono } from "next/font/google";
import ClientLayout from "./ClientLayout";
import { AdaptiveThemeProvider } from "@/components/AdaptiveThemeProvider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["700"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "700"],
});

export const metadata = {
  title: "AURA SODA CO. — The Future of Hydration",
  description:
    "AURA brings unparalleled refreshment crafted from the cosmos. No artificial colors, no crash.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${outfit.variable} ${spaceMono.variable}`}
    >
      <body className="font-sans antialiased bg-[#0d0314] text-[#f3f1ec] overflow-x-hidden">
        <AdaptiveThemeProvider>
          <ClientLayout>{children}</ClientLayout>
        </AdaptiveThemeProvider>
      </body>
    </html>
  );
}
