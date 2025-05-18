
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, ArrowLeft, Plus, Minus, CreditCard, Wallet, Bitcoin } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useBlockchain } from '@/context/BlockchainContext';
import EmptyState from '@/components/EmptyState';
import { toast } from 'sonner';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { purchaseWithCrypto, isProcessing } = useBlockchain();
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'crypto'>('credit_card');
  const navigate = useNavigate();
  
  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };
  
  const handleCheckout = async () => {
    if (!isAuthenticated) {
      toast.error('Please log in to checkout');
      navigate('/login');
      return;
    }
    
    try {
      if (paymentMethod === 'crypto') {
        // For demo: simulate crypto payment with first item
        if (items.length > 0) {
          const success = await purchaseWithCrypto(items[0].product.id, totalPrice);
          if (success) {
            clearCart();
            navigate('/orders');
            return;
          }
        }
      }
      
      // For demo: simulate successful credit card payment
      toast.success('Payment successful!');
      clearCart();
      navigate('/orders');
    } catch (error) {
      toast.error('Checkout failed');
    }
  };
  
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <EmptyState 
          icon={<Trash2 className="h-10 w-10 text-muted-foreground" />}
          title="Your cart is empty"
          description="Looks like you haven't added any products to your cart yet."
          actionLabel="Start Shopping"
          actionLink="/explore"
        />
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/explore" className="flex items-center text-muted-foreground mb-6 hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4 mr-1" /> Continue Shopping
      </Link>
      
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="rounded-lg border overflow-hidden">
            {/* Cart Header */}
            <div className="bg-muted p-4 hidden sm:grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <p className="font-medium">Product</p>
              </div>
              <div className="col-span-2 text-center">
                <p className="font-medium">Quantity</p>
              </div>
              <div className="col-span-2 text-center">
                <p className="font-medium">Price</p>
              </div>
              <div className="col-span-2 text-center">
                <p className="font-medium">Total</p>
              </div>
            </div>
            
            {/* Cart Items */}
            {items.map((item) => (
              <div key={item.product.id} className="p-4 border-b last:border-0">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  {/* Product */}
                  <div className="sm:col-span-6">
                    <div className="flex items-center">
                      <div className="h-20 w-20 rounded-md overflow-hidden mr-4">
                        <img 
                          src={item.product.images[0] || "/placeholder.svg"} 
                          alt={item.product.title} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <Link to={`/product/${item.product.id}`} className="font-medium hover:text-eco">
                          {item.product.title}
                        </Link>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline">{item.product.category}</Badge>
                          {item.product.verified && (
                            <Badge className="bg-eco">Verified</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Quantity */}
                  <div className="sm:col-span-2">
                    <div className="flex items-center justify-center">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                        className="h-8 w-8"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-10 text-center mx-1">{item.quantity}</span>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                        className="h-8 w-8"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="sm:col-span-2">
                    <p className="sm:text-center">${item.product.price.toFixed(2)}</p>
                  </div>
                  
                  {/* Total */}
                  <div className="sm:col-span-2 flex items-center justify-between sm:justify-center">
                    <p className="font-medium sm:mr-0 mr-4">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => removeFromCart(item.product.id)}
                      className="h-8 w-8 text-muted-foreground hover:text-destructive sm:ml-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Order Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>
                {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Subtotal</p>
                  <p className="font-medium">${totalPrice.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Shipping</p>
                  <p className="font-medium">$0.00</p>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <p className="font-medium">Total</p>
                  <p className="font-bold">${totalPrice.toFixed(2)}</p>
                </div>
                
                {/* Payment Method Selection */}
                <div className="mt-6">
                  <p className="font-medium mb-2">Payment Method</p>
                  <RadioGroup 
                    value={paymentMethod} 
                    onValueChange={(value) => setPaymentMethod(value as 'credit_card' | 'crypto')}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="credit_card" id="credit_card" />
                      <Label htmlFor="credit_card" className="flex items-center">
                        <CreditCard className="h-4 w-4 mr-2" /> Credit Card
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="crypto" id="crypto" />
                      <Label htmlFor="crypto" className="flex items-center">
                        <Bitcoin className="h-4 w-4 mr-2" /> Cryptocurrency
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              {paymentMethod === 'crypto' && !user?.walletAddress && (
                <p className="text-sm text-amber-600 mb-4">
                  You need to connect a wallet to pay with cryptocurrency.
                </p>
              )}
              <Button 
                className="w-full bg-eco"
                onClick={handleCheckout}
                disabled={isProcessing || (paymentMethod === 'crypto' && !user?.walletAddress)}
              >
                {isProcessing ? 'Processing...' : 'Checkout'}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;
