import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { CODY_BFF_COOKIE, codyCookieBaseOptions } from "@/lib/cody/internal/cookies";
import { getCodyInternalApiBase, isCodyInternalBffConfigured } from "@/lib/cody/internal/env";

function threadIdFromResponse(json: Record<string, unknown>): string | undefined {
  const tid = json.thread_id ?? json.id;
  return typeof tid === "string" ? tid : undefined;
}

/** GET lista | POST crear thread — Bearer session_token en cookie */
export async function GET() {
  if (!isCodyInternalBffConfigured()) {
    return NextResponse.json({ code: "INTERNAL_NOT_CONFIGURED" }, { status: 503 });
  }

  const jar = await cookies();
  const session = jar.get(CODY_BFF_COOKIE.session)?.value;
  if (!session) {
    return NextResponse.json({ code: "NEED_CHAT_SESSION" }, { status: 401 });
  }

  const base = getCodyInternalApiBase();
  const res = await fetch(`${base}/threads/?order_by=created_at&sort=desc`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${session}`,
    },
  });

  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}

export async function POST(req: Request) {
  if (!isCodyInternalBffConfigured()) {
    return NextResponse.json({ code: "INTERNAL_NOT_CONFIGURED" }, { status: 503 });
  }

  const jar = await cookies();
  const session = jar.get(CODY_BFF_COOKIE.session)?.value;
  if (!session) {
    return NextResponse.json({ code: "NEED_CHAT_SESSION" }, { status: 401 });
  }

  let overrides: Partial<{
    thread_title: string | null;
    thread_summary: string | null;
    test_mode: boolean;
  }> = {};
  try {
    const body = await req.json().catch(() => null);
    if (body && typeof body === "object") overrides = body as typeof overrides;
  } catch {
    /* default body */
  }

  const payload = {
    thread_title:
      overrides.thread_title !== undefined
        ? overrides.thread_title
        : (process.env.CODY_THREAD_TITLE?.trim() ?? null),
    thread_summary:
      overrides.thread_summary !== undefined
        ? overrides.thread_summary
        : (process.env.CODY_THREAD_SUMMARY?.trim() ?? null),
    test_mode:
      typeof overrides.test_mode === "boolean"
        ? overrides.test_mode
        : process.env.CODY_THREAD_TEST_MODE === "true",
  };

  const base = getCodyInternalApiBase();
  const res = await fetch(`${base}/threads/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  if (!res.ok) {
    return NextResponse.json(data, { status: res.status });
  }

  const threadId = threadIdFromResponse(data);
  const out = NextResponse.json({
    ok: true,
    thread_id: threadId,
    raw: process.env.NODE_ENV === "development" ? data : undefined,
  });

  if (threadId) {
    out.cookies.set(CODY_BFF_COOKIE.thread, threadId, {
      ...codyCookieBaseOptions(86400 * 7),
      httpOnly: true,
    });
  }

  return out;
}
