
import { Company } from '@/types/company';

// Mock data for demonstration purposes
// This would normally be replaced with actual API calls
const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'Acme Corporation',
    tradingName: 'Acme Corp',
    sector: 'Tecnología',
    subsector: 'Software',
    country: 'Estados Unidos',
    foundedYear: 2010,
    registrationId: 'US12345',
    website: 'https://acme.example.com',
    description: 'Empresa de tecnología especializada en software de gestión empresarial.',
    logoUrl: '/lovable-uploads/d1d26cf3-058a-4ddc-8f33-547f69066f5c.png',
    valuationsCount: 3,
    latestValuation: {
      id: 'val1',
      value: 5500000,
      date: '2023-09-15'
    }
  },
  {
    id: '2',
    name: 'Globex Industries',
    tradingName: 'Globex',
    sector: 'Finanzas',
    subsector: 'Seguros',
    country: 'España',
    foundedYear: 2005,
    registrationId: 'ES67890',
    website: 'https://globex.example.com',
    description: 'Compañía de seguros con operaciones en toda Europa.',
    logoUrl: '/placeholder.svg',
    valuationsCount: 2,
    latestValuation: {
      id: 'val2',
      value: 3200000,
      date: '2023-08-22'
    }
  },
  {
    id: '3',
    name: 'Oceanic Airlines',
    tradingName: 'Oceanic',
    sector: 'Transporte',
    subsector: 'Aerolíneas',
    country: 'Reino Unido',
    foundedYear: 1998,
    registrationId: 'UK54321',
    website: 'https://oceanic.example.com',
    description: 'Aerolínea internacional con rutas en todo el mundo.',
    logoUrl: '/placeholder.svg',
    valuationsCount: 0,
    latestValuation: undefined
  },
  {
    id: '4',
    name: 'Stark Industries',
    tradingName: 'Stark',
    sector: 'Manufactura',
    subsector: 'Energía',
    country: 'Estados Unidos',
    foundedYear: 1992,
    registrationId: 'US98765',
    website: 'https://stark.example.com',
    description: 'Empresa líder en energías renovables y tecnologías limpias.',
    logoUrl: '/placeholder.svg',
    valuationsCount: 5,
    latestValuation: {
      id: 'val3',
      value: 12800000,
      date: '2023-10-01'
    }
  },
  {
    id: '5',
    name: 'Umbrella Corporation',
    tradingName: 'Umbrella Corp',
    sector: 'Farmacéutica',
    subsector: 'Investigación',
    country: 'Japón',
    foundedYear: 2000,
    registrationId: 'JP24680',
    website: 'https://umbrella.example.com',
    description: 'Empresa dedicada a la investigación y desarrollo de productos farmacéuticos.',
    logoUrl: '/placeholder.svg',
    valuationsCount: 1,
    latestValuation: {
      id: 'val4',
      value: 7300000,
      date: '2023-07-12'
    }
  }
];

// Simulates fetching companies from an API
export const fetchCompanies = async (): Promise<Company[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return mockCompanies;
};

// Simulates fetching a single company by ID
export const fetchCompanyById = async (id: string): Promise<Company> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const company = mockCompanies.find(c => c.id === id);
  if (!company) {
    throw new Error(`Company with ID ${id} not found`);
  }
  
  return company;
};

// Add more company-related API methods as needed
