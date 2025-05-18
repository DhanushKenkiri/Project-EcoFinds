import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Home, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function ThankYou() {
  const navigate = useNavigate();
  const orderNumber = `ECO-${Math.random().toString(36).substring(2, 8).toUpperCase()}${Math.floor(Math.random() * 10000)}`;
  
  return (
    <div className="container py-12">
      <motion.div 
        className="max-w-2xl mx-auto bg-card rounded-xl border p-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="mx-auto mb-6 w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
        >
          <CheckCircle className="h-10 w-10 text-primary" />
        </motion.div>
        
        <motion.h1 
          className="text-3xl font-bold mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Thank You For Your Order!
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <p className="text-muted-foreground mb-6">
            Your order has been placed and is being processed. You will receive an email confirmation shortly.
          </p>
          
          <div className="bg-background/50 border rounded-lg p-4 mb-8 inline-block">
            <div className="text-sm text-muted-foreground">Order Number:</div>
            <div className="text-lg font-medium">{orderNumber}</div>
          </div>
          
          <div className="space-y-4 mb-8">
            <p className="text-sm">
              We've sent all the order details to your email. If you have any questions about your purchase, please contact our customer support.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => navigate('/')}
            >
              <Home className="h-4 w-4" />
              Return to Home
            </Button>
            <Button 
              className="flex items-center gap-2"
              onClick={() => navigate('/explore')}
            >
              <ShoppingBag className="h-4 w-4" />
              Continue Shopping
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
} 