export interface PaintColor {
  id: string;
  name: string;
  hex: string;
  family: ColorFamily;
  code: string;
}

export type ColorFamily =
  | "rojos"
  | "azules"
  | "verdes"
  | "amarillos"
  | "neutros"
  | "pasteles"
  | "tierra";
