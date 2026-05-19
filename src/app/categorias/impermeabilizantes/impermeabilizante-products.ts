import type { CategoryGridProduct } from "../arquitectonico/arquitectonico-products";

export type ImpermeabilizanteProduct = CategoryGridProduct;

export const IMPERMEABILIZANTE_PRODUCTS: ImpermeabilizanteProduct[] = [
  {
    name: "PARAGUAS® IMPERMEABILIZANTE 10 AÑOS",
    category: "Acrílico Elastomérico",
    image:
      "https://prisa.mx/wp-content/uploads/2025/06/IMPERMEABILIZANTE_PARAGUAS_IMPERMEABILIZANTE_10ANOS_1.webp",
    href: "/producto/paraguas-impermeabilizante",
  },
  {
    name: "PARAGUAS IMPERMEABILIZANTE 7 AÑOS",
    category: "Acrílico Elastomérico",
    image:
      "https://prisa.mx/wp-content/uploads/2025/06/IMPERMEABILIZANTE_PARAGUAS_IMPERMEABILIZANTE_7ANOS_1.webp",
    href: "/producto/paraguas-impermeabilizante-7-anos",
  },
  {
    name: "PARAGUAS IMPERMEABILIZANTE 5 AÑOS",
    category: "Acrílico Extra Elástico",
    image:
      "https://prisa.mx/wp-content/uploads/2025/06/IMPERMEABILIZANTE_PARAGUAS_IMPERMEABILIZANTE_5ANOS_1.webp",
    href: "/producto/paraguas-impermeabilizante-5-anos",
  },
  {
    name: "PARAGUAS IMPERMEABILIZANTE 3 AÑOS",
    category: "Acrílico Extra Elástico",
    image:
      "https://prisa.mx/wp-content/uploads/2025/06/IMPERMEABILIZANTE_PARAGUAS_IMPERMEABILIZANTE3ANOS_1-1.webp",
    href: "/producto/paraguas-impermeabilizante-3-anos",
  },
  {
    name: "PARAGUAS FIBRATADO IMPERMEABILIZANTE 5 AÑOS ACRILICO FOTOSENSIBLE",
    category: "Acrílico fibratado fotosensible",
    image:
      "https://prisa.mx/wp-content/uploads/2025/06/IMPERMEABILIZANTE_PARAGUAS_FIBRATADO_IMPERMEABILIZANTE_5ANOS_ACRILICO_FOTOSENSIBLE.webp",
    href: "/producto/paraguas-fibratado-impermeabilizante-5-anos-acrilico-fotosensible",
  },
  {
    name: "PARAGUAS FIBRATADO IMPERMEABILIZANTE 3 AÑOS ACRILICO FOTOSENSIBLE",
    category: "Acrílico fibratado fotosensible",
    image:
      "https://prisa.mx/wp-content/uploads/2025/06/IMPERMEABILIZANTE_PARAGUAS_FIBRATADO_IMPERMEABILIZANTE_3ANOS_ACRILICO_FOTOSENSIBLE.webp",
    href: "/producto/paraguas-fibratado-impermeabilizante-3-anos-acrilico-fotosensible",
  },
];

/** Slugs bajo /categorias/impermeabilizantes/… alineados con prisa.mx */
export type ImpermeabilizanteSectionSlug =
  | "10-anos"
  | "7-anos"
  | "5-anos"
  | "3-anos"
  | "acrilico-elastomerico"
  | "acrilico-extra-elastico"
  | "acrilico-fibratado";

const SECTION_HREF_SETS: Record<
  ImpermeabilizanteSectionSlug,
  ReadonlySet<string>
> = {
  "10-anos": new Set(["/producto/paraguas-impermeabilizante"]),
  "7-anos": new Set(["/producto/paraguas-impermeabilizante-7-anos"]),
  "5-anos": new Set([
    "/producto/paraguas-impermeabilizante-5-anos",
    "/producto/paraguas-fibratado-impermeabilizante-5-anos-acrilico-fotosensible",
  ]),
  "3-anos": new Set([
    "/producto/paraguas-impermeabilizante-3-anos",
    "/producto/paraguas-fibratado-impermeabilizante-3-anos-acrilico-fotosensible",
  ]),
  "acrilico-elastomerico": new Set([
    "/producto/paraguas-impermeabilizante",
    "/producto/paraguas-impermeabilizante-7-anos",
  ]),
  "acrilico-extra-elastico": new Set([
    "/producto/paraguas-impermeabilizante-5-anos",
    "/producto/paraguas-impermeabilizante-3-anos",
  ]),
  "acrilico-fibratado": new Set([
    "/producto/paraguas-fibratado-impermeabilizante-5-anos-acrilico-fotosensible",
    "/producto/paraguas-fibratado-impermeabilizante-3-anos-acrilico-fotosensible",
  ]),
};

export function filterImpermeabilizanteBySection(
  products: readonly ImpermeabilizanteProduct[],
  section: ImpermeabilizanteSectionSlug
): ImpermeabilizanteProduct[] {
  const allowed = SECTION_HREF_SETS[section];
  return products.filter((p) => allowed.has(p.href));
}
