
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  showBackButton?: boolean;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items = [],
  showBackButton = false,
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex items-center space-x-2">
      {showBackButton && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="mr-2 h-8 w-8 p-0" 
          onClick={handleBack}
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Go back</span>
        </Button>
      )}
      
      {items.map((item, index) => (
        <React.Fragment key={item.href}>
          {index > 0 && (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
          
          <div>
            {index === items.length - 1 ? (
              <span className="text-sm font-medium">{item.label}</span>
            ) : (
              <Link
                to={item.href}
                className={cn(
                  "text-sm text-muted-foreground hover:text-foreground",
                  "transition-colors"
                )}
              >
                {item.label}
              </Link>
            )}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumbs;
