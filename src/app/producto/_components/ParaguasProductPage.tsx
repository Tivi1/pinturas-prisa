"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/presentation/components/layout/Header";
import Footer from "@/presentation/components/layout/Footer";

/** PDF oficial de fichas técnicas — línea impermeabilizantes PARAGUAS (prisa.mx). */
export const FICHAS_IMPERMEABILIZANTES_PDF =
  "https://prisa.mx/wp-content/uploads/2025/06/Fichas_impermeabilizantes.pdf";

const PRESENTATIONS = [
  {
    src: "https://prisa.mx/wp-content/uploads/2025/06/Vector.svg",
    label: "19L",
  },
  {
    src: "https://prisa.mx/wp-content/uploads/2025/06/Vector-1.svg",
    label: "4L",
  },
] as const;

type Variant = "10" | "7";

const PRODUCT_CONFIG: Record<
  Variant,
  {
    title: string;
    breadcrumbLabel: string;
    gallery: { src: string; alt: string; width: number; height: number }[];
    tagline: string;
    description: string;
    benefits: string[];
    uses: string;
    finish: string;
    idealFor: string;
    yearsLabel: string;
    colorsLine: string;
    detailIcons: { src: string; label: string }[];
    related: {
      name: string;
      category: string;
      image: string;
      href: string;
    }[];
  }
> = {
  "10": {
    title: "PARAGUAS® IMPERMEABILIZANTE 10 AÑOS",
    breadcrumbLabel: "PARAGUAS® IMPERMEABILIZANTE 10 AÑOS",
    gallery: [
      {
        src: "https://prisa.mx/wp-content/uploads/2025/06/IMPERMEABILIZANTE_PARAGUAS_IMPERMEABILIZANTE_10ANOS_1.webp",
        alt: "PARAGUAS® IMPERMEABILIZANTE 10 AÑOS",
        width: 810,
        height: 810,
      },
      {
        src: "https://prisa.mx/wp-content/uploads/2025/06/IMPERMEABILIZANTE_PARAGUAS_IMPERMEABILIZANTE_10ANOS_2.webp",
        alt: "PARAGUAS® IMPERMEABILIZANTE 10 AÑOS — vista 2",
        width: 810,
        height: 810,
      },
    ],
    tagline: "Acrílico Elastomérico",
    description:
      "El Impermeabilizante Elastomerico Paraguas 10 Años, es un recubrimiento base agua con una elasticidad extrema que resiste a movimientos de dilatación y contracción en la superficie por cambios de temperatura y/o movimientos estructurales. Su alta resistencia a condiciones extremas de intemperismo, su excelente adherencia y su máxima impermeabilidad son una garantía de durabilidad.",
    benefits: [
      "Cubre perfectamente las grietas",
      "No se daña con movimientos estructurales o cambios de temperatura",
      "Máximo rendimiento",
      "Secado rápido",
      "No necesita malla.",
    ],
    uses: "Es un Impermeabilizante muy efectivo sobre bóvedas, lozas de concreto y Techos de Teja o Fibrocemento. Se puede aplicar también sobre techos de Lámina Galvanizada, Lámina Pintro, Lámina de Asbesto y Lámina de Fibra de Vidrio para reducir la temperatura en el interior gracias a que refleja mas del 80% de la luz solar.",
    finish: "Acrílico Elastomérico Semimate",
    idealFor: "Exteriores",
    yearsLabel: "10",
    colorsLine: "Blanco y Terracota",
    detailIcons: [
      {
        src: "https://prisa.mx/wp-content/uploads/2025/06/ic_imp_maximo_rendimiento.svg",
        label: "Máximo rendimiento",
      },
      {
        src: "https://prisa.mx/wp-content/uploads/2025/06/ic__cubre_grietas_1.png",
        label: "Cubre grietas",
      },
      {
        src: "https://prisa.mx/wp-content/uploads/2025/06/ic__no_malla_1.png",
        label: "No necesita malla",
      },
    ],
    related: [
      {
        name: "PARAGUAS IMPERMEABILIZANTE 7 AÑOS",
        category: "Acrílico Elastomérico",
        image:
          "https://prisa.mx/wp-content/uploads/2025/06/IMPERMEABILIZANTE_PARAGUAS_IMPERMEABILIZANTE_7ANOS_1.webp",
        href: "/producto/paraguas-impermeabilizante-7-anos",
      },
    ],
  },
  "7": {
    title: "PARAGUAS IMPERMEABILIZANTE 7 AÑOS",
    breadcrumbLabel: "PARAGUAS IMPERMEABILIZANTE 7 AÑOS",
    gallery: [
      {
        src: "https://prisa.mx/wp-content/uploads/2025/06/IMPERMEABILIZANTE_PARAGUAS_IMPERMEABILIZANTE_7ANOS_1.webp",
        alt: "PARAGUAS IMPERMEABILIZANTE 7 AÑOS",
        width: 810,
        height: 810,
      },
    ],
    tagline: "Acrílico Elastomérico",
    description:
      "El Impermeabilizante Elastomerico Paraguas 7 Años, es un recubrimiento base agua con una elasticidad extrema que resiste a movimientos de dilatación y contracción en la superficie por cambios de temperatura y/o movimientos estructurales. Su alta resistencia a condiciones extremas de intemperismo, su excelente adherencia y su máxima impermeabilidad son una garantía de durabilidad.",
    benefits: [
      "Excelente calidad",
      "Fácil aplicación",
      "No necesita malla de refuerzo",
      "No se daña con movimientos estructurales ni cambios de temperatura",
    ],
    uses: "Es un Impermeabilizante muy efectivo sobre bóvedas, lozas de concreto y Techos de Teja o Fibrocemento. Se puede aplicar también sobre techos de Lámina Galvanizada, Lámina Pintro, Lámina de Asbesto y Lámina de Fibra de Vidrio para reducir la temperatura en el interior gracias a que refleja mas del 80% de la luz solar.",
    finish: "Acrílico Elastomérico Semimate",
    idealFor: "Exteriores",
    yearsLabel: "7",
    colorsLine: "Blanco y Terracota",
    detailIcons: [
      {
        src: "https://prisa.mx/wp-content/uploads/2025/06/ic_imp_maximo_rendimiento.svg",
        label: "Máximo rendimiento",
      },
      {
        src: "https://prisa.mx/wp-content/uploads/2025/06/ic_secado_rapido-1.svg",
        label: "Secado rápido",
      },
      {
        src: "https://prisa.mx/wp-content/uploads/2025/06/ic__no_malla_1.png",
        label: "No necesita malla",
      },
    ],
    related: [
      {
        name: "PARAGUAS® IMPERMEABILIZANTE 10 AÑOS",
        category: "Acrílico Elastomérico",
        image:
          "https://prisa.mx/wp-content/uploads/2025/06/IMPERMEABILIZANTE_PARAGUAS_IMPERMEABILIZANTE_10ANOS_1.webp",
        href: "/producto/paraguas-impermeabilizante",
      },
    ],
  },
};

