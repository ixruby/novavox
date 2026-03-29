import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout — NOVAVOX",
  description: "Complete your NOVAVOX order.",
  openGraph: {
    title: "Checkout — NOVAVOX",
    description: "Complete your NOVAVOX order.",
    siteName: "NOVAVOX",
    type: "website",
  },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
