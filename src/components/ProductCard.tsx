import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Check, Eye, Heart } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className = '' }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = React.useState(false);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };
  
  // Define rarity badge class based on condition
  const getRarityBadge = (condition: string) => {
    switch(condition) {
      case 'New':
        return 'bg-[#f97316] text-white';
      case 'Like New':
        return 'bg-[#7e69ab] text-white';
      case 'Good':
        return 'bg-[#4dc061] text-white';
      case 'Fair':
        return 'bg-gray-400 text-white';
      default:
        return 'bg-gray-400 text-white';
    }
  };

  // Format price with commas
  const formatPrice = (price: number) => {
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    });
  };
  
  return (
    <Link to={`/product/${product.id}`}>
      <Card 
        className={`product-card relative overflow-hidden ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative">
          <div className="overflow-hidden">
            <img 
              src={product.images[0] || "/placeholder.svg"} 
              alt={product.title}
              className="product-card-image w-full aspect-square object-cover transition-transform duration-500"
              style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
            />
          </div>
          
          {/* Stats overlay on hover */}
          <div 
            className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 transition-opacity duration-300"
            style={{ opacity: isHovered ? 0.6 : 0 }}
          >
            <div className="flex gap-3 text-white">
              <div className="flex flex-col items-center">
                <Eye className="h-5 w-5" />
                <span className="text-sm">{product.views}</span>
              </div>
              <div className="flex flex-col items-center">
                <Heart className="h-5 w-5" />
                <span className="text-sm">{Math.floor(Math.random() * 50)}</span>
              </div>
            </div>
          </div>
          
          {/* Top badges */}
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            {product.verified && (
              <Badge className="bg-[#10b981] text-white">
                <Check className="h-3 w-3 mr-1" /> Verified
              </Badge>
            )}
            <Badge className={`${getRarityBadge(product.condition)}`}>
              {product.condition}
            </Badge>
          </div>
          
          {/* Card number badge */}
          <Badge className="absolute top-2 left-2 bg-white/80 text-gray-900 backdrop-blur-sm font-mono">
            #{product.id.toString().padStart(5, '0').slice(-5)}
          </Badge>
        </div>
        
        <div className="product-card-content">
          <div className="flex justify-between items-start mb-2">
            <h3 className="product-card-title font-semibold text-lg truncate">{product.title}</h3>
          </div>
          
          {/* Category badge */}
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">{product.category}</Badge>
          </div>
          
          {/* Price and action button */}
          <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
            <p className="product-card-price text-lg font-bold text-gray-900">{formatPrice(product.price)}</p>
            <Button 
              size="sm" 
              className="bg-[#3b82f6] hover:bg-[#2563eb] text-white rounded-full"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-1" /> Buy
            </Button>
          </div>
        </div>
        
        {/* Shine effect overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 opacity-0 transition-opacity duration-300 pointer-events-none"
          style={{ 
            opacity: isHovered ? 0.5 : 0,
            transform: 'rotate(25deg) translateY(-50%) scale(2)'  
          }}
        ></div>
      </Card>
    </Link>
  );
};

export default ProductCard;