function FichaTecnicaSection({ productTitle }: { productTitle: string }) {
  return (
    <section
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 40px 60px 40px",
      }}
    >
      <h2
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: "24px",
          fontWeight: 700,
          color: "#003366",
          marginBottom: "12px",
          textAlign: "center",
        }}
      >
        Ficha técnica
      </h2>
      <p
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: "15px",
          fontWeight: 400,
          lineHeight: "22px",
          color: "#737373",
          margin: "0 auto 24px",
          maxWidth: "720px",
          textAlign: "center",
        }}
      >
        Especificaciones técnicas de{" "}
        <strong style={{ color: "#003366", fontWeight: 600 }}>{productTitle}</strong>{" "}
        y demás impermeabilizantes PARAGUAS®, según el documento oficial PRISA.
      </p>
      <div
        style={{
          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid rgba(0, 51, 102, 0.15)",
          background: "#f4f4f4",
          minHeight: "min(70vh, 640px)",
        }}
      >
        <iframe
          title={`Ficha técnica — ${productTitle}`}
          src={FICHAS_IMPERMEABILIZANTES_PDF}
          style={{
            width: "100%",
            height: "min(70vh, 640px)",
            border: "none",
            display: "block",
          }}
        />
      </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <a
          href={FICHAS_IMPERMEABILIZANTES_PDF}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            backgroundColor: "#003366",
            color: "#FFFFFF",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "15px",
            fontWeight: 700,
            padding: "14px 28px",
            borderRadius: "100px",
            textDecoration: "none",
          }}
        >
          Descargar PDF de fichas técnicas
        </a>
      </div>
    </section>
  );
}

