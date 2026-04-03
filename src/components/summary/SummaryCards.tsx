import type { PortfolioSummary } from '../../types/portfolio';
import { formatCurrency, formatPercent } from '../../utils/formatters';
import MetricCard from './MetricCard';

interface SummaryCardsProps {
  summary: PortfolioSummary;
}

export default function SummaryCards({ summary }: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        label="총 평가액"
        value={formatCurrency(summary.totalValue)}
        change={formatPercent(summary.totalReturnPercent)}
        trend={summary.totalReturn >= 0 ? 'up' : 'down'}
        subtitle="누적 수익률"
      />
      <MetricCard
        label="총 수익"
        value={formatCurrency(summary.totalReturn)}
        change={formatPercent(summary.totalReturnPercent)}
        trend={summary.totalReturn >= 0 ? 'up' : 'down'}
        subtitle="매입 대비"
      />
      <MetricCard
        label="일일 변동"
        value={formatCurrency(summary.dailyChange)}
        change={formatPercent(summary.dailyChangePercent)}
        trend={summary.dailyChange >= 0 ? 'up' : 'down'}
        subtitle="전일 대비"
      />
      <MetricCard
        label="연평균 수익률"
        value={`${summary.annualizedReturn.toFixed(1)}%`}
        trend={summary.annualizedReturn >= 0 ? 'up' : 'down'}
        subtitle="CAGR"
      />
    </div>
  );
}
