import { Inter, Space_Grotesk } from "next/font/google";
import ClientLayout from "./ClientLayout";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap", weight: ["400", "500", "600", "700"] });

export const metadata = {
  title: "APEX ELEM-01 — The Anatomy of Silence",
  description: "An elemental instrument forged from aerospace titanium and raw computational will.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased bg-[#f5f5f7] text-[#1d1d1f]">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
