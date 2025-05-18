import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import CategoryFilter from '@/components/CategoryFilter';
import EmptyState from '@/components/EmptyState';
import { useProducts } from '@/context/ProductContext';
import { ProductCategory } from '@/types';
import { Search, Filter, Grid, TrendingUp, ChevronDown, ShoppingCart, Heart, Clock, LayoutList } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Verified First', value: 'verified' },
];

const Explore = () => {
  const location = useLocation();
  const { products, filterProductsByCategory, searchProducts } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const initialSearchQuery = searchParams.get('search') || '';
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState('newest');
  const [displayedProducts, setDisplayedProducts] = useState(products);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const tabs = [
    { id: 'all', label: 'All', icon: <Grid className="h-4 w-4" /> },
    { id: 'trending', label: 'Trending', icon: <TrendingUp className="h-4 w-4" /> },
    { id: 'new', label: 'Newest', icon: <Clock className="h-4 w-4" /> },
    { id: 'verified', label: 'Verified', icon: <Heart className="h-4 w-4" /> },
    { id: 'bestselling', label: 'Best Selling', icon: <ShoppingCart className="h-4 w-4" /> },
  ];
  
  useEffect(() => {
    // Apply search if query exists
    let filtered = products;
    
    if (searchQuery) {
      filtered = searchProducts(searchQuery);
    }
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Apply tab filter
    if (activeTab === 'trending') {
      filtered = [...filtered].sort((a, b) => b.views - a.views);
    } else if (activeTab === 'new') {
      filtered = [...filtered].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (activeTab === 'verified') {
      filtered = filtered.filter(product => product.verified);
    } else if (activeTab === 'bestselling') {
      // Placeholder for bestselling logic - could be based on sales data
      filtered = [...filtered].sort(() => Math.random() - 0.5);
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'newest':
        filtered = [...filtered].sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'price_asc':
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case 'verified':
        filtered = [...filtered].sort((a, b) => 
          Number(b.verified) - Number(a.verified)
        );
        break;
      default:
        break;
    }
    
    setDisplayedProducts(filtered);
  }, [products, searchQuery, selectedCategory, sortBy, activeTab]);
  
  // Set initial search from URL params
  useEffect(() => {
    if (initialSearchQuery) {
      setSearchQuery(initialSearchQuery);
    }
  }, [initialSearchQuery]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ search: searchQuery });
  };
  
  return (
    <div className="bg-white min-h-screen">
      {/* Modern Marketplace Header Tabs */}
      <div className="border-b border-gray-200 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="marketplace-tabs overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`marketplace-tab flex items-center gap-2 ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
          <form onSubmit={handleSearch} className="flex w-full">
            <Input
              type="text"
              placeholder="Search products..."
              className="rounded-r-none border-r-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" className="rounded-l-none bg-blue-600 hover:bg-blue-700">
              <Search className="h-4 w-4 mr-2" /> Search
            </Button>
          </form>
          
          <div className="hidden md:flex items-center gap-3 ml-auto">
            <Button
              variant="ghost"
              size="icon"
              className={`${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`${viewMode === 'list' ? 'bg-gray-100' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <LayoutList className="h-5 w-5" />
            </Button>
            <Select
              value={sortBy}
              onValueChange={setSortBy}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort By" />
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
              className="flex items-center gap-2"
              onClick={() => setFiltersOpen(!filtersOpen)}
            >
              <Filter className="h-4 w-4" />
              Filters
              <ChevronDown className={`h-4 w-4 transition-transform ${filtersOpen ? 'rotate-180' : ''}`} />
            </Button>
          </div>
        </div>
        
        {/* Mobile sort & filter buttons */}
        <div className="flex md:hidden gap-2 mb-6">
          <Select
            value={sortBy}
            onValueChange={setSortBy}
          >
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Sort By" />
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
            className="flex items-center gap-2"
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
        
        {/* Filters Section */}
        {filtersOpen && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-medium mb-3">Category Filter</h3>
            <CategoryFilter
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              className="category-filters"
            />
          </div>
        )}
        
        {/* Results Summary */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-1">
            {searchQuery ? `Results for "${searchQuery}"` : 'All Products'}
          </h2>
          <p className="text-gray-500">Showing {displayedProducts.length} items</p>
        </div>

        {/* Advertisement Banner */}
        <div className="ad-banner mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 p-6 text-white">
                <h2 className="text-xl font-bold mb-2">Special Offer</h2>
                <p className="mb-4">Get free shipping on all verified products until the end of the month!</p>
                <Button size="sm" className="bg-white text-blue-600 hover:bg-gray-100">
                  Shop Now
                </Button>
              </div>
              <div className="md:w-1/3 p-6">
                <img 
                  src="/banner-offer.jpg" 
                  alt="Special Offer" 
                  className="w-full h-auto rounded-lg"
                  onError={(e) => {(e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200'}}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Products Grid */}
        {displayedProducts.length > 0 ? (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            : "flex flex-col gap-4"
          }>
            {displayedProducts.map(product => (
              <div key={product.id} className={viewMode === 'list' ? "w-full" : ""}>
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  className={viewMode === 'list' ? "!flex flex-row h-40" : ""} 
                />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState 
            icon={
              <Search className="h-10 w-10 text-muted-foreground" />
            }
            title="No products found"
            description="Try changing your search query or category filter."
            actionLabel="Clear Filters"
            actionOnClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSearchParams({});
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Explore;
