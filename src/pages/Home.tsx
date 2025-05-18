import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ProductCard from '@/components/ProductCard';
import { ProductCategory } from '@/types';
import { useProducts } from '@/context/ProductContext';
import { Search, Trophy, Flame as Fire, Zap, Sparkles, Gem, Star, Grid3X3, TriangleAlert, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const { products, filterProductsByCategory } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();
  
  // Filter and sort products for different sections
  const featuredProducts = products
    .filter(product => product.verified)
    .sort((a, b) => b.views - a.views)
    .slice(0, 1);
  
  const verifiedProducts = products
    .filter(product => product.verified)
    .sort((a, b) => b.views - a.views)
    .slice(0, 8);
  
  const newArrivals = [...products]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 8);
  
  const popularItems = [...products]
    .sort((a, b) => (b.views + (b.likes || 0)) - (a.views + (a.likes || 0)))
    .slice(0, 6);
  
  // Category tabs
  const tabs = [
    { id: 'all', name: 'All', icon: <Grid3X3 className="h-4 w-4" /> },
    { id: 'trending', name: 'Trending', icon: <Fire className="h-4 w-4" /> },
    { id: 'verified', name: 'Verified', icon: <Sparkles className="h-4 w-4" /> },
    { id: 'new', name: 'New', icon: <Zap className="h-4 w-4" /> },
    { id: 'popular', name: 'Popular', icon: <Star className="h-4 w-4" /> },
    { id: 'rare', name: 'Rare', icon: <Gem className="h-4 w-4" /> },
    { id: 'limited', name: 'Limited', icon: <TriangleAlert className="h-4 w-4" /> }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/explore?search=${encodeURIComponent(searchQuery)}`);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Tab Navigation */}
      <div className="marketplace-nav sticky top-0 z-30">
        <div className="flex overflow-x-auto gap-6 py-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`marketplace-nav-item flex items-center gap-2 ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Hero Banner */}
      <section className="featured-banner mb-8">
        <img 
          src="https://images.unsplash.com/photo-1591030434469-3d78c7b17820?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
          alt="Featured Collection" 
          className="w-full h-full object-cover"
        />
        <div className="featured-banner-gradient"></div>
        
        <div className="featured-banner-content text-center px-4 md:px-12">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                Discover & Trade <br />Eco-Friendly Items
              </h1>
              <p className="text-lg mb-6 text-white/80">
                Buy and sell certified sustainable products with verified blockchain authentication.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <form onSubmit={handleSearch} className="sm:max-w-md w-full flex">
                  <Input 
                    type="text" 
                    placeholder="Search sustainable items..." 
                    className="rounded-r-none bg-white/10 backdrop-blur-sm border-primary/20 text-white placeholder:text-white/50" 
                    value={searchQuery} 
                    onChange={e => setSearchQuery(e.target.value)} 
                  />
                  <Button type="submit" className="rounded-l-none">
                    <Search className="h-4 w-4 mr-2" /> Search
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      <div className="container px-4 mx-auto pb-16">
        {/* Featured Collection */}
        {featuredProducts.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-bold">Featured Product</h2>
              </div>
              <Link to="/explore?featured=true" className="text-primary hover:text-primary/80">
                View All
              </Link>
            </div>
            
            <div className="mb-8">
              <ProductCard 
                product={featuredProducts[0]} 
                featured={true} 
                className="max-w-3xl mx-auto"
              />
            </div>
          </section>
        )}
        
        {/* Category Showcase */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Browse Categories</h2>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Object.values(ProductCategory).map((category) => (
              <Link 
                key={category}
                to={`/explore?category=${category}`} 
                className="group bg-card hover:bg-card/80 rounded-xl overflow-hidden transition-colors"
              >
                <div className="aspect-square flex flex-col items-center justify-center p-6 text-center">
                  {getCategoryIcon(category)}
                  <span className="mt-3 font-medium text-sm">{category}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
        
        {/* Special Offer Banner */}
        <section className="mb-16">
          <div className="banner-gradient-primary rounded-xl overflow-hidden">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 p-8 text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Limited Time Offer</h2>
                <p className="mb-4 text-white/80">Get 15% off on all verified sustainable products this week only!</p>
                <Button variant="secondary" size="lg">
                  Shop Now
                </Button>
              </div>
              <div className="md:w-1/3 p-4">
                <img 
                  src="/banner-offer.svg" 
                  alt="Special Offer" 
                  className="w-full h-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://via.placeholder.com/400x200?text=Special+Offer";
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      
        {/* Verified Products */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Verified Products</h2>
            </div>
            <Link to="/explore?verified=true" className="text-primary hover:text-primary/80">
              View All
            </Link>
          </div>
          
          <div className="card-grid">
            {verifiedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
        
        {/* New Arrivals */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">New Arrivals</h2>
            </div>
            <Link to="/explore?sort=newest" className="text-primary hover:text-primary/80">
              View All
            </Link>
          </div>
          
          <div className="card-grid">
            {newArrivals.slice(0, 6).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
        
        {/* Popular Items */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Fire className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Popular Items</h2>
            </div>
            <Link to="/explore?sort=popular" className="text-primary hover:text-primary/80">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {popularItems.map(product => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="flex items-center gap-4 p-3 rounded-lg bg-card hover:bg-muted transition-colors"
              >
                <img 
                  src={product.image || product.images[0]} 
                  alt={product.name || product.title} 
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">
                    {product.name || product.title}
                  </h3>
                  <p className="text-primary font-bold">${product.price.toFixed(2)}</p>
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5" />
                  {product.views}
                </div>
              </Link>
            ))}
          </div>
        </section>
        
        {/* Join Community Banner */}
        <section>
          <div className="banner-gradient-secondary rounded-xl overflow-hidden">
            <div className="p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Join Our Eco-Friendly Community</h2>
              <p className="text-lg mb-8 max-w-xl mx-auto text-white/90">
                Create an account to start buying and selling sustainable items today.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/signup">
                  <Button size="lg" variant="default">
                    Sign Up Now
                  </Button>
                </Link>
                <Link to="/explore">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Explore Marketplace
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

// Helper function to get category icons
const getCategoryIcon = (category: ProductCategory) => {
  switch(category) {
    case ProductCategory.FASHION:
      return <div className="w-14 h-14 rounded-full bg-purple-500/20 text-purple-500 flex items-center justify-center"><span className="text-xl">👕</span></div>;
    case ProductCategory.ELECTRONICS:
      return <div className="w-14 h-14 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center"><span className="text-xl">📱</span></div>;
    case ProductCategory.HOME:
      return <div className="w-14 h-14 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center"><span className="text-xl">🏠</span></div>;
    case ProductCategory.SPORTS:
      return <div className="w-14 h-14 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center"><span className="text-xl">⚽</span></div>;
    case ProductCategory.TOYS:
      return <div className="w-14 h-14 rounded-full bg-yellow-500/20 text-yellow-500 flex items-center justify-center"><span className="text-xl">🧸</span></div>;
    case ProductCategory.BOOKS:
      return <div className="w-14 h-14 rounded-full bg-indigo-500/20 text-indigo-500 flex items-center justify-center"><span className="text-xl">📚</span></div>;
    case ProductCategory.BEAUTY:
      return <div className="w-14 h-14 rounded-full bg-pink-500/20 text-pink-500 flex items-center justify-center"><span className="text-xl">💄</span></div>;
    case ProductCategory.AUTOMOTIVE:
      return <div className="w-14 h-14 rounded-full bg-gray-500/20 text-gray-500 flex items-center justify-center"><span className="text-xl">🚗</span></div>;
    default:
      return <div className="w-14 h-14 rounded-full bg-gray-500/20 text-gray-500 flex items-center justify-center"><span className="text-xl">📦</span></div>;
  }
};

export default Home;