"use client";

import Link from "next/link";
import { PRODUCT_CATEGORIES, SITE_CONFIG } from "@/lib/constants";

function ArrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="11" stroke="white" strokeWidth="2" />
      <path d="M8 16L16 8M16 8H10M16 8V14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ProductsSection() {
  return (
    <section>
      {/* Text header area - needs centered text with generous padding */}
      <div style={{ padding: "120px 48px 80px", textAlign: "center" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <p style={{ fontSize: 16, fontWeight: 700, letterSpacing: "0.1em", color: "#003366", textTransform: "uppercase" }}>
            PRODUCTOS
          </p>
          <h2 style={{ marginTop: 16, fontWeight: 800, color: "#FF9900", fontSize: "clamp(34px, 5vw, 60px)" }}>
            ¡Soluciones para cada industria!
          </h2>
          <p style={{ maxWidth: 768, margin: "24px auto 0", fontSize: 16, fontWeight: 600, lineHeight: 1.7, color: "#333" }}>
            {SITE_CONFIG.description}
          </p>
        </div>
      </div>

      {/* Desktop: flex hover accordion */}
      <div className="hidden overflow-hidden lg:flex" style={{ minHeight: 550, backgroundColor: "#999999" }}>
        {PRODUCT_CATEGORIES.map((cat) => (
          <div
            key={cat.name}
            className="group relative cursor-pointer overflow-hidden"
            style={{ flex: "1 1 0%", transition: "flex 0.4s ease" }}
            onMouseEnter={(e) => {
              const parent = e.currentTarget.parentElement;
              if (!parent) return;
              const children = Array.from(parent.children) as HTMLElement[];
              children.forEach((child) => {
                child.style.flex = child === e.currentTarget ? "3 1 0%" : "0.5 1 0%";
              });
            }}
            onMouseLeave={(e) => {
              const parent = e.currentTarget.parentElement;
              if (!parent) return;
              (Array.from(parent.children) as HTMLElement[]).forEach((child) => { child.style.flex = "1 1 0%"; });
            }}
          >
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${cat.imageUrl})` }} />
            <div className="absolute inset-0 bg-black/50 transition-colors duration-400 group-hover:bg-black/40" />
            <div style={{ position: "relative", zIndex: 10, display: "flex", height: "100%", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24 }}>
              <span style={{ textAlign: "center", fontSize: 24, fontWeight: 700, color: "#fff" }}>{cat.name}</span>
              <Link href={cat.href} className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ display: "inline-flex", alignItems: "center", gap: 12, borderRadius: 9999, padding: 20, fontSize: 16, fontWeight: 700, color: "#fff", backgroundColor: "#003366", textDecoration: "none" }}>
                Conoce más
                <ArrowIcon />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile / Tablet grid */}
      <div className="grid grid-cols-1 overflow-hidden sm:grid-cols-2 lg:hidden">
        {PRODUCT_CATEGORIES.map((cat) => (
          <div key={cat.name} style={{ position: "relative", overflow: "hidden", minHeight: 320 }}>
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${cat.imageUrl})` }} />
            <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.5)" }} />
            <div style={{ position: "relative", zIndex: 10, display: "flex", height: "100%", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
              <span style={{ textAlign: "center", fontSize: 24, fontWeight: 700, color: "#fff" }}>{cat.name}</span>
              <Link href={cat.href} style={{ display: "inline-flex", alignItems: "center", gap: 12, borderRadius: 9999, padding: 20, fontSize: 16, fontWeight: 700, color: "#fff", backgroundColor: "#003366", textDecoration: "none" }}>
                Conoce más
                <ArrowIcon />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
