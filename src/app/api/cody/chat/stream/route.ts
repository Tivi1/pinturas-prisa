import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  buildAssistantContextText,
  resolvePublicSiteUrl,
} from "@/lib/assistant/buildChatContext";
import { CODY_BFF_COOKIE } from "@/lib/cody/internal/cookies";
import { getCodyInternalApiBase, isCodyInternalBffConfigured } from "@/lib/cody/internal/env";

type StreamBody = {
  message?: string;
  pagePath?: string | null;
  pageUrl?: string | null;
};

function pathFromOptionalUrl(url: string | undefined): string | undefined {
  if (!url?.trim()) return undefined;
  try {
    return new URL(url.trim()).pathname || undefined;
  } catch {
    return undefined;
  }
}

/**
 * POST /api/cody/chat/stream
 * Proxy streaming: POST /chat/streaming/response con Bearer session_token (cookie).
 */
export async function POST(req: Request) {
  if (!isCodyInternalBffConfigured()) {
    return NextResponse.json(
      { code: "INTERNAL_NOT_CONFIGURED", fallbackLegacy: true },
      { status: 503 },
    );
  }

  let parsed: StreamBody;
  try {
    parsed = (await req.json()) as StreamBody;
  } catch {
    return NextResponse.json({ message: "JSON inválido" }, { status: 400 });
  }

  const message = typeof parsed.message === "string" ? parsed.message.trim() : "";
  if (!message) {
    return NextResponse.json({ message: "Falta message" }, { status: 400 });
  }

  let pageUrl =
    typeof parsed.pageUrl === "string" && parsed.pageUrl.trim()
      ? parsed.pageUrl.trim()
      : req.headers.get("referer") ?? undefined;
  let pagePath =
    typeof parsed.pagePath === "string" && parsed.pagePath.trim()
      ? parsed.pagePath.trim()
      : undefined;
  if (!pagePath && pageUrl) pagePath = pathFromOptionalUrl(pageUrl);

  const siteBaseUrl = resolvePublicSiteUrl(req);
  const contextText = buildAssistantContextText({
    pagePath,
    pageUrl,
    siteBaseUrl,
  });

  const jar = await cookies();
  const session = jar.get(CODY_BFF_COOKIE.session)?.value;
  const threadId = jar.get(CODY_BFF_COOKIE.thread)?.value;
  const agentId = jar.get(CODY_BFF_COOKIE.agent)?.value;

  if (!session || !threadId || !agentId) {
    return NextResponse.json(
      { code: "NEED_BOOTSTRAP", message: "Sesión Cody incompleta; ejecuta POST /api/cody/bootstrap o el flujo login + chat-session + threads." },
      { status: 401 },
    );
  }

  const base = getCodyInternalApiBase();
  const streamUrl = `${base}/chat/streaming/response`;
  const streamPayload = {
    thread_id: threadId,
    agent_id: agentId,
    message,
    context: contextText,
  };

  console.log(
    "[cody/stream] →",
    streamUrl,
    JSON.stringify({ thread_id: streamPayload.thread_id, agent_id: streamPayload.agent_id, message: streamPayload.message, context_length: streamPayload.context?.length ?? 0 }),
  );

  const codyRes = await fetch(streamUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session}`,
      "Content-Type": "application/json",
      Accept: "text/event-stream",
    },
    body: JSON.stringify(streamPayload),
  });

  console.log(`[cody/stream] ← HTTP ${codyRes.status} (${streamUrl})`);

  if (codyRes.status === 401) {
    return NextResponse.json(
      { code: "NEED_BOOTSTRAP", message: "Token Cody expirado; se requiere nueva sesión." },
      { status: 401 },
    );
  }

  if (!codyRes.ok || !codyRes.body) {
    const fallback = await codyRes.text().catch(() => "");
    let detail: unknown;
    try {
      detail = JSON.parse(fallback);
    } catch {
      detail = fallback;
    }
    return NextResponse.json(
      { message: "Error upstream Cody", status: codyRes.status, detail },
      { status: 502 },
    );
  }

  const headers = new Headers();
  const ct = codyRes.headers.get("Content-Type");
  if (ct) headers.set("Content-Type", ct);
  const cacheCtl = codyRes.headers.get("Cache-Control");
  if (cacheCtl) headers.set("Cache-Control", cacheCtl);

  const [logStream, clientStream] = codyRes.body.tee();

  void (async () => {
    try {
      const reader = logStream.getReader();
      const decoder = new TextDecoder();
      const parts: string[] = [];
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        parts.push(decoder.decode(value, { stream: true }));
      }
      console.log("[cody/stream] response body:\n", parts.join(""));
    } catch (e) {
      console.error("[cody/stream] error al leer respuesta para log:", e);
    }
  })();

  return new Response(clientStream, { status: codyRes.status, headers });
}
