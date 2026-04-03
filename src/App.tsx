import { useState, useMemo } from 'react';
import { useTransactions } from './hooks/useTransactions';
import TransactionForm from './components/budget/TransactionForm';
import SummaryCards from './components/budget/SummaryCards';
import CategoryChart from './components/budget/CategoryChart';
import MonthlyChart from './components/budget/MonthlyChart';
import TransactionList from './components/budget/TransactionList';

export default function App() {
  const { transactions, addTransaction, deleteTransaction } = useTransactions();

  const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const months = useMemo(() => {
    const set = new Set(transactions.map((tx) => tx.date.slice(0, 7)));
    set.add(currentMonth);
    return Array.from(set).sort((a, b) => b.localeCompare(a));
  }, [transactions, currentMonth]);

  const monthlyTxs = useMemo(
    () => transactions.filter((tx) => tx.date.startsWith(selectedMonth)),
    [transactions, selectedMonth]
  );

  const income = useMemo(() => monthlyTxs.filter((tx) => tx.type === 'income').reduce((s, tx) => s + tx.amount, 0), [monthlyTxs]);
  const expense = useMemo(() => monthlyTxs.filter((tx) => tx.type === 'expense').reduce((s, tx) => s + tx.amount, 0), [monthlyTxs]);

  return (
    <div className="min-h-screen bg-slate-900">
      {/* 헤더 */}
      <header className="bg-slate-800 border-b border-slate-700 px-4 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">가</span>
            </div>
            <h1 className="text-white font-bold text-lg">가계부 대시보드</h1>
          </div>
          {/* 월 선택 */}
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-indigo-500"
          >
            {months.map((m) => {
              const [y, mo] = m.split('-');
              return <option key={m} value={m}>{y}년 {Number(mo)}월</option>;
            })}
          </select>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* 월별 요약 */}
        <SummaryCards income={income} expense={expense} month={selectedMonth} />

        {/* 입력 폼 + 카테고리 차트 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TransactionForm onAdd={addTransaction} />
          <CategoryChart transactions={monthlyTxs} />
        </div>

        {/* 월별 추이 차트 */}
        <MonthlyChart transactions={transactions} />

        {/* 거래 내역 */}
        <TransactionList transactions={monthlyTxs} onDelete={deleteTransaction} />
      </main>
    </div>
  );
}
