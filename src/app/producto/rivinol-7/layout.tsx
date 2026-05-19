import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RIVINOL® 7 - Pinturas PRISA",
  description:
    "RIVINOL® 7 es una pintura vinil – acrílica que mantiene su terminado hasta por 7 años. Te ofrece un mayor beneficio por tu inversión con su extraordinario rendimiento e inigualable poder cubriente.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
