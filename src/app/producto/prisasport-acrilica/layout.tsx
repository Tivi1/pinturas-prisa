import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PRISASPORT ACRÍLICA - Pinturas PRISA",
  description:
    "PRISASPORT® es una pintura base agua 100% acrílica con alta resistencia a la intemperie y los cambios de clima; por sí misma evita manchas por alcalinidad en cemento y fibro cemento. Ideal para interiores y exteriores.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
