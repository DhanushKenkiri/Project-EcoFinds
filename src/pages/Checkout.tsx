import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { useCart } from '@/context/CartContext';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '@/services/payment-service';
import PaymentGateway from '@/components/PaymentGateway';
import { motion } from 'framer-motion';
import { ShoppingCart, ChevronsRight, Store } from 'lucide-react';
import { CartItem } from '@/types';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
  });
  
  useEffect(() => {
    // If cart is empty, redirect to home
    if (!items || items.length === 0) {
      navigate('/');
    }
  }, [items, navigate]);
  
  const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2); // Move to payment step
  };
  
  const handlePaymentSuccess = (paymentResult: any) => {
    console.log('Payment successful:', paymentResult);
    
    // Clear cart after successful payment
    setTimeout(() => {
      clearCart();
      navigate('/thank-you');
    }, 2000);
  };
  
  const handlePaymentError = (error: any) => {
    console.error('Payment error:', error);
  };
  
  const validateShipping = () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'address', 'city', 'state', 'zip'];
    return requiredFields.every(field => (shippingInfo as any)[field].trim() !== '');
  };
  
  if (!items || items.length === 0) {
    return (
      <div className="container py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <Button onClick={() => navigate('/explore')}>
            <Store className="mr-2 h-4 w-4" />
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <div className="flex items-center">
          <div 
            className={`flex items-center ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}
          >
            <span className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white text-sm">1</span>
            <span className="ml-2">Shipping</span>
          </div>
          <ChevronsRight className="h-4 w-4 mx-2 text-muted-foreground" />
          <div 
            className={`flex items-center ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}
          >
            <span className={`h-6 w-6 rounded-full flex items-center justify-center text-sm ${step >= 2 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>2</span>
            <span className="ml-2">Payment</span>
          </div>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {step === 1 && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }}
              className="bg-card rounded-lg border p-6"
            >
              <h2 className="text-lg font-medium mb-4">Shipping Information</h2>
              <form onSubmit={handleShippingSubmit}>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName" 
                      name="firstName" 
                      value={shippingInfo.firstName}
                      onChange={handleShippingInfoChange}
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName" 
                      name="lastName" 
                      value={shippingInfo.lastName}
                      onChange={handleShippingInfoChange}
                      required 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email"
                      value={shippingInfo.email}
                      onChange={handleShippingInfoChange}
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone (optional)</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      value={shippingInfo.phone}
                      onChange={handleShippingInfoChange}
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <Label htmlFor="address">Address</Label>
                  <Input 
                    id="address" 
                    name="address" 
                    value={shippingInfo.address}
                    onChange={handleShippingInfoChange}
                    required 
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input 
                      id="city" 
                      name="city" 
                      value={shippingInfo.city}
                      onChange={handleShippingInfoChange}
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input 
                      id="state" 
                      name="state" 
                      value={shippingInfo.state}
                      onChange={handleShippingInfoChange}
                      required 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input 
                      id="zip" 
                      name="zip" 
                      value={shippingInfo.zip}
                      onChange={handleShippingInfoChange}
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input 
                      id="country" 
                      name="country" 
                      value={shippingInfo.country}
                      onChange={handleShippingInfoChange}
                      required 
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 mb-6">
                  <Checkbox id="saveInfo" />
                  <Label htmlFor="saveInfo">Save this information for next time</Label>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    type="submit"
                    disabled={!validateShipping()}
                  >
                    Continue to Payment
                  </Button>
                </div>
              </form>
            </motion.div>
          )}
          
          {step === 2 && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }}
            >
              <Elements stripe={stripePromise}>
                <PaymentGateway 
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                />
              </Elements>
            </motion.div>
          )}
        </div>
        
        <div className="md:col-span-1">
          <div className="bg-card rounded-lg border p-6 sticky top-20">
            <h2 className="text-lg font-medium mb-4 flex items-center">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Order Summary
            </h2>
            
            <div className="space-y-4 mb-4">
              {items?.map((item: CartItem) => (
                <div key={item.product.id} className="flex justify-between">
                  <div className="flex items-center">
                    <div 
                      className="h-10 w-10 rounded bg-cover bg-center mr-2" 
                      style={{ backgroundImage: `url(${item.product.images?.[0] || ''})` }}
                    ></div>
                    <div>
                      <div className="text-sm font-medium">{item.product.title}</div>
                      <div className="text-xs text-muted-foreground">Qty: {item.quantity || 1}</div>
                    </div>
                  </div>
                  <div className="text-sm font-medium">${Number(item.product.price).toFixed(2)}</div>
                </div>
              ))}
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>${(total * 0.08).toFixed(2)}</span>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>${(total + total * 0.08).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 