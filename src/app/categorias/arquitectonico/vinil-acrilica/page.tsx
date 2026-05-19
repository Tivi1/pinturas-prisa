import ArquitectonicoCategoryView from "../ArquitectonicoCategoryView";
import {
  ARQUITECTONICO_PRODUCTS,
  filterArquitectonicoBySection,
} from "../arquitectonico-products";

export const metadata = {
  title: "Vinil / Acrílica archivos - Pinturas PRISA",
  description:
    "Pinturas vinil acrílicas arquitectónicas Pinturas PRISA. Calidad y durabilidad para tu proyecto.",
};

export default function ArquitectonicoVinilAcrilicaPage() {
  const products = filterArquitectonicoBySection(
    ARQUITECTONICO_PRODUCTS,
    "vinil-acrilica"
  );

  return (
    <ArquitectonicoCategoryView
      heroEyebrow="CATEGORÍA"
      heroTitle="Vinil / Acrílica"
      products={products}
    />
  );
}
