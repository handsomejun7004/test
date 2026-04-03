export const EXPENSE_CATEGORIES = [
  { label: '식비', color: '#f87171' },
  { label: '교통', color: '#fb923c' },
  { label: '쇼핑', color: '#fbbf24' },
  { label: '의료', color: '#34d399' },
  { label: '문화/여가', color: '#60a5fa' },
  { label: '주거/관리비', color: '#a78bfa' },
  { label: '통신', color: '#f472b6' },
  { label: '교육', color: '#2dd4bf' },
  { label: '기타', color: '#94a3b8' },
];

export const INCOME_CATEGORIES = [
  { label: '급여', color: '#34d399' },
  { label: '부업', color: '#60a5fa' },
  { label: '투자', color: '#a78bfa' },
  { label: '기타', color: '#94a3b8' },
];

export function getCategoryColor(category: string): string {
  const all = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES];
  return all.find((c) => c.label === category)?.color ?? '#94a3b8';
}

export function formatAmount(amount: number): string {
  return amount.toLocaleString('ko-KR') + '원';
}
