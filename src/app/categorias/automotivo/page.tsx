import Image from "next/image";
import Link from "next/link";
import Header from "@/presentation/components/layout/Header";
import Footer from "@/presentation/components/layout/Footer";

export const metadata = {
  title: "Automotivo archivos - Pinturas PRISA",
  description:
    "Descubre la línea de productos automotrices SIGLO®, especializada en soluciones para la industria del repintado automotriz.",
};

const PRODUCTS = [
  {
    name: "REMOVEDOR DE PINTURA",
    category: "Siglo automotivo",
    image: "https://prisa.mx/wp-content/uploads/2025/07/Removedor_de_pintura_1.webp",
    href: "/producto/removedor-de-pintura",
  },
  {
    name: "RELLENADOR",
    category: "Siglo automotivo",
    image: "https://prisa.mx/wp-content/uploads/2025/07/Rellenador_1.webp",
    href: "/producto/rellenador",
  },
  {
    name: "RELLENADOR PELO DE GATO",
    category: "Siglo automotivo",
    image: "https://prisa.mx/wp-content/uploads/2025/07/Rellenador_pelo_de_gato_1.webp",
    href: "/producto/rellenador-pelo-de-gato",
  },
  {
    name: "PLASTE AUTOMOTIVO",
    category: "Siglo automotivo",
    image: "https://prisa.mx/wp-content/uploads/2025/07/Plaste_automotivo_1.webp",
    href: "/producto/plaste-automotivo",
  },
  {
    name: "NEGRO CHASIS",
    category: "Siglo automotivo",
    image: "https://prisa.mx/wp-content/uploads/2025/07/Negro_chasis_1.webp",
    href: "/producto/negro-chasis",
  },
  {
    name: "FONDO UNIVERSAL VP38",
    category: "Siglo automotivo",
    image: "https://prisa.mx/wp-content/uploads/2025/07/Fondo_Universal_VP38_1.webp",
    href: "/producto/fondo-universal-vp38",
  },
  {
    name: "BASE COLOR BLANCA",
    category: "Siglo automotivo",
    image: "https://prisa.mx/wp-content/uploads/2025/07/Base_color_Blanca_1.webp",
    href: "/producto/base-color-blanca",
  },
  {
    name: "BASE COLOR NEGRA",
    category: "Siglo automotivo",
    image: "https://prisa.mx/wp-content/uploads/2025/07/Base_color_Negra_1.webp",
    href: "/producto/base-color-negra",
  },
  {
    name: "BASE COLOR METÁLICA DELGADA",
    category: "Siglo automotivo",
    image: "https://prisa.mx/wp-content/uploads/2025/07/Base_color_Metalica_delgada_1.webp",
    href: "/producto/base-color-metalica-delgada",
  },
  {
    name: "BASE COLOR TRANSPARENTE",
    category: "Siglo automotivo",
    image: "https://prisa.mx/wp-content/uploads/2025/07/Base_color_Transparente_1.webp",
    href: "/producto/base-color-transparente",
  },
  {
    name: "ESMALTE ACRÍLICO BLANCO",
    category: "Siglo automotivo",
    image: "https://prisa.mx/wp-content/uploads/2025/07/Esmalte_acrilico_Blanco_1.webp",
    href: "/producto/esmalte-acrilico-blanco",
  },
  {
    name: "ESMALTE ACRÍLICO NEGRO",
    category: "Siglo automotivo",
    image: "https://prisa.mx/wp-content/uploads/2025/07/Esmalte_acrilico_Negro_2.webp",
    href: "/producto/esmalte-acrilico-negro",
  },
  {
    name: "ESMALTE POLIURETANO BLANCO",
    category: "Siglo automotivo",
    image: "https://prisa.mx/wp-content/uploads/2025/07/Esmalte_poliuretano_Blanco_1.webp",
    href: "/producto/esmalte-poliuretano-blanco",
  },
  {
    name: "ESMALTE POLIURETANO NEGRO",
    category: "Siglo automotivo",
    image: "https://prisa.mx/wp-content/uploads/2025/07/Esmalte_poliuretano_Negro_1.webp",
    href: "/producto/esmalte-poliuretano-negro",
  },
  {
    name: "BICAPA TRANSPARENTE",
    category: "Siglo automotivo",
    image: "https://prisa.mx/wp-content/uploads/2025/07/Bicapa_Transparente_1.webp",
    href: "/producto/bicapa-transparente",
  },
  {
    name: "BICAPA PRODUCTIVA TPTE",
    category: "Siglo automotivo",
    image: "https://prisa.mx/wp-content/uploads/2025/07/Bicapa_Productiva_TPTE_1.webp",
    href: "/producto/bicapa-productiva-tpte",
  },
  {
    name: "PULIMENTO BLANCO",
    category: "Siglo automotivo",
    image: "https://prisa.mx/wp-content/uploads/2026/05/Pulimento-blanco.png",
    href: "/producto/pulimento-blanco",
  },
  {
    name: "CERA LÍQUIDA",
    category: "Siglo automotivo",
    image: "https://prisa.mx/wp-content/uploads/2025/07/Cera_Liquida_1.webp",
    href: "/producto/cera-liquida",
  },
  {
    name: "ABRILLANTADOR DE PINTURA",
    category: "Siglo automotivo",
    image: "https://prisa.mx/wp-content/uploads/2025/07/Abrillantador_de_pintura_1.webp",
    href: "/producto/abrillantador-de-pintura",
  },
  {
    name: "SILICREM AUTOMOTIVA",
    category: "Siglo automotivo",
    image: "https://prisa.mx/wp-content/uploads/2025/07/Silicrem_automotiva_1.webp",
    href: "/producto/silicrem-automotiva",
  },
  {
    name: "PULIMENTO ROJO MEDIANO TRIPOLI",
    category: "Siglo automotivo",
    image: "https://prisa.mx/wp-content/uploads/2026/05/Pulimento-rojo.png",
    href: "/producto/pulimento-rojo-mediano-tripoli",
  },
  {
    name: "KIT CARWASH",
    category: "Siglo automotivo",
    image: "https://prisa.mx/wp-content/uploads/2026/05/kit-carwash1.png",
    href: "/producto/kit-carwash",
  },
  {
    name: "ABRILLANTADOR AUTOMOTIVO CARROCERIA",
    category: "Siglo automotivo",
    image: "https://prisa.mx/wp-content/uploads/2026/05/Abrillador-Automotriz.png",
    href: "/producto/abrillantador-automotivo-carroceria",
  },
  {
    name: "CERA EN PASTA",
    category: "Siglo automotivo",
    image: "https://prisa.mx/wp-content/uploads/2026/05/Cera-en-Pasta.png",
    href: "/producto/cera-en-pasta",
  },
  {
    name: "GEL ABRILLANTADOR PARA LLANTAS",
    category: "Siglo automotivo",
    image: "https://prisa.mx/wp-content/uploads/2026/05/abrillantador.png",
    href: "/producto/gel-abrillantador-para-llantas",
  },
];

