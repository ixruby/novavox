import type { Metadata } from "next";
import { Space_Grotesk, DM_Mono, Geist } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-headline",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const dmMono = DM_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "NOVAVOX — Where Ideas Become Cinematic Realities",
  description: "Film & video production, advertising, post production, and music — cinematic excellence by Kaushik Jayakumar and team.",
  metadataBase: new URL("https://novavox.vercel.app"),
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/favicon.ico" }],
    apple: [{ url: "/apple-touch-icon.png" }],
    shortcut: ["/favicon.ico"]
  },
  openGraph: {
    title: "NOVAVOX — Where Ideas Become Cinematic Realities",
    description: "Film & video production, advertising, post production, and music.",
    siteName: "NOVAVOX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NOVAVOX — Where Ideas Become Cinematic Realities",
    description: "Film & video production, advertising, post production, and music.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark", spaceGrotesk.variable, dmMono.variable, "font-sans", geist.variable)}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body className="min-h-screen antialiased film-grain">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-white focus:text-[#1A1C1C] focus:px-4 focus:py-2 focus:text-sm focus:tracking-widest focus:uppercase">
          Skip to content
        </a>
        <CartProvider>
          <main id="main-content">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
