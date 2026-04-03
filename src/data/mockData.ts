import type { Holding, AllocationSlice, PerformanceDataPoint, PortfolioSummary } from '../types/portfolio';

export const holdings: Holding[] = [
  { ticker: 'AAPL', name: 'Apple Inc.', quantity: 50, avgPurchasePrice: 145.00, currentPrice: 189.50, sector: '기술' },
  { ticker: 'MSFT', name: 'Microsoft Corp.', quantity: 30, avgPurchasePrice: 280.00, currentPrice: 415.20, sector: '기술' },
  { ticker: 'GOOGL', name: 'Alphabet Inc.', quantity: 10, avgPurchasePrice: 2800.00, currentPrice: 3150.00, sector: '기술' },
  { ticker: 'AMZN', name: 'Amazon.com Inc.', quantity: 15, avgPurchasePrice: 3200.00, currentPrice: 3820.00, sector: '소비재' },
  { ticker: 'TSLA', name: 'Tesla Inc.', quantity: 20, avgPurchasePrice: 750.00, currentPrice: 620.00, sector: '자동차' },
  { ticker: 'BND', name: 'Vanguard Total Bond ETF', quantity: 200, avgPurchasePrice: 72.00, currentPrice: 74.50, sector: '채권' },
  { ticker: 'VNQ', name: 'Vanguard Real Estate ETF', quantity: 80, avgPurchasePrice: 88.00, currentPrice: 95.30, sector: '부동산' },
  { ticker: 'GLD', name: 'SPDR Gold Shares', quantity: 25, avgPurchasePrice: 168.00, currentPrice: 192.40, sector: '원자재' },
];

export const allocationData: AllocationSlice[] = [
  { name: '국내주식', value: 38, color: '#6366f1' },
  { name: '해외주식', value: 30, color: '#22d3ee' },
  { name: '채권', value: 17, color: '#34d399' },
  { name: '부동산', value: 8, color: '#f59e0b' },
  { name: '원자재', value: 5, color: '#f87171' },
  { name: '현금', value: 2, color: '#94a3b8' },
];

export const portfolioSummary: PortfolioSummary = {
  totalValue: 248_530,
  totalCost: 198_850,
  dailyChange: 1_245.80,
  dailyChangePercent: 0.503,
  totalReturn: 49_680,
  totalReturnPercent: 24.98,
  annualizedReturn: 12.4,
};

// 365일 수익률 이력 생성
function generatePerformanceHistory(): PerformanceDataPoint[] {
  const points: PerformanceDataPoint[] = [];
  const startDate = new Date('2025-04-03');
  startDate.setDate(startDate.getDate() - 365);

  let value = 198_850;

  for (let i = 0; i <= 365; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    // 주말 제외
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) continue;

    // 일일 변동 (-1.5% ~ +1.8%)
    const dailyReturn = (Math.random() * 3.3 - 1.5) / 100;
    value = value * (1 + dailyReturn);

    // 전반적인 우상향 트렌드 추가
    value += 45;

    points.push({
      date: date.toISOString().split('T')[0],
      value: Math.round(value),
    });
  }

  return points;
}

export const performanceHistory: PerformanceDataPoint[] = generatePerformanceHistory();
