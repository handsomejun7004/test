import type { Habit } from '../../types/habit';

interface TodayChecklistProps {
  habits: Habit[];
  today: string;
  isDone: (id: string, date: string) => boolean;
  getStreak: (id: string) => number;
  onToggle: (id: string, date: string) => void;
  onDelete: (id: string) => void;
}

export default function TodayChecklist({ habits, today, isDone, getStreak, onToggle, onDelete }: TodayChecklistProps) {
  const doneCount = habits.filter((h) => isDone(h.id, today)).length;

  return (
    <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-semibold text-lg">오늘의 습관</h2>
        {habits.length > 0 && (
          <span className="text-slate-400 text-sm">
            <span className="text-white font-bold">{doneCount}</span> / {habits.length}
          </span>
        )}
      </div>

      {/* 진행 바 */}
      {habits.length > 0 && (
        <div className="w-full bg-slate-700 rounded-full h-1.5 mb-4">
          <div
            className="h-1.5 rounded-full transition-all duration-500"
            style={{
              width: `${(doneCount / habits.length) * 100}%`,
              backgroundColor: doneCount === habits.length ? '#34d399' : '#6366f1',
            }}
          />
        </div>
      )}

      {habits.length === 0 ? (
        <p className="text-slate-500 text-sm text-center py-6">아래에서 첫 습관을 추가해보세요!</p>
      ) : (
        <ul className="space-y-2">
          {habits.map((habit) => {
            const done = isDone(habit.id, today);
            const streak = getStreak(habit.id);
            return (
              <li
                key={habit.id}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${done ? 'bg-slate-700/60' : 'bg-slate-700/30 hover:bg-slate-700/50'}`}
              >
                {/* 체크 버튼 */}
                <button
                  onClick={() => onToggle(habit.id, today)}
                  className="flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all"
                  style={{
                    borderColor: done ? habit.color : '#475569',
                    backgroundColor: done ? habit.color : 'transparent',
                  }}
                >
                  {done && <span className="text-white text-xs font-bold">✓</span>}
                </button>

                {/* 아이콘 + 이름 */}
                <span className="text-xl">{habit.icon}</span>
                <span className={`flex-1 text-sm font-medium ${done ? 'line-through text-slate-500' : 'text-white'}`}>
                  {habit.name}
                </span>

                {/* 스트릭 */}
                {streak > 0 && (
                  <span className="text-orange-400 text-xs font-bold">🔥{streak}일</span>
                )}

                {/* 삭제 */}
                <button
                  onClick={() => onDelete(habit.id)}
                  className="text-slate-600 hover:text-red-400 text-xs transition-colors ml-1"
                >
                  ✕
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {doneCount === habits.length && habits.length > 0 && (
        <p className="text-center text-emerald-400 text-sm font-medium mt-4">🎉 오늘 모든 습관 완료!</p>
      )}
    </div>
  );
}
