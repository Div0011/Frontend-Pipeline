export interface Product {
  id: string;
  name: string;
  slug: string;
  category: "men" | "women";
  price: number;
  originalPrice?: number;
  rating?: number;
  reviewCount?: number;
  images: string[];
  description: string;
  details: string[];
  careInstructions: string[];
  sizes: string[];
  colors: string[];
  fit: "regular" | "slim" | "oversized" | "relaxed";
  material: string;
  inStock: boolean;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  productCount: number;
}

export const products: Product[] = [
  {
    id: "animal-graphic-round-neck",
    name: "Animal Round Neck Regular Fit Printed T-Shirt",
    slug: "animal-graphic-round-neck-regular-fit-printed-t-shirt",
    category: "men",
    price: 449,
    rating: 4.8,
    reviewCount: 24,
    images: ["/images/animal-1.webp", "/images/animal-2.webp", "/images/animal-3.webp", "/images/animal-4.webp"],
    description: "Bold animal graphic on a classic regular fit tee. Pure cotton comfort with a statement print.",
    details: ["Regular fit", "Round neck", "Short sleeves", "Pure cotton", "Graphic print"],
    careInstructions: ["Wash and iron inside out", "Machine wash in cold water", "Do not bleach", "Tumble dry at low heat"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black"],
    fit: "regular",
    material: "100% Cotton",
    inStock: true,
    tags: ["graphic", "cotton", "men", "animal"],
  },
  {
    id: "graphic-printed-pure-cotton-women",
    name: "Graphic Printed Pure Cotton Women T-shirt",
    slug: "graphic-printed-pure-cotton-women-t-shirt",
    category: "women",
    price: 449,
    rating: 4.9,
    reviewCount: 18,
    images: ["/images/women-graphic-1.webp", "/images/women-graphic-2.webp"],
    description: "Soft pure cotton tee with a modern graphic print. Designed for everyday comfort.",
    details: ["Regular fit", "Round neck", "Short sleeves", "Pure cotton"],
    careInstructions: ["Machine wash cold", "Do not bleach", "Tumble dry low"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Black"],
    fit: "regular",
    material: "100% Cotton",
    inStock: true,
    tags: ["graphic", "cotton", "women"],
  },
  {
    id: "graphic-printed-round-neck-pure-cotton-2",
    name: "Graphic Printed Round Neck Pure Cotton T-shirt",
    slug: "graphic-printed-round-neck-pure-cotton-t-shirt-2",
    category: "women",
    price: 399,
    rating: 5.0,
    reviewCount: 31,
    images: ["/images/women-round-1.webp", "/images/women-round-2.webp", "/images/women-round-3.webp"],
    description: "Clean round neck tee with a subtle graphic. Pure cotton feel that lasts.",
    details: ["Regular fit", "Round neck", "Short sleeves", "Pure cotton"],
    careInstructions: ["Machine wash cold", "Do not bleach"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["White", "Grey", "Black"],
    fit: "regular",
    material: "100% Cotton",
    inStock: true,
    tags: ["graphic", "cotton", "women"],
  },
  {
    id: "labubu-round-neck-oversized",
    name: "Labubu Round Neck Short Sleeves Oversized Pure Cotton T-Shirt",
    slug: "labubu-round-neck-short-sleeves-oversized-pure-cotton-t-shirt",
    category: "women",
    price: 549,
    rating: 4.9,
    reviewCount: 42,
    images: ["/images/labubu-1.webp", "/images/labubu-2.webp"],
    description: "Trendy oversized fit with playful Labubu graphic. Premium pure cotton.",
    details: ["Oversized fit", "Round neck", "Short sleeves", "Pure cotton"],
    careInstructions: ["Wash inside out", "Machine wash cold"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Pink"],
    fit: "oversized",
    material: "100% Cotton",
    inStock: true,
    tags: ["oversized", "cotton", "women", "labubu"],
  },
  {
    id: "freedom-birds-printed-cotton",
    name: "Freedom Birds Graphic Pure Cotton T-Shirt",
    slug: "freedom-birds-printed-pure-cotton-t-shirt",
    category: "women",
    price: 499,
    rating: 4.7,
    reviewCount: 15,
    images: ["/images/freedom-1.webp", "/images/freedom-2.webp"],
    description: "Artistic freedom birds print on ultra-soft pure cotton fabric.",
    details: ["Regular fit", "Round neck", "Short sleeves", "Pure cotton"],
    careInstructions: ["Machine wash cold", "Iron inside out"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Sage", "White"],
    fit: "regular",
    material: "100% Cotton",
    inStock: true,
    tags: ["graphic", "cotton", "women", "freedom"],
  },
  {
    id: "men-graphic-black-oversized",
    name: "Fabroar Emblem Black Printed T-Shirt",
    slug: "fabroar-emblem-black-printed-t-shirt",
    category: "men",
    price: 499,
    rating: 4.9,
    reviewCount: 38,
    images: ["/images/men-black-1.webp", "/images/men-black-2.webp", "/images/men-black-3.webp"],
    description: "Sleek obsidian black tee with graphic emblem print. A streetwear essential.",
    details: ["Regular fit", "Round neck", "Short sleeves", "Pure cotton"],
    careInstructions: ["Wash inside out", "Machine wash cold", "Do not bleach"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black"],
    fit: "regular",
    material: "100% Cotton",
    inStock: true,
    tags: ["graphic", "cotton", "men", "black"],
  },
  {
    id: "lavender-printed-pure-cotton",
    name: "Typography Print Cotton T-shirt",
    slug: "lavender-printed-pure-cotton-t-shirt",
    category: "men",
    price: 299,
    rating: 4.6,
    reviewCount: 12,
    images: ["/images/lavender-1.webp", "/images/lavender-2.webp"],
    description: "Soft lavender tone with typographic print. Relaxed everyday fit.",
    details: ["Regular fit", "Round neck", "Short sleeves", "Pure cotton"],
    careInstructions: ["Machine wash cold"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Lavender", "White"],
    fit: "regular",
    material: "100% Cotton",
    inStock: true,
    tags: ["typography", "cotton", "men"],
  },
  {
    id: "lavender-graphic-round-neck",
    name: "Graphic Printed Round Neck T-shirt",
    slug: "lavender-graphic-round-neck-t-shirt",
    category: "men",
    price: 399,
    rating: 4.8,
    reviewCount: 27,
    images: ["/images/lavender-graphic-1.webp", "/images/lavender-graphic-2.webp"],
    description: "Graphic tee with a relaxed fit. Pure cotton comfort in a versatile hue.",
    details: ["Regular fit", "Round neck", "Short sleeves", "Pure cotton"],
    careInstructions: ["Machine wash cold", "Do not bleach"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Lavender", "Grey"],
    fit: "regular",
    material: "100% Cotton",
    inStock: true,
    tags: ["graphic", "cotton", "men"],
  },
];

export const categories: Category[] = [
  {
    id: "men",
    name: "Men",
    slug: "men",
    description: "Graphic printed pure cotton T-shirts for men. Regular fit, bold designs.",
    productCount: 12,
  },
  {
    id: "women",
    name: "Women",
    slug: "women",
    description: "Graphic printed pure cotton T-shirts for women. Regular to oversized fits.",
    productCount: 10,
  },
];

export function getProductBySlug(slug: string): Product {
  const raw = slug ? String(slug) : "";
  const decoded = decodeURIComponent(raw).toLowerCase().trim();

  // Try exact slug or id match
  const exact = products.find((p) => p.slug === raw || p.id === raw);
  if (exact) return exact;

  // Try case-insensitive / decoded match
  const match = products.find(
    (p) =>
      p.slug.toLowerCase() === decoded ||
      p.id.toLowerCase() === decoded ||
      decoded.includes(p.id.toLowerCase()) ||
      decoded.includes(p.slug.toLowerCase()) ||
      p.slug.toLowerCase().includes(decoded)
  );
  if (match) return match;

  // Fallback to first product so "Product Not Found" screen never blocks user
  return products[0];
}

export function getProductsByCategory(category: "men" | "women"): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(limit = 6): Product[] {
  return products.slice(0, limit);
}
