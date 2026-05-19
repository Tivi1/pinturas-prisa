export type AssistantMessageRole = "user" | "assistant";

export type AssistantMessage = {
  id: string;
  idempotencyKey?: string;
  role: AssistantMessageRole;
  content: string;
  createdAt: number;
  /** Metadatos opcionales para cuando exista API real (p. ej. id remoto) */
  meta?: Record<string, unknown>;
};

export type AssistantView = "closed" | "open" | "minimized";

export type QuickActionId =
  | "surface"
  | "quote"
  | "store"
  | "promos"
  | "support";
