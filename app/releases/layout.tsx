import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Releases — NOVAVOX",
  description: "Browse the NOVAVOX catalog. Physical, digital, and spatial audio releases.",
  openGraph: {
    title: "Releases — NOVAVOX",
    description: "Browse the NOVAVOX catalog. Physical, digital, and spatial audio releases.",
    siteName: "NOVAVOX",
    type: "website",
  },
};

export default function ReleasesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
