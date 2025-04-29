
interface Sector {
  id: string;
  name: string;
  subsectors: Subsector[];
}

interface Subsector {
  id: string;
  name: string;
}

// Mock data for sectors and subsectors
const mockSectorsData: Sector[] = [
  {
    id: "tech",
    name: "Tecnología",
    subsectors: [
      { id: "tech-software", name: "Software" },
      { id: "tech-hardware", name: "Hardware" },
      { id: "tech-ai", name: "Inteligencia Artificial" },
      { id: "tech-cloud", name: "Servicios en la nube" },
      { id: "tech-telecom", name: "Telecomunicaciones" }
    ]
  },
  {
    id: "finance",
    name: "Finanzas",
    subsectors: [
      { id: "finance-banking", name: "Bancario" },
      { id: "finance-insurance", name: "Seguros" },
      { id: "finance-investment", name: "Inversiones" },
      { id: "finance-fintech", name: "Fintech" }
    ]
  },
  {
    id: "health",
    name: "Salud",
    subsectors: [
      { id: "health-hospital", name: "Hospitales" },
      { id: "health-pharma", name: "Farmacéutica" },
      { id: "health-biotech", name: "Biotecnología" },
      { id: "health-medtech", name: "Tecnología médica" }
    ]
  },
  {
    id: "education",
    name: "Educación",
    subsectors: [
      { id: "edu-university", name: "Universidad" },
      { id: "edu-school", name: "Escuela" },
      { id: "edu-edtech", name: "Tecnología educativa" },
      { id: "edu-training", name: "Formación profesional" }
    ]
  },
  {
    id: "nonprofit",
    name: "Sin fines de lucro",
    subsectors: [
      { id: "nonprofit-foundation", name: "Fundación" },
      { id: "nonprofit-ngo", name: "ONG" },
      { id: "nonprofit-charity", name: "Caridad" }
    ]
  },
  {
    id: "energy",
    name: "Energía",
    subsectors: [
      { id: "energy-renewables", name: "Renovables" },
      { id: "energy-oil", name: "Petróleo y gas" },
      { id: "energy-utilities", name: "Servicios públicos" }
    ]
  },
  {
    id: "retail",
    name: "Comercio",
    subsectors: [
      { id: "retail-ecommerce", name: "Comercio electrónico" },
      { id: "retail-physical", name: "Minorista físico" },
      { id: "retail-wholesale", name: "Mayorista" }
    ]
  },
  {
    id: "consulting",
    name: "Consultoría",
    subsectors: [
      { id: "consulting-management", name: "Gestión" },
      { id: "consulting-strategy", name: "Estrategia" },
      { id: "consulting-it", name: "Tecnología de la información" }
    ]
  }
];

// Function to fetch all sectors
export const fetchSectors = async (): Promise<Sector[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockSectorsData;
};

// Function to fetch subsectors for a specific sector
export const fetchSubsectorsBySectorId = async (sectorId: string): Promise<Subsector[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const sector = mockSectorsData.find(s => s.id === sectorId);
  if (!sector) {
    return [];
  }
  
  return sector.subsectors;
};

// Helper function to get sector name by ID
export const getSectorNameById = (sectorId: string): string => {
  const sector = mockSectorsData.find(s => s.id === sectorId);
  return sector ? sector.name : "";
};

// Helper function to get subsector name by ID
export const getSubsectorNameById = (sectorId: string, subsectorId: string): string => {
  const sector = mockSectorsData.find(s => s.id === sectorId);
  if (!sector) return "";
  
  const subsector = sector.subsectors.find(sub => sub.id === subsectorId);
  return subsector ? subsector.name : "";
};

export type { Sector, Subsector };
