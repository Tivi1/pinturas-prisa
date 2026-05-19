import ArquitectonicoCategoryView from "../ArquitectonicoCategoryView";
import {
  ARQUITECTONICO_PRODUCTS,
  filterArquitectonicoBySection,
} from "../arquitectonico-products";

export const metadata = {
  title: "Exterior archivos - Pinturas PRISA",
  description:
    "Pinturas arquitectónicas para exteriores. Descubre el producto adecuado con Pinturas PRISA.",
};

export default function ArquitectonicoExteriorPage() {
  const products = filterArquitectonicoBySection(
    ARQUITECTONICO_PRODUCTS,
    "exterior"
  );

  return (
    <ArquitectonicoCategoryView
      heroEyebrow="CATEGORÍA"
      heroTitle="Exterior"
      heroTheme="brand"
      products={products}
    />
  );
}
