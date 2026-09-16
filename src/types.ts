export type CategoryType = 
  | 'ready-to-ship'
  | 'stitched'
  | 'unstitched'
  | 'sarees'
  | 'lehengas'
  | 'kurtas'
  | 'contemporary'
  | 'accessories';

export interface ProductVariant {
  id: string;
  size: string; // 'XS' | 'S' | 'M' | 'L' | 'XL' | 'Custom Stitched' | 'Unstitched Fabric'
  color: string;
  colorHex?: string;
  inStock: boolean;
  stockCount?: number;
  sku: string;
}

export interface Product {
  id: string;
  name: string;
  designer: string;
  designerId: string;
  slug: string;
  price: number;
  originalPrice?: number;
  isNewArrival?: boolean;
  isReadyToShip?: boolean;
  isStitched?: boolean;
  isSale?: boolean;
  isFeatured?: boolean;
  styleTab?: 'everyday' | 'festive' | 'occasionwear';
  category: CategoryType;
  subCategory: string;
  shortDescription: string;
  description: string;
  fabricCare: string[];
  shippingDetails: string;
  images: string[];
  variants: ProductVariant[];
  availableSizes: string[];
  availableColors: { name: string; hex: string }[];
  tags: string[];
}

export interface CartItem {
  id: string; // cart item unique ID (productId + size + color)
  productId: string;
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
  unitPrice: number;
}

export interface WishlistItem {
  productId: string;
  addedAt: number;
}

export interface FilterState {
  designers: string[];
  categories: string[];
  priceRange: [number, number];
  sizes: string[];
  colors: string[];
  availabilityOnly: boolean;
  stitchedType: 'all' | 'stitched' | 'unstitched';
}

export type SortOption = 
  | 'featured'
  | 'newest'
  | 'price-asc'
  | 'price-desc'
  | 'name-asc';

export interface DesignerInfo {
  id: string;
  name: string;
  origin: string;
  bio: string;
  image: string;
  productCount: number;
  letter: string;
}

export interface AnnouncementItem {
  id: string;
  text: string;
  link?: string;
  highlight?: string;
}

export interface StyleJournalItem {
  id: string;
  title: string;
  caption: string;
  tag: string;
  image: string;
  relatedProductIds: string[];
  designer: string;
}
