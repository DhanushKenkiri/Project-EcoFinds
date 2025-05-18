# EcoFinds Marketplace

A modern eco-friendly marketplace with advanced features including multi-platform product search, AI-powered voice and image recognition, and integrated payment gateways.

## Features

- **Multi-Platform Product Search**: Search across Amazon, Flipkart, Shopify, and more
- **AI-Powered Features**: Voice search and image recognition powered by Groq AI
- **Payment Integrations**: Stripe and PayPal payment gateways
- **Modern UI**: Attractive, responsive design with animations and hover effects
- **Comprehensive Marketplace**: Full-featured e-commerce functionality

## API Integrations

### Amazon Product API
The application integrates with Amazon's Product Advertising API to fetch product data. For production use:
1. Sign up for the Amazon Product Advertising API
2. Get your Access Key, Secret Key, and Partner Tag
3. Configure these in the `.env` file

### Flipkart API
For Flipkart product integration:
1. Register as a Flipkart affiliate
2. Obtain your Affiliate ID and Token
3. Add these credentials to the `.env` file

### Google Custom Search API
For web search functionality:
1. Create a Google Cloud project
2. Enable the Custom Search API
3. Create API credentials
4. Set up a Custom Search Engine
5. Add the API key and Search Engine ID to the `.env` file

### Shopify Integration
To connect with a Shopify store:
1. Create a private app in your Shopify admin
2. Generate a Storefront access token
3. Configure the domain and token in the `.env` file

### Payment Gateways

#### Stripe
1. Create a Stripe account
2. Get your publishable and secret keys
3. Add them to the `.env` file

#### PayPal
1. Create a PayPal Developer account
2. Create an app to get client ID and secret
3. Configure these in the `.env` file

### Groq AI Integration
For voice and image recognition:
1. Sign up for Groq AI
2. Get your API key
3. Add it to the `.env` file

## Setup Instructions

1. Clone the repository
```bash
git clone https://github.com/yourusername/ecofinds.git
cd ecofinds
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file based on `.env.example` and add your API keys

4. Start the development server
```bash
npm run dev
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# Amazon Product API
AMAZON_ACCESS_KEY=your-amazon-access-key
AMAZON_SECRET_KEY=your-amazon-secret-key
AMAZON_PARTNER_TAG=your-amazon-partner-tag
AMAZON_HOST=webservices.amazon.com

# Flipkart API
FLIPKART_AFFILIATE_ID=your-flipkart-affiliate-id  
FLIPKART_AFFILIATE_TOKEN=your-flipkart-affiliate-token

# Google Custom Search API
GOOGLE_API_KEY=your-google-api-key
GOOGLE_SEARCH_ENGINE_ID=your-search-engine-id

# Shopify Store
SHOPIFY_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token

# Payment Gateway Credentials
STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
PAYPAL_CLIENT_ID=your-paypal-client-id
PAYPAL_CLIENT_SECRET=your-paypal-client-secret

# Groq AI Integration
GROQ_API_KEY=your-groq-api-key

# App Configuration
VITE_APP_NAME=EcoFinds
VITE_APP_API_URL=/api
VITE_APP_ENABLE_MOCK_SERVICES=true
```

## Development Mode

For development without actual API keys, the application uses mock services that return simulated data. This is controlled by the `VITE_APP_ENABLE_MOCK_SERVICES` environment variable.

## License

MIT
