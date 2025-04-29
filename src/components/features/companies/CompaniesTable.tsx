
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { Company } from '@/types/company';

interface CompaniesTableProps {
  companies: Company[];
  onRowClick: (id: string) => void;
  sortKey: keyof Company;
  sortDirection: 'asc' | 'desc';
  onSort: (key: keyof Company) => void;
}

const CompaniesTable: React.FC<CompaniesTableProps> = ({
  companies,
  onRowClick,
  sortKey,
  sortDirection,
  onSort
}) => {
  const { t } = useTranslation();
  
  // Sort companies based on current sort settings
  const sortedCompanies = [...companies].sort((a, b) => {
    const valueA = a[sortKey];
    const valueB = b[sortKey];
    
    if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
    if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // Get initials from company name for the avatar fallback
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(part => part.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  };

  // Handle image loading error
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.style.display = 'none';
  };
  
  return (
    <div className="flex flex-col space-y-1">
      <div className="flex items-center justify-between px-4 py-2">
        <h2 className="text-xl font-medium text-gray-500 flex items-center gap-1">
          {t('companies.title')} 
          <button onClick={() => onSort('name')} className="ml-1 focus:outline-none">
            {sortDirection === 'asc' 
              ? <ArrowDown className="h-4 w-4 inline" /> 
              : <ArrowUp className="h-4 w-4 inline" />}
          </button>
        </h2>
      </div>
      
      {sortedCompanies.map((company) => (
        <div 
          key={company.id}
          onClick={() => onRowClick(company.id)}
          className="flex items-center p-4 border-b cursor-pointer hover:bg-gray-50"
        >
          <div className="flex items-center gap-4 w-full">
            <div className="flex-shrink-0">
              <Avatar className="h-16 w-16 bg-background border rounded-md">
                {company.logoUrl ? (
                  <AvatarImage 
                    src={company.logoUrl} 
                    alt={company.name} 
                    onError={handleImageError}
                    className="object-contain p-1"
                  />
                ) : (
                  <AvatarFallback className="text-sm rounded-md">
                    {getInitials(company.name)}
                  </AvatarFallback>
                )}
              </Avatar>
            </div>
            <div>
              <h3 className="text-lg font-medium">{company.name}</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompaniesTable;
