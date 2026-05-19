"use client";

import type { RefObject } from "react";
import { AssistantHeader } from "./AssistantHeader";
import { MessageInput } from "./MessageInput";
import { MessageList } from "./MessageList";
import type { AssistantMessage } from "../types/assistant.types";

type AssistantPanelProps = {
  channelLabel: string;
  title: string;
  subtitle: string;
  messages: AssistantMessage[];
  draft: string;
  onDraftChange: (v: string) => void;
  onSend: () => void;
  loading: boolean;
  error: string | null;
  listRef: RefObject<HTMLDivElement | null>;
  onMinimize: () => void;
  onClose: () => void;
};

export function AssistantPanel({
  channelLabel,
  title,
  subtitle,
  messages,
  draft,
  onDraftChange,
  onSend,
  loading,
  error,
  listRef,
  onMinimize,
  onClose,
}: AssistantPanelProps) {
  return (
    <aside
      role="dialog"
      aria-labelledby="floating-assistant-title"
      aria-modal="true"
      className={[
        "fixed bottom-[5.75rem] right-4 z-[10040] flex w-[calc(100vw-2rem)] max-w-md flex-col overflow-hidden rounded-2xl",
        "border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl shadow-slate-900/20",
        "assistant-panel-enter sm:right-6",
      ].join(" ")}
      style={{ height: "min(580px, calc(100vh - 7rem))" }}
    >
      <AssistantHeader
        channelLabel={channelLabel}
        title={title}
        subtitle={subtitle}
        onMinimize={onMinimize}
        onClose={onClose}
      />
      <MessageList messages={messages} loading={loading} scrollRef={listRef} />
      <MessageInput
        value={draft}
        onChange={onDraftChange}
        onSend={onSend}
        loading={loading}
        error={error}
      />
    </aside>
  );
}
