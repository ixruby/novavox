import type { Metadata } from "next";
import { Space_Grotesk, DM_Mono } from "next/font/google";
import NoiseOverlay from "@/components/layout/NoiseOverlay";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-headline",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const dmMono = DM_Mono({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "NOVAVOX — Sonic Gallery",
  description: "Architectural Rigor. Built in Berlin. A record label redefining the spatial audio experience.",
  metadataBase: new URL("https://novavox.vercel.app"),
  openGraph: {
    title: "NOVAVOX — Sonic Gallery",
    description: "Architectural Rigor. Built in Berlin. A record label redefining the spatial audio experience.",
    siteName: "NOVAVOX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NOVAVOX — Sonic Gallery",
    description: "Architectural Rigor. Built in Berlin.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmMono.variable} dark`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body className="min-h-screen antialiased">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-white focus:text-[#1A1C1C] focus:px-4 focus:py-2 focus:text-sm focus:tracking-widest focus:uppercase">
          Skip to content
        </a>
        <NoiseOverlay />
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
