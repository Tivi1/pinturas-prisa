import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/presentation/components/layout/Header";
import Footer from "@/presentation/components/layout/Footer";
import type { CategoryGridProduct } from "./arquitectonico-products";

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

export type ArquitectonicoCategoryViewProps = {
  heroEyebrow: string;
  heroTitle: string;
  /** Texto bajo el h1 en el hero (solo página principal). */
  heroLead?: string;
  /**
   * `brand`: fondo azul PRISA y texto blanco (p. ej. archivo Exterior).
   * `light` (defecto): fondo claro y texto azul.
   */
  heroTheme?: "light" | "brand";
  /** Título sobre el grid de productos. */
  gridHeading?: string;
  products: CategoryGridProduct[];
  /** Contenido opcional después del bloque Calculadora (p. ej. catálogo). */
  postCalculadora?: ReactNode;
};

const DEFAULT_GRID_HEADING =
  "Descubre el producto adecuado para cada necesidad.";

export default function ArquitectonicoCategoryView({
  heroEyebrow,
  heroTitle,
  heroLead,
  heroTheme = "light",
  gridHeading = DEFAULT_GRID_HEADING,
  products,
  postCalculadora,
}: ArquitectonicoCategoryViewProps) {
  const heroTextColor = heroTheme === "brand" ? "#FFFFFF" : "#003366";
  const heroBgColor = heroTheme === "brand" ? "#003366" : "#F5F5F3";

  return (
    <>
      <Header />
      <main>
        <section
          style={{
            backgroundColor: heroBgColor,
            padding: "75px 24px",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <p
              style={{
                color: heroTextColor,
                textTransform: "uppercase",
                fontWeight: 700,
                fontSize: 16,
                letterSpacing: "0.08em",
                marginBottom: 16,
              }}
            >
              {heroEyebrow}
            </p>
            <h1
              className="text-[34px] lg:text-[60px]"
              style={{
                color: heroTextColor,
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: heroLead ? 20 : 0,
              }}
            >
              {heroTitle}
            </h1>
            {heroLead ? (
              <p
                style={{
                  color: heroTextColor,
                  fontSize: 16,
                  fontWeight: 600,
                  maxWidth: 520,
                  margin: "0 auto",
                }}
              >
                {heroLead}
              </p>
            ) : null}
          </div>
        </section>

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
            {gridHeading}
          </h2>

          <div style={{ width: "100%" }}>
            <div
              className="grid-cols-2 lg:grid-cols-4"
              style={{
                display: "grid",
                gap: 28,
              }}
            >
              {products.map((product) => (
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
        </section>

        <section
          style={{
            paddingTop: "100px",
            paddingBottom: "100px",
            paddingLeft: "40px",
            paddingRight: "40px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            className="flex-col lg:flex-row"
            style={{
              maxWidth: "1100px",
              width: "100%",
              display: "flex",
              borderRadius: "40px",
              overflow: "hidden",
            }}
          >
            <div
              className="min-h-[220px] w-full rounded-t-[40px] lg:min-h-[300px] lg:w-[55%] lg:rounded-bl-[40px] lg:rounded-tr-none lg:rounded-tl-[40px]"
              style={{
                minHeight: "300px",
                backgroundImage:
                  "url('https://prisa.mx/wp-content/uploads/2025/05/img_calucladora_prisa.webp')",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% auto",
              }}
            />
            <div
              className="w-full rounded-b-[40px] lg:w-[45%] lg:rounded-bl-none lg:rounded-br-[40px] lg:rounded-tr-[40px]"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "30px 40px",
                backgroundColor: "#ffffff",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0px",
                  width: "100%",
                }}
              >
                <h4
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "24px",
                    fontWeight: 700,
                    lineHeight: "30px",
                    color: "#003366",
                    margin: "0 0 10px",
                  }}
                >
                  Calculadora PRISA®
                </h4>
                <h2
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "40px",
                    fontWeight: 700,
                    lineHeight: "50px",
                    color: "#FF9900",
                    margin: "0 0 20px",
                  }}
                >
                  ¿Cuánta pintura PRISA® necesito?
                </h2>
                <p
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "16px",
                    fontWeight: 600,
                    lineHeight: "19px",
                    margin: "0 0 15px",
                  }}
                >
                  Con la Calculadora de Pintura PRISA®, descubre fácilmente
                  cuánta pintura necesitas según el área y el tipo de
                  superficie.
                </p>
                <p
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "16px",
                    fontWeight: 600,
                    lineHeight: "19px",
                    margin: "0 0 15px",
                  }}
                >
                  Ingresa los datos de tu espacio y obtén una recomendación
                  personalizada para ese proyecto que estás por comenzar.
                </p>
                <Link
                  href="/calculadora-prisa"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    backgroundColor: "#003366",
                    color: "#ffffff",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "16px",
                    fontWeight: 700,
                    padding: "12px 24px",
                    borderRadius: "40px",
                    textDecoration: "none",
                    alignSelf: "flex-start",
                    marginTop: "40px",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <g clipPath="url(#clipArquitectonicoCalc)">
                      <path
                        d="M17.0755 2.97671C13.0552 -1.0308 6.87323 -0.951902 2.95939 2.96795C-0.950684 6.88529 -1.02458 13.0431 2.9644 17.0606C6.91956 21.0443 13.2067 20.9091 17.0642 17.0782C20.8841 13.2572 21.0657 6.95668 17.0742 2.97797L17.0755 2.97671ZM14.7159 12.2428C14.7134 12.8928 14.4629 13.241 13.9332 13.3487C13.476 13.4413 13.0452 13.1971 12.8974 12.7563C12.8373 12.5772 12.8147 12.3931 12.8147 12.204C12.816 11.112 12.8147 10.0187 12.8097 8.92662C12.8097 8.84021 12.8636 8.71497 12.7546 8.67615C12.6532 8.63983 12.6031 8.76382 12.5405 8.82643C11.6187 9.74566 10.6981 10.6661 9.7776 11.5866C8.86458 12.4996 7.95282 13.4138 7.03729 14.3255C6.73295 14.6286 6.39981 14.8164 5.94518 14.6448C5.40663 14.442 5.16742 13.8058 5.46425 13.3123C5.55066 13.1683 5.65837 13.0443 5.77735 12.9254C7.57584 11.1308 9.37182 9.33363 11.1665 7.53526C11.2417 7.46012 11.397 7.395 11.3419 7.27352C11.2905 7.16206 11.134 7.21466 11.025 7.21341C9.92163 7.20965 8.81699 7.21341 7.7136 7.20715C7.12121 7.20339 6.77554 6.93163 6.67659 6.41566C6.58266 5.92599 6.87823 5.46764 7.36418 5.35618C7.77497 5.26225 8.19454 5.30984 8.60909 5.30608C10.2435 5.29356 11.8767 5.29356 13.5111 5.29105C14.3202 5.2898 14.7284 5.69181 14.7272 6.49456C14.7247 8.41065 14.7209 10.3255 14.7134 12.2416L14.7159 12.2428Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clipArquitectonicoCalc">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  Calculadora
                </Link>
              </div>
            </div>
          </div>
        </section>

        {postCalculadora}
      </main>
      <Footer />
    </>
  );
}
