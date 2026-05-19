"use client";

import { useState } from "react";
// Metadata is handled in layout.tsx for client components
import Link from "next/link";
import Image from "next/image";
import Header from "@/presentation/components/layout/Header";
import Footer from "@/presentation/components/layout/Footer";

const GALLERY_IMAGES = [
  {
    src: "https://prisa.mx/wp-content/uploads/2025/06/img.png",
    alt: "RIVINOL® 7 - imagen principal",
    width: 540,
    height: 540,
  },
  {
    src: "https://prisa.mx/wp-content/uploads/2025/06/ARQUITECTONICA_RIVINOL_7_2.webp",
    alt: "RIVINOL® 7 - vista 2",
    width: 810,
    height: 810,
  },
  {
    src: "https://prisa.mx/wp-content/uploads/2025/06/ARQUITECTONICA_RIVINOL_7_6.webp",
    alt: "RIVINOL® 7 - vista 3",
    width: 810,
    height: 810,
  },
];

const RELATED_PRODUCTS = [
  {
    name: "SELLADOR VINILICO RIVI 3601 USO PROFESIONAL",
    category: "Selladores y Fondos",
    image:
      "https://prisa.mx/wp-content/uploads/2025/06/ARQUITECTONICA_SELLADOR_VINILICO_RIVI_USO_PROFESIONAL_1.webp",
    href: "/producto/sellador-vinilico-rivi-3601",
  },
  {
    name: "VINIBAR®",
    category: "Vinil / Acrílica",
    image:
      "https://prisa.mx/wp-content/uploads/2025/06/ARQUITECTONICA_VINIBAR_1.webp",
    href: "/producto/vinibar",
  },
  {
    name: "RIVINOL® 5",
    category: "Vinil / Acrílica",
    image:
      "https://prisa.mx/wp-content/uploads/2025/06/ARQUITECTONICA_RIVINOL_5_1.webp",
    href: "/producto/rivinol-5",
  },
  {
    name: "POLIPRISA® PREMIUM",
    category: "Acrílica",
    image:
      "https://prisa.mx/wp-content/uploads/2025/06/ARQUITECTONICA_POLIPRISA_PREMIUM_1.webp",
    href: "/producto/poliprisa-premium",
  },
];

const DETAILS_ICONS = [
  {
    src: "https://prisa.mx/wp-content/uploads/2025/06/ic_lavado.svg",
    label: "100% lavable",
  },
  {
    src: "https://prisa.mx/wp-content/uploads/2025/06/ic_antihongos.svg",
    label: "Antihongos",
  },
  {
    src: "https://prisa.mx/wp-content/uploads/2025/06/Capa_1.svg",
    label: "Fácil aplicación",
  },
  {
    src: "https://prisa.mx/wp-content/uploads/2025/06/ic_alto_desempeno.svg",
    label: "Alto desempeño",
  },
  {
    src: "https://prisa.mx/wp-content/uploads/2025/06/ic_tiempo_de_secado.svg",
    label: "Tiempo de secado",
  },
];

const PRESENTATIONS = [
  {
    src: "https://prisa.mx/wp-content/uploads/2025/06/Vector.svg",
    label: "19L",
  },
  {
    src: "https://prisa.mx/wp-content/uploads/2025/06/Vector-1.svg",
    label: "4L",
  },
  {
    src: "https://prisa.mx/wp-content/uploads/2025/06/Capa_1.png",
    label: "1L",
  },
];

