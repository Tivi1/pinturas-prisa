/**
 * Textos del asistente flotante expuestos al navegador.
 * Solo `NEXT_PUBLIC_*` está disponible en el cliente — las variables sin ese prefijo
 * (p. ej. CODY_*) son solo servidor y no cambian estos strings.
 */

import type { QuickActionDefinition } from "./assistantOptions";
import { QUICK_ACTIONS } from "./assistantOptions";

function trimmedOrFallback(value: string | undefined, fallback: string): string {
  const t = value?.trim();
  return t && t.length > 0 ? t : fallback;
}

export const ASSISTANT_CHANNEL_LABEL = trimmedOrFallback(
  process.env.NEXT_PUBLIC_ASSISTANT_CHANNEL_LABEL,
  "Canal de ayuda",
);

export const ASSISTANT_WIDGET_TITLE = trimmedOrFallback(
  process.env.NEXT_PUBLIC_ASSISTANT_TITLE,
  "Asesor PRISA",
);

export const ASSISTANT_WIDGET_SUBTITLE = trimmedOrFallback(
  process.env.NEXT_PUBLIC_ASSISTANT_SUBTITLE,
  "Te ayudamos a elegir producto, color o tienda",
);

/** Primer mensaje del asistente en el panel (antes de cualquier mensaje del usuario). */
export const INITIAL_ASSISTANT_COPY = trimmedOrFallback(
  process.env.NEXT_PUBLIC_ASSISTANT_WELCOME_MESSAGE ??
    process.env.NEXT_PUBLIC_ASSISTANT_INITIAL_MESSAGE,
  "Hola, soy el asistente PRISA®. Puedo orientarte sobre productos y fichas técnicas. Escribe tu pregunta; si estás en una página de producto, tendré ese contexto.",
);

export const ASSISTANT_WELCOME_BUBBLE_TEXT = trimmedOrFallback(
  process.env.NEXT_PUBLIC_ASSISTANT_WELCOME_BUBBLE,
  "Hola, ¿te puedo ayudar?",
);

export const ASSISTANT_BUBBLE_OPEN_HINT = trimmedOrFallback(
  process.env.NEXT_PUBLIC_ASSISTANT_BUBBLE_OPEN_HINT,
  "Pulsa aquí para abrir",
);

export const ASSISTANT_MINIMIZED_RESUME_LABEL = trimmedOrFallback(
  process.env.NEXT_PUBLIC_ASSISTANT_MINIMIZED_HINT,
  "Retomar conversación",
);

export const ASSISTANT_MINIMIZED_OPEN_BUTTON = trimmedOrFallback(
  process.env.NEXT_PUBLIC_ASSISTANT_MINIMIZED_OPEN_BUTTON,
  "Abrir",
);

export const ASSISTANT_QUICK_SECTION_LABEL = trimmedOrFallback(
  process.env.NEXT_PUBLIC_ASSISTANT_QUICK_SECTION_LABEL,
  "Opciones rápidas",
);

export const ASSISTANT_MESSAGES_SECTION_LABEL = trimmedOrFallback(
  process.env.NEXT_PUBLIC_ASSISTANT_MESSAGES_SECTION_LABEL,
  "Conversación",
);

export const ASSISTANT_INPUT_PLACEHOLDER = trimmedOrFallback(
  process.env.NEXT_PUBLIC_ASSISTANT_INPUT_PLACEHOLDER,
  "Escribe tu mensaje...",
);

export const ASSISTANT_INPUT_SCREEN_READER_LABEL = trimmedOrFallback(
  process.env.NEXT_PUBLIC_ASSISTANT_INPUT_SR_LABEL,
  "Escribe tu mensaje",
);

/** Etiquetas de acciones rápidas; opcionalmente sobreescritas por env por id. */
export function getQuickActionsResolved(): readonly QuickActionDefinition[] {
  const qlSurface = process.env.NEXT_PUBLIC_ASSISTANT_QUICK_SURFACE?.trim();
  const qlQuote = process.env.NEXT_PUBLIC_ASSISTANT_QUICK_QUOTE?.trim();
  const qlStore = process.env.NEXT_PUBLIC_ASSISTANT_QUICK_STORE?.trim();
  const qlPromos = process.env.NEXT_PUBLIC_ASSISTANT_QUICK_PROMOS?.trim();
  const qlSupport = process.env.NEXT_PUBLIC_ASSISTANT_QUICK_SUPPORT?.trim();

  return QUICK_ACTIONS.map((action) => {
    const override =
      action.id === "surface"
        ? qlSurface
        : action.id === "quote"
          ? qlQuote
          : action.id === "store"
            ? qlStore
            : action.id === "promos"
              ? qlPromos
              : action.id === "support"
                ? qlSupport
                : undefined;
    const label = override && override.length > 0 ? override : action.label;
    return { ...action, label };
  });
}
