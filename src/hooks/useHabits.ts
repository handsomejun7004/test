import { useState, useEffect } from 'react';
import type { Habit, HabitLogs } from '../types/habit';

const HABITS_KEY = 'habit_list';
const LOGS_KEY = 'habit_logs';

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>(() => load(HABITS_KEY, []));
  const [logs, setLogs] = useState<HabitLogs>(() => load(LOGS_KEY, {}));

  useEffect(() => { localStorage.setItem(HABITS_KEY, JSON.stringify(habits)); }, [habits]);
  useEffect(() => { localStorage.setItem(LOGS_KEY, JSON.stringify(logs)); }, [logs]);

  function addHabit(habit: Omit<Habit, 'id' | 'createdAt'>) {
    const today = new Date().toISOString().split('T')[0];
    setHabits((prev) => [...prev, { ...habit, id: crypto.randomUUID(), createdAt: today }]);
  }

  function deleteHabit(id: string) {
    setHabits((prev) => prev.filter((h) => h.id !== id));
    setLogs((prev) => { const next = { ...prev }; delete next[id]; return next; });
  }

  function toggleLog(habitId: string, date: string) {
    setLogs((prev) => {
      const dates = prev[habitId] ?? [];
      const exists = dates.includes(date);
      return {
        ...prev,
        [habitId]: exists ? dates.filter((d) => d !== date) : [...dates, date],
      };
    });
  }

  function isDone(habitId: string, date: string): boolean {
    return (logs[habitId] ?? []).includes(date);
  }

  function getStreak(habitId: string): number {
    const dates = new Set(logs[habitId] ?? []);
    let streak = 0;
    const d = new Date();
    // 오늘 완료 안 했으면 어제부터 계산
    const todayStr = d.toISOString().split('T')[0];
    if (!dates.has(todayStr)) d.setDate(d.getDate() - 1);
    while (true) {
      const str = d.toISOString().split('T')[0];
      if (!dates.has(str)) break;
      streak++;
      d.setDate(d.getDate() - 1);
    }
    return streak;
  }

  function getMonthLogs(habitId: string, year: number, month: number): Set<string> {
    const all = logs[habitId] ?? [];
    const prefix = `${year}-${String(month).padStart(2, '0')}`;
    return new Set(all.filter((d) => d.startsWith(prefix)));
  }

  return { habits, addHabit, deleteHabit, toggleLog, isDone, getStreak, getMonthLogs };
}
