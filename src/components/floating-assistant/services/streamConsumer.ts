/**
 * Consume la respuesta de POST /chat/streaming/response (SSE o texto incremental).
 */

function snippetFromParsed(j: Record<string, unknown>): string {
  if (typeof j.delta === "string") return j.delta;
  if (typeof j.token === "string") return j.token;
  if (typeof j.content === "string") return j.content;
  if (typeof j.text === "string") return j.text;

  if (typeof j.message === "string") return j.message;
  if (j.message !== null && typeof j.message === "object") {
    const m = j.message as Record<string, unknown>;
    if (typeof m.content === "string") return m.content;
    if (typeof m.text === "string") return m.text;
  }

  const choices = j.choices;
  if (Array.isArray(choices) && choices[0] && typeof choices[0] === "object") {
    const c = choices[0] as Record<string, unknown>;
    if (c.delta !== null && typeof c.delta === "object") {
      const d = c.delta as Record<string, unknown>;
      if (typeof d.content === "string") return d.content;
      if (typeof d.text === "string") return d.text;
    }
    if (typeof c.content === "string") return c.content;
    if (typeof c.text === "string") return c.text;
  }

  return "";
}

/** Lee el stream y devuelve el texto visible acumulado. */
export async function consumeAssistantStream(
  res: Response,
  onDelta?: (chunk: string) => void,
): Promise<string> {
  const ct = (res.headers.get("Content-Type") || "").toLowerCase();
  const isSse = ct.includes("event-stream");

  const reader = res.body?.getReader();
  if (!reader) throw new Error("Respuesta Cody sin body stream");

  const dec = new TextDecoder();
  let visible = "";
  let carry = "";

  const emitSseBlock = (block: string) => {
    for (const rawLine of block.split("\n")) {
      const line = rawLine.trimEnd();
      if (!line.startsWith("data:")) continue;
      const payload = line.slice(5).trim();
      if (!payload || payload === "[DONE]") continue;

      try {
        const j = JSON.parse(payload) as Record<string, unknown>;
        const snippet = snippetFromParsed(j);
        if (snippet) {
          visible += snippet;
          onDelta?.(snippet);
        }
      } catch {
        visible += payload;
        onDelta?.(payload);
      }
    }
  };

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const part = dec.decode(value, { stream: true });

    if (isSse) {
      carry += part;
      let ix: number;
      while ((ix = carry.indexOf("\n\n")) >= 0) {
        const block = carry.slice(0, ix);
        carry = carry.slice(ix + 2);
        emitSseBlock(block);
      }
    } else {
      visible += part;
      onDelta?.(part);
    }
  }

  if (isSse && carry.trim()) emitSseBlock(carry);

  return visible.trim();
}
