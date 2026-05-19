import { ARQUITECTONICO_PRODUCTS } from "@/app/categorias/arquitectonico/arquitectonico-products";
import { IMPERMEABILIZANTE_PRODUCTS } from "@/app/categorias/impermeabilizantes/impermeabilizante-products";
import {
  FALLBACK_TECHNICAL_SHEETS_URLS,
  TECHNICAL_SHEET_URLS_BY_PRODUCT_HREF,
} from "./technicalSheets";

function normalizePath(p: string): string {
  const s = p.trim() || "/";
  const noQuery = s.split("?")[0] ?? "/";
  return noQuery.startsWith("/") ? noQuery : `/${noQuery}`;
}

/** URL canónica del sitio para construir enlaces en el contexto (headers / env). */
export function resolvePublicSiteUrl(req?: Request): string {
  const fromEnv =
    process.env.CODY_SITE_PUBLIC_URL?.trim().replace(/\/$/, "") ||
    process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (fromEnv) return fromEnv;

  if (req) {
    const host =
      req.headers.get("x-forwarded-host")?.split(",")[0]?.trim() ||
      req.headers.get("host")?.trim();
    const proto =
      req.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() || "https";
    if (host) return `${proto}://${host}`;
  }

  return "https://prisa.mx";
}

export function parseEnvContextUrls(): string[] {
  const raw = process.env.CODY_ASSISTANT_CONTEXT_URLS?.trim();
  if (!raw) return [];
  return raw
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseEnvTechnicalSheetsUrls(): string[] {
  const raw = process.env.CODY_TECHNICAL_SHEETS_URLS?.trim();
  if (!raw) return [];
  return raw
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

const URL_IN_TEXT = /https?:\/\//i;

/**
 * Lista ordenada de URLs de fichas que el agente debe poder abrir (sin duplicados).
 * Prioridad: CODY_TECHNICAL_SHEETS_URLS → CODY_ASSISTANT_CONTEXT_URLS → producto actual → índice local → fallback.
 */
export function resolveTechnicalSheetUrlsForContext(opts: {
  pagePath?: string | null;
}): string[] {
  const seen = new Set<string>();
  const add = (u: string) => {
    const t = u.trim();
    if (t && URL_IN_TEXT.test(t)) seen.add(t);
  };

  for (const u of parseEnvTechnicalSheetsUrls()) add(u);
  for (const u of parseEnvContextUrls()) add(u);

  const path = opts.pagePath ? normalizePath(opts.pagePath) : "";
  if (path.startsWith("/producto/")) {
    const sheets = TECHNICAL_SHEET_URLS_BY_PRODUCT_HREF[path];
    if (sheets?.length) {
      for (const u of sheets) add(u);
    }
  }

  if (seen.size === 0) {
    for (const urls of Object.values(TECHNICAL_SHEET_URLS_BY_PRODUCT_HREF)) {
      for (const u of urls) add(u);
    }
  }

  if (seen.size === 0) {
    for (const u of FALLBACK_TECHNICAL_SHEETS_URLS) add(u);
  }

  return [...seen];
}

/**
 * El API exige `context` con información útil; debe contener al menos una URL https
 * para que el agente consulte fichas.
 */
export function ensureContextContainsFichaUrls(
  contextBlock: string,
  pagePath?: string | null,
): string {
  const trimmed = contextBlock.trim();
  if (URL_IN_TEXT.test(trimmed)) {
    return trimmed;
  }

  const urls = resolveTechnicalSheetUrlsForContext({ pagePath });
  if (urls.length === 0) {
    throw new Error(
      "El campo context debe incluir URLs de fichas técnicas. Configura CODY_TECHNICAL_SHEETS_URLS o CODY_ASSISTANT_CONTEXT_URLS con al menos un enlace https público.",
    );
  }

  const header =
    "Fichas técnicas — el agente debe leer estas URLs y basar datos técnicos en ellas:\n" +
    urls.map((u) => u.trim()).join("\n");

  return trimmed ? `${header}\n\n${trimmed}` : header;
}

const CATALOG = [...ARQUITECTONICO_PRODUCTS, ...IMPERMEABILIZANTE_PRODUCTS];

type PageContext = {
  section: string;
  instructions: string;
};

function describePageContext(path: string, catalog: typeof CATALOG): PageContext | null {
  if (!path || path === "/") return null;

  if (path.startsWith("/calculadora-prisa")) {
    return {
      section: "Calculadora de pintura PRISA",
      instructions:
        "El usuario está usando la calculadora. Ayúdalo a estimar cuánto producto necesita: pídele medidas del área (m²), tipo de superficie y número de manos. Recomienda el producto adecuado con esos datos.",
    };
  }
  if (path.startsWith("/productos")) {
    return {
      section: "Catálogo general de productos PRISA",
      instructions:
        "El usuario está en el catálogo completo. Pregunta qué tipo de proyecto tiene para orientarlo a la línea correcta en lugar de listar todos los productos.",
    };
  }

  // Impermeabilizantes
  if (path.startsWith("/categorias/impermeabilizantes/10-anos")) {
    return { section: "Impermeabilizante 10 años", instructions: "El usuario ve impermeabilizantes de 10 años. Destaca la garantía extendida y aplicaciones en azoteas de alto tráfico." };
  }
  if (path.startsWith("/categorias/impermeabilizantes/7-anos")) {
    return { section: "Impermeabilizante 7 años", instructions: "El usuario ve impermeabilizantes de 7 años. Destaca durabilidad-precio y casos de uso en casa habitación." };
  }
  if (path.startsWith("/categorias/impermeabilizantes/5-anos")) {
    return { section: "Impermeabilizante 5 años", instructions: "El usuario ve impermeabilizantes de 5 años. Resalta flexibilidad acrílica y facilidad de aplicación para proyectos residenciales." };
  }
  if (path.startsWith("/categorias/impermeabilizantes/3-anos")) {
    return { section: "Impermeabilizante 3 años", instructions: "El usuario ve impermeabilizantes de 3 años. Es la opción de mantenimiento preventivo o presupuesto ajustado. Orienta sobre preparación de superficie." };
  }
  if (path.startsWith("/categorias/impermeabilizantes/acrilico-elastomerico")) {
    return { section: "Impermeabilizante acrílico elastomérico", instructions: "El usuario ve impermeabilizante elastomérico. Destaca alta elasticidad para grietas y resistencia UV." };
  }
  if (path.startsWith("/categorias/impermeabilizantes/acrilico-extra-elastico")) {
    return { section: "Impermeabilizante acrílico extra elástico", instructions: "El usuario ve impermeabilizante extra elástico. Ideal para superficies con movimiento estructural." };
  }
  if (path.startsWith("/categorias/impermeabilizantes/acrilico-fibratado")) {
    return { section: "Impermeabilizante acrílico fibratado", instructions: "El usuario ve impermeabilizante fibratado. Destaca refuerzo con fibras para mayor resistencia mecánica." };
  }
  if (path.startsWith("/categorias/impermeabilizantes")) {
    return {
      section: "Categoría Impermeabilizantes PRISA",
      instructions:
        "El usuario está explorando impermeabilizantes PRISA (línea Paraguas). Pregunta tipo de superficie, años de garantía deseados y si hay grietas activas para recomendar la sub-línea correcta.",
    };
  }

  // Arquitectónico
  if (path.startsWith("/categorias/arquitectonico/interior")) {
    return { section: "Pinturas arquitectónicas — Interior", instructions: "El usuario ve pinturas de interior. Enfócate en lavabilidad, cubrimiento y acabados (mate, semi-brillante). Pregunta tipo de cuarto." };
  }
  if (path.startsWith("/categorias/arquitectonico/exterior")) {
    return { section: "Pinturas arquitectónicas — Exterior", instructions: "El usuario ve pinturas de exterior. Resalta resistencia UV, lluvia y hongos. Pregunta tipo de superficie." };
  }
  if (path.startsWith("/categorias/arquitectonico/100-acrilica")) {
    return { section: "Pintura 100% acrílica", instructions: "El usuario ve la línea 100% acrílica. Destaca máxima durabilidad, blancura y adhesión para proyectos de largo plazo." };
  }
  if (path.startsWith("/categorias/arquitectonico/vinil-acrilica")) {
    return { section: "Pintura vinílica acrílica", instructions: "El usuario ve la línea vinílica acrílica. Explica su equilibrio entre rendimiento y costo para proyectos de mediana escala." };
  }
  if (path.startsWith("/categorias/arquitectonico/selladores-y-fondos")) {
    return { section: "Selladores y fondos PRISA", instructions: "El usuario ve selladores y fondos. Explica su uso como preparación de superficie: mejoran adhesión y evitan manchas de humedad." };
  }
  if (path.startsWith("/categorias/arquitectonico")) {
    return {
      section: "Categoría Pinturas Arquitectónicas PRISA",
      instructions:
        "El usuario está en pinturas arquitectónicas. Pregunta si es interior o exterior y el tipo de superficie para recomendar la línea correcta.",
    };
  }

  // Otras categorías
  if (path.startsWith("/categorias/esmaltes")) {
    return { section: "Categoría Esmaltes PRISA", instructions: "El usuario ve esmaltes. Destaca acabado brillante, dureza y resistencia. Pregunta si es para madera, metal o concreto e interior/exterior." };
  }
  if (path.startsWith("/categorias/madera")) {
    return { section: "Línea Madera PRISA", instructions: "El usuario ve la línea madera (lacas, barnices, selladores, tintes). Pregunta si es interior/exterior y si busca acabado natural o pigmentado." };
  }
  if (path.startsWith("/categorias/automotivo")) {
    return { section: "Línea Automotivo PRISA", instructions: "El usuario ve la línea automotiva. Orienta sobre fondos anticorrosivos y acabados. Pregunta si es retoque o pintura completa." };
  }
  if (path.startsWith("/categorias/industrial")) {
    return { section: "Línea Industrial PRISA", instructions: "El usuario ve la línea industrial. Habla sobre recubrimientos anticorrosivos, epóxicos y protección de estructuras metálicas." };
  }

  // Producto específico
  if (path.startsWith("/producto/")) {
    const product = catalog.find((p) => p.href === path);
    if (product) {
      return {
        section: `Producto: ${product.name}`,
        instructions: `El usuario está viendo "${product.name}" (${product.category}). Responde con información específica de este producto: características, aplicación, rendimiento y garantía según las fichas técnicas. Si pregunta por precio o disponibilidad, indícale que contacte a un distribuidor PRISA.`,
      };
    }
    const slug = path.replace(/^\/producto\//, "").replace(/\/$/, "");
    return {
      section: `Producto: ${slug}`,
      instructions: `El usuario está viendo el producto "${slug}". Usa las fichas técnicas para responder con información específica.`,
    };
  }

  return null;
}

/**
 * Texto de contexto para el agente: URLs de fichas primero; luego página, producto y catálogo.
 */
export function buildAssistantContextText(
  opts: {
    pagePath?: string | null;
    pageUrl?: string | null;
    siteBaseUrl: string;
  },
  maxChars = Number(process.env.CODY_CONTEXT_MAX_CHARS) || 14_000,
): string {
  const site = opts.siteBaseUrl.replace(/\/$/, "");
  const path = opts.pagePath ? normalizePath(opts.pagePath) : "";
  const fichaUrls = resolveTechnicalSheetUrlsForContext({ pagePath: path });
  const pageCtx = describePageContext(path, CATALOG);

  const lines: string[] = [];

  // --- Instrucciones de comportamiento según página ---
  lines.push("=== Comportamiento esperado del agente ===");
  if (pageCtx) {
    lines.push(`Sección actual del usuario: ${pageCtx.section}`);
    lines.push(pageCtx.instructions);
    lines.push(
      "IMPORTANTE: Basa tu respuesta en la sección indicada. No listes todos los productos de PRISA si el usuario solo pregunta sobre lo que ve en esta página.",
    );
  } else {
    lines.push(
      "El usuario está en una página general del sitio PRISA. Responde de forma concisa; pregunta qué tipo de proyecto tiene antes de listar productos.",
    );
  }

  // --- Fichas técnicas ---
  lines.push("");
  lines.push("=== Fichas técnicas — fuentes obligatorias (URLs) ===");
  lines.push(
    "Consulta estas URLs antes de afirmar especificaciones técnicas; si algo no está en el PDF, dilo con claridad.",
  );
  for (const u of fichaUrls) {
    lines.push(u);
  }

  // --- Navegación y catálogo ---
  lines.push("");
  lines.push("=== Contexto PRISA — navegación y catálogo ===");

  if (opts.pageUrl?.trim()) {
    lines.push(`Página actual del usuario: ${opts.pageUrl.trim()}`);
  } else if (path) {
    lines.push(`Ruta actual del usuario: ${path}`);
  }

  if (path.startsWith("/producto/")) {
    const product = CATALOG.find((p) => p.href === path);
    lines.push("");
    lines.push("--- Producto en vista ---");
    if (product) {
      lines.push(`Nombre: ${product.name}`);
      lines.push(`Categoría / tipo: ${product.category}`);
      lines.push(`URL en sitio: ${site}${product.href}`);
      const sheets = TECHNICAL_SHEET_URLS_BY_PRODUCT_HREF[product.href];
      if (sheets?.length) {
        lines.push("Fichas enlazadas a este SKU en el sitio:");
        for (const u of sheets) lines.push(u);
      }
    } else {
      lines.push(
        `Ruta ${path}: sin entrada en catálogo local; prioriza las URLs de fichas de arriba.`,
      );
    }
  }

  lines.push("");
  lines.push("--- Catálogo con ficha en este sitio (nombre | tipo | URL) ---");
  for (const p of CATALOG) {
    lines.push(`${p.name} | ${p.category} | ${site}${p.href}`);
  }

  let text = lines.join("\n");
  if (text.length > maxChars) {
    text = `${text.slice(0, maxChars)}\n\n[...contexto truncado por límite CODY_CONTEXT_MAX_CHARS]`;
  }

  return ensureContextContainsFichaUrls(text, path);
}
