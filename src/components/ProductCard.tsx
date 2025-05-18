import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Check, Heart, Eye, Sparkles, ArrowRight } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  className?: string;
  featured?: boolean;
}

const ProductCard = ({ product, className = '', featured = false }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
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
  
  return (
    <Link to={`/product/${product.id}`}>
      <motion.div
        className={`panini-card ${featured ? 'md:col-span-2 md:row-span-2' : ''} ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Card image */}
        <div className="relative overflow-hidden">
          <div className={`${featured ? 'aspect-[4/3]' : 'aspect-square'} overflow-hidden`}>
            <img 
              src={product.images?.[0] || "/placeholder.svg"} 
              alt={product.title}
              className="panini-card-image"
            />
          </div>
          
          {/* Hover overlay with stats */}
          <div 
            className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-between p-4 opacity-0 transition-opacity duration-300"
            style={{ opacity: isHovered ? 1 : 0 }}
          >
            <div className="flex items-center gap-3 text-white">
              <div className="flex items-center gap-1">
                <Eye className="h-3.5 w-3.5" />
                <span className="text-sm">{product.views || 0}</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="h-3.5 w-3.5" />
                <span className="text-sm">{(product.likes || 0) + Math.floor(Math.random() * 25)}</span>
              </div>
            </div>
            
            <Button 
              size="sm" 
              className="rounded-full bg-white text-black hover:bg-white/90 flex items-center gap-1 px-3"
              onClick={handleAddToCart}
            >
              {featured ? (
                <>Buy Now <ArrowRight className="h-3 w-3 ml-1" /></>
              ) : (
                <>Buy</>
              )}
            </Button>
          </div>
          
          {/* Card shine effect */}
          <div className="panini-card-shine"></div>
          
          {/* Badges */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
            {product.verified && (
              <Badge className="panini-badge-verified flex items-center gap-1">
                <Check className="h-3 w-3" /> Verified
              </Badge>
            )}
            {product.condition && (
              <Badge className={`${getRarityClass(product.condition)} flex items-center gap-1`}>
                <Sparkles className="h-3 w-3" /> {product.condition}
              </Badge>
            )}
          </div>
          
          {/* Card number badge */}
          <Badge className="panini-badge left-3 flex items-center gap-1 font-mono">
            {cardNumber}
          </Badge>
        </div>
        
        {/* Card content */}
        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <Badge variant="outline" className="text-xs capitalize bg-muted/30">
              {product.category}
            </Badge>
          </div>
          
          <h3 className="font-semibold text-base text-foreground line-clamp-1 mb-1.5">{product.title}</h3>
          
          <div className="flex justify-between items-center">
            <div className="font-bold text-lg text-foreground">
              {formatPrice(product.price)}
            </div>
            
            {!featured && (
              <Button 
                size="icon" 
                variant="outline" 
                className="rounded-full h-8 w-8"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // Add to favorites logic here
                }}
              >
                <Heart className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;
