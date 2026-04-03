import { useState, useMemo } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from 'recharts';
import type { PerformanceDataPoint } from '../../types/portfolio';
import { formatCurrency } from '../../utils/formatters';

interface PerformanceChartProps {
  data: PerformanceDataPoint[];
  initialValue: number;
}

type Range = '1W' | '1M' | '3M' | '1Y';

const RANGES: Range[] = ['1W', '1M', '3M', '1Y'];
const RANGE_DAYS: Record<Range, number> = { '1W': 5, '1M': 21, '3M': 63, '1Y': 252 };

interface TooltipPayload {
  value: number;
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipPayload[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm">
      <p className="text-slate-400 mb-1">{label}</p>
      <p className="text-white font-semibold">{formatCurrency(payload[0].value)}</p>
    </div>
  );
}

export default function PerformanceChart({ data, initialValue }: PerformanceChartProps) {
  const [range, setRange] = useState<Range>('1M');

  const filtered = useMemo(() => {
    const days = RANGE_DAYS[range];
    return data.slice(-days);
  }, [data, range]);

  const firstValue = filtered[0]?.value ?? initialValue;
  const lastValue = filtered[filtered.length - 1]?.value ?? initialValue;
  const isPositive = lastValue >= firstValue;

  const tickFormatter = (value: number) => {
    if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
    if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
    return `$${value}`;
  };

  return (
    <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-semibold text-lg">수익률 추이</h2>
        <div className="flex gap-1 bg-slate-900 rounded-lg p-1">
          {RANGES.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                range === r
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={filtered} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis
            dataKey="date"
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tickFormatter={tickFormatter}
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            width={60}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={firstValue} stroke="#475569" strokeDasharray="4 4" />
          <Line
            type="monotone"
            dataKey="value"
            stroke={isPositive ? '#34d399' : '#f87171'}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: isPositive ? '#34d399' : '#f87171' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
