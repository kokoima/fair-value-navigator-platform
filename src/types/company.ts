
export interface LatestValuation {
  id: string;
  value: number;
  date: string;
}

export interface Company {
  id: string;
  name: string;
  tradingName?: string;
  sector: string;
  subsector?: string;
  country: string;
  foundedYear?: number;
  registrationId?: string;
  website?: string;
  description?: string;
  logoUrl?: string;
  valuationsCount: number;
  latestValuation?: LatestValuation;
}
