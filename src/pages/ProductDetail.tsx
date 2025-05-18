
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ShoppingCart,
  ArrowLeft,
  Check,
  User,
  MapPin,
} from 'lucide-react';
import { useProducts } from '@/context/ProductContext';
import { useCart } from '@/context/CartContext';
import { useBlockchain } from '@/context/BlockchainContext';
import { useAuth } from '@/context/AuthContext';
import { Product } from '@/types';
import EmptyState from '@/components/EmptyState';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { getProductById } = useProducts();
  const { addToCart } = useCart();
  const { isProcessing, verifyProduct } = useBlockchain();
  const { isAuthenticated } = useAuth();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [isVerifying, setIsVerifying] = useState(false);
  
  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      setProduct(foundProduct);
    }
  }, [id, getProductById]);
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };
  
  const handleVerify = async () => {
    if (!product) return;
    
    setIsVerifying(true);
    const success = await verifyProduct(product.id);
    
    if (success) {
      setProduct({ ...product, verified: true });
    }
    
    setIsVerifying(false);
  };
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <EmptyState 
          icon={<ShoppingCart className="h-10 w-10 text-muted-foreground" />}
          title="Product Not Found"
          description="The product you're looking for doesn't exist or has been removed."
          actionLabel="Back to Marketplace"
          actionLink="/explore"
        />
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/explore" className="flex items-center text-muted-foreground mb-6 hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Marketplace
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square mb-4">
            <img 
              src={product.images[0] || "/placeholder.svg"} 
              alt={product.title} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-lg overflow-hidden aspect-square">
                <img 
                  src={product.images[i] || "/placeholder.svg"} 
                  alt={product.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div>
          <div className="mb-6">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
              {product.verified && (
                <Badge className="bg-eco">
                  <Check className="h-3 w-3 mr-1" /> Verified
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline">{product.category}</Badge>
              <Badge variant="outline">{product.condition}</Badge>
            </div>
            <p className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</p>
            <div className="flex items-center gap-2 mb-6">
              <User className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Sold by {product.sellerName}</p>
              <MapPin className="h-4 w-4 ml-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">{product.location}</p>
            </div>
            <div className="flex gap-3 mb-6">
              <Button
                className="flex-1 bg-accent"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-4 w-4 mr-1" /> Add to Cart
              </Button>
              <Button
                className="flex-1 bg-eco"
                onClick={handleAddToCart}
              >
                Buy Now
              </Button>
            </div>
            {isAuthenticated && !product.verified && (
              <Button
                variant="outline"
                className="w-full mb-6"
                onClick={handleVerify}
                disabled={isVerifying || isProcessing}
              >
                {isVerifying ? "Verifying..." : "Verify on Blockchain"}
              </Button>
            )}
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-line">{product.description}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Blockchain Verification</CardTitle>
            </CardHeader>
            <CardContent>
              {product.verified ? (
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="h-5 w-5 text-eco" />
                  </div>
                  <div>
                    <p className="font-medium">Product Verified</p>
                    <p className="text-sm text-muted-foreground">
                      Token ID: {product.tokenId}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  This product has not been verified on the blockchain yet.
                </p>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="link" className="text-eco p-0">
                Learn more about our verification process
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
