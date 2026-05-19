import { NextResponse } from "next/server";
import { CODY_BFF_COOKIE, codyCookieBaseOptions } from "@/lib/cody/internal/cookies";
import { getCodyInternalApiBase, isCodyInternalBffConfigured } from "@/lib/cody/internal/env";

type LoginJson = {
  access_token?: string;
  refresh_token?: string | null;
  expires_in?: number;
};

type SessionJson = {
  access_token?: string;
  expires_in?: number;
};

type ThreadJson = {
  thread_id?: string;
  id?: string;
};

function buildSessionPayload(opts: {
  email?: string;
  username?: string;
  password: string;
  agentId: string;
}) {
  const p: Record<string, string> = {
    password: opts.password,
    agent_id: opts.agentId,
  };
  if (opts.email?.trim()) p.email = opts.email.trim();
  if (opts.username?.trim()) p.username = opts.username.trim();
  return p;
}

async function tryUserLogin(
  base: string,
  payload: Record<string, string>,
): Promise<{ access: string; exp: number; refresh: string | null } | null> {
  const paths = [
    `${base}/auth/api-login`,
    `${base}/auth/login`,
    `${base}/auth/api-login/`,
    `${base}/auth/login/`,
  ].filter((v, i, a) => a.indexOf(v) === i);

  for (const url of paths) {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = (await res.json().catch(() => ({}))) as LoginJson;
    if (res.ok && data.access_token) {
      const exp = typeof data.expires_in === "number" ? data.expires_in : 3600;
      return {
        access: data.access_token,
        exp,
        refresh: data.refresh_token ?? null,
      };
    }
  }

  return null;
}

