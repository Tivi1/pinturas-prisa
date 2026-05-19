"use client";

import { Paintbrush } from "lucide-react";

type AssistantButtonProps = {
  onClick: () => void;
  open: boolean;
  "aria-label"?: string;
};

export function AssistantButton({
  onClick,
  open,
  "aria-label": ariaLabel = "Asesor PRISA — abrir ayuda",
}: AssistantButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      aria-expanded={open}
      className={[
        "assistant-fab peer relative inline-flex h-14 shrink-0 items-center gap-2.5 rounded-full pl-4 pr-5",
        "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)]",
        "text-[var(--color-text-inverse)] shadow-lg shadow-[var(--color-primary)]/25",
        "ring-2 ring-white/90 transition-[transform,box-shadow] duration-300 ease-out",
        "hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[var(--color-primary)]/30",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-accent)]/40",
        "active:scale-[0.98]",
        open ? "ring-[var(--color-accent)]/50" : "",
      ].join(" ")}
    >
      <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30">
        <Paintbrush className="h-5 w-5" strokeWidth={2} aria-hidden />
        <span
          className="pointer-events-none absolute inset-0 rounded-full bg-white/20 opacity-0 assistant-fab-ping"
          aria-hidden
        />
      </span>
      <span className="hidden max-w-[7.5rem] truncate text-sm font-semibold tracking-tight sm:inline">
        Asesor PRISA
      </span>
    </button>
  );
}
