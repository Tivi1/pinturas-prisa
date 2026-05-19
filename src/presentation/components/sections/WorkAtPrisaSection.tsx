import Link from "next/link";
import Image from "next/image";
import { WORK_AT_PRISA } from "@/lib/constants";

function ArrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "inline-block", marginLeft: 8 }}>
      <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="2" />
      <path d="M8 16L16 8M16 8H10M16 8V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function WorkAtPrisaSection() {
  return (
    <section style={{ padding: "120px 48px" }}>
      <div className="flex flex-col-reverse lg:flex-row" style={{ maxWidth: 1400, margin: "0 auto", gap: 80 }}>
        <div className="w-full lg:w-[45%]" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h2 style={{ fontSize: "clamp(30px, 4vw, 40px)", fontWeight: 700, lineHeight: 1.2, color: "#FF9900", paddingBottom: 24 }}>
            {WORK_AT_PRISA.heading}
          </h2>
          <p style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.7, color: "#333", marginBottom: 20 }}>
            {WORK_AT_PRISA.description}
          </p>
          <p style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.7, color: "#333", marginBottom: 40 }}>
            Únete a una cultura organizacional que valora el talento, fomenta el desarrollo profesional y trabaja con propósito.
          </p>
          <div>
            <Link
              href={WORK_AT_PRISA.href}
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
              Conoce más
              <ArrowIcon />
            </Link>
          </div>
          <div style={{ paddingTop: 32 }}>
            <Image
              src={WORK_AT_PRISA.badgesUrl}
              alt="Badges PRISA"
              width={300}
              height={80}
              style={{ height: "auto", maxWidth: "100%" }}
            />
          </div>
        </div>

        <div className="w-full lg:w-[55%]">
          <div
            style={{
              height: "100%",
              minHeight: 450,
              borderRadius: 40,
              backgroundImage: `url(${WORK_AT_PRISA.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>
      </div>
    </section>
  );
}
