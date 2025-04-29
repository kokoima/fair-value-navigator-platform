
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, Plus } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import CompaniesTable from '@/components/features/companies/CompaniesTable';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { Company } from '@/types/company';
import { fetchCompanies } from '@/services/companyService';

const Companies: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<keyof Company>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Changed from 5 to 10

  // Fetch companies using React Query
  const { data: companies, isLoading, error } = useQuery({
    queryKey: ['companies'],
    queryFn: fetchCompanies
  });

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Filter companies based on search term
  const filteredCompanies = companies?.filter(company => 
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.country.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // Calculate pagination
  const totalItems = filteredCompanies.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentItems = filteredCompanies.slice(startIndex, endIndex);

  // Handle sorting changes
  const handleSort = (key: keyof Company) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  // Navigate to company details page
  const handleRowClick = (companyId: string) => {
    navigate(`/companies/${companyId}`);
  };

  // Navigate to new company page
  const handleNewCompany = () => {
    navigate('/companies/new');
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Generate pagination links
  const renderPaginationLinks = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={currentPage === i}
            onClick={() => handlePageChange(i)}
            aria-label={`${t('pagination.page')} ${i}`}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return pages;
  };

  return (
    <DashboardLayout title={t('companies.title')}>
      <div className="px-4 md:px-6 py-4 md:py-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{t('companies.title')}</h1>
          <div className="flex space-x-2 items-center">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t('companies.search')}
                className="pl-8 w-[200px] md:w-[250px]"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <Button onClick={handleNewCompany}>
              <Plus className="h-4 w-4 mr-2" />
              {t('companies.add')}
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        ) : error ? (
          <div className="p-4 border border-red-200 bg-red-50 text-red-700 rounded-md">
            {t('companies.errorLoading')}
          </div>
        ) : (
          <>
            <CompaniesTable 
              companies={currentItems}
              onRowClick={handleRowClick}
              sortKey={sortKey}
              sortDirection={sortDirection}
              onSort={handleSort}
            />
            
            {totalPages > 1 && (
              <div className="mt-6">
                <div className="text-sm text-muted-foreground mb-2 text-center">
                  {t('pagination.showing')} {startIndex + 1} {t('pagination.to')} {endIndex} {t('pagination.of')} {totalItems} {t('pagination.results')}
                </div>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => handlePageChange(currentPage - 1)} 
                        aria-disabled={currentPage === 1}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                      />
                    </PaginationItem>
                    
                    {renderPaginationLinks()}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => handlePageChange(currentPage + 1)} 
                        aria-disabled={currentPage === totalPages}
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}
        
        {!isLoading && filteredCompanies.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground text-lg">
              {searchTerm ? t('companies.noSearchResults') : t('companies.noCompanies')}
            </p>
            <Button variant="outline" className="mt-4" onClick={handleNewCompany}>
              <Plus className="h-4 w-4 mr-2" />
              {t('companies.createNew')}
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Companies;
