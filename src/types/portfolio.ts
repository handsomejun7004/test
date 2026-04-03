export interface Holding {
  ticker: string;
  name: string;
  quantity: number;
  avgPurchasePrice: number;
  currentPrice: number;
  sector: string;
}

export interface AllocationSlice {
  name: string;
  value: number;
  color: string;
}

export interface PerformanceDataPoint {
  date: string;
  value: number;
}

export interface PortfolioSummary {
  totalValue: number;
  totalCost: number;
  dailyChange: number;
  dailyChangePercent: number;
  totalReturn: number;
  totalReturnPercent: number;
  annualizedReturn: number;
}
