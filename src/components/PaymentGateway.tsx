import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Wallet, Check, ShieldCheck, CreditCardIcon } from 'lucide-react';
import { stripePromise, paypalInitOptions, mockCheckout } from '@/services/payment-service';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

interface PaymentProps {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

export default function PaymentGateway({ onSuccess, onError }: PaymentProps) {
  const { items = [], total = 0 } = useCart() || {};
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1);
  
  const [cardInfo, setCardInfo] = useState({
    name: '',
    number: '',
    expiry: '',
    cvc: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'number') {
      const formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setCardInfo({ ...cardInfo, number: formatted });
      return;
    }
    
    // Format expiry date
    if (name === 'expiry') {
      const expiry = value.replace(/\s/g, '').replace(/\//g, '');
      if (expiry.length === 2 && cardInfo.expiry.length === 1) {
        setCardInfo({ ...cardInfo, expiry: expiry + '/' });
      } else {
        setCardInfo({ ...cardInfo, expiry: expiry.replace(/(\d{2})(\d{0,2})/, '$1/$2').substring(0, 5) });
      }
      return;
    }
    
    setCardInfo({ ...cardInfo, [name]: value });
  };
  
  const handleCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCardInfo()) return;
    
    setIsProcessing(true);
    
    try {
      // This is a mock checkout - in real implementation, we'd use Stripe Elements
      const result = await mockCheckout(items, 'card');
      
      if (result.success) {
        setStep(3);
        if (onSuccess) onSuccess(result);
      } else {
        throw new Error('Payment failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      if (onError) onError(error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handlePaypalSuccess = async () => {
    try {
      // Mock PayPal checkout result
      const result = await mockCheckout(items, 'paypal');
      
      if (result.success) {
        setStep(3);
        if (onSuccess) onSuccess(result);
      }
    } catch (error) {
      console.error('PayPal error:', error);
      if (onError) onError(error);
    }
  };
  
  const validateCardInfo = () => {
    const errors = [];
    
    if (cardInfo.name.length < 3) errors.push('Name is required');
    if (cardInfo.number.replace(/\s/g, '').length !== 16) errors.push('Card number must be 16 digits');
    if (cardInfo.expiry.length !== 5) errors.push('Invalid expiry date');
    if (cardInfo.cvc.length !== 3) errors.push('CVC must be 3 digits');
    
    if (errors.length) {
      console.error('Validation errors:', errors);
      return false;
    }
    
    return true;
  };
  
  return (
    <Card className="payment-card">
      <CardHeader>
        <CardTitle>Payment</CardTitle>
        <CardDescription>Complete your purchase securely.</CardDescription>
      </CardHeader>
      
      <CardContent>
        {step === 1 && (
          <>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mb-4">
              <div className="flex items-center space-x-2 bg-card/50 p-4 rounded-lg border border-border hover:border-primary/50 cursor-pointer transition-all duration-200">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex items-center cursor-pointer w-full">
                  <CreditCard className="h-4 w-4 mr-3" />
                  <div className="flex-1">Credit or Debit Card</div>
                  <div className="flex gap-1">
                    <div className="w-8 h-5 bg-primary/80 rounded"></div>
                    <div className="w-8 h-5 bg-accent/80 rounded"></div>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 bg-card/50 p-4 rounded-lg border border-border hover:border-primary/50 cursor-pointer transition-all duration-200 mt-2">
                <RadioGroupItem value="paypal" id="paypal" />
                <Label htmlFor="paypal" className="flex items-center cursor-pointer w-full">
                  <Wallet className="h-4 w-4 mr-3" />
                  <div className="flex-1">PayPal</div>
                  <div className="w-8 h-5 bg-blue-600 rounded"></div>
                </Label>
              </div>
            </RadioGroup>
            
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => window.history.back()}>
                Back
              </Button>
              <Button onClick={() => setStep(2)} disabled={!paymentMethod}>
                Continue
              </Button>
            </div>
          </>
        )}
        
        {step === 2 && paymentMethod === 'card' && (
          <motion.form 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleCardSubmit}
          >
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Cardholder Name</Label>
                <Input 
                  id="name" 
                  name="name"
                  placeholder="John Smith" 
                  value={cardInfo.name}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="number">Card Number</Label>
                <div className="relative">
                  <Input 
                    id="number" 
                    name="number"
                    placeholder="4242 4242 4242 4242" 
                    value={cardInfo.number}
                    onChange={handleInputChange}
                    maxLength={19}
                    required 
                  />
                  <CreditCardIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input 
                    id="expiry" 
                    name="expiry"
                    placeholder="MM/YY" 
                    value={cardInfo.expiry}
                    onChange={handleInputChange}
                    maxLength={5}
                    required 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input 
                    id="cvc" 
                    name="cvc"
                    placeholder="123" 
                    value={cardInfo.cvc}
                    onChange={handleInputChange}
                    maxLength={3}
                    required 
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-8">
              <Button type="button" variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button type="submit" disabled={isProcessing}>
                {isProcessing ? 'Processing...' : `Pay ${total.toFixed(2)}`}
              </Button>
            </div>
            
            <div className="flex items-center justify-center gap-2 mt-6">
              <ShieldCheck className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Secured and encrypted payment</span>
            </div>
          </motion.form>
        )}
        
        {step === 2 && paymentMethod === 'paypal' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="paypal-container"
          >
            <PayPalScriptProvider options={paypalInitOptions}>
              <PayPalButtons
                style={{ layout: 'vertical' }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [{
                      amount: {
                        value: total.toFixed(2)
                      }
                    }]
                  });
                }}
                onApprove={() => {
                  handlePaypalSuccess();
                }}
              />
            </PayPalScriptProvider>
            
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
            </div>
          </motion.div>
        )}
        
        {step === 3 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="mx-auto w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
              <Check className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Payment Successful!</h3>
            <p className="text-muted-foreground mb-6">Your order has been processed.</p>
            <Button onClick={() => window.location.href = '/'} className="mx-auto">
              Continue Shopping
            </Button>
          </motion.div>
        )}
      </CardContent>
      
      <CardFooter className="border-t pt-4 flex flex-col gap-2">
        <div className="flex justify-between w-full">
          <span className="text-sm text-muted-foreground">Subtotal</span>
          <span>${(total * 0.9).toFixed(2)}</span>
        </div>
        <div className="flex justify-between w-full">
          <span className="text-sm text-muted-foreground">Tax</span>
          <span>${(total * 0.1).toFixed(2)}</span>
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between w-full font-medium">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </CardFooter>
    </Card>
  );
} 