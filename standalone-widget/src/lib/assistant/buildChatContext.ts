/**
 * Versión reducida del contexto Cody: sólo fichas desde env / fallback y página actual,
 * sin catálogo de productos del sitio PRISA grande.
 */

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
      req.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() || "http";
    if (host) return `${proto}://${host}`;
  }

  return "http://localhost:3000";
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
 * Lista ordenada de URLs de fichas (sin duplicados).
 * Env → producto conocido si hay mapa extendido → fallback.
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
 * Cody exige `context` útil; conviene URLs https de fichas.
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

type PageContext = {
  /** Nombre legible de la sección/producto (para mostrar en el contexto). */
  section: string;
  /** Instrucciones de comportamiento específicas para esta sección. */
  instructions: string;
};

/**
 * Interpreta el `pagePath` del sitio PRISA y devuelve el nombre de sección
 * e instrucciones de comportamiento para el agente.
 * Retorna `null` cuando la ruta es raíz o desconocida (el agente opera de forma general).
 */
function describePageContext(path: string): PageContext | null {
  if (!path || path === "/") return null;

  // --- Calculadora ---
  if (path.startsWith("/calculadora-prisa")) {
    return {
      section: "Calculadora de pintura PRISA",
      instructions:
        "El usuario está usando la calculadora de pintura. Ayúdalo a estimar cuánto producto necesita: pídele medidas del área a pintar (m²), tipo de superficie y número de manos. Recomienda el producto adecuado para esa superficie una vez que tengas los datos.",
    };
  }

  // --- Todos los productos ---
  if (path.startsWith("/productos")) {
    return {
      section: "Catálogo general de productos PRISA",
      instructions:
        "El usuario está viendo el catálogo completo. Puedes mencionar las líneas principales (impermeabilizantes Paraguas, pinturas arquitectónicas, esmaltes, línea madera, automotivo, industrial). Pregunta qué tipo de proyecto tiene para orientarlo a la línea correcta.",
    };
  }

  // --- Impermeabilizantes (subcategorías) ---
  if (path.startsWith("/categorias/impermeabilizantes/10-anos")) {
    return {
      section: "Impermeabilizante 10 años",
      instructions:
        "El usuario está en la sección de impermeabilizantes de 10 años. Habla sobre la máxima duración de la línea Paraguas, su garantía extendida y aplicaciones en azoteas y superficies de alto tráfico.",
    };
  }
  if (path.startsWith("/categorias/impermeabilizantes/7-anos")) {
    return {
      section: "Impermeabilizante 7 años",
      instructions:
        "El usuario está en impermeabilizantes de 7 años de garantía. Destaca la relación durabilidad-precio y casos de uso típicos (azoteas de casa habitación, naves industriales ligeras).",
    };
  }
  if (path.startsWith("/categorias/impermeabilizantes/5-anos")) {
    return {
      section: "Impermeabilizante 5 años",
      instructions:
        "El usuario está en impermeabilizantes de 5 años. Resalta la flexibilidad del producto acrílico y su facilidad de aplicación. Menciona que es una opción equilibrada para proyectos residenciales.",
    };
  }
  if (path.startsWith("/categorias/impermeabilizantes/3-anos")) {
    return {
      section: "Impermeabilizante 3 años",
      instructions:
        "El usuario está en impermeabilizantes de 3 años. Explica que es la opción de entrada para mantenimiento preventivo o presupuestos ajustados. Orienta sobre preparación de superficie y rendimiento.",
    };
  }
  if (path.startsWith("/categorias/impermeabilizantes/acrilico-elastomerico")) {
    return {
      section: "Impermeabilizante acrílico elastomérico",
      instructions:
        "El usuario está en impermeabilizante acrílico elastomérico. Destaca su alta elasticidad para cubrir grietas, resistencia UV y compatibilidad con diferentes sustratos.",
    };
  }
  if (path.startsWith("/categorias/impermeabilizantes/acrilico-extra-elastico")) {
    return {
      section: "Impermeabilizante acrílico extra elástico",
      instructions:
        "El usuario está en impermeabilizante acrílico extra elástico. Habla sobre su formulación de alta elongación, ideal para superficies con movimiento estructural.",
    };
  }
  if (path.startsWith("/categorias/impermeabilizantes/acrilico-fibratado")) {
    return {
      section: "Impermeabilizante acrílico fibratado",
      instructions:
        "El usuario está en impermeabilizante acrílico fibratado. Destaca el refuerzo con fibras para mayor resistencia mecánica y sellado de grietas medianas.",
    };
  }
  if (path.startsWith("/categorias/impermeabilizantes")) {
    return {
      section: "Categoría Impermeabilizantes PRISA",
      instructions:
        "El usuario está explorando la línea de impermeabilizantes PRISA (Paraguas). Oriéntalo preguntando: tipo de superficie (azotea, muro, losa), años de garantía deseados y si hay grietas activas. Con eso recomienda la sub-línea adecuada.",
    };
  }

  // --- Arquitectónico (subcategorías) ---
  if (path.startsWith("/categorias/arquitectonico/interior")) {
    return {
      section: "Pinturas arquitectónicas — Interior",
      instructions:
        "El usuario está en pinturas para interiores. Enfócate en acabados lavables, cubrimiento, resistencia a manchas y olores. Pregunta tipo de cuarto y acabado deseado (mate, semi-brillante).",
    };
  }
  if (path.startsWith("/categorias/arquitectonico/exterior")) {
    return {
      section: "Pinturas arquitectónicas — Exterior",
      instructions:
        "El usuario está en pinturas para exteriores. Resalta resistencia a rayos UV, lluvia y hongos. Pregunta si la superficie es aplanado, tabicón o concreto.",
    };
  }
  if (path.startsWith("/categorias/arquitectonico/100-acrilica")) {
    return {
      section: "Pintura 100% acrílica",
      instructions:
        "El usuario está en la línea 100% acrílica. Destaca máxima durabilidad, blancura, flexibilidad y adhesión. Ideal para proyectos de largo plazo en interior y exterior.",
    };
  }
  if (path.startsWith("/categorias/arquitectonico/vinil-acrilica")) {
    return {
      section: "Pintura vinílica acrílica",
      instructions:
        "El usuario está en la línea vinílica acrílica. Explica su equilibrio entre rendimiento y costo: buen cubrimiento para proyectos de mediana escala.",
    };
  }
  if (path.startsWith("/categorias/arquitectonico/selladores-y-fondos")) {
    return {
      section: "Selladores y fondos PRISA",
      instructions:
        "El usuario está en selladores y fondos. Explica su uso como preparación de superficie antes de pintar: mejoran adhesión, reducen absorción y evitan manchas de humedad.",
    };
  }
  if (path.startsWith("/categorias/arquitectonico")) {
    return {
      section: "Categoría Pinturas Arquitectónicas PRISA",
      instructions:
        "El usuario está explorando pinturas arquitectónicas. Pregunta si es para interior o exterior y el tipo de superficie para recomendar la línea correcta (100% acrílica, vinílica, esmalte o sellador).",
    };
  }

  // --- Otras categorías ---
  if (path.startsWith("/categorias/esmaltes")) {
    return {
      section: "Categoría Esmaltes PRISA",
      instructions:
        "El usuario está en esmaltes. Destaca el acabado brillante, dureza y resistencia química. Pregunta si es para madera, metal o concreto y si es interior/exterior.",
    };
  }
  if (path.startsWith("/categorias/madera")) {
    return {
      section: "Línea Madera PRISA",
      instructions:
        "El usuario está en la línea de productos para madera. Menciona lacas, barnices, selladores y tintes. Pregunta si la madera es interior/exterior y si busca acabado natural o pigmentado.",
    };
  }
  if (path.startsWith("/categorias/automotivo")) {
    return {
      section: "Línea Automotivo PRISA",
      instructions:
        "El usuario está en la línea automotiva. Orienta sobre pinturas para carrocería, fondos anticorrosivos y acabados. Pregunta si es retoque o pintura completa.",
    };
  }
  if (path.startsWith("/categorias/industrial")) {
    return {
      section: "Línea Industrial PRISA",
      instructions:
        "El usuario está en la línea industrial. Habla sobre recubrimientos anticorrosivos, epóxicos y protección para estructuras metálicas y pisos industriales.",
    };
  }

  // --- Producto específico ---
  if (path.startsWith("/producto/")) {
    const slug = path.replace(/^\/producto\//, "").replace(/\/$/, "");
    const label = slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    return {
      section: `Producto: ${label}`,
      instructions: `El usuario está viendo el producto "${label}". Responde con información específica de este producto: características, aplicación, rendimiento y garantía según las fichas técnicas. Si el usuario pregunta por precio o disponibilidad, indícale que se comunique con un distribuidor PRISA.`,
    };
  }

  return null;
}

/**
 * Texto de contexto para el agente (widget standalone genérico).
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
  const pageCtx = describePageContext(path);

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
  lines.push("=== Fichas técnicas — fuentes (URLs) ===");
  lines.push(
    "Consulta estas URLs cuando afirmes especificaciones técnicas; si algo no aparece en el PDF, dilo con claridad.",
  );
  for (const u of fichaUrls) {
    lines.push(u);
  }

  // --- Página del usuario ---
  lines.push("");
  lines.push("=== Página del usuario ===");
  if (opts.pageUrl?.trim()) {
    lines.push(`Página actual del usuario: ${opts.pageUrl.trim()}`);
  } else if (path) {
    lines.push(`Ruta actual del usuario: ${path}`);
  } else {
    lines.push("Sin URL de página concreta; prioriza las instrucciones de arriba.");
  }
  lines.push(`Sitio/host de referencia: ${site}`);

  let text = lines.join("\n");
  if (text.length > maxChars) {
    text = `${text.slice(0, maxChars)}\n\n[...contexto truncado por límite CODY_CONTEXT_MAX_CHARS]`;
  }

  return ensureContextContainsFichaUrls(text, path);
}
