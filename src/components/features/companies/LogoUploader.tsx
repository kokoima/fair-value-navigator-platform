
import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LogoUploaderProps {
  initialLogo?: string | null;
  onLogoChange: (file: File | null, preview: string | null) => void;
}

const LogoUploader: React.FC<LogoUploaderProps> = ({ initialLogo, onLogoChange }) => {
  const { t } = useTranslation();
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialLogo || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        alert(t('companies.detail.invalidImageType'));
        return;
      }
      
      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert(t('companies.detail.imageTooLarge'));
        return;
      }
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = () => {
        const preview = reader.result as string;
        setPreviewUrl(preview);
        onLogoChange(file, preview);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
      onLogoChange(null, null);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeLogo = () => {
    setPreviewUrl(null);
    onLogoChange(null, null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-4">
        {previewUrl ? (
          <div className="w-32 h-32 rounded-md border flex items-center justify-center overflow-hidden bg-gray-50">
            <img 
              src={previewUrl} 
              alt="Company Logo Preview" 
              className="max-w-full max-h-full object-contain"
            />
          </div>
        ) : (
          <div className="w-32 h-32 rounded-md border flex items-center justify-center bg-gray-50 text-muted-foreground">
            {t('companies.detail.noLogo')}
          </div>
        )}
        
        <div className="flex flex-col space-y-2">
          <Button type="button" size="sm" onClick={triggerFileInput}>
            <Upload className="h-4 w-4 mr-2" />
            {previewUrl ? t('companies.detail.changeLogo') : t('companies.detail.uploadLogo')}
          </Button>
          
          {previewUrl && (
            <Button type="button" variant="outline" size="sm" onClick={removeLogo}>
              {t('companies.detail.removeLogo')}
            </Button>
          )}
          <p className="text-xs text-muted-foreground">
            {t('companies.detail.logoRequirements')}
          </p>
        </div>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        aria-label={t('companies.detail.uploadLogo')}
      />
    </div>
  );
};

export default LogoUploader;
