import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  actionLabel?: string;
  actionLink?: string;
  actionOnClick?: () => void;
}

const EmptyState = ({
  icon,
  title,
  description,
  action,
  actionLabel,
  actionLink,
  actionOnClick,
}: EmptyStateProps) => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center text-center py-16 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="h-24 w-24 rounded-full glass-effect flex items-center justify-center mb-6"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20,
          delay: 0.1 
        }}
      >
        {icon || <Search className="h-10 w-10 text-primary" />}
      </motion.div>
      
      <motion.h2 
        className="text-2xl font-bold mb-2 text-foreground text-glow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {title}
      </motion.h2>
      
      <motion.p 
        className="text-muted-foreground mb-8 max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {description}
      </motion.p>
      
      {action && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {action}
        </motion.div>
      )}
      
      {!action && actionLabel && (actionLink || actionOnClick) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {actionLink ? (
            <Link to={actionLink}>
              <Button className="btn-animated">{actionLabel}</Button>
            </Link>
          ) : (
            <Button className="btn-animated" onClick={actionOnClick}>
              {actionLabel}
            </Button>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default EmptyState;
