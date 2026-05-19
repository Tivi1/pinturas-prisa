/**
 * Consume la respuesta de POST /chat/streaming/response (SSE o texto incremental).
 */

function snippetFromParsed(j: Record<string, unknown>): string {
  // Campos de streaming incremental (OpenAI-style y variantes comunes)
  if (typeof j.delta === "string") return j.delta;
  if (typeof j.token === "string") return j.token;

  // Campos de respuesta completa — orden de prioridad
  if (typeof j.content === "string") return j.content;
  if (typeof j.text === "string") return j.text;
  if (typeof j.response === "string") return j.response;
  if (typeof j.answer === "string") return j.answer;
  if (typeof j.reply === "string") return j.reply;
  if (typeof j.output === "string") return j.output;

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

  // Fallback genérico: primer string value no vacío del objeto
  for (const v of Object.values(j)) {
    if (typeof v === "string" && v.trim()) return v;
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

  console.debug("[streamConsumer] Content-Type:", ct, "| isSse:", isSse, "| status:", res.status);

  const reader = res.body?.getReader();
  if (!reader) throw new Error("Respuesta Cody sin body stream");

  const dec = new TextDecoder();
  let visible = "";
  let carry = "";
  let fullBody = "";   // raw body acumulado para fallback
  let rawAccum = "";  // solo para logging (limitado)
  let chunkCount = 0;

  const emitSseBlock = (block: string) => {
    console.debug("[streamConsumer] SSE block:", JSON.stringify(block));
    for (const rawLine of block.split("\n")) {
      const line = rawLine.trimEnd();
      if (!line.startsWith("data:")) continue;
      const payload = line.slice(5).trim();
      if (!payload || payload === "[DONE]") continue;

      try {
        const j = JSON.parse(payload) as Record<string, unknown>;
        const snippet = snippetFromParsed(j);
        console.debug("[streamConsumer] parsed JSON keys:", Object.keys(j), "→ snippet:", JSON.stringify(snippet));
        if (snippet) {
          visible += snippet;
          onDelta?.(snippet);
        }
      } catch {
        console.debug("[streamConsumer] non-JSON SSE payload:", JSON.stringify(payload));
        visible += payload;
        onDelta?.(payload);
      }
    }
  };

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    chunkCount++;
    const part = dec.decode(value, { stream: true });
    fullBody += part;
    if (rawAccum.length < 800) rawAccum += part;

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

  if (isSse && carry.trim()) {
    console.debug("[streamConsumer] flushing leftover carry:", JSON.stringify(carry.slice(0, 300)));
    emitSseBlock(carry);
  }

  // Fallback: API declaró text/event-stream pero envió texto plano sin prefijos data:
  if (!visible && fullBody.trim()) {
    console.debug("[streamConsumer] SSE parsing yielded nothing; using raw body as plain text");
    visible = fullBody.trim();
    onDelta?.(visible);
  }

  console.debug(
    `[streamConsumer] done — chunks: ${chunkCount}, visible: ${JSON.stringify(visible.slice(0, 200))}, raw (first 800): ${JSON.stringify(rawAccum)}`,
  );

  return visible.trim();
}