const FILTERS = [
  "Productos de Preparación superficie",
  "Pintura y Acabado",
  "Estética Automotriz",
];

export default function AutomotivoCategoryPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section
          style={{
            backgroundColor: "#003366",
            paddingTop: "75px",
            paddingBottom: "75px",
            paddingLeft: "40px",
            paddingRight: "40px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ maxWidth: "1100px", width: "100%", textAlign: "center" }}>
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "16px",
                fontWeight: 700,
                lineHeight: "20px",
                color: "#ffffff",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              PRODUCTOS
            </p>
            <h1
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "60px",
                fontWeight: 800,
                lineHeight: "60px",
                color: "#ffffff",
                marginBottom: "16px",
              }}
            >
              Automotivo
            </h1>
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "16px",
                fontWeight: 600,
                lineHeight: "19px",
                color: "#ffffff",
                maxWidth: "700px",
                margin: "0 auto",
              }}
            >
              Descubre la línea de productos automotrices SIGLO®, especializada en
              soluciones para la industria del repintado automotriz.
            </p>
          </div>
        </section>

        {/* Products Section */}
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
          <div style={{ maxWidth: "1100px", width: "100%" }}>
            <h4
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "24px",
                fontWeight: 700,
                lineHeight: "30px",
                color: "#003366",
                textAlign: "center",
                marginBottom: "50px",
              }}
            >
              Todo lo que necesitas para lograr acabados impecables y de larga
              duración, en un solo lugar. Desde la preparación hasta el toque
              final.
            </h4>

            <div style={{ display: "flex", gap: "40px", alignItems: "flex-start" }}>
              {/* Sidebar Filters */}
              <aside style={{ flexShrink: 0, width: "200px" }}>
                <h4
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "15px",
                    fontWeight: 600,
                    lineHeight: "30px",
                    color: "#003366",
                    marginBottom: "8px",
                  }}
                >
                  Categorías
                </h4>
                <hr style={{ borderColor: "#EBEBEB", marginBottom: "12px" }} />
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {FILTERS.map((filter) => (
                    <li
                      key={filter}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "5px 0",
                        cursor: "pointer",
                      }}
                    >
                      <span
                        style={{
                          width: "16px",
                          height: "16px",
                          minWidth: "16px",
                          border: "1px solid #ccc",
                          borderRadius: "2px",
                          display: "inline-block",
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontSize: "13px",
                          fontWeight: 400,
                          lineHeight: "19px",
                          color: "#737373",
                        }}
                      >
                        {filter}
                      </span>
                    </li>
                  ))}
                </ul>
              </aside>

              {/* Product Grid */}
              <div
                style={{
                  flex: 1,
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "20px",
                }}
                className="automotivo-grid"
              >
                {PRODUCTS.map((product) => (
                  <div
                    key={product.name}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "10px",
                    }}
                  >
                    <Link href={product.href} style={{ width: "100%" }}>
                      <div style={{ position: "relative", width: "100%", aspectRatio: "1/1" }}>
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          style={{ objectFit: "contain" }}
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      </div>
                    </Link>
                    <Link
                      href={product.href}
                      style={{ textDecoration: "none" }}
                    >
                      <h5
                        style={{
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontSize: "16px",
                          fontWeight: 700,
                          lineHeight: "20px",
                          color: "#FF9900",
                          margin: 0,
                        }}
                      >
                        {product.name}
                      </h5>
                    </Link>
                    <p
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: "16px",
                        fontWeight: 600,
                        lineHeight: "19px",
                        color: "#003366",
                        margin: 0,
                      }}
                    >
                      {product.category}
                    </p>
                    <Link
                      href={product.href}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: "16px",
                        fontWeight: 700,
                        lineHeight: "14px",
                        color: "#003366",
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
                        <g clipPath="url(#clip0)">
                          <path
                            d="M17.0753 2.9772C13.055 -1.03031 6.87304 -0.951413 2.95921 2.96844C-0.950867 6.88578 -1.02476 13.0436 2.96422 17.0611C6.91938 21.0448 13.2066 20.9096 17.064 17.0786C20.8839 13.2577 21.0655 6.95717 17.0741 2.97846L17.0753 2.9772ZM14.7157 12.2433C14.7132 12.8933 14.4627 13.2414 13.933 13.3492C13.4758 13.4418 13.045 13.1976 12.8972 12.7568C12.8371 12.5777 12.8146 12.3936 12.8146 12.2045C12.8158 11.1125 12.8146 10.0192 12.8095 8.92711C12.8095 8.8407 12.8634 8.71546 12.7544 8.67664C12.653 8.64032 12.6029 8.7643 12.5403 8.82692C11.6185 9.74615 10.698 10.6666 9.77742 11.5871C8.8644 12.5001 7.95263 13.4143 7.03711 14.326C6.73277 14.6291 6.39963 14.8169 5.94499 14.6453C5.40645 14.4425 5.16724 13.8063 5.46406 13.3128C5.55048 13.1688 5.65819 13.0448 5.77717 12.9259C7.57565 11.1312 9.37163 9.33412 11.1664 7.53575C11.2415 7.46061 11.3968 7.39549 11.3417 7.27401C11.2904 7.16255 11.1338 7.21515 11.0248 7.2139C9.92145 7.21014 8.81681 7.2139 7.71342 7.20764C7.12102 7.20388 6.77535 6.93212 6.67641 6.41615C6.58248 5.92648 6.87805 5.46812 7.36399 5.35666C7.77479 5.26274 8.19435 5.31033 8.60891 5.30657C10.2433 5.29405 11.8765 5.29405 13.5109 5.29154C14.32 5.29029 14.7283 5.69229 14.727 6.49505C14.7245 8.41114 14.7207 10.326 14.7132 12.2421L14.7157 12.2433Z"
                            fill="#003366"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0">
                            <rect width="20" height="20" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      Ver más
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Catalog Section */}
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
            style={{
              maxWidth: "1100px",
              width: "100%",
              display: "flex",
              borderRadius: "40px",
              overflow: "hidden",
            }}
          >
            {/* Background image side */}
            <div
              style={{
                width: "55%",
                minHeight: "300px",
                backgroundImage:
                  "url('https://prisa.mx/wp-content/uploads/2025/06/Mask-group-3.png')",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                borderRadius: "40px 0 0 40px",
              }}
            />

            {/* Text side */}
            <div
              style={{
                width: "45%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "30px 40px",
                backgroundColor: "#ffffff",
                borderRadius: "0 40px 40px 0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  width: "100%",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "16px",
                    fontWeight: 700,
                    lineHeight: "20px",
                    color: "#FF9900",
                    margin: 0,
                  }}
                >
                  CONOCE NUESTROS PRODUCTOS
                </p>
                <h2
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "40px",
                    fontWeight: 700,
                    lineHeight: "50px",
                    color: "#003366",
                    margin: 0,
                  }}
                >
                  Catálogo de pintura automotivo
                </h2>
                <p
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "16px",
                    fontWeight: 600,
                    lineHeight: "19px",
                    color: "#003366",
                    margin: 0,
                  }}
                >
                  Descarga nuestro catálogo especializado en pintura automotriz y
                  descubre los complementos ideales para renovar tu auto por
                  completo.
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Nombre Completo *"
                    style={{
                      flex: "1",
                      minWidth: "200px",
                      height: "50px",
                      padding: "0 12px",
                      border: "none",
                      borderBottom: "1px solid #FF9900",
                      outline: "none",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: "16px",
                      color: "#737373",
                    }}
                  />
                  <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                    <input
                      type="tel"
                      placeholder="Teléfono *"
                      style={{
                        flex: "1",
                        height: "50px",
                        padding: "0 12px",
                        border: "none",
                        borderBottom: "1px solid #FF9900",
                        outline: "none",
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: "16px",
                        color: "#737373",
                      }}
                    />
                    <input
                      type="email"
                      placeholder="Correo *"
                      style={{
                        flex: "1",
                        height: "50px",
                        padding: "0 12px",
                        border: "none",
                        borderBottom: "1px solid #FF9900",
                        outline: "none",
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: "16px",
                        color: "#737373",
                      }}
                    />
                  </div>
                  <button
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      backgroundColor: "#003366",
                      color: "#ffffff",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: "16px",
                      fontWeight: 700,
                      padding: "12px 24px",
                      border: "none",
                      borderRadius: "40px",
                      cursor: "pointer",
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
                      <g clipPath="url(#clip1)">
                        <path
                          d="M17.0753 2.9772C13.055 -1.03031 6.87304 -0.951413 2.95921 2.96844C-0.950867 6.88578 -1.02476 13.0436 2.96422 17.0611C6.91938 21.0448 13.2066 20.9096 17.064 17.0786C20.8839 13.2577 21.0655 6.95717 17.0741 2.97846L17.0753 2.9772ZM14.7157 12.2433C14.7132 12.8933 14.4627 13.2414 13.933 13.3492C13.4758 13.4418 13.045 13.1976 12.8972 12.7568C12.8371 12.5777 12.8146 12.3936 12.8146 12.2045C12.8158 11.1125 12.8146 10.0192 12.8095 8.92711C12.8095 8.8407 12.8634 8.71546 12.7544 8.67664C12.653 8.64032 12.6029 8.7643 12.5403 8.82692C11.6185 9.74615 10.698 10.6666 9.77742 11.5871C8.8644 12.5001 7.95263 13.4143 7.03711 14.326C6.73277 14.6291 6.39963 14.8169 5.94499 14.6453C5.40645 14.4425 5.16724 13.8063 5.46406 13.3128C5.55048 13.1688 5.65819 13.0448 5.77717 12.9259C7.57565 11.1312 9.37163 9.33412 11.1664 7.53575C11.2415 7.46061 11.3968 7.39549 11.3417 7.27401C11.2904 7.16255 11.1338 7.21515 11.0248 7.2139C9.92145 7.21014 8.81681 7.2139 7.71342 7.20764C7.12102 7.20388 6.77535 6.93212 6.67641 6.41615C6.58248 5.92648 6.87805 5.46812 7.36399 5.35666C7.77479 5.26274 8.19435 5.31033 8.60891 5.30657C10.2433 5.29405 11.8765 5.29405 13.5109 5.29154C14.32 5.29029 14.7283 5.69229 14.727 6.49505C14.7245 8.41114 14.7207 10.326 14.7132 12.2421L14.7157 12.2433Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip1">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    Descargar catálogo .pdf
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
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
            style={{
              maxWidth: "1100px",
              width: "100%",
              display: "flex",
              borderRadius: "40px",
              overflow: "hidden",
            }}
          >
            {/* Image side */}
            <div
              style={{
                width: "55%",
                minHeight: "300px",
                backgroundImage:
                  "url('https://prisa.mx/wp-content/uploads/2025/05/img_calucladora_prisa.webp')",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% auto",
                borderRadius: "40px 0 0 40px",
              }}
            />

            {/* Text side */}
            <div
              style={{
                width: "45%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "30px 40px",
                backgroundColor: "#ffffff",
                borderRadius: "0 40px 40px 0",
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
                  Con la Calculadora de Pintura PRISA®, descubre fácilmente cuánta
                  pintura necesitas según el área y el tipo de superficie.
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
                    <g clipPath="url(#clip2)">
                      <path
                        d="M17.0755 2.97671C13.0552 -1.0308 6.87323 -0.951902 2.95939 2.96795C-0.950684 6.88529 -1.02458 13.0431 2.9644 17.0606C6.91956 21.0443 13.2067 20.9091 17.0642 17.0782C20.8841 13.2572 21.0657 6.95668 17.0742 2.97797L17.0755 2.97671ZM14.7159 12.2428C14.7134 12.8928 14.4629 13.241 13.9332 13.3487C13.476 13.4413 13.0452 13.1971 12.8974 12.7563C12.8373 12.5772 12.8147 12.3931 12.8147 12.204C12.816 11.112 12.8147 10.0187 12.8097 8.92662C12.8097 8.84021 12.8636 8.71497 12.7546 8.67615C12.6532 8.63983 12.6031 8.76382 12.5405 8.82643C11.6187 9.74566 10.6981 10.6661 9.7776 11.5866C8.86458 12.4996 7.95282 13.4138 7.03729 14.3255C6.73295 14.6286 6.39981 14.8164 5.94518 14.6448C5.40663 14.442 5.16742 13.8058 5.46425 13.3123C5.55066 13.1683 5.65837 13.0443 5.77735 12.9254C7.57584 11.1308 9.37182 9.33363 11.1665 7.53526C11.2417 7.46012 11.397 7.395 11.3419 7.27352C11.2905 7.16206 11.134 7.21466 11.025 7.21341C9.92163 7.20965 8.81699 7.21341 7.7136 7.20715C7.12121 7.20339 6.77554 6.93163 6.67659 6.41566C6.58266 5.92599 6.87823 5.46764 7.36418 5.35618C7.77497 5.26225 8.19454 5.30984 8.60909 5.30608C10.2435 5.29356 11.8767 5.29356 13.5111 5.29105C14.3202 5.2898 14.7284 5.69181 14.7272 6.49456C14.7247 8.41065 14.7209 10.3255 14.7134 12.2416L14.7159 12.2428Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip2">
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
      </main>
      <Footer />
    </>
  );
}
