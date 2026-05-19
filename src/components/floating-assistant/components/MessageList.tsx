"use client";

import type { RefObject } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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
            {m.role === "user" ? (
              <p className="whitespace-pre-wrap break-words">{m.content}</p>
            ) : (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ children }) => (
                    <p className="mb-2 break-words last:mb-0">{children}</p>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold">{children}</strong>
                  ),
                  em: ({ children }) => <em className="italic">{children}</em>,
                  ul: ({ children }) => (
                    <ul className="my-1.5 ml-4 list-disc space-y-0.5">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="my-1.5 ml-4 list-decimal space-y-0.5">{children}</ol>
                  ),
                  li: ({ children }) => (
                    <li className="break-words leading-relaxed">{children}</li>
                  ),
                  table: ({ children }) => (
                    <div className="my-2 overflow-x-auto">
                      <table className="min-w-full border-collapse text-xs">
                        {children}
                      </table>
                    </div>
                  ),
                  th: ({ children }) => (
                    <th className="border border-[var(--color-border)] bg-[var(--color-surface-alt)]/60 px-2 py-1 text-left font-semibold">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="border border-[var(--color-border)] px-2 py-1">
                      {children}
                    </td>
                  ),
                  code: ({ children, className }) => {
                    const isBlock = className?.includes("language-");
                    return isBlock ? (
                      <code className="block overflow-x-auto rounded bg-[var(--color-surface-alt)]/60 p-2 text-xs font-mono">
                        {children}
                      </code>
                    ) : (
                      <code className="rounded bg-[var(--color-surface-alt)]/60 px-1 py-0.5 text-xs font-mono">
                        {children}
                      </code>
                    );
                  },
                  h1: ({ children }) => (
                    <p className="mb-1 break-words font-bold">{children}</p>
                  ),
                  h2: ({ children }) => (
                    <p className="mb-1 break-words font-bold">{children}</p>
                  ),
                  h3: ({ children }) => (
                    <p className="mb-1 break-words font-semibold">{children}</p>
                  ),
                  hr: () => (
                    <hr className="my-2 border-[var(--color-border)]" />
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2"
                    >
                      {children}
                    </a>
                  ),
                }}
              >
                {m.content}
              </ReactMarkdown>
            )}
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
