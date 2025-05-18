import axios from 'axios';

// Amazon Product API requires server-side implementation due to authentication requirements
// This is a simplified client-side placeholder that would communicate with your backend
export async function searchAmazonProducts(query: string, filters = {}) {
  try {
    // In a real implementation, this would call your backend API endpoint
    const response = await axios.get('/api/amazon/search', {
      params: {
        query,
        ...filters
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error searching Amazon products:', error);
    return { items: [] };
  }
}

// For local development/demo purposes only - mocked response
export async function mockSearchAmazonProducts(query: string) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return {
    items: Array(6).fill(null).map((_, i) => ({
      id: `amazon-${i}`,
      title: `Amazon Eco Friendly ${query} - Item ${i+1}`,
      price: (19.99 + i * 10).toFixed(2),
      image: `https://picsum.photos/500/500?random=${i+10}`,
      rating: (3 + Math.random() * 2).toFixed(1),
      source: 'amazon'
    }))
  };
} 