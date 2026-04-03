import type { Transaction } from '../../types/budget';
import { getCategoryColor, formatAmount } from '../../constants/categories';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

export default function TransactionList({ transactions, onDelete }: TransactionListProps) {
  const sorted = [...transactions].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
      <h2 className="text-white font-semibold text-lg mb-4">
        거래 내역 <span className="text-slate-500 font-normal text-sm ml-1">{transactions.length}건</span>
      </h2>
      {sorted.length === 0 ? (
        <p className="text-slate-500 text-sm text-center py-8">내역이 없습니다</p>
      ) : (
        <ul className="space-y-2 max-h-96 overflow-y-auto pr-1">
          {sorted.map((tx) => (
            <li
              key={tx.id}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700/50 transition-colors group"
            >
              {/* 카테고리 색상 점 */}
              <div
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: getCategoryColor(tx.category) }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-white text-sm font-medium">{tx.category}</span>
                  {tx.memo && <span className="text-slate-400 text-xs truncate">{tx.memo}</span>}
                </div>
                <p className="text-slate-500 text-xs">{tx.date}</p>
              </div>
              <span className={`text-sm font-bold flex-shrink-0 ${tx.type === 'income' ? 'text-emerald-400' : 'text-red-400'}`}>
                {tx.type === 'income' ? '+' : '-'}{formatAmount(tx.amount)}
              </span>
              <button
                onClick={() => onDelete(tx.id)}
                className="text-slate-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 text-xs flex-shrink-0"
                aria-label="삭제"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
