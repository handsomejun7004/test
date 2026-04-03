import { useState } from 'react';
import type { TransactionType } from '../../types/budget';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../../constants/categories';

interface TransactionFormProps {
  onAdd: (tx: { type: TransactionType; amount: number; category: string; memo: string; date: string }) => void;
}

export default function TransactionForm({ onAdd }: TransactionFormProps) {
  const today = new Date().toISOString().split('T')[0];
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('식비');
  const [memo, setMemo] = useState('');
  const [date, setDate] = useState(today);

  const categories = type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  function handleTypeChange(t: TransactionType) {
    setType(t);
    setCategory(t === 'expense' ? '식비' : '급여');
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = Number(amount.replace(/,/g, ''));
    if (!parsed || parsed <= 0) return;
    onAdd({ type, amount: parsed, category, memo, date });
    setAmount('');
    setMemo('');
    setDate(today);
  }

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    setAmount(raw ? Number(raw).toLocaleString('ko-KR') : '');
  }

  const inputClass = 'w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500 placeholder-slate-400';

  return (
    <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
      <h2 className="text-white font-semibold text-lg mb-4">내역 추가</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* 수입/지출 토글 */}
        <div className="flex bg-slate-900 rounded-lg p-1 gap-1">
          {(['expense', 'income'] as TransactionType[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => handleTypeChange(t)}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                type === t
                  ? t === 'expense' ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t === 'expense' ? '지출' : '수입'}
            </button>
          ))}
        </div>

        {/* 날짜 */}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={inputClass}
          style={{ colorScheme: 'dark' }}
        />

        {/* 금액 */}
        <input
          type="text"
          inputMode="numeric"
          placeholder="금액 (원)"
          value={amount}
          onChange={handleAmountChange}
          className={inputClass}
          required
        />

        {/* 카테고리 */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={inputClass}
        >
          {categories.map((c) => (
            <option key={c.label} value={c.label}>{c.label}</option>
          ))}
        </select>

        {/* 메모 */}
        <input
          type="text"
          placeholder="메모 (선택)"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          className={inputClass}
          maxLength={50}
        />

        <button
          type="submit"
          className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg text-sm transition-colors"
        >
          추가하기
        </button>
      </form>
    </div>
  );
}
