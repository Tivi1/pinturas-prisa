"use client";

import { useState, useEffect, useLayoutEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  SITE_CONFIG,
  NAV_LINKS,
  TOP_NAV_LINKS,
  PRODUCT_CATEGORIES,
  INSPIRATION_ROOMS,
} from "@/lib/constants";

const SUBMENU_ITEMS: Record<string, Array<{ label: string; href: string }>> = {
  Productos: PRODUCT_CATEGORIES.map((c) => ({ label: c.name, href: c.href })),
  Inspiración: INSPIRATION_ROOMS.map((r) => ({ label: r.name, href: r.href })),
};

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState(0);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const [megaMenuTop, setMegaMenuTop] = useState(0);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const topBarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /** viewport-fixed placement so the mega menu is not clipped by sticky/stacking contexts over category pages */
  useLayoutEffect(() => {
    if (!activeDropdown) {
      return;
    }
    const bar = topBarRef.current;
    if (!bar) {
      return;
    }
    const sync = () => setMegaMenuTop(bar.getBoundingClientRect().bottom);
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [activeDropdown]);

  const openDropdown = useCallback((label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(label);
  }, []);

  const closeDropdown = useCallback(() => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 150);
  }, []);

  return (
    <>
      {/* ── Top utility bar ── */}
      <div className="hidden lg:block" style={{ backgroundColor: "#E5E6E4" }}>
        <div
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            padding: "10px 48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <a
            href={`tel:${SITE_CONFIG.phone}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 14,
              fontWeight: 500,
              color: "#003366",
              textDecoration: "none",
            }}
          >
            <svg
              style={{ width: 16, height: 16 }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            Servicio al cliente
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {TOP_NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#003366",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main navigation bar ── */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          overflow: "visible",
          backgroundColor: "#FFFFFF",
          boxShadow: scrolled ? "0 4px 12px rgba(0,0,0,0.08)" : "none",
          transition: "box-shadow 0.3s",
        }}
      >
        <div
          ref={topBarRef}
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            padding: "16px 48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link href="/" style={{ flexShrink: 0 }}>
            <Image
              src={SITE_CONFIG.logoUrl}
              alt="PRISA"
              width={140}
              height={44}
              style={{ height: 44, width: "auto" }}
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden lg:flex"
            style={{ alignItems: "center", gap: 8 }}
            aria-label="Principal"
          >
            {NAV_LINKS.map((link) =>
              link.hasSubmenu ? (
                <div
                  key={link.label}
                  onMouseEnter={() => openDropdown(link.label)}
                  onMouseLeave={closeDropdown}
                >
                  <Link
                    href={link.href}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "10px 20px",
                      fontSize: 16,
                      fontWeight: 700,
                      color: activeDropdown === link.label ? "#0087A0" : "#003366",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                  >
                    {link.label}
                    <svg
                      style={{
                        width: 14,
                        height: 14,
                        transition: "transform 0.2s",
                        transform: activeDropdown === link.label ? "rotate(180deg)" : "rotate(0)",
                      }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{
                    padding: "10px 20px",
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#003366",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex" style={{ alignItems: "center" }}>
            <Link
              href="/localiza-tu-tienda"
              style={{
                borderRadius: 9999,
                backgroundColor: "#003366",
                padding: "12px 28px",
                fontSize: 14,
                fontWeight: 700,
                color: "#FFFFFF",
                textDecoration: "none",
                transition: "background-color 0.2s",
              }}
            >
              Localiza tu Tienda
            </Link>
          </div>

          {/* Mobile controls (below) */}
          <div className="flex items-center gap-3 lg:hidden">
            <Link
              href="/localiza-tu-tienda"
              style={{
                display: "flex",
                width: 44,
                height: 44,
                alignItems: "center",
                justifyContent: "center",
                color: "#003366",
              }}
              aria-label="Localiza tu Tienda"
            >
              <svg style={{ width: 22, height: 22 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              style={{
                display: "flex",
                width: 44,
                height: 44,
                alignItems: "center",
                justifyContent: "center",
                color: "#003366",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileOpen}
            >
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 22, gap: 5 }}>
                <span
                  style={{
                    display: "block",
                    height: 2,
                    width: "100%",
                    borderRadius: 9999,
                    backgroundColor: "#003366",
                    transition: "all 0.3s",
                    transform: mobileOpen ? "translateY(7px) rotate(45deg)" : "none",
                  }}
                />
                <span
                  style={{
                    display: "block",
                    height: 2,
                    width: "100%",
                    borderRadius: 9999,
                    backgroundColor: "#003366",
                    transition: "all 0.3s",
                    opacity: mobileOpen ? 0 : 1,
                    transform: mobileOpen ? "scaleX(0)" : "none",
                  }}
                />
                <span
                  style={{
                    display: "block",
                    height: 2,
                    width: "100%",
                    borderRadius: 9999,
                    backgroundColor: "#003366",
                    transition: "all 0.3s",
                    transform: mobileOpen ? "translateY(-7px) rotate(-45deg)" : "none",
                  }}
                />
              </div>
            </button>
          </div>
        </div>

        {/* ── Mega menu: Productos (fixed below nav bar; avoids clip under page content) ── */}
        {activeDropdown === "Productos" && (
          <div
            className="hidden lg:block"
            onMouseEnter={() => openDropdown("Productos")}
            onMouseLeave={closeDropdown}
            style={{
              position: "fixed",
              top: megaMenuTop,
              left: 0,
              right: 0,
              zIndex: 100,
              backgroundColor: "#fff",
              boxShadow: "0 8px 30px rgba(0,0,0,0.10)",
              borderTop: "1px solid #E5E6E4",
            }}
          >
            <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 48px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "240px 1fr 1fr 220px", minHeight: 320 }}>
                {/* Col 1: Category list */}
                <div style={{ backgroundColor: "#F5F5F3", padding: "32px 0" }}>
                  {PRODUCT_CATEGORIES.map((cat, i) => (
                    <Link
                      key={cat.href}
                      href={cat.href}
                      onMouseEnter={() => setHoveredCategory(i)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "12px 28px",
                        fontSize: 16,
                        fontWeight: 700,
                        color: hoveredCategory === i ? "#0087A0" : "#003366",
                        textDecoration: "none",
                        transition: "color 0.15s",
                        borderLeft: hoveredCategory === i ? "3px solid #FF9900" : "3px solid transparent",
                      }}
                    >
                      {cat.name}
                      <svg
                        style={{ width: 14, height: 14, color: hoveredCategory === i ? "#FF9900" : "#003366" }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ))}
                </div>

                {/* Col 2: Ideal para / Garantía / etc. */}
                <div style={{ padding: "32px 40px" }}>
                  <p style={{ fontSize: 16, fontWeight: 700, color: "#0087A0", marginBottom: 16 }}>
                    {PRODUCT_CATEGORIES[hoveredCategory].column1Title ?? "Ideal para"}
                  </p>
                  {PRODUCT_CATEGORIES[hoveredCategory].idealPara.map((item) =>
                    item.href ? (
                      <Link
                        key={item.label}
                        href={item.href}
                        style={{ fontSize: 15, color: "#003366", padding: "6px 0", fontWeight: 500, textDecoration: "none", display: "block" }}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <p key={item.label} style={{ fontSize: 15, color: "#003366", padding: "6px 0", fontWeight: 500 }}>
                        {item.label}
                      </p>
                    )
                  )}
                </div>

                {/* Col 3: Tipo */}
                <div style={{ padding: "32px 40px" }}>
                  <p style={{ fontSize: 16, fontWeight: 700, color: "#0087A0", marginBottom: 16 }}>
                    {PRODUCT_CATEGORIES[hoveredCategory].column2Title ?? "Tipo de productos"}
                  </p>
                  {PRODUCT_CATEGORIES[hoveredCategory].tipo.map((item) =>
                    item.href ? (
                      <Link
                        key={item.label}
                        href={item.href}
                        style={{ fontSize: 15, color: "#003366", padding: "6px 0", fontWeight: 500, textDecoration: "none", display: "block" }}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <p key={item.label} style={{ fontSize: 15, color: "#003366", padding: "6px 0", fontWeight: 500 }}>
                        {item.label}
                      </p>
                    )
                  )}
                </div>

                {/* Col 4: Image + Ver todos */}
                <div style={{ padding: "32px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 180, height: 180, borderRadius: 16, overflow: "hidden", position: "relative" }}>
                    <Image
                      src={PRODUCT_CATEGORIES[hoveredCategory].menuImageUrl}
                      alt={PRODUCT_CATEGORIES[hoveredCategory].name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <Link
                    href={PRODUCT_CATEGORIES[hoveredCategory].href}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      fontSize: 15,
                      fontWeight: 700,
                      color: "#003366",
                      textDecoration: "none",
                    }}
                  >
                    Ver todos
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="11" stroke="#003366" strokeWidth="2" />
                      <path d="M8 16L16 8M16 8H10M16 8V14" stroke="#003366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Mega menu: Inspiración (fixed below nav bar) ── */}
        {activeDropdown === "Inspiración" && (
          <div
            className="hidden lg:block"
            onMouseEnter={() => openDropdown("Inspiración")}
            onMouseLeave={closeDropdown}
            style={{
              position: "fixed",
              top: megaMenuTop,
              left: 0,
              right: 0,
              zIndex: 100,
              backgroundColor: "#fff",
              boxShadow: "0 8px 30px rgba(0,0,0,0.10)",
              borderTop: "1px solid #E5E6E4",
            }}
          >
            <div style={{ maxWidth: 1400, margin: "0 auto", padding: "40px 48px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
                {INSPIRATION_ROOMS.map((room) => (
                  <Link key={room.href} href={room.href} style={{ textDecoration: "none", display: "block" }}>
                    <div style={{ position: "relative", overflow: "hidden", borderRadius: 20, aspectRatio: "1/1" }}>
                      <Image
                        src={room.imageUrl}
                        alt={room.name}
                        fill
                        style={{ objectFit: "cover", transition: "transform 0.4s" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.08)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
                      />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)" }} />
                      <span style={{ position: "absolute", bottom: 16, left: 0, right: 0, textAlign: "center", fontSize: 16, fontWeight: 700, color: "#fff" }}>
                        {room.name}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ── Mobile overlay ── */}
      <div
        className={`fixed inset-0 z-[60] bg-black/50 transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* ── Mobile drawer ── */}
      <nav
        className={`fixed left-0 top-0 z-[60] flex h-full w-full max-w-xs flex-col bg-white transition-transform duration-300 ease-out lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Menú móvil"
      >
        <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "auto", padding: "32px 24px" }}>
          <div style={{ marginBottom: 40 }}>
            <Image
              src={SITE_CONFIG.logoUrl}
              alt="PRISA"
              width={120}
              height={38}
              style={{ height: 38, width: "auto" }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {NAV_LINKS.map((link) =>
              link.hasSubmenu ? (
                <div key={link.label}>
                  <button
                    type="button"
                    onClick={() =>
                      setMobileSubmenu((prev) =>
                        prev === link.label ? null : link.label
                      )
                    }
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "14px 16px",
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#003366",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    {link.label}
                    <svg
                      style={{
                        width: 14,
                        height: 14,
                        transition: "transform 0.2s",
                        transform:
                          mobileSubmenu === link.label
                            ? "rotate(180deg)"
                            : "rotate(0)",
                      }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {mobileSubmenu === link.label && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        paddingLeft: 16,
                        paddingBottom: 8,
                      }}
                    >
                      {(SUBMENU_ITEMS[link.label] ?? []).map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={() => setMobileOpen(false)}
                          style={{
                            padding: "10px 16px",
                            fontSize: 15,
                            fontWeight: 600,
                            color: "#0087A0",
                            textDecoration: "none",
                          }}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    padding: "14px 16px",
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#003366",
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
          <div style={{ marginTop: 32, borderTop: "1px solid #e5e7eb", paddingTop: 32, display: "flex", flexDirection: "column", gap: 4 }}>
            {TOP_NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  padding: "10px 16px",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#003366",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div style={{ marginTop: "auto", paddingTop: 40 }}>
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 16px",
                fontSize: 14,
                fontWeight: 500,
                color: "#003366",
                textDecoration: "none",
              }}
            >
              <svg style={{ width: 16, height: 16 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Servicio al cliente
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
