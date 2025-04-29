
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Search, Plus } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import CompaniesTable from '@/components/features/companies/CompaniesTable';
import { Company } from '@/types/company';
import { fetchCompanies } from '@/services/companyService';

const Companies: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<keyof Company>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Fetch companies using React Query
  const { data: companies, isLoading, error } = useQuery({
    queryKey: ['companies'],
    queryFn: fetchCompanies
  });

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Filter companies based on search term
  const filteredCompanies = companies?.filter(company => 
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.country.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

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

  return (
    <DashboardLayout title="Empresas">
      <div className="px-4 md:px-6 py-4 md:py-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Empresas</h1>
          <div className="flex space-x-2 items-center">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar empresas..."
                className="pl-8 w-[200px] md:w-[250px]"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <Button onClick={handleNewCompany}>
              <Plus className="h-4 w-4 mr-2" />
              Nueva
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
            Error al cargar las empresas. Por favor, intenta de nuevo más tarde.
          </div>
        ) : (
          <CompaniesTable 
            companies={filteredCompanies}
            onRowClick={handleRowClick}
            sortKey={sortKey}
            sortDirection={sortDirection}
            onSort={handleSort}
          />
        )}
        
        {!isLoading && filteredCompanies.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground text-lg">
              {searchTerm ? "No se encontraron empresas con ese criterio de búsqueda." : "No hay empresas disponibles."}
            </p>
            <Button variant="outline" className="mt-4" onClick={handleNewCompany}>
              <Plus className="h-4 w-4 mr-2" />
              Crear nueva empresa
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Companies;
