import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Check, Heart, Eye, Sparkles, ArrowRight, Star, Clock } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

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
  
  // Detect touch device on first interaction
  React.useEffect(() => {
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
  
  // Show overlay for touch devices or when hovered
  const showOverlay = isHovered || isTouchDevice;
  
  return (
    <Link to={`/product/${product.id}`}>
      <motion.div
        className={`panini-card ${featured ? 'md:col-span-2 md:row-span-2' : ''} ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: isTouchDevice ? 0 : -8 }}
      >
        {/* Card image */}
        <div className="relative overflow-hidden">
          <div className={`${featured ? 'aspect-[4/3]' : 'aspect-square'} overflow-hidden`}>
            <motion.img 
              src={product.images?.[0] || "/placeholder.svg"} 
              alt={product.title}
              className="panini-card-image w-full h-full object-cover"
              animate={{ scale: isHovered && !isTouchDevice ? 1.08 : 1 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] }}
            />
          </div>
          
          {/* Always visible on mobile, hover overlay on desktop */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-3 md:p-4"
            initial={{ opacity: isTouchDevice ? 0.8 : 0 }}
            animate={{ opacity: showOverlay ? 1 : (isTouchDevice ? 0.8 : 0) }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-2 md:mb-3 text-white">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-1 rounded-full">
                  <Eye className="h-3 w-3" />
                  <span className="text-xs font-medium">{product.views || 0}</span>
                </div>
                <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-1 rounded-full">
                  <Heart className={`h-3 w-3 ${isLiked ? 'text-red-500' : ''}`} />
                  <span className="text-xs font-medium">
                    {isLiked ? (product.likes || 0) + 1 : (product.likes || 0)}
                  </span>
                </div>
              </div>
              
              <AnimatePresence>
                {showAddedToCart && (
                  <motion.div
                    className="bg-primary text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 absolute top-4 right-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <Check className="h-3 w-3" /> Added
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="flex items-center justify-between">
              <Button 
                variant="outline"
                size="sm" 
                className="rounded-full bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 py-1 px-2.5 md:px-3 h-auto md:h-8 text-xs md:text-sm"
                onClick={handleLike}
              >
                <Heart className={`h-3 w-3 mr-1 ${isLiked ? 'fill-current text-red-500' : ''}`} />
                {isLiked ? 'Liked' : 'Like'}
              </Button>
              
              <Button 
                size="sm" 
                className="rounded-full bg-white text-black hover:bg-white/90 flex items-center gap-1 px-2.5 md:px-3 shadow-lg py-1 h-auto md:h-8 text-xs md:text-sm"
                onClick={handleAddToCart}
              >
                {featured ? (
                  <>Buy Now <ArrowRight className="h-3 w-3 ml-1" /></>
                ) : (
                  <><ShoppingCart className="h-3 w-3 mr-1" /> Buy</>
                )}
              </Button>
            </div>
          </motion.div>
          
          {/* Card shine effect - only on non-touch devices */}
          {!isTouchDevice && <div className="panini-card-shine hover-only"></div>}
          
          {/* Badges */}
          <div className="absolute top-2 md:top-3 right-2 md:right-3 flex flex-col gap-1.5 md:gap-2 items-end">
            {product.verified && (
              <Badge className="panini-badge-verified flex items-center gap-1 text-xs py-0.5 px-1.5">
                <Check className="h-3 w-3" /> Verified
              </Badge>
            )}
            {product.condition && (
              <Badge className={`${getRarityClass(product.condition)} flex items-center gap-1 text-xs py-0.5 px-1.5`}>
                <Sparkles className="h-3 w-3" /> {product.condition}
              </Badge>
            )}
            {daysSinceListing() <= 7 && (
              <Badge className="panini-badge-new flex items-center gap-1 bg-secondary/90 text-xs py-0.5 px-1.5">
                <Clock className="h-3 w-3" /> New
              </Badge>
            )}
          </div>
          
          {/* Card number badge */}
          <Badge className="panini-badge left-2 md:left-3 flex items-center gap-1 font-mono text-xs py-0.5 px-1.5">
            {cardNumber}
          </Badge>
        </div>
        
        {/* Card content */}
        <div className="p-3 md:p-4">
          <div className="flex justify-between items-center mb-1.5 md:mb-2">
            <Badge variant="outline" className="text-xs capitalize bg-muted/30 py-0.5 px-1.5">
              {product.category}
            </Badge>
            
            {product.rating && (
              <div className="flex items-center gap-1 text-xs">
                <Star className="h-3.5 w-3.5 fill-current text-yellow-500 stroke-yellow-500" />
                <span className="font-medium">{product.rating.toFixed(1)}</span>
              </div>
            )}
          </div>
          
          <h3 className="font-semibold text-sm md:text-base text-foreground line-clamp-1 mb-1 md:mb-1.5">{product.title}</h3>
          
          <div className="flex justify-between items-center">
            <div>
              <div className="font-bold text-base md:text-lg text-foreground">
                {formatPrice(product.price)}
              </div>
              
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="flex items-center gap-1 md:gap-2">
                  <span className="text-xs md:text-sm line-through text-muted-foreground">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="text-xs bg-accent/10 text-accent px-1.5 py-0.5 rounded-sm font-medium">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </span>
                </div>
              )}
            </div>
            
            {!featured && (
              <motion.div whileTap={{ scale: 0.9 }}>
                <Button 
                  size="icon" 
                  variant={isLiked ? "default" : "outline"}
                  className={`rounded-full h-7 w-7 md:h-8 md:w-8 ${isLiked ? 'bg-red-500 hover:bg-red-600 border-red-500' : ''}`}
                  onClick={handleLike}
                >
                  <Heart className={`h-3.5 w-3.5 md:h-4 md:w-4 ${isLiked ? 'fill-current' : ''}`} />
                </Button>
              </motion.div>
            )}
          </div>
          
          {featured && (
            <p className="mt-2 md:mt-3 text-muted-foreground line-clamp-2 text-xs md:text-sm">
              {product.description}
            </p>
          )}
        </div>
        
        {/* Quick action buttons for featured cards */}
        {featured && (
          <div className="p-3 md:p-4 pt-0 flex gap-2">
            <Button 
              className="flex-1 btn-animated bg-primary hover:bg-primary/90 py-1.5 md:py-2 h-auto text-sm"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-3.5 w-3.5 md:h-4 md:w-4 mr-1.5 md:mr-2" /> Add to Cart
            </Button>
            
            <Button
              variant="outline"
              className="flex-1 btn-animated py-1.5 md:py-2 h-auto text-sm"
            >
              <Eye className="h-3.5 w-3.5 md:h-4 md:w-4 mr-1.5 md:mr-2" /> Quick View
            </Button>
          </div>
        )}
      </motion.div>
    </Link>
  );
};

export default ProductCard;
