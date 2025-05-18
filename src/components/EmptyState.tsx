import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

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
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      <div className="h-24 w-24 rounded-full bg-muted/30 flex items-center justify-center mb-6">
        {icon || <Search className="h-10 w-10 text-muted-foreground" />}
      </div>
      <h2 className="text-2xl font-bold mb-2 text-foreground">{title}</h2>
      <p className="text-muted-foreground mb-6 max-w-md">{description}</p>
      
      {action && action}
      
      {!action && actionLabel && (actionLink || actionOnClick) && (
        actionLink ? (
          <Link to={actionLink}>
            <Button>{actionLabel}</Button>
          </Link>
        ) : (
          <Button onClick={actionOnClick}>
            {actionLabel}
          </Button>
        )
      )}
    </div>
  );
};

export default EmptyState;
