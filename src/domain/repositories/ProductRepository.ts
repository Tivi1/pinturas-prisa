import type { Product, ProductCategory, ProductCategoryInfo } from "../entities";

export interface ProductRepository {
  getAll(): Promise<Product[]>;
  getByCategory(category: ProductCategory): Promise<Product[]>;
  getBySlug(slug: string): Promise<Product | null>;
  getCategories(): Promise<ProductCategoryInfo[]>;
}
