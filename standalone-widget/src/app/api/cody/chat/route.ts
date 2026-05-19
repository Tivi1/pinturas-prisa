import { NextResponse } from "next/server";
import {
  buildAssistantContextText,
  ensureContextContainsFichaUrls,
  resolvePublicSiteUrl,
} from "@/lib/assistant/buildChatContext";
import { getCodyAccessToken } from "@/lib/cody/accessToken";
import { extractAssistantReply } from "@/lib/cody/extractReply";

type Body = {
  message?: string;
  /** En esta API Cody equivale al `thread_id` devuelto por POST /threads/ */
  conversationId?: string | null;
  /** Ruta actual en el navegador, ej. `/producto/rivinol-7` */
  pagePath?: string | null;
  /** URL completa actual (opcional; si falta se intenta usar Referer). */
  pageUrl?: string | null;
};

/** Transporte legacy Meet Cody (`/api/v1/conversations` + `/messages`). */
function apiPrefix(): string {
  const p = process.env.CODY_API_PREFIX?.trim();
  return p ? p.replace(/\/$/, "") : "/api/v1";
}

function useThreadsApi(): boolean {
  return process.env.CODY_CHAT_TRANSPORT !== "conversations";
}

function pathFromOptionalUrl(url: string | undefined): string | undefined {
  if (!url?.trim()) return undefined;
  try {
    const u = new URL(url.trim());
    return u.pathname || undefined;
  } catch {
    return undefined;
  }
}

async function ensureThread(
  baseClean: string,
  token: string,
  existing?: string | null,
  /** Solo al crear thread: contexto para agente (si la API lo admite). */
  initialContext?: string | null,
): Promise<string> {
  if (existing && typeof existing === "string" && existing.trim()) {
    return existing.trim();
  }

  const threadTitle =
    process.env.CODY_THREAD_TITLE?.trim() || "Asistente PRISA — web";
  const threadSummary =
    process.env.CODY_THREAD_SUMMARY?.trim() ||
    "Asesoría de productos PRISA con fichas técnicas y catálogo del sitio";

  const testMode = process.env.CODY_THREAD_TEST_MODE === "true";

  const url = `${baseClean}/threads/`;
  const body: Record<string, unknown> = {
    test_mode: testMode,
    thread_summary: threadSummary,
    thread_title: threadTitle,
  };

  const threadCtxField = process.env.CODY_THREAD_CONTEXT_FIELD?.trim();
  const maxThreadCtx = Number(process.env.CODY_THREAD_CONTEXT_MAX_CHARS) || 8000;
  if (threadCtxField && initialContext?.trim()) {
    body[threadCtxField] = initialContext.trim().slice(0, maxThreadCtx);
  }

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(
      typeof (json as { message?: string }).message === "string"
        ? (json as { message: string }).message
        : `Error al crear thread: ${res.status}`,
    );
  }

  const threadId = (json as { thread_id?: string }).thread_id;
  if (!threadId || typeof threadId !== "string") {
    throw new Error("La API no devolvió thread_id.");
  }
  return threadId;
}

/**
 * URL del POST de mensaje.
 * - `with_thread` (default): `{base}/threads/{thread_id}{suffix}`
 * - `body_only`: `{base}{suffix}` (thread_id solo en el JSON; p. ej. suffix `/messages`)
 */
function threadMessagesPostUrl(baseClean: string, threadId: string): string {
  const suffixRaw =
    process.env.CODY_THREAD_MESSAGES_PATH_SUFFIX?.trim() ?? "/messages";
  const seg = suffixRaw.startsWith("/") ? suffixRaw : `/${suffixRaw}`;
  const mode =
    process.env.CODY_THREAD_MESSAGES_URL_MODE?.trim() || "with_thread";

  if (mode === "body_only") {
    return `${baseClean}${seg}`;
  }

  return `${baseClean}/threads/${encodeURIComponent(threadId)}${seg}`;
}

