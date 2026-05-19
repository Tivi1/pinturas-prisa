export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  category: ProductCategory;
  features: string[];
}

export type ProductCategory =
  | "arquitectonico"
  | "industrial"
  | "decorativo"
  | "impermeabilizante"
  | "esmaltes";

export interface ProductCategoryInfo {
  id: ProductCategory;
  name: string;
  description: string;
  imageUrl: string;
  productCount: number;
}
