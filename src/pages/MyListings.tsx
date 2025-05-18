
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Plus, Pencil, Trash2, ShoppingBag } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useProducts } from '@/context/ProductContext';
import { useBlockchain } from '@/context/BlockchainContext';
import EmptyState from '@/components/EmptyState';
import { toast } from 'sonner';

const MyListings = () => {
  const { isAuthenticated, user } = useAuth();
  const { userProducts, deleteProduct } = useProducts();
  const { verifyProduct, isProcessing } = useBlockchain();
  const navigate = useNavigate();
  
  const handleDelete = (productId: string) => {
    // In a real app, we would show a confirmation dialog
    deleteProduct(productId);
    toast.success('Product deleted successfully');
  };
  
  const handleVerify = async (productId: string) => {
    const success = await verifyProduct(productId);
    if (success) {
      toast.success('Product verified successfully');
    }
  };
  
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">You need to be logged in to view your listings</h1>
        <Button className="bg-eco mr-4" onClick={() => navigate('/login')}>
          Login
        </Button>
        <Button variant="outline" onClick={() => navigate('/signup')}>
          Sign Up
        </Button>
      </div>
    );
  }
  
  if (userProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Listings</h1>
        <EmptyState 
          icon={<ShoppingBag className="h-10 w-10 text-muted-foreground" />}
          title="No products listed yet"
          description="Start selling your sustainable products on EcoFinds!"
          actionLabel="Create Listing"
          actionLink="/sell"
        />
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Listings</h1>
        <Link to="/sell">
          <Button className="bg-eco">
            <Plus className="h-4 w-4 mr-1" /> New Listing
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="aspect-[3/2] relative">
              <img 
                src={product.images[0] || "/placeholder.svg"} 
                alt={product.title}
                className="w-full h-full object-cover"
              />
              {product.verified && (
                <Badge className="absolute top-2 right-2 bg-eco">
                  <Check className="h-3 w-3 mr-1" /> Verified
                </Badge>
              )}
            </div>
            <CardHeader>
              <CardTitle className="truncate">{product.title}</CardTitle>
              <CardDescription className="flex justify-between">
                <span>{product.category}</span>
                <span className="font-bold">${product.price.toFixed(2)}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => navigate(`/edit-product/${product.id}`)}
                >
                  <Pencil className="h-3 w-3 mr-1" /> Edit
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="text-destructive"
                  onClick={() => handleDelete(product.id)}
                >
                  <Trash2 className="h-3 w-3 mr-1" /> Delete
                </Button>
              </div>
              {!product.verified && (
                <Button 
                  size="sm" 
                  className="bg-eco"
                  onClick={() => handleVerify(product.id)}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Verifying...' : 'Verify'}
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyListings;
