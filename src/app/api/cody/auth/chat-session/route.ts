import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { CODY_BFF_COOKIE, codyCookieBaseOptions } from "@/lib/cody/internal/cookies";
import { getCodyInternalApiBase, isCodyInternalBffConfigured } from "@/lib/cody/internal/env";

type ChatSessionBody = {
  password: string;
  agent_id: string;
  email?: string;
  username?: string;
};

/**
 * POST /api/cody/auth/chat-session
 * Requiere cookie access_token (tras api-login).
 * Proxy: POST /auth/create-chat-session con Authorization: Bearer access_token
 */
export async function POST(req: Request) {
  if (!isCodyInternalBffConfigured()) {
    return NextResponse.json({ code: "INTERNAL_NOT_CONFIGURED" }, { status: 503 });
  }

  let body: ChatSessionBody;
  try {
    body = (await req.json()) as ChatSessionBody;
  } catch {
    return NextResponse.json({ message: "JSON inválido" }, { status: 400 });
  }

  const password = typeof body.password === "string" ? body.password : "";
  const agentId = typeof body.agent_id === "string" ? body.agent_id.trim() : "";

  if (!password || !agentId) {
    return NextResponse.json(
      { message: "Falta password u agent_id" },
      { status: 400 },
    );
  }

  const jar = await cookies();
  const access = jar.get(CODY_BFF_COOKIE.access)?.value;
  if (!access) {
    return NextResponse.json(
      { code: "NEED_LOGIN", message: "Haz POST /api/cody/auth/api-login primero" },
      { status: 401 },
    );
  }

  const base = getCodyInternalApiBase();
  const forwardBody: Record<string, string> = {
    password,
    agent_id: agentId,
  };
  if (typeof body.email === "string" && body.email.trim()) {
    forwardBody.email = body.email.trim();
  }
  if (typeof body.username === "string" && body.username.trim()) {
    forwardBody.username = body.username.trim();
  }

  const res = await fetch(`${base}/auth/create-chat-session`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(forwardBody),
  });

  const data = (await res.json().catch(() => ({}))) as {
    access_token?: string;
    expires_in?: number;
    message?: string;
  };

  if (!res.ok || !data.access_token) {
    return NextResponse.json(
      typeof data.message === "string" ? { message: data.message } : { detail: data },
      { status: res.status >= 400 ? res.status : 502 },
    );
  }

  const exp = typeof data.expires_in === "number" ? data.expires_in : 86400;
  const out = NextResponse.json({
    ok: true,
    session_token: data.access_token,
    expires_in: exp,
  });

  out.cookies.set(CODY_BFF_COOKIE.session, data.access_token, codyCookieBaseOptions(exp));
  out.cookies.set(CODY_BFF_COOKIE.agent, agentId, {
    ...codyCookieBaseOptions(exp),
    httpOnly: true,
  });

  return out;
}
