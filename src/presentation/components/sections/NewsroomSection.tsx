import Link from "next/link";
import Image from "next/image";
import { NEWS_ITEMS } from "@/lib/constants";

function ArrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "inline-block", marginLeft: 8 }}>
      <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="2" />
      <path d="M8 16L16 8M16 8H10M16 8V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function NewsroomSection() {
  return (
    <section style={{ padding: "56px 48px 120px" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={{ fontSize: "clamp(30px, 4vw, 40px)", fontWeight: 700, color: "#FF9900" }}>
            NEWSROOM PRISA®
          </h2>
          <p style={{ fontSize: 16, fontWeight: 600, marginTop: 12, color: "#333" }}>
            En PRISA generamos noticias que inspiran.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 32 }}>
          {NEWS_ITEMS.map((item) => (
            <article key={item.href} style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ position: "relative", height: 260, overflow: "hidden", borderRadius: 40 }}>
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10, padding: "0 8px" }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: "#FF9900" }}>
                  {item.category}
                </span>
                <Link
                  href={item.href}
                  style={{ fontSize: 20, fontWeight: 700, color: "#003366", textDecoration: "none", lineHeight: 1.3 }}
                >
                  {item.title}
                </Link>
                <Link
                  href={item.href}
                  style={{ fontSize: 16, fontWeight: 600, color: "#003366", textDecoration: "none" }}
                >
                  Ver más
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div style={{ paddingTop: 56, textAlign: "center" }}>
          <Link
            href="/newsroom-prisa"
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
            Ver Newsroom Prisa ®
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}
