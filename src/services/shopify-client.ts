import axios from 'axios';

// In a real implementation, you would use the Shopify SDK
// This is a simplified implementation for the demo
export const shopifyClient = {
  product: {
    fetchQuery: async (options: any) => {
      try {
        // In a real implementation, this would call your Shopify store
        const response = await axios.get('/api/shopify/products', {
          params: options
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching Shopify products:', error);
        return { products: [] };
      }
    }
  }
};

export async function fetchShopifyProducts(query = '') {
  try {
    return await shopifyClient.product.fetchQuery({
      query: query,
      sortKey: 'BEST_SELLING',
      first: 20
    });
  } catch (error) {
    console.error('Error fetching Shopify products:', error);
    return { products: [] };
  }
}

// For local development/demo purposes only - mocked response
export async function mockFetchShopifyProducts(query = '') {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 900));
  
  return {
    products: Array(6).fill(null).map((_, i) => ({
      id: `shopify-${i}`,
      title: query ? `Shopify ${query} - Item ${i+1}` : `Featured Eco Product ${i+1}`,
      price: { amount: (24.99 + i * 15).toFixed(2), currencyCode: 'USD' },
      images: {
        edges: [{
          node: {
            originalSrc: `https://picsum.photos/500/500?random=${i+40}`
          }
        }]
      },
      source: 'shopify'
    }))
  };
} 