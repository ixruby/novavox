import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technical Objects — NOVAVOX",
  description: "Archival pressings, spatial equipment, and sonic artifacts from the NOVAVOX archive.",
  openGraph: {
    title: "Technical Objects — NOVAVOX",
    description: "Archival pressings, spatial equipment, and sonic artifacts from the NOVAVOX archive.",
    siteName: "NOVAVOX",
    type: "website",
  },
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
