/**
 * Mensajes al asistente:
 * 1) Cody Internal API vía BFF: POST /api/cody/chat/stream (cookies httpOnly) + bootstrap opcional.
 * 2) Respaldo: POST /api/cody/chat (token único legacy).
 */

import { consumeAssistantStream } from "./streamConsumer";

function randomId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `msg_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export type SendMessageResult = {
  messageId: string;
  reply: string;
  conversationId?: string;
};

export type SendAssistantOptions = {
  pagePath?: string;
  pageUrl?: string;
  /** Streaming (solo ruta Internal BFF): fragmentos de texto visibles en UI. */
  onStreamDelta?: (chunk: string) => void;
};

async function fetchInternalStream(payload: Record<string, string | undefined>) {
  return fetch("/api/cody/chat/stream", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

/**
 * Cody Internal (`CODY_INTERNAL_API_URL`) — streaming desde `/chat/streaming/response`.
 * Devuelve `null` si el BFF Internal no está configurado (intentar legacy).
 */
async function sendViaInternalBff(
  trimmed: string,
  paths: { pagePath?: string; pageUrl?: string },
  opts?: SendAssistantOptions,
): Promise<SendMessageResult | null> {
  let res = await fetchInternalStream({
    message: trimmed,
    pagePath: paths.pagePath,
    pageUrl: paths.pageUrl,
  });

  if (res.status === 503) {
    const j = (await res.json().catch(() => ({}))) as {
      code?: string;
      message?: string;
    };
    if (j.code === "INTERNAL_NOT_CONFIGURED") return null;
    throw new Error(j.message || "Streaming Cody no disponible");
  }

  if (res.status === 401) {
    const j = (await res.json().catch(() => ({}))) as { code?: string; message?: string };
    if (j.code !== "NEED_BOOTSTRAP") {
      throw new Error(j.message || "Sesión Cody inválida");
    }

    const b = await fetch("/api/cody/bootstrap", {
      method: "POST",
      credentials: "include",
    });
    const bj = (await b.json().catch(() => ({}))) as {
      configured?: boolean;
      message?: string;
    };

    if (!b.ok) {
      throw new Error(
        bj.message ||
          "No se pudo iniciar sesión Cody (bootstrap). Revisa variables de servidor.",
      );
    }

    res = await fetchInternalStream({
      message: trimmed,
      pagePath: paths.pagePath,
      pageUrl: paths.pageUrl,
    });
  }

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    let msg = txt.slice(0, 400);
    try {
      const j = JSON.parse(txt) as { message?: string };
      if (typeof j.message === "string") msg = j.message;
    } catch {
      /* ignore */
    }
    throw new Error(msg || `Error streaming Cody (${res.status})`);
  }

  const reply = await consumeAssistantStream(res, opts?.onStreamDelta);
  return {
    messageId: randomId(),
    reply,
    conversationId: undefined,
  };
}

async function sendViaLegacyChat(
  trimmed: string,
  conversationId: string | null | undefined,
  paths: { pagePath?: string; pageUrl?: string },
): Promise<SendMessageResult> {
  const res = await fetch("/api/cody/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: trimmed,
      conversationId: conversationId ?? undefined,
      pagePath: paths.pagePath,
      pageUrl: paths.pageUrl,
    }),
  });

  const json = (await res.json().catch(() => ({}))) as {
    reply?: string;
    message?: string;
    conversationId?: string;
    messageId?: string;
    fallbackDemo?: boolean;
  };

  if (res.status === 503 && json.fallbackDemo) {
    const detail =
      typeof json.message === "string"
        ? json.message
        : "Cody no está disponible (revisa variables en el servidor).";
    throw new Error(detail);
  }

  if (!res.ok) {
    const err =
      typeof json.message === "string" ? json.message : `Error ${res.status}`;
    throw new Error(err);
  }

  const reply = typeof json.reply === "string" ? json.reply : "";
  return {
    messageId:
      typeof json.messageId === "string" && json.messageId
        ? json.messageId
        : randomId(),
    reply,
    conversationId:
      typeof json.conversationId === "string" ? json.conversationId : undefined,
  };
}

/** Envío unificado Internal BFF streaming + legacy `/api/cody/chat`. */
export async function sendMessageToAssistant(
  message: string,
  conversationId?: string | null,
  opts?: SendAssistantOptions,
): Promise<SendMessageResult> {
  const trimmed = message.trim();
  if (!trimmed) {
    return { messageId: randomId(), reply: "" };
  }

  const pagePath =
    opts?.pagePath ??
    (typeof window !== "undefined" ? window.location.pathname : undefined);
  const pageUrl =
    opts?.pageUrl ??
    (typeof window !== "undefined" ? window.location.href : undefined);
  const paths = { pagePath, pageUrl };

  const internal = await sendViaInternalBff(trimmed, paths, opts);
  if (internal) return internal;

  return sendViaLegacyChat(trimmed, conversationId, paths);
}
