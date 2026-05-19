/** Base de la Cody Public API (sin `/` final). Lee CODY_PUBLIC_API con fallback a variables legacy. */
export function getCodyInternalApiBase(): string {
  const u =
    process.env.CODY_PUBLIC_API?.trim() ||
    process.env.CODY_INTERNAL_API_URL?.trim() ||
    process.env.CODY_API_BASE_URL?.trim();

  if (!u) {
    throw new Error(
      "Define CODY_PUBLIC_API como URL base de la API Cody",
    );
  }
  return u.replace(/\/$/, "");
}

/** Verifica que la URL base de Cody esté configurada. */
export function isCodyInternalBffConfigured(): boolean {
  return Boolean(
    process.env.CODY_PUBLIC_API?.trim() ||
      process.env.CODY_INTERNAL_API_URL?.trim() ||
      process.env.CODY_API_BASE_URL?.trim(),
  );
}
