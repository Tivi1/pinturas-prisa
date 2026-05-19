/** Tarjeta del grid (compartido con impermeabilizantes y otras líneas). */
export type CategoryGridProduct = {
  name: string;
  category: string;
  image: string;
  href: string;
};

export type ArquitectonicoProduct = CategoryGridProduct;

export const ARQUITECTONICO_PRODUCTS: ArquitectonicoProduct[] = [
  {
    name: "RIVINOL® 7",
    category: "Vinil / Acrílica",
    image: "https://prisa.mx/wp-content/uploads/2025/06/img.png",
    href: "/producto/rivinol-7",
  },
  {
    name: "PRISASPORT ACRÍLICA",
    category: "Acrílica",
    image:
      "https://prisa.mx/wp-content/uploads/2025/06/ARQUITECTONICA_PRISASPORT_ACRILICA_1.png",
    href: "/producto/prisasport-acrilica",
  },
  {
    name: "POLIPRISA® PREMIUM",
    category: "Acrílica",
    image:
      "https://prisa.mx/wp-content/uploads/2025/06/ARQUITECTONICA_POLIPRISA_PREMIUM_1.webp",
    href: "/producto/poliprisa-premium",
  },
  {
    name: "POLIPRISA® SUPREME",
    category: "Vinil / Acrílica",
    image:
      "https://prisa.mx/wp-content/uploads/2025/06/ARQUITECTONICA_POLIPRISA_1.webp",
    href: "/producto/poliprisa-supreme",
  },
  {
    name: "RIVINOL® 5",
    category: "Vinil / Acrílica",
    image:
      "https://prisa.mx/wp-content/uploads/2025/06/ARQUITECTONICA_RIVINOL_5_1.webp",
    href: "/producto/rivinol-5",
  },
  {
    name: "PINTAVIN® ULTRA",
    category: "Vinil / Acrílica",
    image:
      "https://prisa.mx/wp-content/uploads/2025/06/ARQUITECTONICA_PINTAVIN_ULTRA_1.webp",
    href: "/producto/pintavin-ultra",
  },
  {
    name: "VINIBAR®",
    category: "Vinil / Acrílica",
    image:
      "https://prisa.mx/wp-content/uploads/2025/06/ARQUITECTONICA_VINIBAR_1.webp",
    href: "/producto/vinibar",
  },
  {
    name: "SELLADOR VINILICO RIVI 3601 USO PROFESIONAL",
    category: "Selladores y Fondos",
    image:
      "https://prisa.mx/wp-content/uploads/2025/06/ARQUITECTONICA_SELLADOR_VINILICO_RIVI_USO_PROFESIONAL_1.webp",
    href: "/producto/sellador-vinilico-rivi-3601-uso-profesional",
  },
  {
    name: "SELLADOR ACRILICO RIVI 3603 USO PROFESIONAL",
    category: "Selladores y Fondos",
    image:
      "https://prisa.mx/wp-content/uploads/2025/06/ARQUITECTONICA_SELLADOR_ACRILICO_RIVI_3603_USO_PROFESIONAL_1.webp",
    href: "/producto/sellador-acrilico-rivi-3603-uso-profesional",
  },
  {
    name: "FONDO VINIL ACRÍLICO BASE AGUA",
    category: "Selladores y Fondos",
    image:
      "https://prisa.mx/wp-content/uploads/2025/06/ARQUITECTONICA_FONDO_VINIL_ACRILICO_1.webp",
    href: "/producto/fondo-vinil-acrilico-base-agua",
  },
  {
    name: "FONDO ACRÍLICO BASE AGUA",
    category: "Selladores y Fondos",
    image:
      "https://prisa.mx/wp-content/uploads/2025/06/ARQUITECTONICA_FONDO_ACRILICO_1.webp",
    href: "/producto/fondo-acrilico-base-agua",
  },
  {
    name: "SELLADOR BASE ALCALINO PROTEC",
    category: "100% Acrílica",
    image:
      "https://prisa.mx/wp-content/uploads/2026/03/BASE-ALCALINO-PROTEC_1L-1.png",
    href: "/producto/sellador-base-alcalino-protec",
  },
];

/** Slugs de archivo en prisa.mx/categorias/arquitectonico/… */
export type ArquitectonicoSectionSlug =
  | "exterior"
  | "interior"
  | "100-acrilica"
  | "vinil-acrilica"
  | "selladores-y-fondos";

/**
 * Por `href` según el listado publicado en prisa.mx (evita “pinturas de más” por
 * filtrar solo con `category`, que se solapa entre tipos).
 */
const SECTION_HREF_SETS: Record<
  ArquitectonicoSectionSlug,
  ReadonlySet<string>
> = {
  exterior: new Set([
    "/producto/rivinol-7",
    "/producto/prisasport-acrilica",
    "/producto/poliprisa-premium",
    "/producto/poliprisa-supreme",
    "/producto/rivinol-5",
    "/producto/pintavin-ultra",
    "/producto/sellador-vinilico-rivi-3601-uso-profesional",
    "/producto/sellador-acrilico-rivi-3603-uso-profesional",
    "/producto/fondo-vinil-acrilico-base-agua",
    "/producto/fondo-acrilico-base-agua",
  ]),
  interior: new Set([
    "/producto/rivinol-7",
    "/producto/prisasport-acrilica",
    "/producto/poliprisa-premium",
    "/producto/poliprisa-supreme",
    "/producto/rivinol-5",
    "/producto/pintavin-ultra",
    "/producto/vinibar",
    "/producto/sellador-vinilico-rivi-3601-uso-profesional",
    "/producto/sellador-acrilico-rivi-3603-uso-profesional",
    "/producto/fondo-vinil-acrilico-base-agua",
    "/producto/fondo-acrilico-base-agua",
  ]),
  "100-acrilica": new Set([
    "/producto/poliprisa-premium",
    "/producto/prisasport-acrilica",
  ]),
  "vinil-acrilica": new Set([
    "/producto/rivinol-7",
    "/producto/poliprisa-supreme",
    "/producto/rivinol-5",
    "/producto/pintavin-ultra",
    "/producto/vinibar",
  ]),
  "selladores-y-fondos": new Set([
    "/producto/sellador-vinilico-rivi-3601-uso-profesional",
    "/producto/sellador-acrilico-rivi-3603-uso-profesional",
    "/producto/fondo-vinil-acrilico-base-agua",
    "/producto/fondo-acrilico-base-agua",
    "/producto/sellador-base-alcalino-protec",
  ]),
};

export function filterArquitectonicoBySection(
  products: readonly ArquitectonicoProduct[],
  section: ArquitectonicoSectionSlug
): ArquitectonicoProduct[] {
  const allowed = SECTION_HREF_SETS[section];
  return products.filter((p) => allowed.has(p.href));
}
