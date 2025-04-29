
// Mock sector data with subsectors
const sectorsData = [
  {
    name: 'Technology',
    subsectors: ['Software', 'Hardware', 'IT Services', 'Telecommunications', 'Semiconductors']
  },
  {
    name: 'Financial Services',
    subsectors: ['Banking', 'Insurance', 'Investment Management', 'Financial Technology', 'Real Estate Investment']
  },
  {
    name: 'Healthcare',
    subsectors: ['Pharmaceuticals', 'Biotechnology', 'Medical Devices', 'Healthcare Services', 'Health Technology']
  },
  {
    name: 'Consumer Goods',
    subsectors: ['Retail', 'Food & Beverage', 'Apparel', 'Personal Care', 'Home Goods']
  },
  {
    name: 'Manufacturing',
    subsectors: ['Automotive', 'Aerospace', 'Industrial Machinery', 'Electronics', 'Chemicals']
  },
  {
    name: 'Energy',
    subsectors: ['Oil & Gas', 'Renewable Energy', 'Utilities', 'Energy Distribution', 'Energy Technology']
  },
  {
    name: 'Agriculture',
    subsectors: ['Farming', 'Food Processing', 'Agricultural Technology', 'Sustainable Farming', 'Livestock']
  }
];

// Mock API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Fetch all sectors
export const fetchSectors = async () => {
  await delay(500); // Simulate API delay
  return [...sectorsData];
};

// Fetch subsectors for a specific sector
export const fetchSubsectors = async (sectorName: string) => {
  await delay(300); // Simulate API delay
  
  const sector = sectorsData.find(s => s.name === sectorName);
  
  if (!sector) {
    throw new Error('Sector not found');
  }
  
  return [...sector.subsectors];
};
