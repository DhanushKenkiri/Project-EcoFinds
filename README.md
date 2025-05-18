# EcoFinds Marketplace

A modern eco-friendly marketplace with advanced features including multi-platform product search, AI-powered voice and image recognition, and integrated payment gateways.

## Demo Video
Check out our demo video to see EcoFinds in action:

[![EcoFinds Demo](https://img.youtube.com/vi/iV4Wq-vGa7E/0.jpg)](https://youtu.be/iV4Wq-vGa7E)

## Technologies Used

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS with animations
- **UI Components**: Shadcn UI (based on Radix UI)
- **State Management**: React Context API
- **Data Fetching**: TanStack React Query
- **Routing**: React Router DOM
- **Form Handling**: React Hook Form with Zod validation
- **Date Handling**: date-fns
- **Payment Gateways**: Stripe and PayPal
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Toast Notifications**: Sonner
- **Carousel**: Embla Carousel
- **Blockchain Integration**: Custom Blockchain Context

## Features

- **Multi-Platform Product Search**: Search across Amazon, Flipkart, Shopify, and more
- **AI-Powered Features**: Voice search and image recognition powered by Groq AI
- **Payment Integrations**: Stripe and PayPal payment gateways
- **Modern UI**: Attractive, responsive design with animations and hover effects
- **Comprehensive Marketplace**: Full-featured e-commerce functionality
- **User Authentication**: Login and signup functionality
- **Product Management**: Add, edit, and manage product listings
- **Shopping Cart**: Dynamic cart functionality with real-time updates
- **Checkout Process**: Streamlined checkout with multiple payment options
- **Order Management**: Track and manage orders
- **User Profiles**: Personalized user profiles
- **Responsive Design**: Works on mobile, tablet, and desktop devices

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

## Project Structure

- `src/components`: UI Components including Shadcn UI components
- `src/pages`: All application pages (Home, Explore, Product Detail, etc.)
- `src/context`: React Context providers for state management
- `src/services`: API service integrations
- `src/hooks`: Custom React hooks
- `src/utils`: Utility functions
- `src/types`: TypeScript type definitions
- `src/lib`: Shared libraries and configurations

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

5. Build for production
```bash
npm run build
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

## Implemented Pages

- **Home**: Landing page with featured products and categories
- **Explore**: Browse and filter products by various criteria
- **Product Detail**: View detailed product information
- **Cart**: Review items in shopping cart
- **Checkout**: Complete purchase with various payment methods
- **AI Features**: Voice and image recognition for product search
- **Login/Signup**: User authentication
- **Profile**: User profile management
- **Sell Product**: Create and publish product listings
- **My Listings**: Manage your product listings
- **Orders**: Track and manage orders

## License

MIT
