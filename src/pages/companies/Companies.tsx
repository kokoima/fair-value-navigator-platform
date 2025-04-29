
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/layout/DashboardLayout';
import CompaniesTable from '@/components/features/companies/CompaniesTable';
import { fetchCompanies } from '@/services/companyService';

const Companies: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch companies
  const { data: companies, isLoading, error } = useQuery({
    queryKey: ['companies'],
    queryFn: fetchCompanies
  });

  // Filter companies based on search term
  const filteredCompanies = React.useMemo(() => {
    if (!companies) return [];
    if (!searchTerm.trim()) return companies;
    
    const search = searchTerm.toLowerCase();
    return companies.filter((company) => 
      company.name.toLowerCase().includes(search) || 
      company.sector.toLowerCase().includes(search) || 
      company.country.toLowerCase().includes(search)
    );
  }, [companies, searchTerm]);

  return (
    <DashboardLayout title={t('companies.title')}>
      <div className="px-4 md:px-6 py-4 md:py-6">
        {/* Header section */}
        <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center md:space-y-0 mb-6">
          <h1 className="text-2xl font-bold">{t('companies.title')}</h1>
          
          <div className="flex items-center space-x-4">
            {/* Search input */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t('companies.search')}
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Create company button */}
            <Button asChild>
              <Link to="/companies/create">
                <Plus className="mr-2 h-4 w-4" />
                {t('companies.add')}
              </Link>
            </Button>
          </div>
        </div>

        {/* Company listing */}
        <div className="bg-card rounded-md border">
          {error ? (
            <div className="p-6 text-center">
              <p className="text-destructive">{t('companies.errorLoading')}</p>
            </div>
          ) : (
            <CompaniesTable 
              companies={filteredCompanies} 
              isLoading={isLoading}
              showEmptyState={!isLoading && filteredCompanies.length === 0}
              showNoResults={!isLoading && companies && companies.length > 0 && filteredCompanies.length === 0}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Companies;
