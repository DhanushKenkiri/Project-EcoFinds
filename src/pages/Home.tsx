import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ProductCard from '@/components/ProductCard';
import { ProductCategory } from '@/types';
import { useProducts } from '@/context/ProductContext';
import { Search, Trophy, Flame as Fire, Zap, Sparkles, Gem, Star, Grid3X3, TriangleAlert, Eye, Users, PackageOpen, TagsIcon, Leaf, ShieldCheck, BadgePercent } from 'lucide-react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import EnhancedSearch from '@/components/EnhancedSearch';

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
            <motion.button
              key={tab.id}
              className={`marketplace-nav-item flex items-center gap-2 ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.icon}
              <span>{tab.name}</span>
            </motion.button>
          ))}
        </div>
      </div>
      
      {/* Hero Banner */}
      <section className="featured-banner mb-8">
        <div className="relative h-full w-full overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1591030434469-3d78c7b17820?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
            alt="Featured Collection" 
            className="w-full h-full object-cover"
          />
          <div className="featured-banner-gradient"></div>
        
          <motion.div 
            className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 text-glow">
              Discover Eco-Friendly Treasures
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-8">
              Find unique sustainable products from verified sellers worldwide
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="btn-animated bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25"
                onClick={() => navigate('/explore')}
              >
                Explore Marketplace
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="btn-animated bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 text-white"
                onClick={() => navigate('/sell')}
              >
                Sell Your Items
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Featured Stats Section */}
      <section className="py-8 mb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: "Active Users", value: "24,500+", icon: <Users className="h-6 w-6 text-primary" /> },
              { label: "Products Listed", value: "128,900+", icon: <PackageOpen className="h-6 w-6 text-secondary" /> },
              { label: "Categories", value: Object.keys(ProductCategory).length, icon: <TagsIcon className="h-6 w-6 text-accent" /> },
              { label: "Eco Impact", value: "High", icon: <Leaf className="h-6 w-6 text-eco" /> }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="flex flex-col items-center justify-center p-6 glass-effect rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="h-12 w-12 flex items-center justify-center bg-card rounded-full mb-3">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-1 text-glow">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Market Stats */}
      <motion.section
        className="market-stats glass-effect p-6 md:p-8 rounded-xl mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {/* ... existing stats content ... */}
      </motion.section>
      
      {/* Enhanced Multi-Platform Search */}
      <motion.section 
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="section-heading mb-6">
          <h2 className="text-2xl font-bold">Search Across Platforms</h2>
          <p className="text-muted-foreground">
            Find eco-friendly products from multiple marketplaces in one place
          </p>
        </div>
        <EnhancedSearch />
      </motion.section>
      
      <div className="container px-4 mx-auto pb-16">
        {/* Featured Collection */}
        {featuredProducts.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-bold text-glow">Featured Product</h2>
              </div>
              <Link to="/explore?featured=true" className="text-primary hover:text-primary/80 flex items-center gap-1">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ProductCard 
                product={featuredProducts[0]} 
                featured={true} 
                className="max-w-3xl mx-auto"
              />
            </motion.div>
          </section>
        )}
        
        {/* Category Showcase */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold text-glow">Browse Categories</h2>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Object.values(ProductCategory).map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <Link 
                  to={`/explore?category=${category}`} 
                  className="group bg-card hover:bg-card/80 rounded-xl overflow-hidden transition-all duration-300"
                >
                  <div className="aspect-square flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="mb-3"
                    >
                      {getCategoryIcon(category)}
                    </motion.div>
                    <span className="mt-3 font-medium text-sm">{category}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Promo Banner */}
        <motion.section 
          className="mb-16 overflow-hidden rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="banner-gradient-accent p-8 md:p-12 relative overflow-hidden">
            <div className="absolute -right-20 -bottom-20 h-64 w-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute right-1/4 -top-10 h-32 w-32 bg-white/10 rounded-full blur-2xl"></div>
            
            <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
              <div className="flex-1">
                <Badge className="bg-white/20 text-white mb-4">Limited Time</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Join Our Eco-Friendly Marketplace
                </h2>
                <p className="text-white/90 mb-6 max-w-lg">
                  Sign up today to get exclusive access to special offers and connect with eco-conscious buyers and sellers
                </p>
                <Button size="lg" className="bg-white text-accent hover:bg-white/90 btn-animated">
                  Join Now
                </Button>
              </div>
              <div className="flex-shrink-0 hidden md:block">
                <div className="h-48 w-48 rounded-full bg-white/20 flex items-center justify-center">
                  <Leaf className="h-24 w-24 text-white" />
                </div>
              </div>
            </div>
          </div>
        </motion.section>
        
        {/* New Arrivals */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold text-glow">New Arrivals</h2>
            </div>
            <Link to="/explore?sort=newest" className="text-primary hover:text-primary/80 flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="card-grid">
            {newArrivals.slice(0, 6).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Popular Items */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Fire className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold text-glow">Popular Items</h2>
            </div>
            <Link to="/explore?sort=popular" className="text-primary hover:text-primary/80 flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="card-grid">
            {popularItems.slice(0, 6).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-glow mb-4">Why Choose EcoFinds?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our marketplace is designed to connect eco-conscious consumers with sellers who share the same values
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <ShieldCheck className="h-8 w-8 text-eco" />,
                title: "Verified Products",
                description: "All products undergo eco-verification to ensure they meet our sustainability standards"
              },
              {
                icon: <BadgePercent className="h-8 w-8 text-primary" />,
                title: "Exclusive Deals",
                description: "Access to exclusive discounts and promotions on eco-friendly products"
              },
              {
                icon: <Leaf className="h-8 w-8 text-accent" />,
                title: "Eco Impact",
                description: "Track your environmental impact through your purchasing decisions"
              }
            ].map((benefit, index) => (
              <motion.div 
                key={index}
                className="glass-effect p-6 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (index * 0.1), duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <div className="h-14 w-14 rounded-lg bg-card flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* CTA Section */}
        <motion.section 
          className="rounded-2xl overflow-hidden mb-16 glass-effect border border-primary/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="p-8 md:p-12">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-glow mb-4">
                Ready to Start Your Eco Journey?
              </h2>
              <p className="text-muted-foreground mb-8">
                Join thousands of eco-conscious users in our community and make a positive impact
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="btn-primary btn-animated">
                  Sign Up Now
                </Button>
                <Button size="lg" variant="outline" className="btn-animated">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </motion.section>
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