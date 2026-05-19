"use client";

import dynamic from "next/dynamic";

/**
 * Carga el asistente solo en el cliente para evitar desajustes de hidratación
 * al usar estado local y animaciones enlazadas al viewport.
 */
export const FloatingAssistantGate = dynamic(
  () =>
    import("./FloatingAssistantWidget").then((m) => ({
      default: m.FloatingAssistantWidget,
    })),
  { ssr: false },
);
