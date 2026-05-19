import ArquitectonicoCategoryView from "../ArquitectonicoCategoryView";
import {
  ARQUITECTONICO_PRODUCTS,
  filterArquitectonicoBySection,
} from "../arquitectonico-products";

export const metadata = {
  title: "Interior archivos - Pinturas PRISA",
  description:
    "Pinturas arquitectónicas para interiores. Descubre el producto adecuado con Pinturas PRISA.",
};

export default function ArquitectonicoInteriorPage() {
  const products = filterArquitectonicoBySection(
    ARQUITECTONICO_PRODUCTS,
    "interior"
  );

  return (
    <ArquitectonicoCategoryView
      heroEyebrow="CATEGORÍA"
      heroTitle="Interior"
      products={products}
    />
  );
}
