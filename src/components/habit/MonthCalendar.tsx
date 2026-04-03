import { useState } from 'react';
import type { Habit } from '../../types/habit';

interface MonthCalendarProps {
  habits: Habit[];
  getMonthLogs: (habitId: string, year: number, month: number) => Set<string>;
  today: string;
  onToggle: (habitId: string, date: string) => void;
}

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

export default function MonthCalendar({ habits, getMonthLogs, today, onToggle }: MonthCalendarProps) {
  const todayDate = new Date(today);
  const [year, setYear] = useState(todayDate.getFullYear());
  const [month, setMonth] = useState(todayDate.getMonth() + 1);
  const [selectedHabit, setSelectedHabit] = useState<string>(habits[0]?.id ?? '');

  const habit = habits.find((h) => h.id === selectedHabit);
  const logs = habit ? getMonthLogs(selectedHabit, year, month) : new Set<string>();

  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDay = new Date(year, month - 1, 1).getDay();

  function prevMonth() {
    if (month === 1) { setYear(y => y - 1); setMonth(12); }
    else setMonth(m => m - 1);
  }
  function nextMonth() {
    const now = new Date();
    if (year > now.getFullYear() || (year === now.getFullYear() && month >= now.getMonth() + 1)) return;
    if (month === 12) { setYear(y => y + 1); setMonth(1); }
    else setMonth(m => m + 1);
  }

  const doneCount = logs.size;
  const rate = daysInMonth > 0 ? Math.round((doneCount / daysInMonth) * 100) : 0;

  if (habits.length === 0) return null;

  return (
    <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
      <h2 className="text-white font-semibold text-lg mb-4">월간 달성 캘린더</h2>

      {/* 습관 선택 탭 */}
      <div className="flex flex-wrap gap-2 mb-4">
        {habits.map((h) => (
          <button
            key={h.id}
            onClick={() => setSelectedHabit(h.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              selectedHabit === h.id ? 'text-white' : 'bg-slate-700 text-slate-400 hover:text-white'
            }`}
            style={selectedHabit === h.id ? { backgroundColor: h.color } : {}}
          >
            <span>{h.icon}</span>
            <span>{h.name}</span>
          </button>
        ))}
      </div>

      {/* 월 네비게이션 */}
      <div className="flex items-center justify-between mb-3">
        <button onClick={prevMonth} className="text-slate-400 hover:text-white px-2 py-1 rounded transition-colors">‹</button>
        <span className="text-white font-medium">{year}년 {month}월</span>
        <button onClick={nextMonth} className="text-slate-400 hover:text-white px-2 py-1 rounded transition-colors">›</button>
      </div>

      {/* 달성률 */}
      {habit && (
        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1 bg-slate-700 rounded-full h-1.5">
            <div
              className="h-1.5 rounded-full transition-all"
              style={{ width: `${rate}%`, backgroundColor: habit.color }}
            />
          </div>
          <span className="text-slate-400 text-xs">{doneCount}/{daysInMonth}일 ({rate}%)</span>
        </div>
      )}

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 mb-1">
        {WEEKDAYS.map((d, i) => (
          <div key={d} className={`text-center text-xs py-1 font-medium ${i === 0 ? 'text-red-400' : i === 6 ? 'text-blue-400' : 'text-slate-400'}`}>
            {d}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const done = logs.has(dateStr);
          const isToday = dateStr === today;
          const isFuture = dateStr > today;

          return (
            <button
              key={day}
              onClick={() => !isFuture && habit && onToggle(selectedHabit, dateStr)}
              disabled={isFuture}
              className={`aspect-square rounded-lg text-xs font-medium flex items-center justify-center transition-all ${
                isFuture
                  ? 'text-slate-700 cursor-default'
                  : done
                  ? 'text-white'
                  : isToday
                  ? 'border border-slate-500 text-slate-300 hover:bg-slate-700'
                  : 'text-slate-400 hover:bg-slate-700'
              }`}
              style={done && habit ? { backgroundColor: habit.color } : {}}
            >
              {isToday ? <span className="underline">{day}</span> : day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
