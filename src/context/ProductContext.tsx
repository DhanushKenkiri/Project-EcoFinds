
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product, ProductCategory, ProductCondition } from '../types';
import { mockProducts } from '../data/mockData';
import { toast } from 'sonner';
import { useAuth } from './AuthContext';

interface ProductContextType {
  products: Product[];
  userProducts: Product[];
  getProductById: (id: string) => Product | undefined;
  addProduct: (product: Omit<Product, 'id' | 'sellerId' | 'sellerName' | 'createdAt' | 'verified'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  filterProductsByCategory: (category: ProductCategory | 'all') => Product[];
  searchProducts: (query: string) => Product[];
}

const ProductContext = createContext<ProductContextType>({
  products: [],
  userProducts: [],
  getProductById: () => undefined,
  addProduct: () => {},
  updateProduct: () => {},
  deleteProduct: () => {},
  filterProductsByCategory: () => [],
  searchProducts: () => []
});

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>(mockProducts);
  
  const userProducts = user 
    ? products.filter(product => product.sellerId === user.id)
    : [];
  
  const getProductById = (id: string) => {
    return products.find(product => product.id === id);
  };
  
  const addProduct = (productData: Omit<Product, 'id' | 'sellerId' | 'sellerName' | 'createdAt' | 'verified'>) => {
    if (!user) {
      toast.error('You must be logged in to add a product');
      return;
    }
    
    const newProduct: Product = {
      ...productData,
      id: `prod_${Date.now()}`,
      sellerId: user.id,
      sellerName: user.username,
      createdAt: new Date(),
      verified: false,
      // These should come from productData now, but ensure they exist with defaults
      name: productData.name || productData.title,
      image: productData.image || (productData.images && productData.images.length > 0 ? productData.images[0] : '/placeholder.svg'),
      views: productData.views || 0
    };
    
    setProducts(prev => [newProduct, ...prev]);
    toast.success('Product added successfully');
  };
  
  const updateProduct = (id: string, updates: Partial<Product>) => {
    if (!user) {
      toast.error('You must be logged in to update a product');
      return;
    }
    
    setProducts(prev => 
      prev.map(product => 
        product.id === id
          ? { ...product, ...updates }
          : product
      )
    );
    toast.success('Product updated successfully');
  };
  
  const deleteProduct = (id: string) => {
    if (!user) {
      toast.error('You must be logged in to delete a product');
      return;
    }
    
    setProducts(prev => prev.filter(product => product.id !== id));
    toast.success('Product deleted successfully');
  };
  
  const filterProductsByCategory = (category: ProductCategory | 'all') => {
    if (category === 'all') return products;
    return products.filter(product => product.category === category);
  };
  
  const searchProducts = (query: string) => {
    const lowerQuery = query.toLowerCase();
    return products.filter(product => 
      product.title.toLowerCase().includes(lowerQuery) || 
      product.description.toLowerCase().includes(lowerQuery)
    );
  };
  
  return (
    <ProductContext.Provider value={{
      products,
      userProducts,
      getProductById,
      addProduct,
      updateProduct,
      deleteProduct,
      filterProductsByCategory,
      searchProducts
    }}>
      {children}
    </ProductContext.Provider>
  );
};