export default function RivinolPage() {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <>
      <Header />
      <main>
        {/* Category label banner */}
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
            Arquitectónico
          </span>
        </section>

        {/* Breadcrumb */}
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
            <Link
              href="/"
              style={{ color: "#000", textDecoration: "none" }}
            >
              Inicio
            </Link>
            {" / "}
            <span>Soluciones PRISA</span>
            {" / "}
            <Link
              href="/categorias/arquitectonico"
              style={{ color: "#000", textDecoration: "none" }}
            >
              Arquitectónico
            </Link>
            {" / "}
            <span>RIVINOL® 7</span>
          </nav>
        </div>

        {/* Product main section */}
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
          {/* Gallery */}
          <div style={{ flex: "1 1 400px", minWidth: 0 }}>
            {/* Main image */}
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
                src={GALLERY_IMAGES[activeImage].src}
                alt={GALLERY_IMAGES[activeImage].alt}
                width={GALLERY_IMAGES[activeImage].width}
                height={GALLERY_IMAGES[activeImage].height}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
                priority={activeImage === 0}
              />
              {/* Nav arrows */}
              <button
                onClick={() =>
                  setActiveImage(
                    (activeImage - 1 + GALLERY_IMAGES.length) %
                      GALLERY_IMAGES.length
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
                onClick={() =>
                  setActiveImage((activeImage + 1) % GALLERY_IMAGES.length)
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
            </div>

            {/* Thumbnails */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "10px",
              }}
            >
              {GALLERY_IMAGES.map((img, idx) => (
                <button
                  key={idx}
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
          </div>

          {/* Product info */}
          <div
            style={{
              flex: "1 1 380px",
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            {/* Tag */}
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

            {/* Name */}
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
              RIVINOL® 7
            </h1>

            {/* Type */}
            <div
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "24px",
                fontWeight: 700,
                lineHeight: "30px",
                color: "#FF9900",
              }}
            >
              Vinil / Acrílica
            </div>

            {/* Description */}
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
              RIVINOL® 7 es una pintura vinil – acrílica que mantiene su
              terminado hasta por 7 años. Te ofrece un mayor beneficio por tu
              inversión con su extraordinario rendimiento e inigualable poder
              cubriente. Es magnífica para el trabajo del pintor profesional
              comprometido con la calidad.
            </p>

            {/* Benefits */}
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
                <li>Secado en sólo 30 minutos</li>
                <li>Máximo rendimiento</li>
                <li>Fácil aplicación</li>
                <li>Variedad colores</li>
              </ul>
            </div>

            {/* Usos principales */}
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
                Fachadas, todo tipo de residencias, comerciales e
                institucionales, muros de tablaroca, interiores y exteriores.
              </p>
            </div>

            {/* Acabado */}
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
                Mate y Satinado
              </p>
            </div>

            {/* Ideal para / Años */}
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
                  Exteriores e Interiores
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
                  7
                </p>
              </div>
            </div>

            {/* Colores */}
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
                4 bases, 18 colores mate y 13 satinados
              </p>
            </div>

            {/* Sistema Megacolor */}
            <div
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <h4
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#003366",
                  margin: 0,
                }}
              >
                Sistema Megacolor
              </h4>
              <span
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#003366",
                }}
              >
                10,830 colores
              </span>
            </div>

            {/* Presentations */}
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

            {/* CTA Button */}
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

        {/* Detalles section */}
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

          {/* Detail icons */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "40px 60px",
            }}
          >
            {DETAILS_ICONS.map((icon) => (
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

          {/* Divider */}
          <div
            style={{
              borderTop: "1px solid #0087A0",
              marginTop: "30px",
            }}
          />
        </section>

        {/* Productos relacionados */}
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
            {RELATED_PRODUCTS.map((product) => (
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
                    >
                      <g clipPath="url(#clip0_product)">
                        <path
                          d="M17.0753 2.9772C13.055 -1.03031 6.87304 -0.951413 2.95921 2.96844C-0.950867 6.88578 -1.02476 13.0436 2.96422 17.0611C6.91938 21.0448 13.2066 20.9096 17.064 17.0786C20.8839 13.2577 21.0655 6.95717 17.0741 2.97846L17.0753 2.9772ZM14.7157 12.2433C14.7132 12.8933 14.4627 13.2414 13.933 13.3492C13.4758 13.4418 13.045 13.1976 12.8972 12.7568C12.8371 12.5777 12.8146 12.3936 12.8146 12.2045C12.8158 11.1125 12.8146 10.0192 12.8095 8.92711C12.8095 8.8407 12.8634 8.71546 12.7544 8.67664C12.653 8.64032 12.6029 8.7643 12.5403 8.82692C11.6185 9.74615 10.698 10.6666 9.77742 11.5871C8.8644 12.5001 7.95263 13.4143 7.03711 14.326C6.73277 14.6291 6.39963 14.8169 5.94499 14.6453C5.40645 14.4425 5.16724 13.8063 5.46406 13.3128C5.55048 13.1688 5.65819 13.0448 5.77717 12.9259C7.57565 11.1312 9.37163 9.33412 11.1664 7.53575C11.2415 7.46061 11.3968 7.39549 11.3417 7.27401C11.2904 7.16255 11.1338 7.21515 11.0248 7.2139C9.92145 7.21014 8.81681 7.2139 7.71342 7.20764C7.12102 7.20388 6.77535 6.93212 6.67641 6.41615C6.58248 5.92648 6.87805 5.46812 7.36399 5.35666C7.77479 5.26274 8.19435 5.31033 8.60891 5.30657C10.2433 5.29405 11.8765 5.29405 13.5109 5.29154C14.32 5.29029 14.7283 5.69229 14.727 6.49505C14.7245 8.41114 14.7207 10.326 14.7132 12.2421L14.7157 12.2433Z"
                          fill="#003366"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_product">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Calculadora PRISA section */}
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
            {/* Image side */}
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
            {/* Text side */}
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
                  Con la Calculadora de Pintura PRISA®, descubre fácilmente
                  cuánta pintura necesitas según el área y el tipo de
                  superficie.
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <g clipPath="url(#calc_clip)">
                        <path
                          d="M17.0755 2.97671C13.0552 -1.0308 6.87323 -0.951902 2.95939 2.96795C-0.950684 6.88529 -1.02458 13.0431 2.9644 17.0606C6.91956 21.0443 13.2067 20.9091 17.0642 17.0782C20.8841 13.2572 21.0657 6.95668 17.0742 2.97797L17.0755 2.97671ZM14.7159 12.2428C14.7134 12.8928 14.4629 13.241 13.9332 13.3487C13.476 13.4413 13.0452 13.1971 12.8974 12.7563C12.8373 12.5772 12.8147 12.3931 12.8147 12.204C12.816 11.112 12.8147 10.0187 12.8097 8.92662C12.8097 8.84021 12.8636 8.71497 12.7546 8.67615C12.6532 8.63983 12.6031 8.76382 12.5405 8.82643C11.6187 9.74566 10.6981 10.6661 9.7776 11.5866C8.86458 12.4996 7.95282 13.4138 7.03729 14.3255C6.73295 14.6286 6.39981 14.8164 5.94518 14.6448C5.40663 14.442 5.16742 13.8058 5.46425 13.3123C5.55066 13.1683 5.65837 13.0443 5.77735 12.9254C7.57584 11.1308 9.37182 9.33363 11.1665 7.53526C11.2417 7.46012 11.397 7.395 11.3419 7.27352C11.2905 7.16206 11.134 7.21466 11.025 7.21341C9.92163 7.20965 8.81699 7.21341 7.7136 7.20715C7.12121 7.20339 6.77554 6.93163 6.67659 6.41566C6.58266 5.92599 6.87823 5.46764 7.36418 5.35618C7.77497 5.26225 8.19454 5.30984 8.60909 5.30608C10.2435 5.29356 11.8767 5.29356 13.5111 5.29105C14.3202 5.2898 14.7284 5.69181 14.7272 6.49456C14.7247 8.41065 14.7209 10.3255 14.7134 12.2416L14.7159 12.2428Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="calc_clip">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
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
                  El resultado es un cálculo aproximado. Para determinar la
                  cantidad exacta, consulta con tu tienda PRISA®.
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
