import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductCard from '@/components/ProductCard';
import EmptyState from '@/components/EmptyState';
import { useProducts } from '@/context/ProductContext';
import { ProductCategory, ProductCondition } from '@/types';
import { Search, SlidersHorizontal, X, ChevronDown, Flame, Sparkles, Filter, ArrowUpDown } from 'lucide-react';
import { motion } from 'framer-motion';

// Sort options
const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Most Viewed', value: 'views' },
  { label: 'Most Popular', value: 'popular' },
];

const Explore = () => {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // State for filters
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>(
    (searchParams.get('category') as ProductCategory) || 'all'
  );
  const [selectedCondition, setSelectedCondition] = useState<ProductCondition | 'all'>(
    (searchParams.get('condition') as ProductCondition) || 'all'
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [verifiedOnly, setVerifiedOnly] = useState(searchParams.get('verified') === 'true');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest');
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [viewType, setViewType] = useState('grid');
  const [activeTab, setActiveTab] = useState('all');
  
  // Apply filters and sort
  const filteredProducts = products
    .filter(product => {
      // Search query
      if (searchQuery && !product.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !product.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      
      // Condition filter
      if (selectedCondition !== 'all' && product.condition !== selectedCondition) {
        return false;
      }
      
      // Price range filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }
      
      // Verified filter
      if (verifiedOnly && !product.verified) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price_asc':
          return a.price - b.price;
        case 'price_desc':
          return b.price - a.price;
        case 'views':
          return b.views - a.views;
        case 'popular':
          return (b.views + (b.likes || 0)) - (a.views + (a.likes || 0));
        case 'newest':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  // Category tabs for horizontal scrolling
  const categoryTabs = [
    { id: 'all', name: 'All Categories' },
    ...Object.values(ProductCategory).map(cat => ({ id: cat, name: cat }))
  ];
  
  // Update URL when filters change
  useEffect(() => {
    const params: Record<string, string> = {};
    
    if (searchQuery) params.search = searchQuery;
    if (selectedCategory !== 'all') params.category = selectedCategory;
    if (selectedCondition !== 'all') params.condition = selectedCondition;
    if (verifiedOnly) params.verified = 'true';
    if (sortBy !== 'newest') params.sort = sortBy;
    
    setSearchParams(params);
  }, [searchQuery, selectedCategory, selectedCondition, verifiedOnly, sortBy, setSearchParams]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // URL will be updated by the effect
  };
  
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedCondition('all');
    setPriceRange([0, 1000]);
    setVerifiedOnly(false);
  };
  
  // Handle slider value change
  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value as [number, number]);
  };

  return (
    <div className="bg-background min-h-screen pb-16">
      {/* Tab Navigation */}
      <div className="marketplace-nav sticky top-0 z-30">
        <div className="category-tabs overflow-x-auto gap-1 py-3 px-2">
          {categoryTabs.map((tab) => (
            <button
              key={tab.id}
              className={`category-tab ${selectedCategory === tab.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(tab.id === 'all' ? 'all' : tab.id as ProductCategory)}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters Section */}
        <div className="filter-section flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <form onSubmit={handleSearch} className="flex flex-1 w-full">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                type="text" 
                placeholder="Search items..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background"
              />
            </div>
            <Button type="submit" className="ml-2">Search</Button>
          </form>
          
          <div className="flex items-center gap-3">
            <Select
              value={sortBy}
              onValueChange={setSortBy}
            >
              <SelectTrigger className="w-[180px] bg-background">
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="h-4 w-4" />
                  <span>Sort By</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setIsFiltersVisible(!isFiltersVisible)}
              className="relative"
            >
              <Filter className="h-4 w-4" />
              {Object.values([
                selectedCondition !== 'all',
                verifiedOnly,
                priceRange[0] > 0 || priceRange[1] < 1000
              ]).some(Boolean) && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
              )}
            </Button>
          </div>
        </div>
        
        {/* Advanced Filters */}
        {isFiltersVisible && (
          <motion.div 
            className="bg-card rounded-lg p-5 mt-4 mb-6 border border-border"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Advanced Filters</h3>
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs">
                Clear Filters
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Condition</label>
                <Select
                  value={selectedCondition}
                  onValueChange={(value) => setSelectedCondition(value as ProductCondition | 'all')}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Condition</SelectItem>
                    {Object.values(ProductCondition).map((condition) => (
                      <SelectItem key={condition} value={condition}>
                        {condition}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Price Range: ${priceRange[0]} - ${priceRange[1]}</label>
                <Slider
                  min={0}
                  max={1000}
                  step={10}
                  value={priceRange}
                  onValueChange={handlePriceRangeChange}
                  className="py-4"
                />
              </div>
              
              <div className="flex items-center">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={verifiedOnly}
                    onChange={(e) => setVerifiedOnly(e.target.checked)}
                    className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="ml-2 flex items-center">
                    <Sparkles className="h-4 w-4 text-primary mr-1" />
                    Verified Only
                  </span>
                </label>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Results Count */}
        <div className="flex justify-between items-center mb-6 mt-8">
          <p className="text-muted-foreground">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'} found
          </p>
          
          <div className="flex items-center gap-2">
            {searchQuery && (
              <Badge 
                className="flex items-center gap-1 bg-primary/20 text-primary hover:bg-primary/30 cursor-pointer"
                onClick={() => setSearchQuery('')}
              >
                Search: {searchQuery}
                <X className="h-3 w-3" />
              </Badge>
            )}
            
            {selectedCategory !== 'all' && (
              <Badge
                className="flex items-center gap-1 bg-secondary/20 text-secondary hover:bg-secondary/30 cursor-pointer"
                onClick={() => setSelectedCategory('all')}
              >
                {selectedCategory}
                <X className="h-3 w-3" />
              </Badge>
            )}
          </div>
        </div>
        
        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="card-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No products found"
            description="Try changing your search criteria or check back later for new items."
            action={
              <Button onClick={clearFilters}>
                Clear filters
              </Button>
            }
          />
        )}
      </div>
    </div>
  );
};

export default Explore;
