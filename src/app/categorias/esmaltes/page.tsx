import Image from "next/image";
import Link from "next/link";
import Header from "@/presentation/components/layout/Header";
import Footer from "@/presentation/components/layout/Footer";

export const metadata = {
  title: "Esmaltes archivos - Pinturas PRISA",
  description:
    "Los esmaltes PRISA® brindan protección anticorrosiva, durabilidad, rendimiento y un acabado perfecto. Esmaltes de Pinturas PRISA.",
};

const PRODUCTS = [
  {
    name: "ESMALTE COLOREX SUPREME",
    category: "Alquidal modificado (Base solvente)",
    image:
      "https://prisa.mx/wp-content/uploads/2025/06/ESMALTES_COLOREX_SUPREME_1.webp",
    href: "/producto/esmalte-colorex-supreme",
  },
  {
    name: "ESMALTE COLOREX BASE AGUA",
    category: "Acrílico Base agua",
    image:
      "https://prisa.mx/wp-content/uploads/2025/06/COLOREX_1L-1.png",
    href: "/producto/esmalte-colorex-base-agua",
  },
  {
    name: "ESMALTE MILCO",
    category: "Alquidal (Base solvente)",
    image:
      "https://prisa.mx/wp-content/uploads/2025/06/ESMALTES_MILCO_1.webp",
    href: "/producto/esmalte-milco",
  },
  {
    name: "ESMALTE KITOX",
    category: "Alquidal (Base solvente)",
    image:
      "https://prisa.mx/wp-content/uploads/2025/06/ESMALTES_KITOX_1.webp",
    href: "/producto/esmalte-kitox",
  },
];

const FILTER_OPTIONS = [
  "Base Solvente",
  "Base Agua",
  "Interior",
  "Exterior",
];

function ArrowIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="13" stroke="#003366" strokeWidth="1.5" />
      <path
        d="M10 18L18 10M18 10H12M18 10V16"
        stroke="#003366"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function EsmaltesPage() {
  return (
    <>
      <Header />
      <main>
        {/* ── Hero ── */}
        <section
          style={{
            backgroundColor: "#003366",
            padding: "75px 24px",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <p
              style={{
                color: "#FFFFFF",
                textTransform: "uppercase",
                fontWeight: 700,
                fontSize: 16,
                letterSpacing: "0.08em",
                marginBottom: 16,
              }}
            >
              PRODUCTOS
            </p>
            <h1
              className="text-[34px] lg:text-[60px]"
              style={{
                color: "#FFFFFF",
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: 20,
              }}
            >
              Esmaltes
            </h1>
            <p
              style={{
                color: "#FFFFFF",
                fontSize: 16,
                fontWeight: 600,
                maxWidth: 520,
                margin: "0 auto",
              }}
            >
              Los esmaltes PRISA® brindan protección anticorrosiva, durabilidad,
              rendimiento y un acabado perfecto.
            </p>
          </div>
        </section>

        {/* ── Products ── */}
        <section
          style={{
            padding: "100px 40px",
            maxWidth: 1400,
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: "#003366",
              textAlign: "center",
              marginBottom: 48,
            }}
          >
            Protección y acabado para cada estructura.
          </h2>

          <div
            className="flex-col lg:flex-row"
            style={{ display: "flex", gap: 40 }}
          >
            {/* Sidebar */}
            <aside
              className="w-full lg:w-[17%]"
              style={{ flexShrink: 0 }}
            >
              <p
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#003366",
                  marginBottom: 20,
                }}
              >
                Categorías
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                {FILTER_OPTIONS.map((option) => (
                  <label
                    key={option}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      fontSize: 15,
                      fontWeight: 500,
                      color: "#333",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      defaultChecked
                      style={{
                        width: 18,
                        height: 18,
                        accentColor: "#FF9900",
                        cursor: "pointer",
                      }}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </aside>

            {/* Product Grid */}
            <div
              className="w-full lg:w-[83%]"
              style={{ flex: 1 }}
            >
              <div
                className="grid-cols-2 lg:grid-cols-4"
                style={{
                  display: "grid",
                  gap: 28,
                }}
              >
                {PRODUCTS.map((product) => (
                  <div
                    key={product.href}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: "#FFFFFF",
                      borderRadius: 12,
                      overflow: "hidden",
                      border: "1px solid #E5E6E4",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        aspectRatio: "1 / 1",
                        backgroundColor: "#F5F5F3",
                      }}
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        style={{ objectFit: "contain", padding: 16 }}
                      />
                    </div>
                    <div
                      style={{
                        padding: "16px 18px 20px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                        flex: 1,
                      }}
                    >
                      <p
                        style={{
                          fontSize: 15,
                          fontWeight: 700,
                          color: "#003366",
                          lineHeight: 1.3,
                        }}
                      >
                        {product.name}
                      </p>
                      <p
                        style={{
                          fontSize: 13,
                          fontWeight: 500,
                          color: "#666",
                        }}
                      >
                        {product.category}
                      </p>
                      <div style={{ marginTop: "auto", paddingTop: 12 }}>
                        <Link
                          href={product.href}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            fontSize: 14,
                            fontWeight: 700,
                            color: "#003366",
                            textDecoration: "none",
                          }}
                        >
                          Ver más
                          <ArrowIcon />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Catalog ── */}
        <section
          style={{
            position: "relative",
            padding: "100px 24px",
            textAlign: "center",
            backgroundImage:
              "url(https://prisa.mx/wp-content/uploads/2025/06/image-42.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div style={{ maxWidth: 700, margin: "0 auto", position: "relative" }}>
            <p
              style={{
                color: "#003366",
                textTransform: "uppercase",
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: "0.08em",
                marginBottom: 12,
              }}
            >
              CONOCE NUESTROS PRODUCTOS
            </p>
            <h2
              style={{
                fontSize: 32,
                fontWeight: 800,
                color: "#003366",
                marginBottom: 20,
              }}
            >
              Catálogo de esmaltes
            </h2>
            <p
              style={{
                fontSize: 16,
                fontWeight: 500,
                color: "#333",
                lineHeight: 1.6,
              }}
            >
              Descarga nuestro catálogo enfocado a esmaltes, además conoce los
              complementos perfectos para que tu espacio quede como nuevo.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
