
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface LogoUploaderProps {
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  companyName?: string;
}

const LogoUploader: React.FC<LogoUploaderProps> = ({ value, onChange, companyName = '' }) => {
  const { t } = useTranslation();
  const [isHovering, setIsHovering] = useState(false);
  
  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file type
    if (!['image/jpeg', 'image/png', 'image/svg+xml'].includes(file.type)) {
      console.error('Invalid file type. Please select an image file.');
      return;
    }
    
    // Create a URL for the selected image
    const fileUrl = URL.createObjectURL(file);
    onChange(fileUrl);
  };
  
  // Handle removing the uploaded image
  const handleRemove = () => {
    onChange(undefined);
  };
  
  // Get company initials for fallback avatar
  const getCompanyInitials = (name: string): string => {
    return name
      .split(' ')
      .map(part => part.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  };
  
  return (
    <div className="flex flex-col items-center">
      <div 
        className="relative"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Avatar className="h-32 w-32 rounded-md border bg-white">
          {value ? (
            <AvatarImage 
              src={value} 
              alt={companyName || 'Company logo'}
              className="object-contain p-1"
            />
          ) : (
            <AvatarFallback className="text-3xl rounded-md">
              {companyName ? getCompanyInitials(companyName) : <ImageIcon className="h-10 w-10 text-muted-foreground" />}
            </AvatarFallback>
          )}
        </Avatar>
        
        {/* Overlay buttons when hovering */}
        {isHovering && (
          <div className="absolute inset-0 flex items-center justify-center rounded-md bg-black/50">
            <div className="flex gap-2">
              <label>
                <input
                  type="file"
                  className="sr-only"
                  accept="image/png,image/jpeg,image/svg+xml"
                  onChange={handleFileSelect}
                />
                <Button 
                  variant="secondary" 
                  size="sm"
                  type="button"
                  className="bg-white/80 hover:bg-white"
                >
                  <Upload size={16} />
                </Button>
              </label>
              
              {value && (
                <Button 
                  variant="destructive" 
                  size="sm" 
                  type="button"
                  className="bg-destructive/80 hover:bg-destructive"
                  onClick={handleRemove}
                >
                  <X size={16} />
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Upload button below avatar */}
      <label className="mt-4 cursor-pointer">
        <input
          type="file"
          className="sr-only"
          accept="image/png,image/jpeg,image/svg+xml"
          onChange={handleFileSelect}
        />
        <Button 
          variant="outline" 
          type="button"
          className="text-sm"
        >
          <Upload size={16} className="mr-2" />
          {value ? t('companies.create.logoRemove') : t('companies.create.logoUpload')}
        </Button>
      </label>
      
      <p className="text-center text-xs text-muted-foreground mt-2">
        {t('companies.create.logoDescription')}
      </p>
    </div>
  );
};

export default LogoUploader;
