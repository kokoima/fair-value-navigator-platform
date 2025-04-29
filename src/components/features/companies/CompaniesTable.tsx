
import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';
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

  const SortIndicator = ({ columnKey }: { columnKey: keyof Company }) => {
    if (columnKey !== sortKey) return null;
    
    return sortDirection === 'asc' 
      ? <ArrowUp className="ml-1 h-4 w-4 inline" /> 
      : <ArrowDown className="ml-1 h-4 w-4 inline" />;
  };
  
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
              className="cursor-pointer"
              onClick={() => onSort('name')}
            >
              {t('companies.table.name')}
              <SortIndicator columnKey="name" />
            </TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => onSort('sector')}
            >
              {t('companies.table.sector')}
              <SortIndicator columnKey="sector" />
            </TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => onSort('country')}
            >
              {t('companies.table.country')}
              <SortIndicator columnKey="country" />
            </TableHead>
            <TableHead>
              {t('companies.table.latestValuation')}
            </TableHead>
            <TableHead className="text-center">
              {t('companies.table.valuations')}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedCompanies.map((company) => (
            <TableRow 
              key={company.id} 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => onRowClick(company.id)}
            >
              <TableCell className="font-medium">{company.name}</TableCell>
              <TableCell>{company.sector}</TableCell>
              <TableCell>{company.country}</TableCell>
              <TableCell>
                {company.latestValuation ? (
                  <span className="text-primary">
                    {formatCurrency(company.latestValuation.value)}
                  </span>
                ) : (
                  <Badge variant="outline" className="bg-muted">
                    {t('companies.table.noValuation')}
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-center">
                <Badge>{company.valuationsCount || 0}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
