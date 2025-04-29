
import { Company } from '@/types/company';

// Sample companies data
const companiesData: Company[] = [
  {
    id: '1',
    name: 'Acme Inc.',
    sector: 'Technology',
    subsector: 'Software',
    country: 'United States',
    foundedYear: 2010,
    registrationId: 'US123456789',
    website: 'https://example.com',
    description: 'A leading software company specializing in business solutions.',
    valuationsCount: 3,
    latestValuation: {
      id: 'v1',
      value: 1500000,
      date: '2023-10-15'
    }
  },
  {
    id: '2',
    name: 'Global Tech',
    sector: 'Technology',
    subsector: 'Hardware',
    country: 'Germany',
    foundedYear: 2005,
    registrationId: 'DE987654321',
    website: 'https://globaltech.example',
    description: 'Innovative hardware solutions for enterprise customers.',
    valuationsCount: 2,
    latestValuation: {
      id: 'v2',
      value: 2300000,
      date: '2023-09-22'
    }
  },
  {
    id: '3',
    name: 'EcoFarms',
    sector: 'Agriculture',
    subsector: 'Sustainable Farming',
    country: 'Spain',
    foundedYear: 2015,
    valuationsCount: 1,
    latestValuation: {
      id: 'v3',
      value: 750000,
      date: '2023-11-05'
    }
  },
  {
    id: '4',
    name: 'City Finance',
    sector: 'Financial Services',
    subsector: 'Banking',
    country: 'United Kingdom',
    foundedYear: 1995,
    valuationsCount: 5,
    latestValuation: {
      id: 'v4',
      value: 5000000,
      date: '2023-10-30'
    }
  },
  {
    id: '5',
    name: 'Health Plus',
    sector: 'Healthcare',
    subsector: 'Medical Devices',
    country: 'France',
    foundedYear: 2008,
    valuationsCount: 0
  }
];

// Mock API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Fetch all companies
export const fetchCompanies = async (): Promise<Company[]> => {
  await delay(800); // Simulate API delay
  return [...companiesData];
};

// Fetch a single company by ID
export const fetchCompanyById = async (id: string): Promise<Company> => {
  await delay(600); // Simulate API delay
  
  const company = companiesData.find(company => company.id === id);
  
  if (!company) {
    throw new Error('Company not found');
  }
  
  return { ...company };
};

// Create a new company
// Define the required parameters more explicitly based on the Company type
export const createCompany = async (companyData: {
  name: string;  // Make name explicitly required
  sector: string;  // Make sector explicitly required
  subsector: string;  // Make subsector explicitly required
  country: string;  // Make country explicitly required
  tradingName?: string;
  foundedYear?: number;
  registrationId?: string;
  website?: string;
  description?: string;
  logoUrl?: string;
}): Promise<Company> => {
  await delay(1000); // Simulate API delay
  
  const newCompany: Company = {
    id: `${Math.floor(Math.random() * 10000)}`,
    ...companyData,
    valuationsCount: 0
  };
  
  companiesData.push(newCompany);
  
  return { ...newCompany };
};

// Update an existing company
export const updateCompany = async (company: Company): Promise<Company> => {
  await delay(800); // Simulate API delay
  
  const index = companiesData.findIndex(c => c.id === company.id);
  
  if (index === -1) {
    throw new Error('Company not found');
  }
  
  companiesData[index] = { ...company };
  
  return { ...company };
};

// Delete a company
export const deleteCompany = async (id: string): Promise<void> => {
  await delay(800); // Simulate API delay
  
  const index = companiesData.findIndex(company => company.id === id);
  
  if (index === -1) {
    throw new Error('Company not found');
  }
  
  companiesData.splice(index, 1);
};
