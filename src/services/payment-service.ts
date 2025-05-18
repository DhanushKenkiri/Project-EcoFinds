import { loadStripe } from '@stripe/stripe-js';

// In a real implementation, this would use your Stripe public key from environment variables
// Using a placeholder key for demo purposes
const STRIPE_PUBLIC_KEY = 'pk_test_placeholder_key';
export const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

// PayPal configuration
export const paypalInitOptions = {
  "client-id": "test_client_id_placeholder",
  currency: "USD",
  intent: "capture"
};

// For server side checkout session creation
export async function createStripeCheckoutSession(items: any[]) {
  try {
    const response = await fetch('/api/checkout/stripe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items })
    });
    return response.json();
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}

// Mock checkout process for demo purposes
export async function mockCheckout(items: any[], paymentMethod: string) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    success: true,
    orderId: 'order_' + Math.random().toString(36).substring(2, 12),
    paymentMethod,
    items,
    total: items.reduce((sum: number, item: any) => sum + (item.price * (item.quantity || 1)), 0)
  };
} 