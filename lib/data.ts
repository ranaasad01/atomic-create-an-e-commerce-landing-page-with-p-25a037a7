export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "#products" },
  { label: "Categories", href: "#categories" },
  { label: "Sale", href: "#sale" },
  { label: "Newsletter", href: "#newsletter" },
];

export const navCTA = {
  label: "Shop Now",
  href: "#products",
};

export const APP_NAME = "NovaThreads";
export const APP_TAGLINE = "Bold fashion for people who move fast.";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  isSale: boolean;
  rating: number;
  reviewCount: number;
  description: string;
  image: string;
  category: string;
}

export const CATEGORIES = [
  "All",
  "Tops & Tees",
  "Outerwear",
  "Bottoms",
  "Footwear",
  "Accessories",
  "Sale",
] as const;

export type Category = (typeof CATEGORIES)[number];