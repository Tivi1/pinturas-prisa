import Image from "next/image";
import Link from "next/link";
import Header from "@/presentation/components/layout/Header";
import Footer from "@/presentation/components/layout/Footer";

export const metadata = {
  title: "Madera archivos - Pinturas PRISA",
  description:
    "La línea SIGLO® MADERAS cuenta con una amplia gama de productos que incluye tintas, manchas, lacas, fondos, barnices y selladores para proteger la belleza natural de la madera.",
};

const PRODUCTS = [
  {
    name: "SELLADOR DE POLIURETANO TRANSPARENTE",
    category: "Siglo madera",
    image:
      "https://prisa.mx/wp-content/uploads/2025/07/Maderas_1.webp",
    href: "/producto/sellador-de-poliuretano-transparente",
  },
  {
    name: "FONDO POLIURETANO PU",
    category: "Siglo madera",
    image:
      "https://prisa.mx/wp-content/uploads/2025/07/Maderas_1.webp",
    href: "/producto/fondo-poliuretano-pu",
  },
  {
    name: "CATALIZADOR POLIURETANO",
    category: "Siglo madera",
    image:
      "https://prisa.mx/wp-content/uploads/2025/07/Maderas_1.webp",
    href: "/producto/catalizador-poliuretano",
  },
  {
    name: "BARNIZ DE POLIURETANO TRANSPARENTE BRILLANTE",
    category: "Siglo madera",
    image:
      "https://prisa.mx/wp-content/uploads/2025/07/Maderas_1.webp",
    href: "/producto/barniz-de-poliuretano-transparente-brillante",
  },
  {
    name: "BARNIZ DE POLIURETANO ESTÁNDAR TRANSPARENTE B-20",
    category: "Siglo madera",
    image:
      "https://prisa.mx/wp-content/uploads/2025/07/Maderas_1.webp",
    href: "/producto/barniz-de-poliuretano-estandar-transparente-b-20",
  },
  {
    name: "BARNIZ DE POLIURETANO TRANSPARENTE MATE",
    category: "Siglo madera",
    image:
      "https://prisa.mx/wp-content/uploads/2025/07/Maderas_1.webp",
    href: "/producto/barniz-de-poliuretano-transparente-mate",
  },
  {
    name: "BARNIZ DE POLIURETANO CHOCOLATE OBSCURO",
    category: "Siglo madera",
    image:
      "https://prisa.mx/wp-content/uploads/2025/07/Maderas_1.webp",
    href: "/producto/barniz-de-poliuretano-chocolate-obscuro",
  },
  {
    name: "BARNIZ DE POLIURETANO BLANCO ESTABLE",
    category: "Siglo madera",
    image:
      "https://prisa.mx/wp-content/uploads/2025/07/Maderas_1.webp",
    href: "/producto/barniz-de-poliuretano-blanco-estable",
  },
  {
    name: "SELLADORES DE NITROCELULOSA A.S ALTA VISCOSIDAD 25",
    category: "Siglo madera",
    image:
      "https://prisa.mx/wp-content/uploads/2025/07/Maderas_1.webp",
    href: "/producto/selladores-de-nitrocelulosa-a-s-alta-viscosidad-25",
  },
  {
    name: "SELLADORES DE NITROCELULOSA P/MUÑEQUEO A.S/A.V 200",
    category: "Siglo madera",
    image:
      "https://prisa.mx/wp-content/uploads/2025/07/Maderas_1.webp",
    href: "/producto/selladores-de-nitrocelulosa-p-munequeo-a-s-a-v-200",
  },
  {
    name: "FONDO DE NITROCELULOSA BLANCO",
    category: "Siglo madera",
    image:
      "https://prisa.mx/wp-content/uploads/2025/07/Maderas_1.webp",
    href: "/producto/fondo-de-nitrocelulosa-blanco",
  },
  {
    name: "FONDO DE NITROCELULOSA OCRE",
    category: "Siglo madera",
    image:
      "https://prisa.mx/wp-content/uploads/2025/07/Maderas_1.webp",
    href: "/producto/fondo-de-nitrocelulosa-ocre",
  },
  {
    name: "FONDO DE NITROCELULOSA NEGRO",
    category: "Siglo madera",
    image:
      "https://prisa.mx/wp-content/uploads/2025/07/Maderas_1.webp",
    href: "/producto/fondo-de-nitrocelulosa-negro",
  },
  {
    name: "LACA INDUSTRIAL COLOR BLANCO",
    category: "Siglo madera",
    image:
      "https://prisa.mx/wp-content/uploads/2025/07/Maderas_1.webp",
    href: "/producto/laca-industrial-color-blanco",
  },
  {
    name: "LACA INDUSTRIAL COLOR NEGRO",
    category: "Siglo madera",
    image:
      "https://prisa.mx/wp-content/uploads/2025/07/Maderas_1.webp",
    href: "/producto/laca-industrial-color-negro",
  },
  {
    name: "LACA INDUSTRIAL COLOR ROJA",
    category: "Siglo madera",
    image:
      "https://prisa.mx/wp-content/uploads/2025/07/Maderas_1.webp",
    href: "/producto/laca-industrial-color-roja",
  },
  {
    name: "LACA INDUSTRIAL COLOR AMARILLO ÓXIDO",
    category: "Siglo madera",
    image:
      "https://prisa.mx/wp-content/uploads/2025/07/Maderas_1.webp",
    href: "/producto/laca-industrial-color-amarillo-oxido",
  },
  {
    name: "LACA INDUSTRIAL COLOR NARANJA",
    category: "Siglo madera",
    image:
      "https://prisa.mx/wp-content/uploads/2025/07/Maderas_1.webp",
    href: "/producto/laca-industrial-color-naranja",
  },
  {
    name: "SELLADOR ACRÍLICO TRANSPARENTE",
    category: "Siglo madera",
    image:
      "https://prisa.mx/wp-content/uploads/2025/07/Maderas_2.webp",
    href: "/producto/sellador-acrilico-transparente",
  },
  {
    name: "LACA SEMI MATE",
    category: "Siglo madera",
    image:
      "https://prisa.mx/wp-content/uploads/2025/07/Maderas_3.webp",
    href: "/producto/laca-semi-mate",
  },
  {
    name: "FONDO POLIACRÍLICO TRANSPARENTE",
    category: "Siglo madera",
    image:
      "https://prisa.mx/wp-content/uploads/2025/07/Maderas_1.webp",
    href: "/producto/fondo-poliacrilico-transparente",
  },
  {
    name: "CATALIZADOR PARA POLIACRÍLICO",
    category: "Siglo madera",
    image:
      "https://prisa.mx/wp-content/uploads/2025/07/Maderas_1.webp",
    href: "/producto/catalizador-para-poliacrilico",
  },
  {
    name: "PROMOTOR PARA FONDO POLIACRÍLICO",
    category: "Siglo madera",
    image:
      "https://prisa.mx/wp-content/uploads/2025/07/Maderas_1.webp",
    href: "/producto/promotor-para-fondo-poliacrilico",
  },
  {
    name: "BARNIZ ALQUIDÁLICO TRANSPARENTE",
    category: "Siglo madera",
    image:
      "https://prisa.mx/wp-content/uploads/2025/07/Maderas_1.webp",
    href: "/producto/barniz-alquidalico-transparente",
  },
  {
    name: "BARNIZ ALQUIDÁLICO COLORES",
    category: "Siglo madera",
    image:
      "https://prisa.mx/wp-content/uploads/2025/07/Maderas_1.webp",
    href: "/producto/barniz-alquidalico-colores",
  },
  {
    name: "TINTAS AL ALCOHOL COLORES",
    category: "Siglo madera",
    image:
      "https://prisa.mx/wp-content/uploads/2025/07/Tintas_1.webp",
    href: "/producto/tintas-al-alcohol-colores",
  },
  {
    name: "TINTAS AL ACEITE COLORES",
    category: "Siglo madera",
    image:
      "https://prisa.mx/wp-content/uploads/2025/07/Tintas_1.webp",
    href: "/producto/tintas-al-aceite-colores",
  },
  {
    name: "FUNGICIDA",
    category: "Siglo madera",
    image:
      "https://prisa.mx/wp-content/uploads/2025/07/Maderas_1.webp",
    href: "/producto/fungicida",
  },
  {
    name: "ACEITE SATINADO",
    category: "Siglo madera",
    image:
      "https://prisa.mx/wp-content/uploads/2025/07/Maderas_1.webp",
    href: "/producto/aceite-satinado",
  },
];

const FILTER_OPTIONS = [
  "Selladores",
  "Fondos",
  "Barnices",
  "Lacas",
  "Tintas",
  "Catalizador",
  "Aceite",
  "Persevador de madera",
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

export default function MaderaPage() {
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
              Madera
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
              La línea SIGLO® MADERAS cuenta con una amplia gama de productos
              que incluye tintas, manchas, lacas, fondos, barnices y selladores
              para proteger la belleza natural de la madera.
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
            Contamos con diferentes tipos de productos que cubren, resaltan, dan
            brillo, cuidan y embellecen la madera.
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
              "url(https://prisa.mx/wp-content/uploads/2025/06/brochure_maderas.png)",
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
              Catálogo de maderas
            </h2>
            <p
              style={{
                fontSize: 16,
                fontWeight: 500,
                color: "#333",
                lineHeight: 1.6,
              }}
            >
              Descarga nuestro catálogo enfocado a maderas, además conoce los
              complementos perfectos para que tu espacio quede como nuevo.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
