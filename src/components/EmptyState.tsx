
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  actionLink?: string;
  actionOnClick?: () => void;
}

const EmptyState = ({
  icon,
  title,
  description,
  actionLabel,
  actionLink,
  actionOnClick,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-4">
      <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center mb-6">
        {icon}
      </div>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-muted-foreground mb-6 max-w-md">{description}</p>
      {actionLabel && (actionLink || actionOnClick) && (
        actionLink ? (
          <Link to={actionLink}>
            <Button className="bg-eco">{actionLabel}</Button>
          </Link>
        ) : (
          <Button className="bg-eco" onClick={actionOnClick}>
            {actionLabel}
          </Button>
        )
      )}
    </div>
  );
};

export default EmptyState;
