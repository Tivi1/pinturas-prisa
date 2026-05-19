/**
 * Bearer token para la API Cody en Cloud Run.
 * Los secretos solo en variables de entorno del servidor (nunca NEXT_PUBLIC_*).
 *
 * Modo recomendado (agente / chat session):
 * - CODY_API_BASE_URL — ej. https://cody-public-api-….run.app (sin barra final)
 * - CODY_AGENT_ID — agent_id del agente
 * - CODY_CHAT_USERNAME — usuario de la sesión de chat
 * - CODY_CHAT_PASSWORD — contraseña (solo servidor)
 *
 * El servidor llama POST /auth/create-chat-session y cachea access_token hasta expires_in.
 *
 * Alternativas:
 * - CODY_ACCESS_TOKEN + opcional CODY_ACCESS_TOKEN_EXPIRES_AT (unix segundos), sin llamar login.
 * - OAuth refresh (legacy): CODY_OAUTH_CLIENT_ID, CODY_OAUTH_CLIENT_SECRET, CODY_OAUTH_REFRESH_TOKEN
 */

type TokenJson = {
  access_token?: string;
  refresh_token?: string | null;
  expires_in?: number;
  token_type?: string;
  message?: string;
};

let memoryCache: { token: string; expiresAtMs: number } | null = null;

function oauthTokenUrl(base: string) {
  return `${base.replace(/\/$/, "")}/auth/oauth/v2/token`;
}

function chatSessionUrl(base: string) {
  return `${base.replace(/\/$/, "")}/auth/create-chat-session`;
}

async function fetchChatSessionToken(baseUrl: string): Promise<string> {
  const agentId = process.env.CODY_AGENT_ID?.trim();
  const username = process.env.CODY_CHAT_USERNAME?.trim();
  const password = process.env.CODY_CHAT_PASSWORD?.trim();

  if (!agentId || !username || !password) {
    throw new Error(
      "Sesión de chat incompleta: CODY_AGENT_ID, CODY_CHAT_USERNAME y CODY_CHAT_PASSWORD son obligatorios.",
    );
  }

  const now = Date.now();
  const url = chatSessionUrl(baseUrl);
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      agent_id: agentId,
      username,
      password,
    }),
  });

  const data = (await res.json().catch(() => ({}))) as TokenJson;

  if (!res.ok || !data.access_token) {
    const hint =
      typeof data.message === "string"
        ? data.message
        : `create-chat-session respondió ${res.status}`;
    throw new Error(hint);
  }

  const seconds = typeof data.expires_in === "number" ? data.expires_in : 86400;
  memoryCache = {
    token: data.access_token,
    expiresAtMs: now + seconds * 1000 - 120_000,
  };

  return data.access_token;
}

async function fetchOAuthRefreshToken(baseUrl: string): Promise<string> {
  const clientId = process.env.CODY_OAUTH_CLIENT_ID?.trim();
  const clientSecret = process.env.CODY_OAUTH_CLIENT_SECRET?.trim();
  const refreshToken = process.env.CODY_OAUTH_REFRESH_TOKEN?.trim();

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error(
      "OAuth incompleto: CODY_OAUTH_CLIENT_ID, CODY_OAUTH_CLIENT_SECRET y CODY_OAUTH_REFRESH_TOKEN",
    );
  }

  const url = oauthTokenUrl(baseUrl);
  const bodies: Record<string, string>[] = [
    {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: clientId,
      client_secret: clientSecret,
    },
    {
      refresh_token: refreshToken,
      client_id: clientId,
      client_secret: clientSecret,
    },
  ];

  const now = Date.now();
  let lastBody: unknown;
  for (const body of bodies) {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    lastBody = await res.json().catch(() => ({}));
    if (!res.ok) continue;

    const data = lastBody as TokenJson;
    if (data.access_token) {
      const seconds = typeof data.expires_in === "number" ? data.expires_in : 3600;
      memoryCache = {
        token: data.access_token,
        expiresAtMs: now + seconds * 1000 - 120_000,
      };
      return data.access_token;
    }
  }

  throw new Error(
    `Renovación OAuth fallida: ${typeof lastBody === "string" ? lastBody : JSON.stringify(lastBody)}`,
  );
}

export async function getCodyAccessToken(): Promise<string> {
  const now = Date.now();
  if (memoryCache && memoryCache.expiresAtMs > now + 60_000) {
    return memoryCache.token;
  }

  const baseUrl = process.env.CODY_API_BASE_URL?.trim();
  if (!baseUrl) {
    throw new Error("Falta CODY_API_BASE_URL");
  }

  const accessOnly = process.env.CODY_ACCESS_TOKEN?.trim();
  const accessExpUnix = process.env.CODY_ACCESS_TOKEN_EXPIRES_AT?.trim();
  if (accessOnly) {
    const expMs =
      accessExpUnix && !Number.isNaN(Number(accessExpUnix))
        ? Number(accessExpUnix) * 1000
        : now + 50 * 60 * 1000;
    if (expMs > now + 60_000) {
      memoryCache = { token: accessOnly, expiresAtMs: expMs - 120_000 };
      return accessOnly;
    }
  }

  const agentId = process.env.CODY_AGENT_ID?.trim();
  const chatUser = process.env.CODY_CHAT_USERNAME?.trim();
  const chatPass = process.env.CODY_CHAT_PASSWORD?.trim();
  const useChatSession = Boolean(agentId && chatUser && chatPass);

  if (useChatSession) {
    return fetchChatSessionToken(baseUrl);
  }

  const clientId = process.env.CODY_OAUTH_CLIENT_ID?.trim();
  const clientSecret = process.env.CODY_OAUTH_CLIENT_SECRET?.trim();
  const refreshToken = process.env.CODY_OAUTH_REFRESH_TOKEN?.trim();
  const useOAuth = Boolean(clientId && clientSecret && refreshToken);

  if (useOAuth) {
    return fetchOAuthRefreshToken(baseUrl);
  }

  throw new Error(
    "Configura sesión de agente: CODY_AGENT_ID, CODY_CHAT_USERNAME, CODY_CHAT_PASSWORD (recomendado); u OAuth + CODY_OAUTH_REFRESH_TOKEN; o CODY_ACCESS_TOKEN con caducidad.",
  );
}
