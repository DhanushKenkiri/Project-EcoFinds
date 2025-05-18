import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { motion } from 'framer-motion';

interface MainLayoutProps {
  onSearch?: (query: string) => void;
}

const MainLayout = ({ onSearch }: MainLayoutProps) => {
  // Add viewport meta tag for better mobile responsiveness
  useEffect(() => {
    // Check if viewport meta tag exists
    let viewportMeta = document.querySelector('meta[name="viewport"]');
    
    // If it doesn't exist, create it
    if (!viewportMeta) {
      viewportMeta = document.createElement('meta');
      viewportMeta.setAttribute('name', 'viewport');
      document.head.appendChild(viewportMeta);
    }
    
    // Set the content attribute
    viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    
    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background relative">
      {/* Background elements - adjusted for mobile */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Radial gradient - adjusted for smaller screens */}
        <div className="absolute inset-0 opacity-50"
          style={{
            background: 'radial-gradient(circle at 120% 20%, hsla(var(--primary) / 0.15) 0%, transparent 70%)'
          }}
        />
        
        {/* Background blurred shapes - adjusted for mobile */}
        <div className="absolute top-[20%] right-[10%] w-64 md:w-96 h-64 md:h-96 rounded-full bg-primary/5 blur-3xl"/>
        <div className="absolute bottom-[5%] left-[5%] w-40 md:w-64 h-40 md:h-64 rounded-full bg-accent/5 blur-3xl"/>
        <div className="absolute top-[60%] left-[30%] w-48 md:w-80 h-48 md:h-80 rounded-full bg-secondary/5 blur-3xl"/>
        
        {/* Grid pattern overlay - smaller grid on mobile */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(to right, hsl(var(--foreground) / 0.1) 1px, transparent 1px), 
                              linear-gradient(to bottom, hsl(var(--foreground) / 0.1) 1px, transparent 1px)`,
            backgroundSize: 'clamp(30px, 5vw, 50px) clamp(30px, 5vw, 50px)',
          }}
        />
      </div>
      
      {/* Header */}
      <motion.div
        className="sticky top-0 z-40 w-full"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 20 }}
      >
        <div className="marketplace-header backdrop-blur-md bg-card/80 border-b border-border/60">
          <Header onSearch={onSearch} />
        </div>
      </motion.div>
      
      {/* Main Content - adjusted padding for mobile */}
      <motion.main 
        className="flex-1 relative z-10 px-4 md:px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Outlet />
      </motion.main>
      
      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="relative z-10"
      >
        <Footer />
      </motion.div>
    </div>
  );
};

export default MainLayout;