export default function ParaguasProductPage({ variant }: { variant: Variant }) {
  const cfg = PRODUCT_CONFIG[variant];
  const [activeImage, setActiveImage] = useState(0);
  const gallery = cfg.gallery;

  return (
    <>
      <Header />
      <main>
        <section
          style={{
            backgroundColor: "#E5E6E4",
            padding: "47px 24px",
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "60px",
              fontWeight: 800,
              lineHeight: "60px",
              color: "#003366",
            }}
          >
            Impermeabilizantes
          </span>
        </section>

        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "10px 40px",
          }}
          className="hidden lg:block"
        >
          <nav
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "12px",
              fontWeight: 300,
              color: "#000",
            }}
          >
            <Link href="/" style={{ color: "#000", textDecoration: "none" }}>
              Inicio
            </Link>
            {" / "}
            <span>Soluciones PRISA</span>
            {" / "}
            <Link
              href="/categorias/impermeabilizantes"
              style={{ color: "#000", textDecoration: "none" }}
            >
              Impermeabilizantes
            </Link>
            {" / "}
            <span>{cfg.breadcrumbLabel}</span>
          </nav>
        </div>

        <section
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "60px 20px 100px 20px",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "40px",
          }}
        >
          <div style={{ flex: "1 1 400px", minWidth: 0 }}>
            <div
              style={{
                width: "100%",
                aspectRatio: "1 / 1",
                position: "relative",
                background: "#f9f9f9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <Image
                src={gallery[activeImage].src}
                alt={gallery[activeImage].alt}
                width={gallery[activeImage].width}
                height={gallery[activeImage].height}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
                priority={activeImage === 0}
              />
              {gallery.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveImage(
                        (activeImage - 1 + gallery.length) % gallery.length
                      )
                    }
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "#E5E6E4",
                      border: "none",
                      cursor: "pointer",
                      padding: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    aria-label="Imagen anterior"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                    >
                      <path
                        d="M11.3125 15.1875C10.9063 14.8125 10.9063 14.1562 11.3125 13.7812L16.3125 8.78125C16.6875 8.375 17.3438 8.375 17.7188 8.78125C18.125 9.15625 18.125 9.8125 17.7188 10.1875L13.4375 14.5L17.7188 18.7812C18.125 19.1562 18.125 19.8125 17.7188 20.1875C17.3438 20.5937 16.6875 20.5937 16.3125 20.1875L11.3125 15.1875Z"
                        fill="#003366"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveImage((activeImage + 1) % gallery.length)
                    }
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "#E5E6E4",
                      border: "none",
                      cursor: "pointer",
                      padding: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    aria-label="Imagen siguiente"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                    >
                      <path
                        d="M18.6875 14.8125C19.0938 15.1875 19.0938 15.8438 18.6875 16.2188L13.6875 21.2188C13.3125 21.625 12.6562 21.625 12.2812 21.2188C11.875 20.8438 11.875 20.1875 12.2812 19.8125L16.5625 15.5L12.2812 11.2188C11.875 10.8438 11.875 10.1875 12.2812 9.8125C12.6562 9.40625 13.3125 9.40625 13.6875 9.8125L18.6875 14.8125Z"
                        fill="#003366"
                      />
                    </svg>
                  </button>
                </>
              ) : null}
            </div>

            {gallery.length > 1 ? (
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "10px",
                }}
              >
                {gallery.map((img, idx) => (
                  <button
                    type="button"
                    key={img.src}
                    onClick={() => setActiveImage(idx)}
                    style={{
                      width: "80px",
                      height: "80px",
                      border:
                        activeImage === idx
                          ? "2px solid #003366"
                          : "2px solid transparent",
                      background: "#f9f9f9",
                      padding: 0,
                      cursor: "pointer",
                      overflow: "hidden",
                      flexShrink: 0,
                    }}
                    aria-label={`Ver imagen ${idx + 1}`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={150}
                      height={150}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div
            style={{
              flex: "1 1 380px",
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "16px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: "#FF9900",
                }}
              >
                Producto Nuevo
              </span>
            </div>

            <h1
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "36px",
                fontWeight: 500,
                lineHeight: "40px",
                color: "#003366",
                margin: 0,
              }}
            >
              {cfg.title}
            </h1>

            <div
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "24px",
                fontWeight: 700,
                lineHeight: "30px",
                color: "#FF9900",
              }}
            >
              {cfg.tagline}
            </div>

            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "24px",
                color: "#737373",
                margin: 0,
              }}
            >
              {cfg.description}
            </p>

            <div>
              <h4
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#003366",
                  margin: "0 0 4px 0",
                }}
              >
                Beneficios:
              </h4>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: "20px",
                  color: "#737373",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "16px",
                  lineHeight: "26px",
                }}
              >
                {cfg.benefits.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#003366",
                  margin: "0 0 4px 0",
                }}
              >
                Usos principales:
              </h4>
              <p
                style={{
                  margin: 0,
                  color: "#737373",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "16px",
                  lineHeight: "24px",
                }}
              >
                {cfg.uses}
              </p>
            </div>

            <div>
              <h4
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#003366",
                  margin: "0 0 4px 0",
                }}
              >
                Acabado:
              </h4>
              <p
                style={{
                  margin: 0,
                  color: "#737373",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "16px",
                }}
              >
                {cfg.finish}
              </p>
            </div>

            <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
              <div>
                <h4
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#003366",
                    margin: "0 0 4px 0",
                  }}
                >
                  Ideal para pintar:
                </h4>
                <p
                  style={{
                    margin: 0,
                    color: "#737373",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "16px",
                  }}
                >
                  {cfg.idealFor}
                </p>
              </div>
              <div>
                <h4
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#003366",
                    margin: "0 0 4px 0",
                  }}
                >
                  Años:
                </h4>
                <p
                  style={{
                    margin: 0,
                    color: "#737373",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "16px",
                  }}
                >
                  {cfg.yearsLabel}
                </p>
              </div>
            </div>

            <div>
              <h4
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#003366",
                  margin: "0 0 4px 0",
                }}
              >
                Colores de línea:
              </h4>
              <p
                style={{
                  margin: 0,
                  color: "#737373",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "16px",
                }}
              >
                {cfg.colorsLine}
              </p>
            </div>

            <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
              {PRESENTATIONS.map((p) => (
                <div
                  key={p.label}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <Image
                    src={p.src}
                    alt={p.label}
                    width={40}
                    height={60}
                    style={{ objectFit: "contain" }}
                    unoptimized
                  />
                  <span
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "#737373",
                    }}
                  >
                    {p.label}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ paddingTop: "20px" }}>
              <a
                href="mailto:ventas@prisa.mx"
                style={{
                  display: "inline-block",
                  backgroundColor: "#003366",
                  color: "#FFFFFF",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "16px",
                  fontWeight: 700,
                  padding: "16px 32px",
                  borderRadius: "100px",
                  textDecoration: "none",
                  textAlign: "center",
                }}
              >
                Asesoría Personalizada
              </a>
            </div>
          </div>
        </section>

        <section
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 40px 50px 40px",
          }}
        >
          <h2
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "24px",
              fontWeight: 700,
              color: "#FF9900",
              marginBottom: "30px",
              textAlign: "center",
            }}
          >
            Detalles
          </h2>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "40px 60px",
            }}
          >
            {cfg.detailIcons.map((icon) => (
              <div
                key={icon.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "20px",
                  minWidth: "80px",
                }}
              >
                <Image
                  src={icon.src}
                  alt={icon.label}
                  width={50}
                  height={50}
                  style={{ objectFit: "contain" }}
                  unoptimized
                />
                <span
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#003366",
                    textAlign: "center",
                  }}
                >
                  {icon.label}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              borderTop: "1px solid #0087A0",
              marginTop: "30px",
            }}
          />
        </section>

        <FichaTecnicaSection productTitle={cfg.title} />

        <section
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "60px 40px 100px 40px",
          }}
        >
          <h2
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "40px",
              fontWeight: 700,
              color: "#003366",
              textAlign: "center",
              marginBottom: "40px",
            }}
          >
            Productos relacionados
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "20px 20px",
            }}
          >
            {cfg.related.map((product) => (
              <Link
                key={product.name}
                href={product.href}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    maxWidth: "260px",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "1 / 1",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <h5
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "#FF9900",
                      margin: 0,
                    }}
                  >
                    {product.name}
                  </h5>
                  <p
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "#003366",
                      margin: 0,
                    }}
                  >
                    {product.category}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: "16px",
                        fontWeight: 700,
                        color: "#003366",
                      }}
                    >
                      Ver más
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M17.0753 2.9772C13.055 -1.03031 6.87304 -0.951413 2.95921 2.96844C-0.950867 6.88578 -1.02476 13.0436 2.96422 17.0611C6.91938 21.0448 13.2066 20.9096 17.064 17.0786C20.8839 13.2577 21.0655 6.95717 17.0741 2.97846L17.0753 2.9772ZM14.7157 12.2433C14.7132 12.8933 14.4627 13.2414 13.933 13.3492C13.4758 13.4418 13.045 13.1976 12.8972 12.7568C12.8371 12.5777 12.8146 12.3936 12.8146 12.2045C12.8158 11.1125 12.8146 10.0192 12.8095 8.92711C12.8095 8.8407 12.8634 8.71546 12.7544 8.67664C12.653 8.64032 12.6029 8.7643 12.5403 8.82692C11.6185 9.74615 10.698 10.6666 9.77742 11.5871C8.8644 12.5001 7.95263 13.4143 7.03711 14.326C6.73277 14.6291 6.39963 14.8169 5.94499 14.6453C5.40645 14.4425 5.16724 13.8063 5.46406 13.3128C5.55048 13.1688 5.65819 13.0448 5.77717 12.9259C7.57565 11.1312 9.37163 9.33412 11.1664 7.53575C11.2415 7.46061 11.3968 7.39549 11.3417 7.27401C11.2904 7.16255 11.1338 7.21515 11.0248 7.2139C9.92145 7.21014 8.81681 7.2139 7.71342 7.20764C7.12102 7.20388 6.77535 6.93212 6.67641 6.41615C6.58248 5.92648 6.87805 5.46812 7.36399 5.35666C7.77479 5.26274 8.19435 5.31033 8.60891 5.30657C10.2433 5.29405 11.8765 5.29405 13.5109 5.29154C14.32 5.29029 14.7283 5.69229 14.727 6.49505C14.7245 8.41114 14.7207 10.326 14.7132 12.2421L14.7157 12.2433Z"
                        fill="#003366"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "60px 40px 100px 40px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              borderRadius: "40px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                flex: "1 1 300px",
                minHeight: "300px",
                backgroundImage:
                  "url('https://prisa.mx/wp-content/uploads/2025/05/img_calucladora_prisa.webp')",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            />
            <div
              style={{
                flex: "1 1 300px",
                backgroundColor: "#fff",
                padding: "40px 40px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <h4
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "24px",
                    fontWeight: 700,
                    color: "#003366",
                    margin: 0,
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
                    margin: 0,
                  }}
                >
                  ¿Cuánta pintura PRISA® necesito?
                </h2>
                <p
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "16px",
                    fontWeight: 600,
                    lineHeight: "24px",
                    color: "#737373",
                    margin: 0,
                  }}
                >
                  Con la Calculadora de Pintura PRISA®, descubre fácilmente cuánta
                  pintura necesitas según el área y el tipo de superficie.
                </p>
                <p
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "16px",
                    fontWeight: 600,
                    lineHeight: "24px",
                    color: "#737373",
                    margin: 0,
                  }}
                >
                  Ingresa los datos de tu espacio y obtén una recomendación
                  personalizada para ese proyecto que estás por comenzar.
                </p>
                <div style={{ paddingTop: "8px" }}>
                  <Link
                    href="/calculadora-prisa"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "10px",
                      backgroundColor: "#003366",
                      color: "#FFFFFF",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: "16px",
                      fontWeight: 700,
                      padding: "14px 28px",
                      borderRadius: "100px",
                      textDecoration: "none",
                    }}
                  >
                    Calculadora
                  </Link>
                </div>
                <p
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "12px",
                    fontWeight: 400,
                    color: "#737373",
                    margin: 0,
                    textAlign: "center",
                  }}
                >
                  El resultado es un cálculo aproximado. Para determinar la cantidad
                  exacta, consulta con tu tienda PRISA®.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
