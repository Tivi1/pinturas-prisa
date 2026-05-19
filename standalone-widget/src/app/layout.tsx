import type { Metadata } from "next";
import { FloatingAssistantGate } from "@/components/floating-assistant";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cody — widget standalone",
  description: "Demo mínimo del asistente flotante y BFF Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full">{children}<FloatingAssistantGate /></body>
    </html>
  );
}
