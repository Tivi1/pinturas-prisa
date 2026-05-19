"use client";

import { Paintbrush } from "lucide-react";
import {
  ASSISTANT_BUBBLE_OPEN_HINT,
  ASSISTANT_CHANNEL_LABEL,
  ASSISTANT_MINIMIZED_OPEN_BUTTON,
  ASSISTANT_MINIMIZED_RESUME_LABEL,
  ASSISTANT_WELCOME_BUBBLE_TEXT,
  ASSISTANT_WIDGET_SUBTITLE,
  ASSISTANT_WIDGET_TITLE,
} from "./constants/widgetPublicCopy";
import { useAssistantWidget } from "./hooks/useAssistantWidget";
import { AssistantButton } from "./components/AssistantButton";
import { AssistantPanel } from "./components/AssistantPanel";

export function FloatingAssistantWidget() {
  const assistant = useAssistantWidget();

  const fabActivatesPanel = assistant.view === "open";

  return (
    <div
      className="fixed bottom-6 right-4 z-[10050] flex flex-col items-end gap-3 sm:right-6"
      aria-live="polite"
    >
      {assistant.showWelcomeBubble && assistant.view === "closed" ? (
        <div className="assistant-welcome-enter max-w-[min(19rem,calc(100vw-5rem))]">
          <div className="relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5 shadow-xl shadow-slate-900/15 ring-1 ring-[var(--color-primary)]/10">
            <button
              type="button"
              onClick={assistant.dismissWelcomeBubble}
              className="absolute right-2 top-2 rounded-lg p-1 text-[var(--color-text-light)] transition hover:bg-[var(--color-surface-alt)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
              aria-label="Cerrar invitación"
            >
              <span className="text-lg leading-none" aria-hidden>
                ×
              </span>
            </button>
            <button
              type="button"
              onClick={assistant.openPanel}
              className="block w-full pr-7 text-left"
            >
              <p className="text-sm font-semibold leading-snug text-[var(--color-text)]">
                {ASSISTANT_WELCOME_BUBBLE_TEXT}
              </p>
              <p className="mt-1.5 text-xs font-medium text-[var(--color-primary)]">
                {ASSISTANT_BUBBLE_OPEN_HINT}
              </p>
            </button>
          </div>
        </div>
      ) : null}

      {assistant.view === "open" ? (
        <AssistantPanel
          channelLabel={ASSISTANT_CHANNEL_LABEL}
          title={ASSISTANT_WIDGET_TITLE}
          subtitle={ASSISTANT_WIDGET_SUBTITLE}
          messages={assistant.messages}
          draft={assistant.draft}
          onDraftChange={assistant.setDraft}
          onSend={assistant.handleSendText}
          loading={assistant.loading}
          error={assistant.error}
          listRef={assistant.listRef}
          onQuickAction={assistant.handleQuickAction}
          onMinimize={assistant.minimizePanel}
          onClose={assistant.closePanel}
        />
      ) : null}

      {assistant.view === "minimized" ? (
        <button
          type="button"
          onClick={assistant.restorePanel}
          className="assistant-panel-enter flex max-w-md items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-left shadow-xl shadow-slate-900/15 ring-1 ring-slate-900/5 transition hover:border-[var(--color-primary)]/25 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] text-[var(--color-text-inverse)] shadow-inner shadow-black/10">
            <Paintbrush className="h-5 w-5" strokeWidth={2} aria-hidden />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold text-[var(--color-text)]">
              {ASSISTANT_WIDGET_TITLE}
            </span>
            <span className="block truncate text-xs text-[var(--color-text-light)]">
              {ASSISTANT_MINIMIZED_RESUME_LABEL}
            </span>
          </span>
          <span className="shrink-0 rounded-lg bg-[var(--color-surface-alt)] px-2.5 py-1 text-xs font-semibold text-[var(--color-primary)]">
            {ASSISTANT_MINIMIZED_OPEN_BUTTON}
          </span>
        </button>
      ) : null}

      <AssistantButton
        onClick={assistant.toggleFromFab}
        open={fabActivatesPanel}
        aria-label={
          assistant.view === "open"
            ? `Minimizar ${ASSISTANT_WIDGET_TITLE}`
            : `Abrir ${ASSISTANT_WIDGET_TITLE}`
        }
      />
    </div>
  );
}
