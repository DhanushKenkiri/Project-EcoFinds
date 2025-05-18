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
import { Search, SlidersHorizontal, X, ChevronDown, Flame, Sparkles, Filter, ArrowUpDown, CheckCircle2, ArrowDownAZ, Star, Grid3X3, Grid2X2, ShieldCheck, CircleDollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Sort options
const sortOptions = [
  { label: 'Newest', value: 'newest', icon: <Flame className="h-4 w-4" /> },
  { label: 'Price: Low to High', value: 'price_asc', icon: <ArrowDownAZ className="h-4 w-4" /> },
  { label: 'Price: High to Low', value: 'price_desc', icon: <ArrowUpDown className="h-4 w-4" /> },
  { label: 'Most Viewed', value: 'views', icon: <Star className="h-4 w-4" /> },
  { label: 'Most Popular', value: 'popular', icon: <Sparkles className="h-4 w-4" /> },
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
  const [isLoading, setIsLoading] = useState(true);
  
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
  
  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (searchQuery) params.set('search', searchQuery);
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    if (selectedCondition !== 'all') params.set('condition', selectedCondition);
    if (verifiedOnly) params.set('verified', 'true');
    if (sortBy !== 'newest') params.set('sort', sortBy);
    
    setSearchParams(params);
  }, [searchQuery, selectedCategory, selectedCondition, verifiedOnly, sortBy, setSearchParams]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedCondition('all');
    setPriceRange([0, 1000]);
    setVerifiedOnly(false);
    setSortBy('newest');
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter products based on search query
  };

  // Simulate loading effect
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, selectedCondition, priceRange, verifiedOnly, sortBy]);

  return (
    <div className="bg-background min-h-screen pb-16">
      {/* Tab Navigation */}
      <div className="marketplace-nav sticky top-0 z-30 backdrop-blur-lg">
        <div className="category-tabs overflow-x-auto gap-1 py-3 px-2">
          {categoryTabs.map((tab) => (
            <motion.button
              key={tab.id}
              className={`category-tab ${selectedCategory === tab.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(tab.id === 'all' ? 'all' : tab.id as ProductCategory)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.name}
            </motion.button>
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
                className="pl-10 bg-background/50 backdrop-blur-sm focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <Button type="submit" className="ml-2 btn-animated">Search</Button>
          </form>

          <div className="flex items-center gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[190px] bg-muted/30 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                  <SelectValue placeholder="Sort by" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      {option.icon}
                      <span>{option.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="flex gap-1">
              <Button
                variant={viewType === 'grid' ? 'default' : 'outline'} 
                size="icon"
                onClick={() => setViewType('grid')}
                className="h-10 w-10"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button 
                variant={viewType === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewType('list')}
                className="h-10 w-10"
              >
                <Grid2X2 className="h-4 w-4" />
              </Button>
            </div>

            <Button 
              variant="outline"
              onClick={() => setIsFiltersVisible(!isFiltersVisible)}
              className={`${isFiltersVisible ? 'bg-primary text-white border-primary' : ''} transition-all`}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
              {(selectedCondition !== 'all' || verifiedOnly || priceRange[0] > 0 || priceRange[1] < 1000) && (
                <span className="ml-2 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">
                  {((selectedCondition !== 'all' ? 1 : 0) + 
                    (verifiedOnly ? 1 : 0) + 
                    (priceRange[0] > 0 || priceRange[1] < 1000 ? 1 : 0))}
                </span>
              )}
            </Button>
          </div>
        </div>
        
        {/* Advanced filters */}
        <AnimatePresence>
          {isFiltersVisible && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-4 p-5 rounded-xl bg-card/80 backdrop-blur-md border border-border/50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Condition</label>
                    <Select 
                      value={selectedCondition} 
                      onValueChange={(val) => setSelectedCondition(val as ProductCondition | 'all')}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Conditions</SelectItem>
                        {Object.values(ProductCondition).map(condition => (
                          <SelectItem key={condition} value={condition}>
                            {condition}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Price Range</label>
                    <div className="px-3 pt-6 pb-2 price-slider">
                      <Slider 
                        defaultValue={[0, 1000]}
                        value={priceRange}
                        min={0}
                        max={1000}
                        step={10}
                        onValueChange={(value: number[]) => setPriceRange(value as [number, number])}
                        className="mb-4"
                      />
                      <div className="flex items-center justify-between text-sm">
                        <div className="bg-muted/30 px-2 py-1 rounded">
                          <span className="text-primary font-medium">${priceRange[0]}</span>
                        </div>
                        <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
                        <div className="bg-muted/30 px-2 py-1 rounded">
                          <span className="text-primary font-medium">${priceRange[1]}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <label className="flex items-center cursor-pointer gap-2 p-2 rounded-lg hover:bg-muted/30 transition-colors">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={verifiedOnly}
                          onChange={(e) => setVerifiedOnly(e.target.checked)}
                          className="sr-only"
                        />
                        <div className={`w-11 h-6 bg-muted/50 rounded-full transition-colors ${verifiedOnly ? 'bg-primary' : ''}`}></div>
                        <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${verifiedOnly ? 'translate-x-5' : ''}`}></div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className={`h-4 w-4 ${verifiedOnly ? 'text-primary' : 'text-muted-foreground'}`} />
                        <span className="text-sm font-medium">Verified Only</span>
                      </div>
                    </label>
                  </div>
                </div>
                
                <div className="flex justify-end mt-4">
                  <Button variant="outline" className="mr-2" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                  <Button 
                    onClick={() => setIsFiltersVisible(false)}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Results Count */}
        <div className="flex justify-between items-center mb-6 mt-8">
          {isLoading ? (
            <div className="h-8 w-40 bg-muted/30 animate-pulse rounded"></div>
          ) : (
            <p className="text-muted-foreground">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'} found
            </p>
          )}
          
          <div className="flex items-center gap-2 flex-wrap">
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
            
            {selectedCondition !== 'all' && (
              <Badge
                className="flex items-center gap-1 bg-accent/20 text-accent hover:bg-accent/30 cursor-pointer"
                onClick={() => setSelectedCondition('all')}
              >
                {selectedCondition}
                <X className="h-3 w-3" />
              </Badge>
            )}
            
            {(priceRange[0] > 0 || priceRange[1] < 1000) && (
              <Badge
                className="flex items-center gap-1 bg-eco/20 text-eco hover:bg-eco/30 cursor-pointer"
                onClick={() => setPriceRange([0, 1000])}
              >
                ${priceRange[0]} - ${priceRange[1]}
                <X className="h-3 w-3" />
              </Badge>
            )}
            
            {verifiedOnly && (
              <Badge
                className="flex items-center gap-1 bg-primary/20 text-primary hover:bg-primary/30 cursor-pointer"
                onClick={() => setVerifiedOnly(false)}
              >
                <CheckCircle2 className="h-3 w-3 mr-1" /> Verified Only
                <X className="h-3 w-3" />
              </Badge>
            )}
          </div>
        </div>
        
        {/* Products Grid with Loading State */}
        {isLoading ? (
          <div className={viewType === 'grid' ? 'card-grid' : 'flex flex-col gap-4'}>
            {[...Array(8)].map((_, index) => (
              <div 
                key={index}
                className="bg-card/50 rounded-xl overflow-hidden animate-pulse"
                style={{ height: viewType === 'grid' ? '300px' : '120px' }}
              >
                <div className="bg-muted/30 w-full h-full"></div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className={viewType === 'grid' ? 'card-grid' : 'flex flex-col gap-4'}>
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <ProductCard key={product.id} product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No products found"
            description="Try changing your search criteria or check back later for new items."
            action={
              <Button onClick={clearFilters} className="btn-animated">
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
