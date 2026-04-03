interface MetricCardProps {
  label: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  subtitle?: string;
}

export default function MetricCard({ label, value, change, trend, subtitle }: MetricCardProps) {
  const trendColor =
    trend === 'up' ? 'text-emerald-400' :
    trend === 'down' ? 'text-red-400' :
    'text-slate-400';

  const trendArrow = trend === 'up' ? '▲' : trend === 'down' ? '▼' : '';

  return (
    <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
      <p className="text-slate-400 text-sm font-medium mb-1">{label}</p>
      <p className="text-white text-2xl font-bold tracking-tight">{value}</p>
      {(change || subtitle) && (
        <div className="mt-2 flex items-center gap-2">
          {change && (
            <span className={`text-sm font-medium ${trendColor}`}>
              {trendArrow && <span className="mr-1">{trendArrow}</span>}
              {change}
            </span>
          )}
          {subtitle && <span className="text-slate-500 text-sm">{subtitle}</span>}
        </div>
      )}
    </div>
  );
}
