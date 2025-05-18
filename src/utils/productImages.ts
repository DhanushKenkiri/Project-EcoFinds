// Map product IDs to specific image paths
const productImageMap: Record<string, string> = {
  'prod_bamboo_brush': '/images/products/bamboo-toothbrush.jpg',
  'prod_reusable_bags': '/images/products/reusable-bags.jpg',
  'prod_water_bottle': '/images/products/eco-waterbottle.jpg',
  'prod_solar_charger': '/images/products/solar-charger.jpg',
  'prod_bamboo_cutlery': '/images/products/bamboo-cutlery.jpg',
  'prod_eco_plant': 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600',
  'prod_compost_bin': 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600',
  'prod_beeswax_wraps': 'https://images.unsplash.com/photo-1597348989645-46b190ce4918?w=600',
  'prod_recycled_notebook': 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600',
  'prod_eco_cleaning': 'https://images.unsplash.com/photo-1550963295-019d8a8a61c5?w=600',
  'prod_biodegradable_phone': 'https://images.unsplash.com/photo-1570101945621-945409a6370f?w=600'
};

// Fallback images for categories
const categoryImageMap: Record<string, string> = {
  'kitchen': 'https://images.unsplash.com/photo-1566454419290-57a64afe30ac?w=600',
  'bathroom': 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600',
  'garden': 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600',
  'electronics': 'https://images.unsplash.com/photo-1640099227100-8e3621fbdaaa?w=600',
  'fashion': 'https://images.unsplash.com/photo-1572196284554-4e321b0e7e0b?w=600',
  'home': 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600',
  'office': 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600'
};

/**
 * Get product image by product ID
 * @param productId - The product ID
 * @param fallbackImage - Optional fallback image if product ID not found
 * @returns The image path
 */
export const getProductImage = (productId: string, fallbackImage: string = '/placeholder.svg'): string => {
  return productImageMap[productId] || fallbackImage;
};

/**
 * Get product image by category
 * @param category - The product category
 * @param fallbackImage - Optional fallback image if category not found
 * @returns The image path
 */
export const getCategoryImage = (category: string, fallbackImage: string = '/placeholder.svg'): string => {
  const normalizedCategory = category.toLowerCase();
  return categoryImageMap[normalizedCategory] || fallbackImage;
};

/**
 * Get multiple product images by product ID
 * @param productId - The product ID
 * @param count - Number of images to return
 * @returns Array of image paths
 */
export const getMultipleProductImages = (productId: string, count: number = 4): string[] => {
  const mainImage = getProductImage(productId);
  
  // If we have a main image for this product, make it the first in the array
  // and fill the rest with category images or placeholders
  const result = [mainImage];
  
  // Add some variation 
  const categoryImagesArray = Object.values(categoryImageMap);
  
  for (let i = 1; i < count; i++) {
    // Add some variety by cycling through category images
    result.push(categoryImagesArray[i % categoryImagesArray.length]);
  }
  
  return result;
};

export default {
  getProductImage,
  getCategoryImage,
  getMultipleProductImages
}; 