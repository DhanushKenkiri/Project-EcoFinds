
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BlockchainTransaction } from '../types';
import { toast } from 'sonner';

interface BlockchainContextType {
  isProcessing: boolean;
  verifyProduct: (productId: string) => Promise<boolean>;
  purchaseWithCrypto: (productId: string, amount: number) => Promise<boolean>;
  transactions: BlockchainTransaction[];
}

const BlockchainContext = createContext<BlockchainContextType>({
  isProcessing: false,
  verifyProduct: async () => false,
  purchaseWithCrypto: async () => false,
  transactions: []
});

export const useBlockchain = () => useContext(BlockchainContext);

export const BlockchainProvider = ({ children }: { children: ReactNode }) => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<BlockchainTransaction[]>([]);

  // Mock function to simulate product verification on blockchain
  const verifyProduct = async (productId: string): Promise<boolean> => {
    setIsProcessing(true);
    
    try {
      // Simulate blockchain interaction delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create a mock transaction
      const mockTransaction: BlockchainTransaction = {
        txHash: `0x${Math.random().toString(16).substr(2, 40)}`,
        from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        to: '0xEcoFindsContractAddress',
        tokenId: `token_${productId}`,
        timestamp: new Date(),
        status: 'confirmed'
      };
      
      setTransactions(prev => [...prev, mockTransaction]);
      toast.success('Product verification complete');
      return true;
    } catch (error) {
      toast.error('Verification failed');
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  // Mock function to simulate crypto payment
  const purchaseWithCrypto = async (productId: string, amount: number): Promise<boolean> => {
    setIsProcessing(true);
    
    try {
      // Simulate blockchain interaction delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Create a mock transaction
      const mockTransaction: BlockchainTransaction = {
        txHash: `0x${Math.random().toString(16).substr(2, 40)}`,
        from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        to: '0xSellerWalletAddress',
        tokenId: `purchase_${productId}`,
        timestamp: new Date(),
        status: 'confirmed'
      };
      
      setTransactions(prev => [...prev, mockTransaction]);
      toast.success('Purchase complete');
      return true;
    } catch (error) {
      toast.error('Transaction failed');
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <BlockchainContext.Provider value={{
      isProcessing,
      verifyProduct,
      purchaseWithCrypto,
      transactions
    }}>
      {children}
    </BlockchainContext.Provider>
  );
};
