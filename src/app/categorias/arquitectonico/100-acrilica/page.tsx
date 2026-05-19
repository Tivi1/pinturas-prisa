import ArquitectonicoCategoryView from "../ArquitectonicoCategoryView";
import {
  ARQUITECTONICO_PRODUCTS,
  filterArquitectonicoBySection,
} from "../arquitectonico-products";

export const metadata = {
  title: "100% Acrílica archivos - Pinturas PRISA",
  description:
    "Pinturas 100% acrílicas arquitectónicas Pinturas PRISA. Productos para superficies interiores y exteriores.",
};

export default function Arquitectonico100AcrilicaPage() {
  const products = filterArquitectonicoBySection(
    ARQUITECTONICO_PRODUCTS,
    "100-acrilica"
  );

  return (
    <ArquitectonicoCategoryView
      heroEyebrow="CATEGORÍA"
      heroTitle="100% Acrílica"
      products={products}
    />
  );
}
