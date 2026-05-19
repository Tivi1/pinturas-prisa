import ArquitectonicoCategoryView from "../arquitectonico/ArquitectonicoCategoryView";
import { IMPERMEABILIZANTE_PRODUCTS } from "./impermeabilizante-products";

export const metadata = {
  title: "Impermeabilizantes archivos - Pinturas PRISA",
  description:
    "Aplicarlos en techos y azoteas es como contar con un seguro de vida para tu hogar o edificio. Impermeabilizantes de Pinturas PRISA.",
};

export default function ImpermeabilizantesPage() {
  return (
    <ArquitectonicoCategoryView
      heroEyebrow="PRODUCTOS"
      heroTitle="Impermeabilizantes"
      heroLead="Aplicarlos en techos y azoteas es como contar con un seguro de vida para tu hogar o edificio."
      heroTheme="brand"
      gridHeading="6 opciones con diferente durabilidad para proteger tu hogar de las lluvias y el calor."
      products={IMPERMEABILIZANTE_PRODUCTS}
      postCalculadora={
        <section
          style={{
            position: "relative",
            padding: "100px 24px",
            textAlign: "center",
            backgroundImage:
              "url(https://prisa.mx/wp-content/uploads/2025/06/Mask-group-2.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            style={{ maxWidth: 700, margin: "0 auto", position: "relative" }}
          >
            <h2
              style={{
                fontSize: 32,
                fontWeight: 800,
                color: "#003366",
                marginBottom: 20,
              }}
            >
              Catálogo de impermeabilizantes
            </h2>
            <p
              style={{
                fontSize: 16,
                fontWeight: 500,
                color: "#333",
                lineHeight: 1.6,
              }}
            >
              Descarga nuestro catálogo enfocado a impermeabilizantes, además
              conoce los complementos perfectos para que tu espacio quede como
              nuevo.
            </p>
          </div>
        </section>
      }
    />
  );
}
