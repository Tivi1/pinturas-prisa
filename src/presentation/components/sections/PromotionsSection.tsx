"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { PROMOTIONS_DESKTOP, PROMOTIONS_MOBILE } from "@/lib/constants";

export default function PromotionsSection() {
  const [desktopIdx, setDesktopIdx] = useState(0);
  const [mobileIdx, setMobileIdx] = useState(0);

  const nextDesktop = useCallback(
    () => setDesktopIdx((i) => (i + 1) % PROMOTIONS_DESKTOP.length),
    [],
  );
  const nextMobile = useCallback(
    () => setMobileIdx((i) => (i + 1) % PROMOTIONS_MOBILE.length),
    [],
  );

  useEffect(() => {
    const id = setInterval(nextDesktop, 3000);
    return () => clearInterval(id);
  }, [nextDesktop]);

  useEffect(() => {
    const id = setInterval(nextMobile, 3000);
    return () => clearInterval(id);
  }, [nextMobile]);

  return (
    <section style={{ padding: "120px 48px 80px" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <h2
          style={{
            maxWidth: 800,
            margin: "0 auto 56px",
            textAlign: "center",
            fontSize: "clamp(30px, 4vw, 40px)",
            fontWeight: 700,
            lineHeight: 1.2,
            color: "#003366",
          }}
        >
          ¡Conoce nuestas promociones y nuevos lanzamientos!
        </h2>

        {/* Desktop carousel */}
        <div className="hidden md:block" style={{ position: "relative", overflow: "hidden", borderRadius: 35, margin: "0 auto" }}>
          {PROMOTIONS_DESKTOP.map((slide, i) => (
            <div
              key={slide.imageUrl}
              style={{
                position: "absolute",
                inset: 0,
                opacity: i === desktopIdx ? 1 : 0,
                transition: "opacity 0.7s ease-in-out",
              }}
              aria-hidden={i !== desktopIdx}
            >
              <Image
                src={slide.imageUrl}
                alt={slide.alt}
                width={1100}
                height={483}
                style={{ width: "100%", height: 483, objectFit: "cover" }}
                priority={i === 0}
              />
            </div>
          ))}
          <div style={{ height: 483, pointerEvents: "none" }} />

          <div style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 12 }}>
            {PROMOTIONS_DESKTOP.map((_, i) => (
              <button
                key={i}
                onClick={() => setDesktopIdx(i)}
                aria-label={`Ir a slide ${i + 1}`}
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: i === desktopIdx ? "#003366" : "#FF9900",
                  transition: "background-color 0.3s",
                }}
              />
            ))}
          </div>
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden" style={{ position: "relative", overflow: "hidden", borderRadius: 35, margin: "0 auto" }}>
          {PROMOTIONS_MOBILE.map((slide, i) => (
            <div
              key={slide.imageUrl}
              style={{
                position: "absolute",
                inset: 0,
                opacity: i === mobileIdx ? 1 : 0,
                transition: "opacity 0.7s ease-in-out",
              }}
              aria-hidden={i !== mobileIdx}
            >
              <Image
                src={slide.imageUrl}
                alt={slide.alt}
                width={800}
                height={800}
                style={{ width: "100%", height: 340, objectFit: "cover" }}
                priority={i === 0}
              />
            </div>
          ))}
          <div style={{ height: 340, pointerEvents: "none" }} />

          <div style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 12 }}>
            {PROMOTIONS_MOBILE.map((_, i) => (
              <button
                key={i}
                onClick={() => setMobileIdx(i)}
                aria-label={`Ir a slide ${i + 1}`}
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: i === mobileIdx ? "#003366" : "#FF9900",
                  transition: "background-color 0.3s",
                }}
              />
            ))}
          </div>
        </div>

        <p
          style={{
            maxWidth: 768,
            margin: "40px auto 0",
            textAlign: "center",
            fontSize: 15,
            lineHeight: 1.7,
            color: "#737373",
          }}
        >
          Hasta 3 ó 6 Meses Sin Intereses con tarjetas de crédito participantes,
          en compras mínimas de acuerdo a la promoción establecida por cada banco.
          Consulta condiciones, restricciones y vigencia en{" "}
          <span style={{ fontWeight: 600 }}>tiendas PRISA®</span>.
        </p>

        <div style={{ marginTop: 32, textAlign: "center" }}>
          <Link
            href="/promociones"
            style={{
              display: "inline-block",
              borderRadius: 9999,
              backgroundColor: "#003366",
              padding: "14px 40px",
              fontSize: 16,
              fontWeight: 600,
              color: "#fff",
              textDecoration: "none",
            }}
          >
            Ver más
          </Link>
        </div>
      </div>
    </section>
  );
}
