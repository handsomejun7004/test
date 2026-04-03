import { useState, useMemo } from 'react';
import type { Holding } from '../../types/portfolio';
import { formatCurrency, formatPercent } from '../../utils/formatters';

interface HoldingsTableProps {
  holdings: Holding[];
}

type SortKey = 'ticker' | 'marketValue' | 'returnAmount' | 'returnPercent';
type SortDir = 'asc' | 'desc';

interface ComputedHolding extends Holding {
  marketValue: number;
  returnAmount: number;
  returnPercent: number;
}

export default function HoldingsTable({ holdings }: HoldingsTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('marketValue');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  const rows: ComputedHolding[] = useMemo(() => {
    return holdings.map((h) => {
      const marketValue = h.quantity * h.currentPrice;
      const cost = h.quantity * h.avgPurchasePrice;
      const returnAmount = marketValue - cost;
      const returnPercent = ((h.currentPrice - h.avgPurchasePrice) / h.avgPurchasePrice) * 100;
      return { ...h, marketValue, returnAmount, returnPercent };
    });
  }, [holdings]);

  const sorted = useMemo(() => {
    return [...rows].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === 'string' && typeof bv === 'string') {
        return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
      }
      return sortDir === 'asc' ? (av as number) - (bv as number) : (bv as number) - (av as number);
    });
  }, [rows, sortKey, sortDir]);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  }

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col) return <span className="text-slate-600 ml-1">↕</span>;
    return <span className="text-indigo-400 ml-1">{sortDir === 'asc' ? '↑' : '↓'}</span>;
  }

  return (
    <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
      <h2 className="text-white font-semibold text-lg mb-4">보유 종목</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400 border-b border-slate-700">
              <th
                className="pb-3 text-left font-medium cursor-pointer hover:text-white select-none"
                onClick={() => handleSort('ticker')}
              >
                티커 <SortIcon col="ticker" />
              </th>
              <th className="pb-3 text-left font-medium">종목명</th>
              <th className="pb-3 text-right font-medium">수량</th>
              <th className="pb-3 text-right font-medium">평균매수가</th>
              <th className="pb-3 text-right font-medium">현재가</th>
              <th
                className="pb-3 text-right font-medium cursor-pointer hover:text-white select-none"
                onClick={() => handleSort('marketValue')}
              >
                평가금액 <SortIcon col="marketValue" />
              </th>
              <th
                className="pb-3 text-right font-medium cursor-pointer hover:text-white select-none"
                onClick={() => handleSort('returnAmount')}
              >
                평가손익 <SortIcon col="returnAmount" />
              </th>
              <th
                className="pb-3 text-right font-medium cursor-pointer hover:text-white select-none"
                onClick={() => handleSort('returnPercent')}
              >
                수익률 <SortIcon col="returnPercent" />
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((row) => {
              const isPositive = row.returnPercent >= 0;
              const returnColor = isPositive ? 'text-emerald-400' : 'text-red-400';
              return (
                <tr
                  key={row.ticker}
                  className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors"
                >
                  <td className="py-3 text-indigo-400 font-bold">{row.ticker}</td>
                  <td className="py-3 text-slate-300">{row.name}</td>
                  <td className="py-3 text-right text-slate-300">{row.quantity.toLocaleString()}</td>
                  <td className="py-3 text-right text-slate-300">${row.avgPurchasePrice.toFixed(2)}</td>
                  <td className="py-3 text-right text-white font-medium">${row.currentPrice.toFixed(2)}</td>
                  <td className="py-3 text-right text-white font-medium">{formatCurrency(row.marketValue)}</td>
                  <td className={`py-3 text-right font-medium ${returnColor}`}>
                    {row.returnAmount >= 0 ? '+' : ''}{formatCurrency(row.returnAmount)}
                  </td>
                  <td className={`py-3 text-right font-medium ${returnColor}`}>
                    {formatPercent(row.returnPercent)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
