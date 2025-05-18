
import { Product, ProductCategory, ProductCondition, User, Order } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    username: 'eco_enthusiast',
    email: 'eco@example.com',
    walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
    avatar: '/placeholder.svg',
    createdAt: new Date('2023-01-15').toISOString()  // Convert Date to string
  },
  {
    id: '2',
    username: 'green_shopper',
    email: 'green@example.com',
    walletAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
    avatar: '/placeholder.svg',
    createdAt: new Date('2023-02-22').toISOString()  // Convert Date to string
  },
];

// Mock Products
export const mockProducts: Product[] = [
  {
    id: '101',
    title: 'Vintage Leather Jacket',
    name: 'Vintage Leather Jacket', // Added name property matching title
    description: 'Classic leather jacket, gently used. Perfect condition with authentic distressed look.',
    price: 120,
    images: ['/placeholder.svg'],
    image: '/placeholder.svg', // Added image property matching first image
    category: ProductCategory.FASHION,
    condition: ProductCondition.VERY_GOOD,
    sellerId: '1',
    sellerName: 'eco_enthusiast',
    location: 'Portland, OR',
    createdAt: new Date('2023-05-10'),
    tokenId: '0x7890',
    verified: true,
    views: 145 // Added views property
  },
  {
    id: '102',
    title: 'Refurbished MacBook Pro (2019)',
    name: 'Refurbished MacBook Pro (2019)', // Added name property matching title
    description: 'Fully refurbished MacBook Pro. 16GB RAM, 512GB SSD, Intel i7. Comes with charger and protective case.',
    price: 899,
    images: ['/placeholder.svg'],
    image: '/placeholder.svg', // Added image property matching first image
    category: ProductCategory.ELECTRONICS,
    condition: ProductCondition.GOOD,
    sellerId: '2',
    sellerName: 'green_shopper',
    location: 'Seattle, WA',
    createdAt: new Date('2023-06-01'),
    tokenId: '0x7891',
    verified: true,
    views: 320 // Added views property
  },
  {
    id: '103',
    title: 'Handcrafted Ceramic Vase',
    name: 'Handcrafted Ceramic Vase', // Added name property matching title
    description: 'Beautiful handmade ceramic vase. Perfect for flowers or as a standalone decor piece.',
    price: 45,
    images: ['/placeholder.svg'],
    image: '/placeholder.svg', // Added image property matching first image
    category: ProductCategory.HOME,
    condition: ProductCondition.LIKE_NEW,
    sellerId: '1',
    sellerName: 'eco_enthusiast',
    location: 'Portland, OR',
    createdAt: new Date('2023-06-15'),
    tokenId: '0x7892',
    verified: true,
    views: 89 // Added views property
  },
  {
    id: '104',
    title: 'Yoga Mat Set',
    name: 'Yoga Mat Set', // Added name property matching title
    description: 'Complete yoga set including mat, blocks, and strap. Lightly used.',
    price: 35,
    images: ['/placeholder.svg'],
    image: '/placeholder.svg', // Added image property matching first image
    category: ProductCategory.SPORTS,
    condition: ProductCondition.GOOD,
    sellerId: '2',
    sellerName: 'green_shopper',
    location: 'Seattle, WA',
    createdAt: new Date('2023-06-20'),
    tokenId: '0x7893',
    verified: true,
    views: 112 // Added views property
  },
  {
    id: '105',
    title: 'Vintage Board Game Collection',
    name: 'Vintage Board Game Collection', // Added name property matching title
    description: 'Collection of classic board games from the 80s and 90s. All complete with pieces.',
    price: 75,
    images: ['/placeholder.svg'],
    image: '/placeholder.svg', // Added image property matching first image
    category: ProductCategory.TOYS,
    condition: ProductCondition.GOOD,
    sellerId: '1',
    sellerName: 'eco_enthusiast',
    location: 'Portland, OR',
    createdAt: new Date('2023-07-05'),
    tokenId: '0x7894',
    verified: false,
    views: 64 // Added views property
  },
  {
    id: '106',
    title: 'Classic Literature Set',
    name: 'Classic Literature Set', // Added name property matching title
    description: 'Set of 10 hardcover classic novels in excellent condition.',
    price: 60,
    images: ['/placeholder.svg'],
    image: '/placeholder.svg', // Added image property matching first image
    category: ProductCategory.BOOKS,
    condition: ProductCondition.VERY_GOOD,
    sellerId: '2',
    sellerName: 'green_shopper',
    location: 'Seattle, WA',
    createdAt: new Date('2023-07-10'),
    tokenId: '0x7895',
    verified: true,
    views: 98 // Added views property
  },
  {
    id: '107',
    title: 'Natural Skincare Bundle',
    name: 'Natural Skincare Bundle', // Added name property matching title
    description: 'Set of organic skincare products. Most items unused or lightly used.',
    price: 40,
    images: ['/placeholder.svg'],
    image: '/placeholder.svg', // Added image property matching first image
    category: ProductCategory.BEAUTY,
    condition: ProductCondition.LIKE_NEW,
    sellerId: '1',
    sellerName: 'eco_enthusiast',
    location: 'Portland, OR',
    createdAt: new Date('2023-07-20'),
    tokenId: '0x7896',
    verified: true,
    views: 176 // Added views property
  },
  {
    id: '108',
    title: 'Bicycle Tool Kit',
    name: 'Bicycle Tool Kit', // Added name property matching title
    description: 'Complete bike maintenance kit. Professional quality tools.',
    price: 85,
    images: ['/placeholder.svg'],
    image: '/placeholder.svg', // Added image property matching first image
    category: ProductCategory.AUTOMOTIVE,
    condition: ProductCondition.VERY_GOOD,
    sellerId: '2',
    sellerName: 'green_shopper',
    location: 'Seattle, WA',
    createdAt: new Date('2023-08-01'),
    tokenId: '0x7897',
    verified: true,
    views: 132 // Added views property
  }
];

// Mock Orders
export const mockOrders: Order[] = [
  {
    id: '1001',
    userId: '1',
    items: [
      { product: mockProducts[1], quantity: 1 },
      { product: mockProducts[3], quantity: 2 }
    ],
    total: 969,
    status: "completed",
    paymentMethod: "crypto",
    createdAt: new Date('2023-07-15')
  },
  {
    id: '1002',
    userId: '2',
    items: [
      { product: mockProducts[0], quantity: 1 },
      { product: mockProducts[5], quantity: 1 }
    ],
    total: 180,
    status: "completed",
    paymentMethod: "credit_card",
    createdAt: new Date('2023-08-02')
  }
];
