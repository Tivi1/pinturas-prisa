"use client";

import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

function ArrowIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="11" stroke="white" strokeWidth="2" />
      <path
        d="M8 16L16 8M16 8H10M16 8V14"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function HeroSection() {
  return (
    <section
      style={{
        position: "relative",
        display: "flex",
        width: "100%",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <video
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        src={SITE_CONFIG.heroVideoUrl}
        autoPlay
        muted
        loop
        playsInline
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.55)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: 900,
          margin: "0 auto",
          padding: "80px 24px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontWeight: 800,
            color: "#FFFFFF",
            fontSize: "clamp(36px, 6vw, 72px)",
            lineHeight: 1.15,
          }}
        >
          {SITE_CONFIG.tagline}
        </h1>

        <div style={{ marginTop: 48, display: "flex", justifyContent: "center" }}>
          <Link
            href="/adn-prisa"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              borderRadius: 9999,
              backgroundColor: "#003366",
              padding: "18px 32px",
              fontSize: 16,
              fontWeight: 700,
              color: "#FFFFFF",
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
          >
            Conoce más
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}
