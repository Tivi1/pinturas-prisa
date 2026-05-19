import Link from "next/link";
import { INSPIRATION_ROOMS } from "@/lib/constants";

export default function InspirationSection() {
  return (
    <section style={{ padding: "120px 48px" }}>
      <div className="flex flex-col lg:flex-row" style={{ maxWidth: 1400, margin: "0 auto", gap: 80 }}>
        {/* Left column */}
        <div className="lg:w-[38%]" style={{ flexShrink: 0, paddingTop: 32, paddingBottom: 32 }}>
          <h3 style={{ fontSize: 24, fontWeight: 700, color: "#003366" }}>
            Inspiración
          </h3>
          <h2 style={{ marginTop: 12, fontSize: "clamp(30px, 4vw, 40px)", fontWeight: 700, lineHeight: 1.2, color: "#FF9900" }}>
            ¡Descubre las últimas tendencias en color, pintura y diseño!
          </h2>
          <p style={{ marginTop: 32, fontSize: 16, fontWeight: 600, lineHeight: 1.7, color: "#333" }}>
            Renueva tus espacios con las combinaciones de color más actuales.
            Aquí encontrarás ideas frescas para cada rincón de tu hogar, desde
            paletas modernas hasta estilos clásicos que nunca pasan de moda.
          </p>
          <p style={{ marginTop: 20, fontSize: 16, fontWeight: 600, lineHeight: 1.7, color: "#333" }}>
            Explora nuestras propuestas de diseño por habitación y encuentra la
            inspiración perfecta para tu próximo proyecto de pintura. Deja que
            el color transforme tu mundo.
          </p>
        </div>

        {/* Right column – 4×2 grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4" style={{ flex: 1, gap: 16 }}>
          {INSPIRATION_ROOMS.map((room) => (
            <Link
              key={room.name}
              href={room.href}
              className="group"
              style={{ position: "relative", aspectRatio: "1/1", overflow: "hidden", borderRadius: 40, display: "block" }}
            >
              <div
                className="transition-transform duration-1000 ease-out group-hover:scale-[1.15]"
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url(${room.imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }} />
              <span
                style={{
                  position: "absolute",
                  bottom: 20,
                  left: "50%",
                  transform: "translateX(-50%)",
                  whiteSpace: "nowrap",
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                {room.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
