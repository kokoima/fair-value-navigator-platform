import React from 'react';
import { Bell, User, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const { t } = useTranslation();
  
  const handleBack = () => {
    navigate(-1);
  };
  
  // Helper function to translate path segments
  const translatePathSegment = (segment: string) => {
    // Try to find translation for known paths
    const translationKey = `header.breadcrumbs.${segment.toLowerCase()}`;
    const translated = t(translationKey);
    
    // If translation exists and is not the same as the key, use it
    if (translated !== translationKey) {
      return translated;
    }
    
    // Otherwise format the segment
    return segment
      .replace(/-/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
  };
  
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-2">
        {pathSegments.length > 0 && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleBack}
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">{t('header.breadcrumbs.goBack')}</span>
          </Button>
        )}
        
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="flex items-center">
                <Home className="h-4 w-4" />
                <span className="sr-only">{t('header.breadcrumbs.home')}</span>
              </BreadcrumbLink>
            </BreadcrumbItem>
            
            {pathSegments.map((segment, index) => {
              const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
              const isLast = index === pathSegments.length - 1;
              const translatedSegment = translatePathSegment(segment);
              
              return (
                <React.Fragment key={href}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {isLast ? (
                      <span className="text-sm font-medium">{translatedSegment}</span>
                    ) : (
                      <BreadcrumbLink href={href}>{translatedSegment}</BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <div className="flex items-center gap-2">
        <LanguageSelector />
        
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
          <span className="sr-only">{t('header.notifications')}</span>
        </Button>
        
        <Button variant="ghost" size="icon" className="rounded-full">
          <User className="h-5 w-5" />
          <span className="sr-only">{t('header.profile')}</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
