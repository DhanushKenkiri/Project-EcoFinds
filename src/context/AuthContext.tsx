
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, username: string, password: string) => Promise<boolean>;
  register: (email: string, username: string, password: string) => Promise<boolean>;
  logout: () => void;
  connectWallet: () => Promise<boolean>;
  disconnectWallet: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('ecofinds_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse user from localStorage', error);
        localStorage.removeItem('ecofinds_user');
      }
    }
    
    setIsLoading(false);
  }, []);
  
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would validate credentials with a backend
      if (email === 'user@example.com' && password === 'password') {
        const newUser: User = {
          id: '1',
          username: 'demouser',
          email: 'user@example.com',
          createdAt: new Date().toISOString() // Convert Date to string
        };
        
        setUser(newUser);
        localStorage.setItem('ecofinds_user', JSON.stringify(newUser));
        toast.success('Login successful!');
        return true;
      } else {
        toast.error('Invalid credentials');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const signup = async (email: string, username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would call your backend API
      const newUser: User = {
        id: Date.now().toString(),
        username,
        email,
        createdAt: new Date().toISOString() // Convert Date to string
      };
      
      setUser(newUser);
      localStorage.setItem('ecofinds_user', JSON.stringify(newUser));
      toast.success('Account created successfully!');
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('Failed to create account');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Add an alias for signup as register to match the interface
  const register = signup;
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('ecofinds_user');
    toast.info('Logged out');
  };
  
  const connectWallet = async (): Promise<boolean> => {
    try {
      // Check if MetaMask is installed
      if (typeof window !== 'undefined' && window.ethereum) {
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        if (accounts && accounts.length > 0) {
          const walletAddress = accounts[0];
          
          if (user) {
            const updatedUser = { ...user, walletAddress };
            setUser(updatedUser);
            localStorage.setItem('ecofinds_user', JSON.stringify(updatedUser));
          }
          
          toast.success('Wallet connected!');
          return true;
        }
      } else {
        toast.error('MetaMask not installed');
        window.open('https://metamask.io/download.html', '_blank');
      }
      return false;
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast.error('Failed to connect wallet');
      return false;
    }
  };
  
  const disconnectWallet = () => {
    if (user && user.walletAddress) {
      const updatedUser = { ...user };
      delete updatedUser.walletAddress;
      
      setUser(updatedUser);
      localStorage.setItem('ecofinds_user', JSON.stringify(updatedUser));
      toast.info('Wallet disconnected');
    }
  };
  
  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      signup,
      register,
      logout,
      connectWallet,
      disconnectWallet
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Add TypeScript declaration for window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}
