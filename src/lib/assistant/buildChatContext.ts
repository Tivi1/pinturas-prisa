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

  const lines: string[] = [];

  lines.push("=== Fichas técnicas — fuentes obligatorias (URLs) ===");
  lines.push(
    "Consulta estas URLs antes de afirmar especificaciones técnicas; si algo no está en el PDF, dilo con claridad.",
  );
  for (const u of fichaUrls) {
    lines.push(u);
  }

  lines.push("");
  lines.push("=== Contexto PRISA — navegación y catálogo ===");
  lines.push(
    "Usa también la página del usuario y el índice de productos para orientar sobre líneas PRISA.",
  );

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
