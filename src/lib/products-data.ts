import productsJson from "@/data/products.json";

export interface TileProduct {
  id: string;
  slug: string;
  code: string;
  name: string;
  category: 'Floor Tiles' | 'Wall Tiles';
  size: string;
  subCategory?: string;
  surface?: string;
  finish: string;
  concept: string;
  widthCm?: number;
  heightCm?: number;
  aspectRatio?: string;
  aspectLabel?: string;
  relativeScale?: number;
  image: string;
  featured: boolean;
  isNew: boolean;
  inVisualizer: boolean;
  specs: {
    dimensions?: string;
    thickness: string;
    waterAbsorption: string;
    sqmPerBox: string;
    piecesPerBox: string;
    weightPerBox: string;
  };
}

export const PRODUCTS_CATALOG: TileProduct[] = productsJson as TileProduct[];

export const SIZES = [
  "All Sizes",
  "80x80 cm",
  "60x60 cm",
  "60x120 cm",
  "40x40 cm",
  "30x50 cm",
  "30x45 cm",
  "30x60 cm",
  "30x30 cm",
  "25x40 cm",
  "20x30 cm"
] as const;

export const FINISHES = [
  "All Finishes",
  "Anti-Slip Stair Vitrified",
  "Candy Glaze Luster",
  "Digital Porcelain",
  "Double Charge Vitrified",
  "Glossy Punch Ceramic",
  "High Glossy Porcelain",
  "Matt Ceramic",
  "Mattestic Architectural",
  "Mirror Polished (PGVT)",
  "Plain Punch Ceramic",
  "Rustic Punch Texture",
  "Slim Porcelain"
] as const;