async function createChatSessionWithBearer(
  base: string,
  access: string,
  body: Record<string, string>,
) {
  return fetch(`${base}/auth/create-chat-session`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

async function createChatSessionStandalone(
  base: string,
  body: Record<string, string>,
) {
  return fetch(`${base}/auth/create-chat-session`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

/** Texto útil cuando Cody no devuelve `access_token` (status + mensaje conocido del JSON). */
function summarizeCodyFailure(
  res: Response,
  json: Record<string, unknown>,
): string {
  const pick = (): string | undefined => {
    for (const k of ["message", "detail", "error", "error_description"] as const) {
      const v = json[k];
      if (typeof v === "string" && v.trim()) return v.trim();
    }
    return undefined;
  };
  const fromApi = pick();
  if (fromApi) return `${fromApi} (HTTP ${res.status})`;
  const raw = JSON.stringify(json);
  const short = raw.length > 220 ? `${raw.slice(0, 220)}…` : raw;
  return `Cody HTTP ${res.status}: ${short || "(cuerpo vacío)"}`;
}

async function obtainChatSessionTokens(
  base: string,
  sessionPayload: Record<string, string>,
  loginPayload: Record<string, string>,
): Promise<{
  userAccessToken: string | null;
  userAccessExp: number;
  refreshToken: string | null;
  sessionToken: string;
  sessionExp: number;
  sessionVia: "bearer" | "standalone";
}> {
  const failureHints: string[] = [];

  const login = await tryUserLogin(base, loginPayload);

  if (login?.access) {
    const bearerRes = await createChatSessionWithBearer(
      base,
      login.access,
      sessionPayload,
    );
    const bearerJson = (await bearerRes.json().catch(() => ({}))) as SessionJson &
      Record<string, unknown>;
    if (
      bearerRes.ok &&
      bearerJson.access_token &&
      typeof bearerJson.access_token === "string"
    ) {
      return {
        userAccessToken: login.access,
        userAccessExp: login.exp,
        refreshToken: login.refresh,
        sessionToken: bearerJson.access_token,
        sessionExp:
          typeof bearerJson.expires_in === "number"
            ? bearerJson.expires_in
            : 86400,
        sessionVia: "bearer",
      };
    }

    failureHints.push(`Bearer+sesión: ${summarizeCodyFailure(bearerRes, bearerJson)}`);

    /** Algunos despliegues aceptan create-chat-session sin Bearer (solo cuerpo). */
    const standaloneRes = await createChatSessionStandalone(base, sessionPayload);
    const standJson =
      (await standaloneRes.json().catch(() => ({}))) as SessionJson &
      Record<string, unknown>;
    if (
      standaloneRes.ok &&
      standJson.access_token &&
      typeof standJson.access_token === "string"
    ) {
      return {
        userAccessToken: login.access,
        userAccessExp: login.exp,
        refreshToken: login.refresh,
        sessionToken: standJson.access_token,
        sessionExp:
          typeof standJson.expires_in === "number"
            ? standJson.expires_in
            : 86400,
        sessionVia: "standalone",
      };
    }

    failureHints.push(`Sólo cuerpo (con login OK): ${summarizeCodyFailure(standaloneRes, standJson)}`);
  } else if (!login) {
    failureHints.push(
      "Login de servicio falló en /auth/api-login y /auth/login (revisa usuario, email o contraseña).",
    );
  }

  /** Sin login válido (o Bearer falló): intento sólo standalone. */
  const alone = await createChatSessionStandalone(base, sessionPayload);
  const aloneJson = (await alone.json().catch(() => ({}))) as SessionJson &
    Record<string, unknown>;

  if (!alone.ok || !aloneJson.access_token) {
    const detail = summarizeCodyFailure(alone, aloneJson);
    const stacked = [detail, ...failureHints].filter(Boolean).join(" | ");
    throw new Error(`create-chat-session: ${stacked}`);
  }

  return {
    userAccessToken: null,
    userAccessExp: 3600,
    refreshToken: null,
    sessionToken: aloneJson.access_token,
    sessionExp:
      typeof aloneJson.expires_in === "number" ? aloneJson.expires_in : 86400,
    sessionVia: "standalone",
  };
}

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
 * api-login (/auth/login) opcional → create-chat-session → POST /threads/
 */
export async function POST() {
  if (!isCodyInternalBffConfigured()) {
    return NextResponse.json(
      {
        configured: false,
        code: "INTERNAL_NOT_CONFIGURED",
        message:
          "Define CODY_INTERNAL_API_URL o CODY_API_BASE_URL como URL base de Cody.",
      },
      { status: 503 },
    );
  }

  const email = process.env.CODY_SERVICE_EMAIL?.trim();
  /** Compatibilidad con `accessToken.ts` (CODY_CHAT_*). */
  const username =
    process.env.CODY_SERVICE_USERNAME?.trim() ||
    process.env.CODY_CHAT_USERNAME?.trim();
  const password =
    process.env.CODY_SERVICE_PASSWORD?.trim() ||
    process.env.CODY_CHAT_PASSWORD?.trim();
  const agentId = process.env.CODY_AGENT_ID?.trim();

  if (!password || !agentId || (!email && !username)) {
    return NextResponse.json(
      {
        configured: false,
        message:
          "Configura CODY_SERVICE_EMAIL o CODY_SERVICE_USERNAME (o CODY_CHAT_USERNAME), CODY_SERVICE_PASSWORD (o CODY_CHAT_PASSWORD) y CODY_AGENT_ID",
      },
      { status: 503 },
    );
  }

  const base = getCodyInternalApiBase();

  const loginPayload: Record<string, string> = email
    ? { email, password }
    : { username: username!, password };

  const sessionPayload = buildSessionPayload({
    email,
    username,
    password,
    agentId,
  });

  let tokens;
  try {
    tokens = await obtainChatSessionTokens(base, sessionPayload, loginPayload);
  } catch (e) {
    return NextResponse.json(
      {
        configured: false,
        message:
          e instanceof Error ? e.message : "No se pudo obtener sesión de chat",
      },
      { status: 502 },
    );
  }

  const threadRes = await fetch(`${base}/threads/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${tokens.sessionToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(threadBootstrapPayload()),
  });

  const threadJson = (await threadRes.json().catch(() => ({}))) as ThreadJson &
    Record<string, unknown>;

  if (!threadRes.ok) {
    return NextResponse.json(
      typeof threadJson.message === "string"
        ? threadJson
        : { message: "Crear thread falló", detail: threadJson },
      { status: threadRes.ok ? 502 : threadRes.status },
    );
  }

  const threadIdRaw = threadJson.thread_id ?? threadJson.id;
  const threadId = typeof threadIdRaw === "string" ? threadIdRaw : undefined;

  const out = NextResponse.json({
    ok: true,
    configured: true,
    thread_id: threadId ?? null,
    session_via: tokens.sessionVia,
  });

  if (tokens.userAccessToken) {
    const accessOpts = codyCookieBaseOptions(tokens.userAccessExp);
    out.cookies.set(CODY_BFF_COOKIE.access, tokens.userAccessToken, accessOpts);
    if (tokens.refreshToken) {
      out.cookies.set(CODY_BFF_COOKIE.refresh, tokens.refreshToken, {
        ...accessOpts,
        maxAge: 60 * 60 * 24 * 14,
      });
    }
  }

  out.cookies.set(
    CODY_BFF_COOKIE.session,
    tokens.sessionToken,
    codyCookieBaseOptions(tokens.sessionExp),
  );
  out.cookies.set(
    CODY_BFF_COOKIE.agent,
    agentId,
    codyCookieBaseOptions(tokens.sessionExp),
  );

  if (threadId) {
    out.cookies.set(
      CODY_BFF_COOKIE.thread,
      threadId,
      codyCookieBaseOptions(Math.max(tokens.sessionExp, 86400)),
    );
  }

  return out;
}
