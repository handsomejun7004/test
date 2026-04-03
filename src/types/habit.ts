export interface Habit {
  id: string;
  name: string;
  icon: string;
  color: string;
  createdAt: string; // YYYY-MM-DD
}

// 완료한 날짜 목록: habitId -> Set of YYYY-MM-DD
export type HabitLogs = Record<string, string[]>;
