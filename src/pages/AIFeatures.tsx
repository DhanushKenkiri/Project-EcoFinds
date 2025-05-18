import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Grid2X2, Zap, MessageSquare, Camera, Mic, Search, Sparkles, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VoiceSearch from '@/components/VoiceSearch';
import ImageRecognition from '@/components/ImageRecognition';
import EnhancedSearch from '@/components/EnhancedSearch';

export default function AIFeatures() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleVoiceTranscription = (text: string) => {
    setSearchQuery(text);
  };
  
  const handleImageRecognition = (description: string) => {
    setSearchQuery(description);
  };
  
  return (
    <div className="container py-8">
      <div className="flex flex-col items-center mb-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mb-4 mx-auto">
            <Sparkles className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Eco AI Assistant</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover eco-friendly products using our advanced AI-powered search and recognition tools
          </p>
        </motion.div>
      </div>
      
      <motion.div 
        className="grid md:grid-cols-3 gap-6 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="feature-card bg-card/50 p-6 rounded-xl border border-border hover:border-primary/50 transition-colors">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
            <Mic className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">Voice Search</h3>
          <p className="text-muted-foreground mb-4">
            Speak your query and let our AI find eco-friendly products for you
          </p>
          <div className="text-sm text-primary">Powered by Groq AI</div>
        </div>
        
        <div className="feature-card bg-card/50 p-6 rounded-xl border border-border hover:border-primary/50 transition-colors">
          <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
            <Camera className="h-6 w-6 text-secondary" />
          </div>
          <h3 className="text-xl font-bold mb-2">Image Recognition</h3>
          <p className="text-muted-foreground mb-4">
            Take a photo of any item to find similar eco-friendly alternatives
          </p>
          <div className="text-sm text-secondary">Powered by Groq AI</div>
        </div>
        
        <div className="feature-card bg-card/50 p-6 rounded-xl border border-border hover:border-primary/50 transition-colors">
          <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
            <Grid2X2 className="h-6 w-6 text-accent" />
          </div>
          <h3 className="text-xl font-bold mb-2">Multi-Platform Search</h3>
          <p className="text-muted-foreground mb-4">
            Search across multiple marketplaces to find the best eco products
          </p>
          <div className="text-sm text-accent">Amazon, Flipkart, Shopify & more</div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Tabs defaultValue="voice" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="voice" className="data-[state=active]:bg-primary">
              <Mic className="h-4 w-4 mr-2" /> Voice Search
            </TabsTrigger>
            <TabsTrigger value="image" className="data-[state=active]:bg-primary">
              <Camera className="h-4 w-4 mr-2" /> Image Search
            </TabsTrigger>
            <TabsTrigger value="results" className="data-[state=active]:bg-primary">
              <Search className="h-4 w-4 mr-2" /> Results
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="voice" className="mt-0">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex flex-col justify-center">
                <h2 className="text-2xl font-bold mb-4">Search Using Your Voice</h2>
                <p className="text-muted-foreground mb-6">
                  Our advanced voice recognition technology powered by Groq AI allows you to search for products naturally using your voice. Simply speak what you're looking for, and we'll find the most relevant eco-friendly options.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <div>
                      <span className="font-medium">Multi-language support</span>
                      <p className="text-sm text-muted-foreground">Find products in your preferred language</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <div>
                      <span className="font-medium">Natural language processing</span>
                      <p className="text-sm text-muted-foreground">Understands complex queries and preferences</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <VoiceSearch 
                onTranscription={handleVoiceTranscription} 
                onSearch={(query) => setSearchQuery(query)}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="image" className="mt-0">
            <div className="grid md:grid-cols-2 gap-8">
              <ImageRecognition onRecognition={handleImageRecognition} />
              
              <div className="flex flex-col justify-center">
                <h2 className="text-2xl font-bold mb-4">Image-Based Product Search</h2>
                <p className="text-muted-foreground mb-6">
                  Take a photo of any item and our AI will identify it and suggest eco-friendly alternatives. Perfect for finding sustainable replacements for everyday products.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-3 w-3 text-secondary" />
                    </div>
                    <div>
                      <span className="font-medium">Recognizes 1000+ product types</span>
                      <p className="text-sm text-muted-foreground">From household items to accessories</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-3 w-3 text-secondary" />
                    </div>
                    <div>
                      <span className="font-medium">Smart eco recommendations</span>
                      <p className="text-sm text-muted-foreground">Suggests sustainable alternatives for conventional products</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="results" className="mt-0">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Search Results</h2>
              <p className="text-muted-foreground">
                {searchQuery 
                  ? `Showing results for "${searchQuery}"` 
                  : 'Use voice or image search to find eco-friendly products'}
              </p>
            </div>
            
            {searchQuery ? (
              <EnhancedSearch />
            ) : (
              <div className="text-center py-16 bg-card/50 rounded-xl border">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-xl font-medium mb-2">No Search Query</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  Use the voice or image search tabs to find eco-friendly products across multiple platforms
                </p>
                <Button onClick={() => {
                  const element = document.querySelector('[data-state="inactive"][value="voice"]');
                  if (element instanceof HTMLElement) {
                    element.click();
                  }
                }}>
                  <Mic className="h-4 w-4 mr-2" />
                  Try Voice Search
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
} 