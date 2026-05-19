import ArquitectonicoCategoryView from "../ArquitectonicoCategoryView";
import {
  ARQUITECTONICO_PRODUCTS,
  filterArquitectonicoBySection,
} from "../arquitectonico-products";

export const metadata = {
  title: "Selladores y Fondos archivos - Pinturas PRISA",
  description:
    "Selladores y fondos arquitectónicos Pinturas PRISA. Prepara y protege tus superficies antes de pintar.",
};

export default function ArquitectonicoSelladoresYFondosPage() {
  const products = filterArquitectonicoBySection(
    ARQUITECTONICO_PRODUCTS,
    "selladores-y-fondos"
  );

  return (
    <ArquitectonicoCategoryView
      heroEyebrow="CATEGORÍA"
      heroTitle="Selladores y Fondos"
      products={products}
    />
  );
}
