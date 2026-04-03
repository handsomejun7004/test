import { useState } from 'react';

const ICONS = ['🏃', '💪', '📚', '🧘', '💊', '🥗', '💧', '😴', '✍️', '🎯', '🚴', '🧹'];
const COLORS = [
  '#6366f1', '#22d3ee', '#34d399', '#f59e0b',
  '#f87171', '#a78bfa', '#fb923c', '#f472b6',
];

interface HabitFormProps {
  onAdd: (habit: { name: string; icon: string; color: string }) => void;
}

export default function HabitForm({ onAdd }: HabitFormProps) {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('🏃');
  const [color, setColor] = useState('#6366f1');
  const [open, setOpen] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd({ name: name.trim(), icon, color });
    setName('');
    setOpen(false);
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full py-3 border-2 border-dashed border-slate-600 rounded-xl text-slate-400 hover:border-indigo-500 hover:text-indigo-400 transition-colors text-sm font-medium"
      >
        + 새 습관 추가
      </button>
    );
  }

  return (
    <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
      <h3 className="text-white font-semibold mb-4">새 습관 추가</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 이름 */}
        <input
          autoFocus
          type="text"
          placeholder="습관 이름 (예: 물 2L 마시기)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={30}
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500 placeholder-slate-400"
        />

        {/* 아이콘 */}
        <div>
          <p className="text-slate-400 text-xs mb-2">아이콘</p>
          <div className="flex flex-wrap gap-2">
            {ICONS.map((ic) => (
              <button
                key={ic}
                type="button"
                onClick={() => setIcon(ic)}
                className={`w-9 h-9 rounded-lg text-lg flex items-center justify-center transition-colors ${
                  icon === ic ? 'bg-indigo-600' : 'bg-slate-700 hover:bg-slate-600'
                }`}
              >
                {ic}
              </button>
            ))}
          </div>
        </div>

        {/* 색상 */}
        <div>
          <p className="text-slate-400 text-xs mb-2">색상</p>
          <div className="flex gap-2">
            {COLORS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                style={{ backgroundColor: c }}
                className={`w-7 h-7 rounded-full transition-transform ${color === c ? 'ring-2 ring-white scale-110' : ''}`}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex-1 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm transition-colors"
          >
            취소
          </button>
          <button
            type="submit"
            className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors"
          >
            추가
          </button>
        </div>
      </form>
    </div>
  );
}
