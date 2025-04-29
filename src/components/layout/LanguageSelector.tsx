
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages, Check, Bug } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';

const LanguageSelector: React.FC = () => {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const getLanguageDisplay = () => {
    switch (currentLanguage) {
      case 'en': return t('language.en');
      case 'es': return t('language.es');
      case 'debug': return 'Debug';
      default: return t('language.en');
    }
  };

  const getLanguageIcon = () => {
    if (currentLanguage === 'debug') {
      return <Bug className="h-4 w-4 mr-1" />;
    }
    return <Languages className="h-4 w-4 mr-1" />;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-1 px-3">
          {getLanguageIcon()}
          <span className="hidden sm:inline">{getLanguageDisplay()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{t('language.currentLanguage')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => changeLanguage('en')} className="flex justify-between">
          {t('language.en')}
          {currentLanguage === 'en' && <Check className="h-4 w-4 ml-2" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('es')} className="flex justify-between">
          {t('language.es')}
          {currentLanguage === 'es' && <Check className="h-4 w-4 ml-2" />}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => changeLanguage('debug')} className="flex justify-between">
          <div className="flex items-center">
            <Bug className="h-4 w-4 mr-2" />
            Debug Mode
          </div>
          {currentLanguage === 'debug' && <Check className="h-4 w-4 ml-2" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
