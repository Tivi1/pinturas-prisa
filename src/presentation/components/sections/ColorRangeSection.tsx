import Image from "next/image";
import Link from "next/link";
import { COLOR_SWATCHES } from "@/lib/constants";

const ROW_DECORATIVE_IMAGES = [
  "https://prisa.mx/wp-content/uploads/2025/05/munecas.jpg",
  "https://prisa.mx/wp-content/uploads/2025/05/Mask-group-1.jpg",
  "https://prisa.mx/wp-content/uploads/2025/05/Mask-group-2.jpg",
  "https://prisa.mx/wp-content/uploads/2025/05/agaves.jpg",
];

const ITEMS_PER_ROW = 5;

function buildRows() {
  const rows: Array<
    Array<
      | { type: "color"; hex: string; code: string; name: string }
      | { type: "image"; src: string }
    >
  > = [];

  for (let r = 0; r < 4; r++) {
    const start = r * ITEMS_PER_ROW;
    const colorItems = COLOR_SWATCHES.slice(start, start + ITEMS_PER_ROW).map(
      (s) => ({ type: "color" as const, ...s }),
    );
    rows.push([...colorItems, { type: "image", src: ROW_DECORATIVE_IMAGES[r] }]);
  }

  return rows;
}

const rows = buildRows();

export default function ColorRangeSection() {
  return (
    <section>
      {/* Header */}
      <div style={{ padding: "120px 48px 0", textAlign: "center" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <p style={{ fontSize: 16, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#003366" }}>
            GAMA DE COLORES
          </p>
          <h2 style={{ marginTop: 16, fontWeight: 800, lineHeight: 1.1, color: "#FF9900", fontSize: "clamp(34px, 5vw, 60px)" }}>
            Más de 10,000 colores disponibles
          </h2>
          <div style={{ padding: "20px 0 48px", display: "flex", justifyContent: "center" }}>
            <Image
              src="https://prisa.mx/wp-content/uploads/2025/05/Vector-5.svg"
              alt=""
              width={120}
              height={20}
            />
          </div>
          <p style={{ maxWidth: 640, margin: "0 auto", fontSize: 16, fontWeight: 600, lineHeight: 1.7 }}>
            Encuentra el tono perfecto para cada espacio. Nuestra paleta incluye
            más de 10,000 colores con los que podrás crear ambientes únicos.
            Visita tu{" "}
            <Link href="/localiza-tu-tienda" style={{ color: "#003366", textDecoration: "underline" }}>
              tienda PRISA® más cercana
            </Link>{" "}
            para ver los colores en persona.
          </p>
        </div>
      </div>

      {/* Color swatches grid */}
      <div style={{ padding: "56px 48px 120px" }}>
        <div className="grid grid-cols-3 sm:grid-cols-6" style={{ maxWidth: 1400, margin: "0 auto", gap: "32px 4px" }}>
          {rows.flat().map((item, i) => {
            if (item.type === "image") {
              return (
                <div key={`img-${i}`} className="transition-transform duration-300 ease-out hover:-translate-y-2.5">
                  <div className="h-[120px] lg:h-[180px]" style={{ overflow: "hidden" }}>
                    <Image
                      src={item.src}
                      alt=""
                      width={200}
                      height={180}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                </div>
              );
            }

            return (
              <div key={item.code} className="transition-transform duration-300 ease-out hover:-translate-y-2.5">
                <div
                  className="h-[120px] lg:h-[180px]"
                  style={{ backgroundColor: item.hex }}
                />
                <div style={{ marginTop: 8, textAlign: "center" }}>
                  <p style={{ fontSize: 17, fontWeight: 800, color: "#000" }}>{item.code}</p>
                  <p style={{ fontSize: 13, fontWeight: 300, color: "#000" }}>{item.name}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ maxWidth: 1400, margin: "56px auto 0", textAlign: "center" }}>
          <Link
            href="/gama-de-colores"
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
            Ver Gama de Colores
          </Link>

          <p style={{ maxWidth: 640, margin: "32px auto 0", textAlign: "center", fontSize: 12, lineHeight: 1.7, color: "#737373" }}>
            Los colores mostrados son aproximados y pueden variar dependiendo de
            la pantalla. Para una referencia precisa, consulta el muestrario
            físico en tu tienda PRISA® más cercana.
          </p>
        </div>
      </div>
    </section>
  );
}
