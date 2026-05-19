import ArquitectonicoCategoryView from "./ArquitectonicoCategoryView";
import { ARQUITECTONICO_PRODUCTS } from "./arquitectonico-products";

export const metadata = {
  title: "Arquitectónico archivos - Pinturas PRISA",
  description:
    "Apodérate del color y dale tu toque personal a cada espacio. Productos arquitectónicos de Pinturas PRISA.",
};

export default function ArquitectonicoPage() {
  return (
    <ArquitectonicoCategoryView
      heroEyebrow="PRODUCTOS"
      heroTitle="Arquitectónico"
      heroLead="Apodérate del color y dale tu toque personal a cada espacio."
      products={ARQUITECTONICO_PRODUCTS}
    />
  );
}
