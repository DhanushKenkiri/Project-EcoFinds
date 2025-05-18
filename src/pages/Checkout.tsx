import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from '@/context/CartContext';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '@/services/payment-service';
import PaymentGateway from '@/components/PaymentGateway';
import { motion } from 'framer-motion';
import { ShoppingCart, ChevronsRight, Store, CheckCircle, ShieldCheck, Truck, Clock, CreditCard, DollarSign, ChevronLeft, Leaf } from 'lucide-react';
import { CartItem } from '@/types';
import { Badge } from '@/components/ui/badge';
import { getProductImage } from '@/utils/productImages';

const shippingOptions = [
  { id: 'standard', name: 'Standard Shipping', price: 5.99, duration: '3-5 business days' },
  { id: 'express', name: 'Express Shipping', price: 12.99, duration: '1-2 business days' },
  { id: 'free', name: 'Free Eco Shipping', price: 0, duration: '5-7 business days' },
];

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
  const [shippingMethod, setShippingMethod] = useState(shippingOptions[2].id);
  const [isProcessing, setIsProcessing] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  
  // Calculate subtotal, tax, and final total
  const subtotal = total;
  const selectedShippingOption = shippingOptions.find(option => option.id === shippingMethod) || shippingOptions[2];
  const shippingCost = selectedShippingOption.price;
  const taxRate = 0.08; // 8% tax rate
  const taxAmount = (subtotal - discount) * taxRate;
  const finalTotal = (subtotal - discount) + shippingCost + taxAmount;
  
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
  
  const handleBackToShipping = () => {
    setStep(1); // Go back to shipping step
  };
  
  const handlePaymentSuccess = (paymentResult: any) => {
    console.log('Payment successful:', paymentResult);
    setIsProcessing(true);
    
    // Clear cart after successful payment
    setTimeout(() => {
      clearCart();
      setIsProcessing(false);
      navigate('/thank-you');
    }, 2000);
  };
  
  const handlePaymentError = (error: any) => {
    console.error('Payment error:', error);
    setIsProcessing(false);
  };
  
  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'ECO20') {
      setDiscount(total * 0.2); // 20% discount
      setCouponApplied(true);
    }
  };
  
  const validateShipping = () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'address', 'city', 'state', 'zip'];
    return requiredFields.every(field => (shippingInfo as any)[field].trim() !== '');
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  if (!items || items.length === 0) {
    return (
      <div className="container py-8">
        <div className="text-center py-12">
          <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Looks like you haven't added any products to your cart yet.</p>
          <Button onClick={() => navigate('/explore')} size="lg">
            <Store className="mr-2 h-4 w-4" />
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container py-8 max-w-4xl mx-auto">
      {/* Checkout progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex flex-col items-center">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm ${step >= 1 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
              {step > 1 ? <CheckCircle className="h-5 w-5" /> : 1}
            </div>
            <span className={`text-sm mt-2 ${step >= 1 ? 'text-primary font-medium' : 'text-muted-foreground'}`}>Shipping</span>
          </div>
          
          <div className={`h-1 flex-1 mx-2 ${step > 1 ? 'bg-primary' : 'bg-muted'}`}></div>
          
          <div className="flex flex-col items-center">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm ${step >= 2 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
              2
            </div>
            <span className={`text-sm mt-2 ${step >= 2 ? 'text-primary font-medium' : 'text-muted-foreground'}`}>Payment</span>
          </div>
          
          <div className={`h-1 flex-1 mx-2 ${step > 2 ? 'bg-primary' : 'bg-muted'}`}></div>
          
          <div className="flex flex-col items-center">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm ${step >= 3 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
              3
            </div>
            <span className={`text-sm mt-2 ${step >= 3 ? 'text-primary font-medium' : 'text-muted-foreground'}`}>Confirmation</span>
          </div>
        </div>
      </div>
      
      {/* Main checkout content */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {step === 1 && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }}
              className="bg-card rounded-lg border shadow-sm"
            >
              <div className="p-6 border-b">
                <h2 className="text-lg font-medium">Shipping Information</h2>
              </div>
              
              <form onSubmit={handleShippingSubmit} className="p-6">
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
                
                <div className="grid grid-cols-2 gap-4 mb-6">
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
                    <Select 
                      defaultValue={shippingInfo.country}
                      onValueChange={(value) => setShippingInfo(prev => ({ ...prev, country: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="UK">United Kingdom</SelectItem>
                        <SelectItem value="AU">Australia</SelectItem>
                        <SelectItem value="DE">Germany</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <h3 className="font-medium mb-4">Shipping Options</h3>
                <RadioGroup 
                  className="mb-6"
                  value={shippingMethod} 
                  onValueChange={setShippingMethod}
                >
                  {shippingOptions.map((option) => (
                    <div
                      key={option.id}
                      className={`flex items-center justify-between p-4 rounded-md border mb-2 ${
                        shippingMethod === option.id ? 'border-primary bg-primary/5' : ''
                      }`}
                    >
                      <div className="flex items-start">
                        <RadioGroupItem value={option.id} id={`shipping-${option.id}`} />
                        <div className="ml-3">
                          <Label htmlFor={`shipping-${option.id}`} className="font-medium">
                            {option.name}
                            {option.id === 'free' && (
                              <Badge variant="outline" className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">
                                <Leaf className="h-3 w-3 mr-1" /> Eco-Friendly
                              </Badge>
                            )}
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            {option.duration}
                          </p>
                        </div>
                      </div>
                      <span className="font-medium">
                        {option.price === 0 ? 'FREE' : formatCurrency(option.price)}
                      </span>
                    </div>
                  ))}
                </RadioGroup>
                
                <div className="flex items-center space-x-2 mb-6">
                  <Checkbox id="saveInfo" />
                  <Label htmlFor="saveInfo" className="text-sm">Save this information for next time</Label>
                </div>
                
                <div className="flex justify-between items-center">
                  <Button
                    variant="outline"
                    onClick={() => navigate('/cart')}
                    type="button"
                  >
                    <ChevronLeft className="mr-1 h-4 w-4" /> Back to Cart
                  </Button>
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
              <div className="bg-card rounded-lg border shadow-sm mb-6">
                <div className="p-6 border-b flex justify-between items-center">
                  <h2 className="text-lg font-medium">Shipping Address</h2>
                  <Button variant="outline" size="sm" onClick={handleBackToShipping}>
                    Edit
                  </Button>
                </div>
                <div className="p-6">
                  <p className="text-sm">
                    {shippingInfo.firstName} {shippingInfo.lastName}<br />
                    {shippingInfo.address}<br />
                    {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}<br />
                    {shippingInfo.country}
                  </p>
                  
                  <div className="mt-4 flex items-center">
                    <Truck className="h-4 w-4 mr-2 text-muted-foreground" />
                    <p className="text-sm">
                      <span className="font-medium">{selectedShippingOption.name}</span> - {selectedShippingOption.duration}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-lg border shadow-sm">
                <div className="p-6 border-b">
                  <h2 className="text-lg font-medium">Payment Method</h2>
                </div>
                <div className="p-6">
                  {isProcessing ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                      <p className="mt-4 font-medium">Processing your payment...</p>
                      <p className="text-sm text-muted-foreground mt-2">Please don't close this window.</p>
                    </div>
                  ) : (
                    <Elements stripe={stripePromise}>
                      <PaymentGateway 
                        onSuccess={handlePaymentSuccess}
                        onError={handlePaymentError}
                      />
                    </Elements>
                  )}
                  
                  <div className="mt-6 bg-green-50 border border-green-100 rounded-md p-4 flex items-start">
                    <ShieldCheck className="h-5 w-5 mr-3 text-green-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-green-800">Secure Payment</p>
                      <p className="text-green-700">Your payment information is encrypted and secure. We never store your full credit card details.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Order summary */}
        <div className="md:col-span-1">
          <div className="bg-card rounded-lg border p-6 sticky top-20 shadow-sm">
            <h2 className="text-lg font-medium mb-4 flex items-center">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Order Summary
            </h2>
            
            {/* Items in cart */}
            <div className="space-y-4 mb-4 max-h-[300px] overflow-y-auto">
              {items.map((item: CartItem) => (
                <div key={item.product.id} className="flex items-center gap-3">
                  <div className="h-16 w-16 rounded-md overflow-hidden bg-muted">
                    <img 
                      src={getProductImage(item.product.id)} 
                      alt={item.product.title} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{item.product.title}</p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Qty: {item.quantity}</span>
                      <span>{formatCurrency(item.product.price * item.quantity)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Separator className="my-4" />
            
            {/* Coupon code input */}
            {!couponApplied && (
              <div className="flex gap-2 mb-4">
                <Input 
                  placeholder="Discount code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <Button 
                  variant="outline" 
                  className="shrink-0"
                  onClick={handleApplyCoupon}
                >
                  Apply
                </Button>
              </div>
            )}
            
            {/* Applied coupon */}
            {couponApplied && (
              <div className="mb-4 bg-primary/10 text-primary rounded-md p-2 flex justify-between items-center">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">Coupon ECO20 applied</span>
                </div>
                <span className="text-sm font-medium">-{formatCurrency(discount)}</span>
              </div>
            )}
            
            {/* Order summary calculations */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between text-primary">
                  <span>Discount</span>
                  <span>-{formatCurrency(discount)}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shippingCost === 0 ? 'FREE' : formatCurrency(shippingCost)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax (8%)</span>
                <span>{formatCurrency(taxAmount)}</span>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="flex justify-between text-lg font-bold mb-6">
              <span>Total</span>
              <span>{formatCurrency(finalTotal)}</span>
            </div>
            
            {step === 1 && (
              <div className="text-center text-muted-foreground text-sm mt-4">
                <p className="mb-2">Prices and shipping costs are not confirmed until you complete payment</p>
                <div className="flex items-center justify-center space-x-1">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Secure checkout</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 