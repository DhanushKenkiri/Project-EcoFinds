export interface User {
  id: string;
  username: string;
  email: string;
  walletAddress?: string;
  avatar?: string;
  createdAt: string;
}

export enum ProductCategory {
  FASHION = "Fashion",
  ELECTRONICS = "Electronics",
  HOME = "Home & Garden",
  SPORTS = "Sports & Outdoors",
  TOYS = "Toys & Games",
  BOOKS = "Books & Media",
  BEAUTY = "Beauty & Health",
  AUTOMOTIVE = "Automotive",
  OTHER = "Other"
}

export enum ProductCondition {
  NEW = "New (Unused)",
  LIKE_NEW = "Like New",
  VERY_GOOD = "Very Good",
  GOOD = "Good",
  FAIR = "Fair"
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number; // Original price before discount
  images: string[];
  category: ProductCategory;
  condition: ProductCondition;
  sellerId: string;
  sellerName: string;
  location: string;
  createdAt: Date;
  tokenId?: string; // Blockchain token ID if applicable
  verified: boolean;
  views: number; // Adding views property to Product interface
  likes: number; // Number of times this product has been liked
  name: string; // Adding name property to Product interface that maps to title
  image: string; // Adding image property that maps to the first image in images array
  rating?: number; // Product rating (0-5)
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: "pending" | "completed" | "cancelled";
  paymentMethod: "credit_card" | "crypto" | "bank_transfer";
  createdAt: Date;
}

export interface BlockchainTransaction {
  txHash: string;
  from: string;
  to: string;
  tokenId: string;
  timestamp: Date;
  status: "pending" | "confirmed" | "failed";
}
