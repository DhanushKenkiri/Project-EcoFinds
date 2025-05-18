import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ProductCard from '@/components/ProductCard';
import CategoryFilter from '@/components/CategoryFilter';
import { ProductCategory } from '@/types';
import { useProducts } from '@/context/ProductContext';
import { Search, ChevronRight, Trophy, TrendingUp, Heart, Clock, Flame, Filter, LayoutGrid } from 'lucide-react';

const Home = () => {
  const {
    products,
    filterProductsByCategory
  } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();
  
  const verifiedProducts = products.filter(product => product.verified).slice(0, 8);
  const newArrivals = [...products].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 4);
  const popularItems = [...products].sort((a, b) => b.views - a.views).slice(0, 4);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/explore?search=${encodeURIComponent(searchQuery)}`);
  };

  const categories = [
    { id: 'all', name: 'All', icon: <LayoutGrid className="h-4 w-4" /> },
    { id: 'electronics', name: 'Electronics', icon: <TrendingUp className="h-4 w-4" /> },
    { id: 'clothing', name: 'Clothing', icon: <Heart className="h-4 w-4" /> },
    { id: 'furniture', name: 'Furniture', icon: <Trophy className="h-4 w-4" /> },
    { id: 'books', name: 'Books', icon: <Clock className="h-4 w-4" /> },
    { id: 'sports', name: 'Sports', icon: <Flame className="h-4 w-4" /> }
  ];
  
  return (
    <div className="bg-white">
      {/* Modern Marketplace Header - similar to Panini */}
      <header className="bg-gray-100 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="marketplace-tabs py-2 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`marketplace-tab flex items-center gap-2 ${activeTab === category.id ? 'active' : ''}`}
                onClick={() => setActiveTab(category.id)}
              >
                {category.icon}
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Hero Banner with Search - Modern Style */}
      <section className="relative">
        <div className="relative overflow-hidden h-[360px]">
          <img 
            src="https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
            alt="EcoFinds Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-center justify-center">
            <div className="container mx-auto px-6 text-center">
              <div className="mx-auto max-w-2xl text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  EcoFinds Marketplace
                </h1>
                <p className="text-lg mb-8 max-w-lg mx-auto">
                  Discover verified sustainable second-hand treasures
                </p>
                <form onSubmit={handleSearch} className="flex w-full max-w-md mx-auto">
                  <Input 
                    type="text" 
                    placeholder="Search items..." 
                    className="rounded-r-none bg-white/90 text-gray-800 border-r-0" 
                    value={searchQuery} 
                    onChange={e => setSearchQuery(e.target.value)} 
                  />
                  <Button type="submit" className="rounded-l-none bg-blue-600 hover:bg-blue-700">
                    <Search className="h-4 w-4 mr-2" /> Search
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Cards - inspired by Panini's sport selection */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <Link to="/explore?category=electronics" className="bg-white rounded-lg shadow overflow-hidden text-center hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                <img src="/icons/electronics.svg" alt="Electronics" className="w-16 h-16 object-contain" onError={(e) => {(e.target as HTMLImageElement).src = 'https://via.placeholder.com/150'}} />
              </div>
              <div className="p-3 font-bold text-gray-800 uppercase text-sm">Electronics</div>
            </Link>
            <Link to="/explore?category=clothing" className="bg-white rounded-lg shadow overflow-hidden text-center hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
                <img src="/icons/clothing.svg" alt="Clothing" className="w-16 h-16 object-contain" onError={(e) => {(e.target as HTMLImageElement).src = 'https://via.placeholder.com/150'}} />
              </div>
              <div className="p-3 font-bold text-gray-800 uppercase text-sm">Clothing</div>
            </Link>
            <Link to="/explore?category=furniture" className="bg-white rounded-lg shadow overflow-hidden text-center hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center">
                <img src="/icons/furniture.svg" alt="Furniture" className="w-16 h-16 object-contain" onError={(e) => {(e.target as HTMLImageElement).src = 'https://via.placeholder.com/150'}} />
              </div>
              <div className="p-3 font-bold text-gray-800 uppercase text-sm">Furniture</div>
            </Link>
            <Link to="/explore?category=books" className="bg-white rounded-lg shadow overflow-hidden text-center hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center">
                <img src="/icons/books.svg" alt="Books" className="w-16 h-16 object-contain" onError={(e) => {(e.target as HTMLImageElement).src = 'https://via.placeholder.com/150'}} />
              </div>
              <div className="p-3 font-bold text-gray-800 uppercase text-sm">Books</div>
            </Link>
            <Link to="/explore?category=sports" className="bg-white rounded-lg shadow overflow-hidden text-center hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
                <img src="/icons/sports.svg" alt="Sports" className="w-16 h-16 object-contain" onError={(e) => {(e.target as HTMLImageElement).src = 'https://via.placeholder.com/150'}} />
              </div>
              <div className="p-3 font-bold text-gray-800 uppercase text-sm">Sports</div>
            </Link>
            <Link to="/explore" className="bg-white rounded-lg shadow overflow-hidden text-center hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <Filter className="w-12 h-12 text-gray-400" />
              </div>
              <div className="p-3 font-bold text-gray-800 uppercase text-sm">All Categories</div>
            </Link>
          </div>
        </div>
      </section>

      {/* Advertisement Banner */}
      <section className="py-6 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0 text-white">
              <h2 className="text-2xl font-bold">Limited Time Offer</h2>
              <p className="text-white/90">Get 10% off on verified sustainable products!</p>
            </div>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Shop Now
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products Slider - Inspired by Panini's card display */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <Link to="/explore?featured=true" className="flex items-center text-blue-600 hover:underline">
              <span>View All</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="product-grid">
            {verifiedProducts.slice(0, 4).map(product => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>

      {/* Advertisement Banner - Secondary */}
      <section className="ad-banner">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/3 p-8">
                <img 
                  src="/banner-eco.png" 
                  alt="Eco Friendly Products" 
                  className="w-full h-auto rounded-lg shadow-lg"
                  onError={(e) => {(e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300'}}
                />
              </div>
              <div className="md:w-2/3 p-8 text-white">
                <h2 className="text-3xl font-bold mb-4">Sustainable Shopping Made Simple</h2>
                <p className="mb-6">All products on EcoFinds are verified for authenticity and sustainability. Shop with confidence knowing you're making a positive environmental impact.</p>
                <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals - Grid Layout */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">New Arrivals</h2>
            <Link to="/explore?sort=newest" className="flex items-center text-blue-600 hover:underline">
              <span>View All</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="product-grid">
            {newArrivals.map(product => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>
      
      {/* Popular Items - Horizontal Scroll */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Popular Items</h2>
            <Link to="/explore?sort=popular" className="flex items-center text-blue-600 hover:underline">
              <span>View All</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="flex overflow-x-auto gap-4 pb-4">
            {popularItems.map(product => (
              <div key={product.id} className="min-w-[280px] flex-shrink-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Community Banner */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg overflow-hidden">
            <div className="p-8 md:p-12 text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Eco-Friendly Community</h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto">
                Create an account to start buying and selling sustainable items today.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/signup">
                  <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 w-full sm:w-auto">
                    Sign Up Now
                  </Button>
                </Link>
                <Link to="/explore">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 w-full sm:w-auto">
                    Explore Marketplace
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;