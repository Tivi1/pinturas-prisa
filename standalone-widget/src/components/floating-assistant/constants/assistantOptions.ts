import type { QuickActionId } from "../types/assistant.types";

export type QuickActionDefinition = {
  id: QuickActionId;
  label: string;
  /** Clave para mapear íconos Lucide en el componente */
  icon: "paint-roller" | "calculator" | "map-pin" | "percent" | "headphones";
};

export const QUICK_ACTIONS: readonly QuickActionDefinition[] = [
  {
    id: "surface",
    label: "Elegir pintura por superficie",
    icon: "paint-roller",
  },
  {
    id: "quote",
    label: "Cotizar producto",
    icon: "calculator",
  },
  { id: "store", label: "Buscar tienda cercana", icon: "map-pin" },
  { id: "promos", label: "Ver promociones", icon: "percent" },
  { id: "support", label: "Hablar con soporte", icon: "headphones" },
] as const;
