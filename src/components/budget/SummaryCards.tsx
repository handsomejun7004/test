import { formatAmount } from '../../constants/categories';

interface SummaryCardsProps {
  income: number;
  expense: number;
  month: string; // YYYY-MM
}

export default function SummaryCards({ income, expense, month }: SummaryCardsProps) {
  const balance = income - expense;
  const [year, mon] = month.split('-');

  return (
    <div>
      <p className="text-slate-400 text-sm mb-3">{year}년 {Number(mon)}월</p>
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <p className="text-slate-400 text-xs mb-1">총 수입</p>
          <p className="text-emerald-400 font-bold text-lg leading-tight">{formatAmount(income)}</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <p className="text-slate-400 text-xs mb-1">총 지출</p>
          <p className="text-red-400 font-bold text-lg leading-tight">{formatAmount(expense)}</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <p className="text-slate-400 text-xs mb-1">잔액</p>
          <p className={`font-bold text-lg leading-tight ${balance >= 0 ? 'text-white' : 'text-red-400'}`}>
            {formatAmount(balance)}
          </p>
        </div>
      </div>
    </div>
  );
}
