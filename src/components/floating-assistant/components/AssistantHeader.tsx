"use client";

import { ChevronDown, X } from "lucide-react";

type AssistantHeaderProps = {
  channelLabel: string;
  title: string;
  subtitle: string;
  onMinimize: () => void;
  onClose: () => void;
};

export function AssistantHeader({
  channelLabel,
  title,
  subtitle,
  onMinimize,
  onClose,
}: AssistantHeaderProps) {
  return (
    <header className="relative flex shrink-0 items-start justify-between gap-3 border-b border-white/15 bg-gradient-to-br from-[var(--color-primary)] to-[#004a7c] px-4 py-4 text-[var(--color-text-inverse)]">
      <div className="min-w-0 pt-0.5">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-white/80">
          {channelLabel}
        </p>
        <h2 id="floating-assistant-title" className="truncate text-lg font-bold leading-tight">
          {title}
        </h2>
        <p className="mt-1 text-sm leading-snug text-blue-100/95">{subtitle}</p>
      </div>
      <div className="flex shrink-0 gap-1">
        <button
          type="button"
          onClick={onMinimize}
          className="rounded-xl p-2 text-white/90 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          aria-label="Minimizar"
        >
          <ChevronDown className="h-5 w-5" strokeWidth={2} aria-hidden />
        </button>
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl p-2 text-white/90 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5" strokeWidth={2} aria-hidden />
        </button>
      </div>
    </header>
  );
}
