import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { Transaction } from '../../types/budget';

interface MonthlyChartProps {
  transactions: Transaction[];
}

interface TooltipPayload {
  name: string;
  value: number;
  color: string;
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipPayload[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm space-y-1">
      <p className="text-slate-400">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }} className="font-medium">
          {p.name}: {p.value.toLocaleString('ko-KR')}원
        </p>
      ))}
    </div>
  );
}

export default function MonthlyChart({ transactions }: MonthlyChartProps) {
  const data = useMemo(() => {
    const map: Record<string, { income: number; expense: number }> = {};
    transactions.forEach((tx) => {
      const month = tx.date.slice(0, 7); // YYYY-MM
      if (!map[month]) map[month] = { income: 0, expense: 0 };
      if (tx.type === 'income') map[month].income += tx.amount;
      else map[month].expense += tx.amount;
    });
    return Object.entries(map)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-6)
      .map(([month, v]) => ({
        month: month.slice(5) + '월', // MM월
        ...v,
      }));
  }, [transactions]);

  if (data.length === 0) {
    return (
      <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 flex items-center justify-center h-64">
        <p className="text-slate-500 text-sm">내역을 추가하면 차트가 표시됩니다</p>
      </div>
    );
  }

  const tickFormatter = (v: number) =>
    v >= 10000 ? `${(v / 10000).toFixed(0)}만` : `${v.toLocaleString()}`;

  return (
    <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
      <h2 className="text-white font-semibold text-lg mb-4">월별 수입 / 지출</h2>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} tickLine={false} axisLine={false} />
          <YAxis tickFormatter={tickFormatter} tick={{ fill: '#94a3b8', fontSize: 11 }} tickLine={false} axisLine={false} width={50} />
          <Tooltip content={<CustomTooltip />} />
          <Legend formatter={(v) => <span className="text-slate-300 text-sm">{v}</span>} />
          <Bar dataKey="income" name="수입" fill="#34d399" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expense" name="지출" fill="#f87171" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
