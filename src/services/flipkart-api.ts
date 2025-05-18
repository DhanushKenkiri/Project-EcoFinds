import axios from 'axios';

// Flipkart API requires server-side implementation due to authentication requirements
// This is a simplified client-side placeholder that would communicate with your backend
export async function searchFlipkartProducts(query: string) {
  try {
    // In a real implementation, this would call your backend API endpoint
    const response = await axios.get('/api/flipkart/search', {
      params: {
        query
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error searching Flipkart products:', error);
    return { products: [] };
  }
}

// For local development/demo purposes only - mocked response
export async function mockSearchFlipkartProducts(query: string) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    products: Array(6).fill(null).map((_, i) => ({
      id: `flipkart-${i}`,
      title: `Flipkart Eco Friendly ${query} - Item ${i+1}`,
      price: (999 + i * 500),
      image: `https://picsum.photos/500/500?random=${i+20}`,
      rating: (3 + Math.random() * 2).toFixed(1),
      source: 'flipkart'
    }))
  };
} 