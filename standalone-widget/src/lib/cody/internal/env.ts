/** Base donde viven `/auth/api-login`, `/chat/streaming/response`, etc. (sin `/` final). */
export function getCodyInternalApiBase(): string {
  const explicit = process.env.CODY_INTERNAL_API_URL?.trim();
  const fallback = process.env.CODY_API_BASE_URL?.trim();
  const u = explicit ?? fallback;

  if (!u) {
    throw new Error(
      "Define CODY_INTERNAL_API_URL o CODY_API_BASE_URL como URL base de la API Cody",
    );
  }
  return u.replace(/\/$/, "");
}

/**
 * Rutas bootstrap + `/api/cody/chat/stream` si hay cualquier URL base conocida para Cody.
 * (Antes solo con `CODY_API_BASE_URL` hacía falta `CODY_USE_INTERNAL_BFF=true` → muchos setups caían en legacy + demo.)
 */
export function isCodyInternalBffConfigured(): boolean {
  return Boolean(
    process.env.CODY_INTERNAL_API_URL?.trim() ||
      process.env.CODY_API_BASE_URL?.trim(),
  );
}
