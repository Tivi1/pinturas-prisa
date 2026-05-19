import Link from "next/link";
import { STORE_LOCATOR } from "@/lib/constants";

function ArrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "inline-block", marginLeft: 8 }}>
      <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="2" />
      <path d="M8 16L16 8M16 8H10M16 8V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function StoreLocatorSection() {
  return (
    <section style={{ padding: "120px 48px" }}>
      <div className="flex flex-col-reverse md:flex-row" style={{ maxWidth: 1400, margin: "0 auto", gap: 80 }}>
        <div className="w-full md:w-[45%]" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <p style={{ fontSize: 24, fontWeight: 700, color: "#003366" }}>
            {STORE_LOCATOR.title}
          </p>
          <h2 style={{ marginTop: 8, fontSize: "clamp(30px, 4vw, 40px)", fontWeight: 700, lineHeight: 1.2, color: "#FF9900", paddingBottom: 24 }}>
            {STORE_LOCATOR.heading}
          </h2>
          <p style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.7, color: "#333", marginBottom: 20 }}>
            {STORE_LOCATOR.description}
          </p>
          <p style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.7, color: "#333", marginBottom: 40 }}>
            Ya sea que busques pintura para tu hogar, negocio o proyecto industrial, en PRISA® tenemos la solución perfecta para ti.
          </p>
          <div>
            <Link
              href={STORE_LOCATOR.href}
              style={{
                display: "inline-flex",
                alignItems: "center",
                borderRadius: 9999,
                backgroundColor: "#003366",
                padding: "14px 40px",
                color: "#fff",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Localiza tu tienda
              <ArrowIcon />
            </Link>
          </div>
        </div>

        <div className="w-full md:w-[55%]">
          <div
            style={{
              height: "100%",
              minHeight: 450,
              borderRadius: 40,
              backgroundImage: `url(${STORE_LOCATOR.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>
      </div>
    </section>
  );
}
