
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
}

const Logo: React.FC<LogoProps> = ({ size = 'medium' }) => {
  // Size classes
  const sizeClasses = {
    small: 'h-6',
    medium: 'h-8',
    large: 'h-10'
  };

  // The logo container classes
  const logoClasses = `flex items-center gap-2 ${sizeClasses[size]}`;

  return (
    <Link to="/" className={logoClasses}>
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 bg-eco rounded-full opacity-20 animate-pulse"></div>
        <div className="relative z-10 bg-eco text-white rounded-full p-1 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={sizeClasses[size]}>
            <path d="M5 18a7 7 0 1 1 14 0"></path>
            <path d="M19 6.3a9 9 0 0 1 1.8 3.9"></path>
            <path d="M21 2.1a13.4 13.4 0 0 1 1.9 5.9"></path>
            <path d="M9 18h12"></path>
            <path d="M9 6v12"></path>
          </svg>
        </div>
      </div>
      <span className="font-bold tracking-wide text-xl">EcoFinds</span>
    </Link>
  );
};

export default Logo;
