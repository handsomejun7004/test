import type { SessionRecord } from '../../types/timer';
import { PHASE_LABELS, PHASE_COLORS } from '../../types/timer';

interface HistoryProps {
  history: SessionRecord[];
  onClear: () => void;
}

function formatTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  const today = new Date();
  if (d.toDateString() === today.toDateString()) return '오늘';
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (d.toDateString() === yesterday.toDateString()) return '어제';
  return d.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' });
}

export default function History({ history, onClear }: HistoryProps) {
  if (history.length === 0) return null;

  // 날짜별 그룹핑
  const groups: { label: string; records: SessionRecord[] }[] = [];
  history.forEach((r) => {
    const label = formatDate(r.completedAt);
    const last = groups[groups.length - 1];
    if (last && last.label === label) last.records.push(r);
    else groups.push({ label, records: [r] });
  });

  return (
    <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-semibold">히스토리</h2>
        <button
          onClick={onClear}
          className="text-slate-500 hover:text-red-400 text-xs transition-colors"
        >
          전체 삭제
        </button>
      </div>
      <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
        {groups.map((g) => (
          <div key={g.label}>
            <p className="text-slate-500 text-xs mb-2">{g.label}</p>
            <ul className="space-y-1.5">
              {g.records.map((r) => (
                <li key={r.id} className="flex items-center gap-3 text-sm">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: PHASE_COLORS[r.phase] }}
                  />
                  <span className="text-slate-300 flex-1">{PHASE_LABELS[r.phase]}</span>
                  <span className="text-slate-500 text-xs">{Math.round(r.duration / 60)}분</span>
                  <span className="text-slate-500 text-xs">{formatTime(r.completedAt)}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