async function sendThreadMessage(
  baseClean: string,
  token: string,
  threadId: string,
  message: string,
  contextBlock: string | null | undefined,
  pagePath?: string | null,
): Promise<Response> {
  const agentId = process.env.CODY_AGENT_ID?.trim();
  if (!agentId) {
    throw new Error(
      "Falta CODY_AGENT_ID: la API exige agent_id en el cuerpo del mensaje.",
    );
  }

  const maxCtx = Number(process.env.CODY_MESSAGE_CONTEXT_MAX_CHARS) || 14_000;
  const contextPayload = ensureContextContainsFichaUrls(
    contextBlock ?? "",
    pagePath,
  ).slice(0, maxCtx);

  const payload = {
    thread_id: threadId,
    agent_id: agentId,
    message: message.slice(0, 2000),
    context: contextPayload,
  };

  const url = threadMessagesPostUrl(baseClean, threadId);

  return fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

async function ensureConversationLegacy(
  base: string,
  prefix: string,
  token: string,
  existing?: string | null,
): Promise<string> {
  if (existing && typeof existing === "string" && existing.trim()) {
    return existing.trim();
  }

  const botId =
    process.env.CODY_BOT_ID?.trim() || process.env.CODY_AGENT_ID?.trim();
  if (!botId) {
    throw new Error(
      "Falta CODY_AGENT_ID (o CODY_BOT_ID) para crear la primera conversación.",
    );
  }

  const name =
    process.env.CODY_CONVERSATION_NAME?.trim() || "Asistente web PRISA";
  const res = await fetch(`${base}${prefix}/conversations`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, bot_id: botId }),
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(
      typeof (json as { message?: string }).message === "string"
        ? (json as { message: string }).message
        : `Error al crear conversación: ${res.status}`,
    );
  }

  const data = json as { data?: { id?: string }; id?: string };
  const id = data?.data?.id ?? data?.id;
  if (!id || typeof id !== "string") {
    throw new Error("La API no devolvió un id de conversación reconocible.");
  }
  return id;
}

export async function POST(req: Request) {
  let parsed: Body;
  try {
    parsed = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ message: "JSON inválido" }, { status: 400 });
  }

  const message = typeof parsed.message === "string" ? parsed.message.trim() : "";
  if (!message) {
    return NextResponse.json({ message: "Falta message" }, { status: 400 });
  }

  const base =
    process.env.CODY_API_BASE_URL?.trim() ??
    process.env.CODY_INTERNAL_API_URL?.trim();
  if (!base) {
    return NextResponse.json(
      {
        message:
          "Cody no configurado: define CODY_API_BASE_URL o CODY_INTERNAL_API_URL.",
        fallbackDemo: true,
      },
      { status: 503 },
    );
  }

  let pageUrl =
    typeof parsed.pageUrl === "string" && parsed.pageUrl.trim()
      ? parsed.pageUrl.trim()
      : req.headers.get("referer") ?? undefined;

  let pagePath =
    typeof parsed.pagePath === "string" && parsed.pagePath.trim()
      ? parsed.pagePath.trim()
      : undefined;

  if (!pagePath && pageUrl) {
    pagePath = pathFromOptionalUrl(pageUrl);
  }

  const siteBaseUrl = resolvePublicSiteUrl(req);
  const contextText = buildAssistantContextText({
    pagePath,
    pageUrl,
    siteBaseUrl,
  });

  let token: string;
  try {
    token = await getCodyAccessToken();
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Token no disponible";
    return NextResponse.json({ message: msg, fallbackDemo: true }, { status: 503 });
  }

  const baseClean = base.replace(/\/$/, "");
  const threadsMode = useThreadsApi();
  const isNewConversation = !(
    parsed.conversationId &&
    typeof parsed.conversationId === "string" &&
    parsed.conversationId.trim()
  );

  try {
    let remoteId: string;
    let res: Response;

    if (threadsMode) {
      remoteId = await ensureThread(
        baseClean,
        token,
        parsed.conversationId,
        isNewConversation ? contextText : undefined,
      );
      res = await sendThreadMessage(
        baseClean,
        token,
        remoteId,
        message,
        contextText,
        pagePath,
      );
    } else {
      const prefix = apiPrefix();
      remoteId = await ensureConversationLegacy(
        baseClean,
        prefix,
        token,
        parsed.conversationId,
      );

      const ctxField = process.env.CODY_CHAT_CONTEXT_FIELD?.trim() || "context";
      const modeLegacy = (process.env.CODY_CONTEXT_MODE?.trim() || "field").toLowerCase();
      const legacyPayload: Record<string, unknown> = {
        conversation_id: remoteId,
      };
      if (modeLegacy === "prefix") {
        legacyPayload.content =
          `### Contexto (productos y fichas)\n${contextText}\n\n### Usuario\n${message.slice(0, 2000)}`;
      } else {
        legacyPayload.content = message.slice(0, 2000);
        legacyPayload[ctxField] = contextText;
      }

      res = await fetch(`${baseClean}${prefix}/messages`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(legacyPayload),
      });
    }

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      const msg =
        typeof (json as { message?: string }).message === "string"
          ? (json as { message: string }).message
          : `Error de API: ${res.status}`;
      return NextResponse.json(
        { message: msg, conversationId: remoteId },
        { status: res.status },
      );
    }

    const reply = extractAssistantReply(json);
    if (!reply) {
      return NextResponse.json(
        {
          message:
            "Respuesta vacía del servicio. Revisa el formato de la API o la ruta de mensajes del thread.",
          conversationId: remoteId,
          raw: process.env.NODE_ENV === "development" ? json : undefined,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      reply,
      conversationId: remoteId,
      messageId:
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `m_${Date.now()}`,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Error desconocido";
    return NextResponse.json({ message: msg }, { status: 502 });
  }
}
