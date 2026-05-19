import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { CODY_BFF_COOKIE } from "@/lib/cody/internal/cookies";
import { getCodyInternalApiBase, isCodyInternalBffConfigured } from "@/lib/cody/internal/env";

/** GET /api/cody/agents?tenant_id=... */
export async function GET(req: NextRequest) {
  if (!isCodyInternalBffConfigured()) {
    return NextResponse.json(
      { code: "INTERNAL_NOT_CONFIGURED" },
      { status: 503 },
    );
  }

  const tenantId =
    req.nextUrl.searchParams.get("tenant_id")?.trim() ||
    process.env.CODY_TENANT_ID?.trim();
  if (!tenantId) {
    return NextResponse.json(
      { message: "Falta tenant_id en query o CODY_TENANT_ID en env" },
      { status: 400 },
    );
  }

  const jar = await cookies();
  const access = jar.get(CODY_BFF_COOKIE.access)?.value;
  if (!access) {
    return NextResponse.json({ message: "No hay sesión de usuario (api-login)" }, { status: 401 });
  }

  const base = getCodyInternalApiBase();
  const res = await fetch(
    `${base}/agents/?tenant_id=${encodeURIComponent(tenantId)}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${access}`,
      },
    },
  );

  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}
