import type { Metadata } from "next";
import { FloatingAssistantGate } from "@/components/floating-assistant";
import "./globals.css";

export const metadata: Metadata = {
  title: "Home - Pinturas PRISA",
  description: "Expertos en Pinturas y Recubrimientos. Nuestros productos están diseñados con los más altos estándares de calidad en la industria de pinturas y recubrimientos en México, garantizando durabilidad, eficiencia y confianza en cada aplicación.",
  keywords: ["pinturas", "PRISA", "recubrimientos", "colores", "México", "impermeabilizante", "arquitectónico", "industrial"],
  openGraph: {
    title: "Home - Pinturas PRISA",
    description: "Expertos en Pinturas y Recubrimientos Conoce más PRODUCTOS ¡Soluciones para cada industria!",
    url: "https://prisa.mx/",
    siteName: "Pinturas PRISA",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        {children}
        <FloatingAssistantGate />
      </body>
    </html>
  );
}
