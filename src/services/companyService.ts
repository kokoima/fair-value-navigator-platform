
import { Company } from '@/types/company';

// Mock data for demonstration purposes
// This would normally be replaced with actual API calls
const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'Logoipsum Network',
    tradingName: 'Logoipsum Net',
    sector: 'Tecnología',
    subsector: 'Software',
    country: 'Estados Unidos',
    foundedYear: 2010,
    registrationId: 'US12345',
    website: 'https://logoipsum-network.example.com',
    description: 'Empresa de tecnología especializada en software de gestión empresarial.',
    logoUrl: '/logos/1.png',
    valuationsCount: 3,
    latestValuation: {
      id: 'val1',
      value: 5500000,
      date: '2023-09-15'
    }
  },
  {
    id: '2',
    name: 'Logoipsum Lion',
    tradingName: 'Logoipsum',
    sector: 'Finanzas',
    subsector: 'Seguros',
    country: 'España',
    foundedYear: 2005,
    registrationId: 'ES67890',
    website: 'https://logoipsum-lion.example.com',
    description: 'Compañía de seguros con operaciones en toda Europa.',
    logoUrl: '/logos/2.png',
    valuationsCount: 2,
    latestValuation: {
      id: 'val2',
      value: 3200000,
      date: '2023-08-22'
    }
  },
  {
    id: '3',
    name: 'Logoipsum University',
    tradingName: 'LogoU',
    sector: 'Educación',
    subsector: 'Universidad',
    country: 'Reino Unido',
    foundedYear: 1998,
    registrationId: 'UK54321',
    website: 'https://logoipsum-university.example.com',
    description: 'Institución educativa de renombre internacional.',
    logoUrl: '/logos/3.png',
    valuationsCount: 0,
    latestValuation: undefined
  },
  {
    id: '4',
    name: 'Logoipsum Foundation',
    tradingName: 'LogoFound',
    sector: 'Sin fines de lucro',
    subsector: 'Fundación',
    country: 'Estados Unidos',
    foundedYear: 1992,
    registrationId: 'US98765',
    website: 'https://logoipsum-foundation.example.com',
    description: 'Fundación dedicada a causas humanitarias y desarrollo sostenible.',
    logoUrl: '/logos/5.png',
    valuationsCount: 5,
    latestValuation: {
      id: 'val3',
      value: 12800000,
      date: '2023-10-01'
    }
  },
  {
    id: '5',
    name: 'Logoipsum Tech',
    tradingName: 'LogoTech',
    sector: 'Tecnología',
    subsector: 'Electrónica',
    country: 'Japón',
    foundedYear: 2000,
    registrationId: 'JP24680',
    website: 'https://logoipsum-tech.example.com',
    description: 'Empresa líder en electrónica de consumo e innovación tecnológica.',
    logoUrl: '/lovable-uploads/068eda03-7367-4ea1-9e0a-f8b0c86c849b.png',
    valuationsCount: 1,
    latestValuation: {
      id: 'val4',
      value: 7300000,
      date: '2023-07-12'
    }
  },
  {
    id: '6',
    name: 'Logoipsum Cloud',
    tradingName: 'LogoCloud',
    sector: 'Tecnología',
    subsector: 'Servicios en la nube',
    country: 'Estados Unidos',
    foundedYear: 1965,
    registrationId: 'US45678',
    website: 'https://logoipsum-cloud.example.com',
    description: 'Proveedor de servicios en la nube y soluciones de almacenamiento digital.',
    logoUrl: '/logos/6.png',
    valuationsCount: 8,
    latestValuation: {
      id: 'val5',
      value: 41200000,
      date: '2023-11-05'
    }
  },
  {
    id: '7',
    name: 'Logoipsum Finance',
    tradingName: 'LogoFin',
    sector: 'Finanzas',
    subsector: 'Bancario',
    country: 'Estados Unidos',
    foundedYear: 1983,
    registrationId: 'US78901',
    website: 'https://logoipsum-finance.example.com',
    description: 'Institución financiera especializada en servicios bancarios innovadores.',
    logoUrl: '/logos/7.png',
    valuationsCount: 4,
    latestValuation: {
      id: 'val6',
      value: 23700000,
      date: '2023-10-18'
    }
  },
  {
    id: '8',
    name: 'Logoipsum Health',
    tradingName: 'LogoHealth',
    sector: 'Salud',
    subsector: 'Tecnología médica',
    country: 'Estados Unidos',
    foundedYear: 1989,
    registrationId: 'US13579',
    website: 'https://logoipsum-health.example.com',
    description: 'Empresa de tecnología médica enfocada en soluciones de salud digital.',
    logoUrl: '/logos/1.png',
    valuationsCount: 2,
    latestValuation: {
      id: 'val7',
      value: 14900000,
      date: '2023-09-30'
    }
  },
  {
    id: '9',
    name: 'Logoipsum Energy',
    tradingName: 'LogoEnergy',
    sector: 'Energía',
    subsector: 'Renovables',
    country: 'Estados Unidos',
    foundedYear: 2002,
    registrationId: 'US24680',
    website: 'https://logoipsum-energy.example.com',
    description: 'Empresa líder en soluciones de energía renovable y sostenibilidad.',
    logoUrl: '/logos/2.png',
    valuationsCount: 6,
    latestValuation: {
      id: 'val8',
      value: 33500000,
      date: '2023-11-22'
    }
  },
  {
    id: '10',
    name: 'Logoipsum Retail',
    tradingName: 'LogoRetail',
    sector: 'Comercio',
    subsector: 'Minorista',
    country: 'Estados Unidos',
    foundedYear: 2010,
    registrationId: 'US36912',
    website: 'https://logoipsum-retail.example.com',
    description: 'Cadena de tiendas minoristas con presencia internacional.',
    logoUrl: '/logos/3.png',
    valuationsCount: 3,
    latestValuation: {
      id: 'val9',
      value: 8700000,
      date: '2023-08-05'
    }
  },
  {
    id: '11',
    name: 'Logoipsum AI',
    tradingName: 'LogoAI',
    sector: 'Tecnología',
    subsector: 'Inteligencia Artificial',
    country: 'Estados Unidos',
    foundedYear: 1990,
    registrationId: 'US14725',
    website: 'https://logoipsum-ai.example.com',
    description: 'Empresa pionera en desarrollo de soluciones de inteligencia artificial.',
    logoUrl: '/logos/4.png',
    valuationsCount: 7,
    latestValuation: {
      id: 'val10',
      value: 27500000,
      date: '2023-12-01'
    }
  },
  {
    id: '12',
    name: 'Logoipsum Biotech',
    tradingName: 'LogoBio',
    sector: 'Biotecnología',
    subsector: 'Investigación',
    country: 'Costa Rica',
    foundedYear: 1985,
    registrationId: 'CR25836',
    website: 'https://logoipsum-biotech.example.com',
    description: 'Empresa de investigación y desarrollo en biotecnología.',
    logoUrl: '/logos/5.png',
    valuationsCount: 4,
    latestValuation: {
      id: 'val11',
      value: 19800000,
      date: '2023-10-12'
    }
  },
  {
    id: '13',
    name: 'Logoipsum Labs',
    tradingName: 'LogoLabs',
    sector: 'Tecnología',
    subsector: 'Investigación',
    country: 'Estados Unidos',
    foundedYear: 1943,
    registrationId: 'US36947',
    website: 'https://logoipsum-labs.example.com',
    description: 'Laboratorio de investigación e innovación tecnológica.',
    logoUrl: '/logos/6.png',
    valuationsCount: 2,
    latestValuation: {
      id: 'val12',
      value: 15300000,
      date: '2023-09-08'
    }
  },
  {
    id: '14',
    name: 'Logoipsum Systems',
    tradingName: 'LogoSys',
    sector: 'Tecnología',
    subsector: 'Sistemas',
    country: 'Estados Unidos',
    foundedYear: 1975,
    registrationId: 'US15937',
    website: 'https://logoipsum-systems.example.com',
    description: 'Empresa especializada en desarrollo de sistemas empresariales.',
    logoUrl: '/logos/7.png',
    valuationsCount: 5,
    latestValuation: {
      id: 'val13',
      value: 30600000,
      date: '2023-11-17'
    }
  },
  {
    id: '15',
    name: 'Logoipsum Global',
    tradingName: 'LogoGlobal',
    sector: 'Consultoría',
    subsector: 'Estrategia',
    country: 'Reino Unido',
    foundedYear: 1973,
    registrationId: 'UK28461',
    website: 'https://logoipsum-global.example.com',
    description: 'Consultora global especializada en estrategia empresarial y transformación digital.',
    logoUrl: '/logos/1.png',
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
