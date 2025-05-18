import axios from 'axios';

// Google Custom Search API - requires API key in practice
export async function searchGoogleProducts(query: string) {
  try {
    // In a real implementation with environment variables
    // This would normally use your API key
    const response = await axios.get('/api/google/search', {
      params: {
        query: query + ' eco friendly product'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error searching Google products:', error);
    return { items: [] };
  }
}

// For local development/demo purposes only - mocked response
export async function mockSearchGoogleProducts(query: string) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  return {
    items: Array(10).fill(null).map((_, i) => ({
      id: `google-${i}`,
      title: `Web Result: Sustainable ${query} - Item ${i+1}`,
      snippet: `Eco-friendly ${query} made from sustainable materials. Perfect for environmentally conscious consumers.`,
      link: `https://example.com/product-${i}`,
      image: `https://picsum.photos/500/500?random=${i+30}`,
      source: 'google'
    }))
  };
} 