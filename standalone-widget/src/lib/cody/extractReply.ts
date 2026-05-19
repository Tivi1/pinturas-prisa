/** Intenta obtener el texto de respuesta del asistente ante distintas formas de JSON. */

function stringFrom(obj: Record<string, unknown>, keys: string[]): string {
  for (const k of keys) {
    const v = obj[k];
    if (typeof v === "string" && v.trim()) return v;
  }
  return "";
}

export function extractAssistantReply(json: unknown): string {
  if (!json || typeof json !== "object") return "";

  const root = json as Record<string, unknown>;
  const direct = stringFrom(root, ["content", "message", "text", "response", "reply"]);
  if (direct) return direct;

  const data = root.data;
  if (data && typeof data === "object") {
    const d = data as Record<string, unknown>;
    const inner = stringFrom(d, ["content", "message", "text", "response", "reply"]);
    if (inner) return inner;
    return extractAssistantReply(d);
  }

  return "";
}
