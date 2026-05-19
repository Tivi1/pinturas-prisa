/** Cookies httpOnly del BFF Cody (mismo patrón que el proyecto de referencia). */
export const CODY_BFF_COOKIE = {
  session: "prisa_cody_session_token",
  thread: "prisa_cody_thread_id",
  agent: "prisa_cody_agent_id",
} as const;

export function codyCookieBaseOptions(maxAgeSec: number) {
  return {
    httpOnly: true as const,
    path: "/",
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    maxAge: Math.max(60, Math.floor(maxAgeSec)),
  };
}
