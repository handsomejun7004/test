import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { AllocationSlice } from '../../types/portfolio';

interface AllocationChartProps {
  data: AllocationSlice[];
}

interface TooltipPayload {
  name: string;
  value: number;
  payload: AllocationSlice;
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: TooltipPayload[] }) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm">
      <p className="text-white font-semibold">{item.name}</p>
      <p className="text-slate-300">{item.value}%</p>
    </div>
  );
}

export default function AllocationChart({ data }: AllocationChartProps) {
  return (
    <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
      <h2 className="text-white font-semibold text-lg mb-4">자산 배분</h2>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(value) => (
              <span className="text-slate-300 text-sm">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
