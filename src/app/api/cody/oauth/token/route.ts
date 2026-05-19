import { NextResponse } from "next/server";

/**
 * Proxy del intercambio authorization_code → tokens.
 * El cliente solo envía `code`; client_id / client_secret salen del servidor.
 *
 * En producción evita devolver refresh_token al navegador si no es necesario:
 * mejor copiar refresh_token una vez al .env del servidor (CODY_OAUTH_REFRESH_TOKEN).
 */
export async function POST(req: Request) {
  const baseUrl = process.env.CODY_API_BASE_URL?.trim();
  const clientId = process.env.CODY_OAUTH_CLIENT_ID;
  const clientSecret = process.env.CODY_OAUTH_CLIENT_SECRET;

  if (!baseUrl || !clientId || !clientSecret) {
    return NextResponse.json(
      { message: "OAuth Cody no configurado en el servidor." },
      { status: 503 },
    );
  }

  let body: { code?: string };
  try {
    body = (await req.json()) as { code?: string };
  } catch {
    return NextResponse.json({ message: "Cuerpo JSON inválido" }, { status: 400 });
  }

  const code = typeof body.code === "string" ? body.code.trim() : "";
  if (!code) {
    return NextResponse.json({ message: "Falta code" }, { status: 400 });
  }

  const url = `${baseUrl.replace(/\/$/, "")}/auth/oauth/v2/token`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
    }),
  });

  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}
