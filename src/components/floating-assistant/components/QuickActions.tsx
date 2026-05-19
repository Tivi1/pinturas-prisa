"use client";

import {
  Calculator,
  Headphones,
  MapPin,
  PaintRoller,
  Percent,
  type LucideIcon,
} from "lucide-react";
import {
  ASSISTANT_QUICK_SECTION_LABEL,
  getQuickActionsResolved,
} from "../constants/widgetPublicCopy";
import type { QuickActionDefinition } from "../constants/assistantOptions";
import type { QuickActionId } from "../types/assistant.types";

const ICON_MAP: Record<QuickActionDefinition["icon"], LucideIcon> = {
  "paint-roller": PaintRoller,
  calculator: Calculator,
  "map-pin": MapPin,
  percent: Percent,
  headphones: Headphones,
};

type QuickActionsProps = {
  onSelect: (id: QuickActionId) => void;
  disabled?: boolean;
};

export function QuickActions({ onSelect, disabled }: QuickActionsProps) {
  const actions = getQuickActionsResolved();

  return (
    <div className="border-b border-[var(--color-border)] bg-[var(--color-surface-alt)]/50 px-3 py-3">
      <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-wide text-[var(--color-text-light)]">
        {ASSISTANT_QUICK_SECTION_LABEL}
      </p>
      <ul className="flex max-h-[9.5rem] flex-col gap-1.5 overflow-y-auto pr-0.5 sm:max-h-[11rem]">
        {actions.map((action) => {
          const Icon = ICON_MAP[action.icon];
          return (
            <li key={action.id}>
              <button
                type="button"
                disabled={disabled}
                onClick={() => onSelect(action.id)}
                className={[
                  "flex w-full items-center gap-2.5 rounded-xl border border-transparent bg-[var(--color-surface)] px-2.5 py-2 text-left text-sm font-medium text-[var(--color-text)]",
                  "shadow-sm shadow-slate-900/[0.03] transition",
                  "hover:border-[var(--color-primary)]/20 hover:bg-white hover:shadow-md",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/35",
                  disabled ? "cursor-not-allowed opacity-50" : "",
                ].join(" ")}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary)]/8 text-[var(--color-primary)]">
                  <Icon className="h-4 w-4" strokeWidth={2} aria-hidden />
                </span>
                <span className="min-w-0 flex-1 leading-snug">{action.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
