import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PARAGUAS® IMPERMEABILIZANTE 10 AÑOS - Pinturas PRISA",
  description:
    "Impermeabilizante acrílico elastomérico PARAGUAS® 10 años: máxima impermeabilidad, elasticidad extrema y resistencia al intemperismo para techos y azoteas.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
