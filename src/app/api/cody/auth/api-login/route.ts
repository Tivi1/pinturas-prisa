import { NextResponse } from "next/server";
import { CODY_BFF_COOKIE, codyCookieBaseOptions } from "@/lib/cody/internal/cookies";
import { getCodyInternalApiBase } from "@/lib/cody/internal/env";

type LoginBody = {
  email?: string;
  username?: string;
  password?: string;
};

/**
 * POST /api/cody/auth/api-login
 * Proxy: POST {CODY_INTERNAL_API_URL}/auth/api-login
 * Set-Cookie: access_token (httpOnly) + refresh opcional.
 */
export async function POST(req: Request) {
  let body: LoginBody;
  try {
    body = (await req.json()) as LoginBody;
  } catch {
    return NextResponse.json({ message: "JSON inválido" }, { status: 400 });
  }

  const password = typeof body.password === "string" ? body.password : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const username = typeof body.username === "string" ? body.username.trim() : "";

  if (!password || (!email && !username)) {
    return NextResponse.json(
      { message: "Falta password y email o username" },
      { status: 400 },
    );
  }

  let base: string;
  try {
    base = getCodyInternalApiBase();
  } catch {
    return NextResponse.json(
      { code: "INTERNAL_NOT_CONFIGURED", message: "CODY_INTERNAL_API_URL no definida" },
      { status: 503 },
    );
  }

  const payload = email
    ? { email, password }
    : { username: username!, password };

  const res = await fetch(`${base}/auth/api-login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = (await res.json().catch(() => ({}))) as {
    access_token?: string;
    refresh_token?: string | null;
    expires_in?: number;
    user_id?: string;
    email?: string;
    message?: string;
  };

  if (!res.ok || !data.access_token) {
    return NextResponse.json(
      typeof data.message === "string"
        ? { message: data.message }
        : { message: "Login rechazado", detail: data },
      { status: res.status >= 400 ? res.status : 401 },
    );
  }

  const exp = typeof data.expires_in === "number" ? data.expires_in : 3600;
  const out = NextResponse.json({
    ok: true,
    user_id: data.user_id,
    email: data.email,
    expires_in: exp,
  });

  const opts = codyCookieBaseOptions(exp);
  out.cookies.set(CODY_BFF_COOKIE.access, data.access_token, opts);
  if (data.refresh_token) {
    out.cookies.set(CODY_BFF_COOKIE.refresh, data.refresh_token, {
      ...opts,
      maxAge: 60 * 60 * 24 * 14,
    });
  }

  return out;
}
