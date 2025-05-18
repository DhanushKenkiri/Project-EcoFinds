import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { mockSearchAmazonProducts } from '@/services/amazon-api';
import { mockSearchFlipkartProducts } from '@/services/flipkart-api';
import { mockSearchGoogleProducts } from '@/services/google-api';
import { mockFetchShopifyProducts } from '@/services/shopify-client';
import { speechToText, recognizeProductImage } from '@/services/groq-ai';
import { Mic, Camera, Search, X } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';

interface Product {
  id: string;
  title: string;
  price: number | string | { amount: string; currencyCode: string };
  description?: string;
  image?: string;
  images?: any[];
  source?: string;
  views?: number;
  likes?: number;
  verified?: boolean;
  condition?: string;
  category?: string;
  createdAt?: string;
}

export default function EnhancedSearch() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState('internal');
  const [isSearching, setIsSearching] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recognizedTags, setRecognizedTags] = useState<string[]>([]);
  
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsSearching(true);
    setSearchResults([]);
    
    try {
      let results: Product[] = [];
      
      switch (activeTab) {
        case 'amazon':
          const amazonData = await mockSearchAmazonProducts(query);
          results = amazonData.items.map((item: any) => ({
            id: item.id,
            title: item.title,
            price: item.price,
            image: item.image,
            source: 'amazon',
            views: Math.floor(Math.random() * 1000),
            likes: Math.floor(Math.random() * 100),
            createdAt: new Date().toISOString(),
            category: 'Electronics',
            condition: 'New'
          }));
          break;
        case 'flipkart':
          const flipkartData = await mockSearchFlipkartProducts(query);
          results = flipkartData.products.map((item: any) => ({
            id: item.id,
            title: item.title,
            price: item.price,
            image: item.image,
            source: 'flipkart',
            views: Math.floor(Math.random() * 1000),
            likes: Math.floor(Math.random() * 100),
            createdAt: new Date().toISOString(),
            category: 'Home',
            condition: 'New'
          }));
          break;
        case 'google':
          const googleData = await mockSearchGoogleProducts(query);
          results = googleData.items.map((item: any) => ({
            id: item.id,
            title: item.title,
            price: (19.99 + Math.random() * 50).toFixed(2),
            description: item.snippet,
            image: item.image,
            source: 'google',
            views: Math.floor(Math.random() * 1000),
            likes: Math.floor(Math.random() * 100),
            createdAt: new Date().toISOString(),
            category: 'Various',
            condition: 'Used'
          }));
          break;
        case 'shopify':
          const shopifyData = await mockFetchShopifyProducts(query);
          results = shopifyData.products.map((item: any) => ({
            id: item.id,
            title: item.title,
            price: parseFloat(item.price.amount),
            image: item.images.edges[0]?.node.originalSrc,
            source: 'shopify',
            views: Math.floor(Math.random() * 1000),
            likes: Math.floor(Math.random() * 100),
            verified: true,
            createdAt: new Date().toISOString(),
            category: 'Fashion',
            condition: 'New'
          }));
          break;
        default:
          // Internal search logic - using a mix of mock data for demo
          const internalData = await mockFetchShopifyProducts(query);
          results = internalData.products.map((item: any) => ({
            id: item.id,
            title: item.title,
            price: parseFloat(item.price.amount),
            image: item.images.edges[0]?.node.originalSrc,
            verified: Math.random() > 0.5,
            views: Math.floor(Math.random() * 1000),
            likes: Math.floor(Math.random() * 100),
            createdAt: new Date().toISOString(),
            category: Math.random() > 0.5 ? 'Fashion' : 'Home',
            condition: Math.random() > 0.7 ? 'New' : 'Like New'
          }));
      }
      
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };
  
  const handleVoiceSearch = async () => {
    setIsRecording(true);
    
    try {
      // Simulating voice recording with Groq AI integration
      setTimeout(async () => {
        // In a real implementation, we'd use the Web Audio API to record audio
        const audioBlob = new Blob([], { type: 'audio/webm' });
        const transcription = await speechToText(audioBlob);
        
        if (transcription.text) {
          setQuery(transcription.text);
          // Auto search after speech recognition
          setTimeout(() => {
            const formEvent = new Event('submit') as unknown as React.FormEvent;
            handleSearch(formEvent);
          }, 500);
        }
        setIsRecording(false);
      }, 1500);
    } catch (error) {
      console.error('Voice search error:', error);
      setIsRecording(false);
    }
  };
  
  const handleImageSearch = async () => {
    // Simulating image selection
    // In a real implementation, we'd use a file input
    setTimeout(async () => {
      try {
        // Mock image blob
        const imageBlob = new Blob([], { type: 'image/jpeg' });
        const imageAnalysis = await recognizeProductImage(imageBlob);
        
        if (imageAnalysis.description) {
          setQuery(imageAnalysis.description);
          setRecognizedTags(imageAnalysis.tags);
          
          // Auto search after image recognition
          setTimeout(() => {
            const formEvent = new Event('submit') as unknown as React.FormEvent;
            handleSearch(formEvent);
          }, 500);
        }
      } catch (error) {
        console.error('Image recognition error:', error);
      }
    }, 1500);
  };
  
  const clearTagSearch = () => {
    setRecognizedTags([]);
  };
  
  return (
    <div className="glass-effect p-4 rounded-xl mb-8">
      <form onSubmit={handleSearch} className="flex flex-wrap gap-2 mb-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search eco-friendly products..."
            className="pl-10 bg-background/50 backdrop-blur-sm focus:ring-2 focus:ring-primary/50"
          />
        </div>
        
        <Button 
          type="button" 
          variant="outline"
          onClick={handleVoiceSearch}
          className={`${isRecording ? 'animate-pulse bg-red-500/20 border-red-500/50' : ''}`}
        >
          <Mic className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Voice</span>
        </Button>
        
        <Button 
          type="button" 
          variant="outline"
          onClick={handleImageSearch}
        >
          <Camera className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Image</span>
        </Button>
        
        <Button type="submit" className="btn-animated bg-primary" disabled={isSearching}>
          {isSearching ? 'Searching...' : 'Search'}
        </Button>
      </form>
      
      {recognizedTags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          <span className="text-xs text-muted-foreground">Recognized tags:</span>
          {recognizedTags.map(tag => (
            <Badge 
              key={tag} 
              className="bg-secondary/20 text-secondary text-xs"
              onClick={() => setQuery(tag)}
            >
              {tag}
            </Badge>
          ))}
          <Badge 
            className="bg-muted/30 text-muted-foreground text-xs cursor-pointer"
            onClick={clearTagSearch}
          >
            <X className="h-3 w-3" />
          </Badge>
        </div>
      )}
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
        <TabsList className="mb-4 bg-card/50">
          <TabsTrigger value="internal" className="data-[state=active]:bg-primary">EcoFinds</TabsTrigger>
          <TabsTrigger value="amazon" className="data-[state=active]:bg-primary">Amazon</TabsTrigger>
          <TabsTrigger value="flipkart" className="data-[state=active]:bg-primary">Flipkart</TabsTrigger>
          <TabsTrigger value="shopify" className="data-[state=active]:bg-primary">Shopify</TabsTrigger>
          <TabsTrigger value="google" className="data-[state=active]:bg-primary">Web</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {isSearching ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array(8).fill(0).map((_, index) => (
            <div key={index} className="bg-card/50 rounded-xl h-64 animate-pulse" />
          ))}
        </div>
      ) : searchResults.length > 0 ? (
        <div className="card-grid">
          {searchResults.map((item, index) => (
            <motion.div
              key={item.id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <ProductCard product={{
                id: item.id,
                title: item.title,
                price: typeof item.price === 'object' ? parseFloat(item.price.amount) : parseFloat(String(item.price)),
                images: [item.image],
                verified: item.verified || false,
                views: item.views || 0,
                likes: item.likes || 0,
                category: item.category || 'Unknown',
                condition: item.condition || 'New',
                description: item.description || '',
                createdAt: item.createdAt || new Date().toISOString(),
              }} />
            </motion.div>
          ))}
        </div>
      ) : query && !isSearching ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No products found matching "{query}"</p>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Start searching for eco-friendly products across multiple platforms</p>
        </div>
      )}
    </div>
  );
} 