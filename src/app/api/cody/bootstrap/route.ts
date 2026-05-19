import { NextResponse } from "next/server";
import { CODY_BFF_COOKIE, codyCookieBaseOptions } from "@/lib/cody/internal/cookies";
import { getCodyInternalApiBase, isCodyInternalBffConfigured } from "@/lib/cody/internal/env";

// LoginJson eliminado: ya no se hace pre-login separado

type SessionJson = {
  access_token?: string;
  expires_in?: number;
};

type ThreadJson = {
  thread_id?: string;
  id?: string;
};

function threadBootstrapPayload(): Record<string, unknown> {
  if (process.env.CODY_THREAD_BODY_NULL_JSON === "true") {
    return {
      thread_title: null,
      thread_summary: null,
      test_mode: false,
    };
  }

  const title =
    process.env.CODY_THREAD_BOOTSTRAP_TITLE?.trim() ||
    process.env.CODY_THREAD_TITLE?.trim() ||
    "Conversación de soporte PRISA®";
  const summary =
    process.env.CODY_THREAD_BOOTSTRAP_SUMMARY?.trim() ||
    process.env.CODY_THREAD_SUMMARY?.trim() ||
    "Conversación iniciada desde el sitio web Pinturas PRISA.";
  return {
    thread_title: title,
    thread_summary: summary,
    test_mode: process.env.CODY_THREAD_TEST_MODE === "true",
  };
}

/**
 * POST /api/cody/bootstrap
 * Sesión directa: POST /auth/create-chat-session → POST /threads/
 * Almacena access_token, thread_id y agent_id en cookies httpOnly.
 * Cuando el token expira, /api/cody/chat/stream devuelve { code: "NEED_BOOTSTRAP" }
 * y el cliente reintenta automáticamente.
 */
export async function POST() {
  if (!isCodyInternalBffConfigured()) {
    return NextResponse.json(
      {
        configured: false,
        code: "INTERNAL_NOT_CONFIGURED",
        message: "Define CODY_PUBLIC_API como URL base de Cody.",
      },
      { status: 503 },
    );
  }

  const username =
    process.env.CODY_SERVICE_USERNAME?.trim() ||
    process.env.CODY_CHAT_USERNAME?.trim();
  const password =
    process.env.CODY_SERVICE_PASSWORD?.trim() ||
    process.env.CODY_CHAT_PASSWORD?.trim();
  const agentId = process.env.CODY_AGENT_ID?.trim();

  if (!username || !password || !agentId) {
    return NextResponse.json(
      {
        configured: false,
        message:
          "Configura CODY_SERVICE_USERNAME, CODY_SERVICE_PASSWORD y CODY_AGENT_ID",
      },
      { status: 503 },
    );
  }

  const base = getCodyInternalApiBase();

  // Paso 1: crear sesión de chat (credenciales → access_token)
  let sessionRes: Response;
  let sessionJson: SessionJson & Record<string, unknown>;
  try {
    sessionRes = await fetch(`${base}/auth/create-chat-session`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ agent_id: agentId, username, password }),
    });
    sessionJson = (await sessionRes.json().catch(() => ({}))) as SessionJson &
      Record<string, unknown>;
  } catch (e) {
    return NextResponse.json(
      {
        configured: false,
        message:
          e instanceof Error ? e.message : "Error de red al crear sesión Cody",
      },
      { status: 502 },
    );
  }

  if (!sessionRes.ok || !sessionJson.access_token) {
    const detail =
      typeof sessionJson.message === "string"
        ? sessionJson.message
        : typeof sessionJson.detail === "string"
          ? sessionJson.detail
          : JSON.stringify(sessionJson).slice(0, 200);
    return NextResponse.json(
      {
        configured: false,
        message: `create-chat-session falló (HTTP ${sessionRes.status}): ${detail}`,
      },
      { status: 502 },
    );
  }

  const accessToken = sessionJson.access_token;
  const sessionExp =
    typeof sessionJson.expires_in === "number" ? sessionJson.expires_in : 86400;

  // Paso 2: crear thread de conversación
  let threadRes: Response;
  let threadJson: ThreadJson & Record<string, unknown>;
  try {
    threadRes = await fetch(`${base}/threads/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(threadBootstrapPayload()),
    });
    threadJson = (await threadRes.json().catch(() => ({}))) as ThreadJson &
      Record<string, unknown>;
  } catch (e) {
    return NextResponse.json(
      {
        configured: false,
        message:
          e instanceof Error ? e.message : "Error de red al crear thread Cody",
      },
      { status: 502 },
    );
  }

  if (!threadRes.ok) {
    return NextResponse.json(
      typeof threadJson.message === "string"
        ? threadJson
        : { message: "Crear thread falló", detail: threadJson },
      { status: threadRes.status },
    );
  }

  const threadIdRaw = threadJson.thread_id ?? threadJson.id;
  const threadId = typeof threadIdRaw === "string" ? threadIdRaw : undefined;

  const cookieOpts = codyCookieBaseOptions(sessionExp);
  const out = NextResponse.json({
    ok: true,
    configured: true,
    thread_id: threadId ?? null,
  });

  out.cookies.set(CODY_BFF_COOKIE.session, accessToken, cookieOpts);
  out.cookies.set(CODY_BFF_COOKIE.agent, agentId, cookieOpts);

  if (threadId) {
    out.cookies.set(
      CODY_BFF_COOKIE.thread,
      threadId,
      codyCookieBaseOptions(Math.max(sessionExp, 86400)),
    );
  }

  return out;
}
