import { useHabits } from './hooks/useHabits';
import HabitForm from './components/habit/HabitForm';
import TodayChecklist from './components/habit/TodayChecklist';
import MonthCalendar from './components/habit/MonthCalendar';

const today = new Date().toISOString().split('T')[0];
const [year, month, day] = today.split('-');
const dateLabel = `${year}년 ${Number(month)}월 ${Number(day)}일`;
const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];
const weekday = WEEKDAY[new Date(today).getDay()];

export default function App() {
  const { habits, addHabit, deleteHabit, toggleLog, isDone, getStreak, getMonthLogs } = useHabits();

  return (
    <div className="min-h-screen bg-slate-900">
      {/* 헤더 */}
      <header className="bg-slate-800 border-b border-slate-700 px-4 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">🎯</span>
            </div>
            <h1 className="text-white font-bold text-lg">습관 트래커</h1>
          </div>
          <div className="text-right">
            <p className="text-white text-sm font-medium">{dateLabel}</p>
            <p className="text-slate-400 text-xs">{weekday}요일</p>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {/* 오늘 체크리스트 */}
        <TodayChecklist
          habits={habits}
          today={today}
          isDone={isDone}
          getStreak={getStreak}
          onToggle={toggleLog}
          onDelete={deleteHabit}
        />

        {/* 습관 추가 폼 */}
        <HabitForm onAdd={addHabit} />

        {/* 월간 캘린더 */}
        {habits.length > 0 && (
          <MonthCalendar
            habits={habits}
            getMonthLogs={getMonthLogs}
            today={today}
            onToggle={toggleLog}
          />
        )}
      </main>
    </div>
  );
}
