
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
    logoUrl: '/lovable-uploads/13e44b7b-1694-4c40-8dfb-0859a121aa7d.png',
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
    logoUrl: '/lovable-uploads/f4a015a8-24f1-4d3d-acff-283e12a9ab4e.png',
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
    logoUrl: '/lovable-uploads/7c2d64a9-fa79-4d1e-a77a-706b9083c673.png',
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
    logoUrl: '/lovable-uploads/8edf9211-2e44-4d08-9674-58adf152b43d.png',
    valuationsCount: 1,
    latestValuation: {
      id: 'val4',
      value: 7300000,
      date: '2023-07-12'
    }
  },
  {
    id: '6',
    name: 'Wayne Enterprises',
    tradingName: 'Wayne Corp',
    sector: 'Tecnología',
    subsector: 'Investigación',
    country: 'Estados Unidos',
    foundedYear: 1965,
    registrationId: 'US45678',
    website: 'https://wayne.example.com',
    description: 'Conglomerado con inversiones en tecnología, defensa e investigación.',
    logoUrl: '/lovable-uploads/9f747365-c34d-4364-9304-452b8b5bbe79.png',
    valuationsCount: 8,
    latestValuation: {
      id: 'val5',
      value: 41200000,
      date: '2023-11-05'
    }
  },
  {
    id: '7',
    name: 'LexCorp',
    tradingName: 'LexCorp',
    sector: 'Tecnología',
    subsector: 'Innovación',
    country: 'Estados Unidos',
    foundedYear: 1983,
    registrationId: 'US78901',
    website: 'https://lexcorp.example.com',
    description: 'Empresa de tecnología con enfoque en innovación y desarrollo sostenible.',
    logoUrl: '/lovable-uploads/c5131d28-a5b2-40b7-808c-1bf066cbe9a8.png',
    valuationsCount: 4,
    latestValuation: {
      id: 'val6',
      value: 23700000,
      date: '2023-10-18'
    }
  },
  {
    id: '8',
    name: 'Oscorp Industries',
    tradingName: 'Oscorp',
    sector: 'Química',
    subsector: 'Investigación',
    country: 'Estados Unidos',
    foundedYear: 1989,
    registrationId: 'US13579',
    website: 'https://oscorp.example.com',
    description: 'Empresa especializada en desarrollo de nuevos materiales y compuestos químicos.',
    logoUrl: '/lovable-uploads/32cc4a3b-a855-4cf4-bf92-6352f82e3b5a.png',
    valuationsCount: 2,
    latestValuation: {
      id: 'val7',
      value: 14900000,
      date: '2023-09-30'
    }
  },
  {
    id: '9',
    name: 'Massive Dynamic',
    tradingName: 'Massive',
    sector: 'Tecnología',
    subsector: 'Biotecnología',
    country: 'Estados Unidos',
    foundedYear: 2002,
    registrationId: 'US24680',
    website: 'https://massivedynamic.example.com',
    description: 'Empresa de vanguardia en investigación biotecnológica y médica.',
    logoUrl: '/lovable-uploads/2c4d2f17-c276-444d-9c60-4b3a4d4dc76a.png',
    valuationsCount: 6,
    latestValuation: {
      id: 'val8',
      value: 33500000,
      date: '2023-11-22'
    }
  },
  {
    id: '10',
    name: 'Soylent Corp',
    tradingName: 'Soylent',
    sector: 'Alimentación',
    subsector: 'Innovación alimentaria',
    country: 'Estados Unidos',
    foundedYear: 2010,
    registrationId: 'US36912',
    website: 'https://soylent.example.com',
    description: 'Empresa dedicada al desarrollo de alternativas alimenticias sostenibles.',
    logoUrl: '/lovable-uploads/cbd6346f-281f-4424-aadb-c2b0ae3d87fc.png',
    valuationsCount: 3,
    latestValuation: {
      id: 'val9',
      value: 8700000,
      date: '2023-08-05'
    }
  },
  {
    id: '11',
    name: 'Cyberdyne Systems',
    tradingName: 'Cyberdyne',
    sector: 'Tecnología',
    subsector: 'Robótica',
    country: 'Estados Unidos',
    foundedYear: 1990,
    registrationId: 'US14725',
    website: 'https://cyberdyne.example.com',
    description: 'Empresa líder en desarrollo de sistemas robóticos avanzados.',
    logoUrl: '/lovable-uploads/13e44b7b-1694-4c40-8dfb-0859a121aa7d.png',
    valuationsCount: 7,
    latestValuation: {
      id: 'val10',
      value: 27500000,
      date: '2023-12-01'
    }
  },
  {
    id: '12',
    name: 'InGen Technologies',
    tradingName: 'InGen',
    sector: 'Biotecnología',
    subsector: 'Genética',
    country: 'Costa Rica',
    foundedYear: 1985,
    registrationId: 'CR25836',
    website: 'https://ingen.example.com',
    description: 'Empresa especializada en investigación genética y clonación.',
    logoUrl: '/lovable-uploads/f4a015a8-24f1-4d3d-acff-283e12a9ab4e.png',
    valuationsCount: 4,
    latestValuation: {
      id: 'val11',
      value: 19800000,
      date: '2023-10-12'
    }
  },
  {
    id: '13',
    name: 'Aperture Science',
    tradingName: 'Aperture',
    sector: 'Tecnología',
    subsector: 'Investigación',
    country: 'Estados Unidos',
    foundedYear: 1943,
    registrationId: 'US36947',
    website: 'https://aperturescience.example.com',
    description: 'Compañía dedicada a la investigación científica experimental.',
    logoUrl: '/lovable-uploads/7c2d64a9-fa79-4d1e-a77a-706b9083c673.png',
    valuationsCount: 2,
    latestValuation: {
      id: 'val12',
      value: 15300000,
      date: '2023-09-08'
    }
  },
  {
    id: '14',
    name: 'Tyrell Corporation',
    tradingName: 'Tyrell',
    sector: 'Biotecnología',
    subsector: 'Ingeniería genética',
    country: 'Estados Unidos',
    foundedYear: 1975,
    registrationId: 'US15937',
    website: 'https://tyrell.example.com',
    description: 'Empresa pionera en el campo de la ingeniería genética avanzada.',
    logoUrl: '/lovable-uploads/8edf9211-2e44-4d08-9674-58adf152b43d.png',
    valuationsCount: 5,
    latestValuation: {
      id: 'val13',
      value: 30600000,
      date: '2023-11-17'
    }
  },
  {
    id: '15',
    name: 'Weyland-Yutani',
    tradingName: 'Weyland Corp',
    sector: 'Espacial',
    subsector: 'Exploración',
    country: 'Reino Unido',
    foundedYear: 1973,
    registrationId: 'UK28461',
    website: 'https://weyland-yutani.example.com',
    description: 'Corporación dedicada a la exploración espacial y explotación de recursos extraterrestres.',
    logoUrl: '/lovable-uploads/9f747365-c34d-4364-9304-452b8b5bbe79.png',
    valuationsCount: 9,
    latestValuation: {
      id: 'val14',
      value: 67200000,
      date: '2023-12-15'
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
