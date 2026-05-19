import Link from "next/link";
import Header from "@/presentation/components/layout/Header";
import Footer from "@/presentation/components/layout/Footer";

const categories = [
  {
    id: "arquitectonico",
    name: "Arquitectónico",
    icon: "🏠",
    description:
      "Pinturas premium para interiores y exteriores residenciales con acabados excepcionales y gran durabilidad.",
    count: 45,
    gradient: "from-[#1B2A4A] to-[#2C3E6B]",
    features: ["Interior y exterior", "Lavable", "Acabado mate y satinado", "Bajo olor"],
  },
  {
    id: "industrial",
    name: "Industrial",
    icon: "🏭",
    description:
      "Recubrimientos de alto rendimiento para la industria, manufactura y proyectos de gran escala.",
    count: 32,
    gradient: "from-[#37474F] to-[#546E7A]",
    features: ["Anticorrosivo", "Alta resistencia", "Uso rudo", "Secado rápido"],
  },
  {
    id: "decorativo",
    name: "Decorativo",
    icon: "🎨",
    description:
      "Acabados texturizados y especiales para crear ambientes únicos con personalidad.",
    count: 28,
    gradient: "from-[#6A1B9A] to-[#AB47BC]",
    features: ["Texturas", "Efectos metálicos", "Estuco veneciano", "Acabados artísticos"],
  },
  {
    id: "impermeabilizante",
    name: "Impermeabilizante",
    icon: "💧",
    description:
      "Protección total contra humedad y filtraciones para techos, muros y superficies expuestas.",
    count: 15,
    gradient: "from-[#00897B] to-[#26A69A]",
    features: ["5 años garantía", "Fibratado", "Elastomérico", "Ecológico"],
  },
  {
    id: "esmaltes",
    name: "Esmaltes y Barnices",
    icon: "✨",
    description:
      "Esmaltes, lacas y barnices para madera, metal y superficies especiales con brillo excepcional.",
    count: 22,
    gradient: "from-[#E65100] to-[#F57C00]",
    features: ["Alto brillo", "Resistente a rayos UV", "Secado rápido", "Multiusos"],
  },
];

const featuredProducts = [
  {
    name: "PRISA Total Pro",
    category: "Arquitectónico",
    tagline: "Nuestra línea premium de máxima cobertura",
    color: "bg-primary",
  },
  {
    name: "AquaShield 5000",
    category: "Impermeabilizante",
    tagline: "Protección garantizada por 5 años",
    color: "bg-accent",
  },
  {
    name: "DecoArt Textures",
    category: "Decorativo",
    tagline: "Transforma muros en obras de arte",
    color: "bg-[#6A1B9A]",
  },
  {
    name: "IndustriCoat HD",
    category: "Industrial",
    tagline: "Máxima resistencia para entornos exigentes",
    color: "bg-[#37474F]",
  },
];

export default function ProductosPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-primary pb-20 pt-32 sm:pt-40">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,var(--color-primary-light)/40_0%,transparent_70%)]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
                Catálogo completo
              </p>
              <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Nuestros Productos
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-white/70">
                Soluciones integrales en pinturas y recubrimientos de la más alta
                calidad. Encuentra la opción perfecta para tu proyecto.
              </p>
            </div>
          </div>
        </section>

        {/* Categories grid */}
        <section className="bg-surface-alt py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-10 text-center text-3xl font-bold text-primary">
              Categorías
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="group overflow-hidden rounded-2xl bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div
                    className={`bg-gradient-to-br ${cat.gradient} p-8 text-white transition-all duration-300`}
                  >
                    <span className="text-4xl">{cat.icon}</span>
                    <h3 className="mt-4 text-xl font-bold">{cat.name}</h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-white/60">
                      {cat.count} productos
                    </p>
                  </div>
                  <div className="p-6">
                    <p className="text-sm leading-relaxed text-text-light">
                      {cat.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {cat.features.map((f) => (
                        <span
                          key={f}
                          className="rounded-full bg-surface-alt px-3 py-1 text-xs font-medium text-primary"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/productos/${cat.id}`}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-secondary transition-colors hover:text-secondary-dark"
                    >
                      Ver productos
                      <svg
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured products */}
        <section className="bg-surface py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-primary">
                Productos Destacados
              </h2>
              <p className="mt-3 text-text-light">
                Los favoritos de nuestros clientes
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <div
                  key={product.name}
                  className="group overflow-hidden rounded-2xl bg-surface-alt transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div
                    className={`${product.color} flex h-48 items-center justify-center`}
                  >
                    <div className="h-24 w-20 rounded-lg bg-white/20 shadow-inner" />
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
                      {product.category}
                    </span>
                    <h3 className="mt-1 text-lg font-bold text-primary">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-text-light">
                      {product.tagline}
                    </p>
                    <Link
                      href="/productos"
                      className="mt-4 inline-block rounded-full bg-secondary px-5 py-2 text-xs font-bold text-white transition-colors hover:bg-secondary-dark"
                    >
                      Ver detalles
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="bg-gradient-to-r from-primary via-primary-light to-accent py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              ¿Necesitas ayuda para elegir?
            </h2>
            <p className="mt-4 text-lg text-white/80">
              Nuestros expertos están listos para asesorarte en tu próximo
              proyecto. Contáctanos para una cotización personalizada.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/cotizar"
                className="inline-flex items-center rounded-full bg-secondary px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-secondary-dark hover:shadow-xl"
              >
                Solicitar cotización
              </Link>
              <a
                href="tel:8001237742"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/50 px-8 py-3.5 text-sm font-bold text-white transition-all hover:border-white hover:bg-white/10"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
                800 123 7742
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
