"use client";

import type { RefObject } from "react";
import type { AssistantMessage } from "../types/assistant.types";
import { ASSISTANT_MESSAGES_SECTION_LABEL } from "../constants/widgetPublicCopy";

type MessageListProps = {
  messages: AssistantMessage[];
  loading: boolean;
  scrollRef: RefObject<HTMLDivElement | null>;
};

export function MessageList({ messages, loading, scrollRef }: MessageListProps) {
  return (
    <div
      ref={scrollRef}
      className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto bg-[var(--color-surface-alt)]/35 px-3 py-3"
      role="log"
      aria-live="polite"
      aria-relevant="additions"
    >
      <p className="px-1 text-[11px] font-semibold uppercase tracking-wide text-[var(--color-text-light)]">
        {ASSISTANT_MESSAGES_SECTION_LABEL}
      </p>

      {messages.map((m) => (
        <div
          key={m.id}
          className={`flex w-full ${m.role === "user" ? "justify-end" : "justify-start"}`}
          role="article"
        >
          <div
            className={[
              "max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm",
              m.role === "user"
                ? "rounded-br-md bg-[var(--color-primary)] text-[var(--color-text-inverse)]"
                : "rounded-bl-md border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)]",
            ].join(" ")}
          >
            <p className="whitespace-pre-wrap break-words">{m.content}</p>
          </div>
        </div>
      ))}

      {loading ? (
        <div
          className="flex justify-start"
          aria-busy="true"
          aria-label="El asistente está escribiendo"
        >
          <div className="flex gap-1 rounded-2xl rounded-bl-md border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 shadow-sm">
            <span
              className="h-2 w-2 animate-bounce rounded-full bg-[var(--color-accent)] [animation-delay:-0.25s]"
              aria-hidden
            />
            <span
              className="h-2 w-2 animate-bounce rounded-full bg-[var(--color-accent)] [animation-delay:-0.12s]"
              aria-hidden
            />
            <span
              className="h-2 w-2 animate-bounce rounded-full bg-[var(--color-accent)]"
              aria-hidden
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
