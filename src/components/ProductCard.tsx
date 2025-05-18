import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Check, Heart, Eye, Sparkles, ArrowRight, Star, Clock } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { getProductImage, getCategoryImage } from '@/utils/productImages';

interface ProductCardProps {
  product: Product;
  className?: string;
  featured?: boolean;
}

const ProductCard = ({ product, className = '', featured = false }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showAddedToCart, setShowAddedToCart] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  // Handle window resize for responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Detect touch device on first interaction
  useEffect(() => {
    const handleTouch = () => {
      setIsTouchDevice(true);
      window.removeEventListener('touchstart', handleTouch);
    };
    
    window.addEventListener('touchstart', handleTouch);
    return () => window.removeEventListener('touchstart', handleTouch);
  }, []);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    
    // Show "Added to cart" feedback
    setShowAddedToCart(true);
    setTimeout(() => setShowAddedToCart(false), 2000);
  };
  
  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };
  
  const getRarityClass = (condition: string) => {
    switch(condition.toLowerCase()) {
      case 'new':
        return 'panini-badge-rarity-epic';
      case 'like new':
        return 'panini-badge-rarity-rare';
      case 'good':
        return 'panini-badge-rarity-uncommon';
      case 'fair':
        return 'panini-badge-rarity-common';
      default:
        return 'panini-badge-rarity-common';
    }
  };
  
  // Generate a card number with leading zeros
  const cardNumber = `#${String(parseInt(product.id.slice(-5))).padStart(5, '0')}`;
  
  // Format price with commas and currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(price);
  };
  
  // Calculate days since listing
  const daysSinceListing = () => {
    const listingDate = new Date(product.createdAt);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - listingDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  // Determine if overlay should be shown - always on small screens or when hovered on larger screens
  const isMobile = windowWidth < 768;
  const showOverlay = isMobile || isHovered || isTouchDevice;
  
  // Get product image with fallback logic
  const getImageSrc = () => {
    if (product.images && product.images.length > 0 && product.images[0]) {
      return product.images[0];
    }
    
    return getProductImage(product.id, getCategoryImage(product.category || 'home'));
  };
  
  return (
    <Link to={`/product/${product.id}`}>
      <motion.div
        className={`panini-card ${featured ? 'md:col-span-2 md:row-span-2' : ''} ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: isTouchDevice || isMobile ? 0 : -8 }}
      >
        {/* Card image */}
        <div className="relative overflow-hidden rounded-lg">
          <div className={`${featured ? 'aspect-[4/3]' : 'aspect-square'} overflow-hidden`}>
            <motion.img 
              src={getImageSrc()} 
              alt={product.title}
              className="panini-card-image w-full h-full object-cover"
              animate={{ scale: (isHovered && !isTouchDevice && !isMobile) ? 1.08 : 1 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] }}
            />
          </div>
          
          {/* Overlay - adjusted for mobile and touch devices */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent 
                      flex flex-col justify-end p-2 xs:p-3 md:p-4"
            initial={{ opacity: isMobile || isTouchDevice ? 0.8 : 0 }}
            animate={{ opacity: showOverlay ? 1 : (isMobile || isTouchDevice ? 0.8 : 0) }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-1 sm:mb-2 md:mb-3 text-white">
              <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
                <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
                  <Eye className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                  <span className="text-[10px] sm:text-xs font-medium">{product.views || 0}</span>
                </div>
                <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
                  <Heart className={`h-2.5 w-2.5 sm:h-3 sm:w-3 ${isLiked ? 'text-red-500' : ''}`} />
                  <span className="text-[10px] sm:text-xs font-medium">
                    {isLiked ? (product.likes || 0) + 1 : (product.likes || 0)}
                  </span>
                </div>
              </div>
              
              <AnimatePresence>
                {showAddedToCart && (
                  <motion.div
                    className="bg-primary text-white text-[10px] sm:text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full flex items-center gap-1 absolute top-3 sm:top-4 right-3 sm:right-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3" /> Added
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="flex items-center justify-between">
              <Button 
                variant="outline"
                size="sm" 
                className="rounded-full bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 
                          py-0.5 px-1.5 sm:py-1 sm:px-2.5 md:px-3 h-auto text-[10px] sm:text-xs md:text-sm"
                onClick={handleLike}
                aria-label={isLiked ? "Unlike product" : "Like product"}
              >
                <Heart className={`h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5 sm:mr-1 ${isLiked ? 'fill-current text-red-500' : ''}`} />
                {isLiked ? 'Liked' : 'Like'}
              </Button>
              
              <Button 
                size="sm" 
                className="rounded-full bg-white text-black hover:bg-white/90 flex items-center gap-0.5 sm:gap-1 
                          px-1.5 sm:px-2.5 md:px-3 shadow-lg py-0.5 sm:py-1 h-auto text-[10px] sm:text-xs md:text-sm"
                onClick={handleAddToCart}
                aria-label="Add to cart"
              >
                {featured ? (
                  <>Buy Now <ArrowRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 ml-0.5 sm:ml-1" /></>
                ) : (
                  <><ShoppingCart className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5 sm:mr-1" /> Buy</>
                )}
              </Button>
            </div>
          </motion.div>
          
          {/* Card shine effect - only on non-touch, non-mobile devices */}
          {!isTouchDevice && !isMobile && <div className="panini-card-shine hover-only"></div>}
          
          {/* Badges - adjusted positioning and size for smaller screens */}
          <div className="absolute top-1.5 sm:top-2 md:top-3 right-1.5 sm:right-2 md:right-3 
                        flex flex-col gap-1 sm:gap-1.5 md:gap-2 items-end">
            {product.verified && (
              <Badge className="panini-badge-verified flex items-center gap-0.5 sm:gap-1 
                             text-[10px] sm:text-xs py-0.5 px-1 sm:px-1.5">
                <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3" /> Verified
              </Badge>
            )}
            {product.condition && (
              <Badge className={`${getRarityClass(product.condition)} flex items-center gap-0.5 sm:gap-1 
                             text-[10px] sm:text-xs py-0.5 px-1 sm:px-1.5`}>
                <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3" /> {product.condition}
              </Badge>
            )}
            {daysSinceListing() <= 7 && (
              <Badge className="panini-badge-new flex items-center gap-0.5 sm:gap-1 bg-secondary/90 
                             text-[10px] sm:text-xs py-0.5 px-1 sm:px-1.5">
                <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3" /> New
              </Badge>
            )}
          </div>
        </div>
        
        {/* Card content */}
        <div className="p-2 sm:p-3">
          {/* Product title with truncation */}
          <h3 className="font-medium text-sm sm:text-base line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem]">
            {product.title}
          </h3>
          
          {/* Price and rating */}
          <div className="flex justify-between items-center mt-1 sm:mt-2">
            <div className="text-sm sm:text-base font-bold">{formatPrice(product.price)}</div>
            {product.rating && (
              <div className="flex items-center">
                <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-current text-yellow-400 stroke-yellow-400" />
                <span className="ml-1 text-xs sm:text-sm">{product.rating}</span>
              </div>
            )}
          </div>
          
          {/* Category and card number - hidden on very small screens */}
          <div className="flex items-center justify-between mt-1 sm:mt-2 text-[10px] sm:text-xs text-muted-foreground">
            <span className="capitalize hidden xs:inline">{product.category || 'Uncategorized'}</span>
            <span className="text-right">{cardNumber}</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;
