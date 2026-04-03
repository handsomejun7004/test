export type Phase = 'focus' | 'short' | 'long';

export interface SessionRecord {
  id: string;
  phase: Phase;
  completedAt: string; // ISO string
  duration: number;    // seconds
}

export const PHASE_LABELS: Record<Phase, string> = {
  focus: '집중',
  short: '짧은 휴식',
  long: '긴 휴식',
};

export const PHASE_DURATIONS: Record<Phase, number> = {
  focus: 25 * 60,
  short: 5 * 60,
  long: 15 * 60,
};

export const PHASE_COLORS: Record<Phase, string> = {
  focus: '#6366f1',
  short: '#34d399',
  long: '#22d3ee',
};
