/**
 * Fichas técnicas públicas por ruta `/producto/…` en este sitio.
 * Mantener alineado con PDFs oficiales en prisa.mx cuando se añadan productos.
 */

/** URLs de respaldo si no hay env ni ficha por producto (misma referencia que PARAGUAS en sitio). */
export const FALLBACK_TECHNICAL_SHEETS_URLS: readonly string[] = [
  "https://prisa.mx/wp-content/uploads/2025/06/Fichas_impermeabilizantes.pdf",
];

export const TECHNICAL_SHEET_URLS_BY_PRODUCT_HREF: Record<string, readonly string[]> = {
  "/producto/paraguas-impermeabilizante": [
    "https://prisa.mx/wp-content/uploads/2025/06/Fichas_impermeabilizantes.pdf",
  ],
  "/producto/paraguas-impermeabilizante-7-anos": [
    "https://prisa.mx/wp-content/uploads/2025/06/Fichas_impermeabilizantes.pdf",
  ],
  "/producto/paraguas-impermeabilizante-5-anos": [
    "https://prisa.mx/wp-content/uploads/2025/06/Fichas_impermeabilizantes.pdf",
  ],
  "/producto/paraguas-impermeabilizante-3-anos": [
    "https://prisa.mx/wp-content/uploads/2025/06/Fichas_impermeabilizantes.pdf",
  ],
  "/producto/paraguas-fibratado-impermeabilizante-5-anos-acrilico-fotosensible": [
    "https://prisa.mx/wp-content/uploads/2025/06/Fichas_impermeabilizantes.pdf",
  ],
  "/producto/paraguas-fibratado-impermeabilizante-3-anos-acrilico-fotosensible": [
    "https://prisa.mx/wp-content/uploads/2025/06/Fichas_impermeabilizantes.pdf",
  ],
};
