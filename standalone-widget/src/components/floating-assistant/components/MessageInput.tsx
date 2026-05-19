"use client";

import type { KeyboardEvent } from "react";
import { SendHorizontal } from "lucide-react";
import {
  ASSISTANT_INPUT_PLACEHOLDER,
  ASSISTANT_INPUT_SCREEN_READER_LABEL,
} from "../constants/widgetPublicCopy";

type MessageInputProps = {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  loading: boolean;
  error: string | null;
};

export function MessageInput({ value, onChange, onSend, loading, error }: MessageInputProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!loading && value.trim()) onSend();
    }
  };

  return (
    <div className="shrink-0 border-t border-[var(--color-border)] bg-[var(--color-surface)] px-3 pb-3 pt-2">
      {error ? (
        <div className="mb-2 rounded-xl bg-rose-50 px-3 py-2 text-xs text-rose-800 ring-1 ring-rose-200/80">
          {error}
        </div>
      ) : null}

      <div className="flex items-end gap-2">
        <label htmlFor="floating-assistant-input" className="sr-only">
          {ASSISTANT_INPUT_SCREEN_READER_LABEL}
        </label>
        <textarea
          id="floating-assistant-input"
          rows={2}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={ASSISTANT_INPUT_PLACEHOLDER}
          disabled={loading}
          className="min-h-[48px] flex-1 resize-none rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-light)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/25 disabled:opacity-60"
        />
        <button
          type="button"
          onClick={onSend}
          disabled={loading || !value.trim()}
          className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary)] text-[var(--color-text-inverse)] shadow-sm transition hover:bg-[#002a52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-45"
          aria-label="Enviar mensaje"
        >
          <SendHorizontal className="h-5 w-5" strokeWidth={2} aria-hidden />
        </button>
      </div>
      <p className="mt-2 text-[11px] leading-snug text-[var(--color-text-light)]">
        Shift+Enter para nueva línea.
      </p>
    </div>
  );
}
