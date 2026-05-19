import ArquitectonicoCategoryView from "../arquitectonico/ArquitectonicoCategoryView";
import {
  IMPERMEABILIZANTE_PRODUCTS,
  filterImpermeabilizanteBySection,
  type ImpermeabilizanteSectionSlug,
} from "./impermeabilizante-products";

type Props = {
  section: ImpermeabilizanteSectionSlug;
  heroTitle: string;
};

export default function ImpermeabilizanteSubsectionView({
  section,
  heroTitle,
}: Props) {
  const products = filterImpermeabilizanteBySection(
    IMPERMEABILIZANTE_PRODUCTS,
    section
  );

  return (
    <ArquitectonicoCategoryView
      heroEyebrow="CATEGORÍA"
      heroTitle={heroTitle}
      heroTheme="brand"
      products={products}
    />
  );
}
