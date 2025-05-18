
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import EmptyState from '@/components/EmptyState';

const NotFound = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <EmptyState 
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        }
        title="Page Not Found"
        description="The page you are looking for doesn't exist or has been moved."
        actionLabel="Back to Home"
        actionLink="/"
      />
    </div>
  );
};

export default NotFound;
