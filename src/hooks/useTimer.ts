import { useState, useEffect, useRef, useCallback } from 'react';
import type { Phase, SessionRecord } from '../types/timer';
import { PHASE_DURATIONS } from '../types/timer';

const HISTORY_KEY = 'pomodoro_history';

function loadHistory(): SessionRecord[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveHistory(h: SessionRecord[]) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(h));
}

// 알림음 생성 (Web Audio API)
function playBeep(type: 'focus' | 'rest') {
  try {
    const ctx = new AudioContext();
    const notes = type === 'focus' ? [523, 659, 784] : [784, 659, 523];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.3, ctx.currentTime + i * 0.18);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.18 + 0.3);
      osc.start(ctx.currentTime + i * 0.18);
      osc.stop(ctx.currentTime + i * 0.18 + 0.3);
    });
  } catch { /* 브라우저 정책으로 실패할 수 있음 */ }
}

export function useTimer() {
  const [phase, setPhase] = useState<Phase>('focus');
  const [secondsLeft, setSecondsLeft] = useState(PHASE_DURATIONS.focus);
  const [running, setRunning] = useState(false);
  const [focusCount, setFocusCount] = useState(0); // 오늘 완료한 집중 세션
  const [history, setHistory] = useState<SessionRecord[]>(loadHistory);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 페이즈 변경 시 타이머 리셋
  useEffect(() => {
    setSecondsLeft(PHASE_DURATIONS[phase]);
    setRunning(false);
  }, [phase]);

  const completeSession = useCallback(() => {
    playBeep(phase === 'focus' ? 'rest' : 'focus');
    const record: SessionRecord = {
      id: crypto.randomUUID(),
      phase,
      completedAt: new Date().toISOString(),
      duration: PHASE_DURATIONS[phase],
    };
    setHistory((prev) => {
      const next = [record, ...prev].slice(0, 100);
      saveHistory(next);
      return next;
    });
    if (phase === 'focus') {
      setFocusCount((c) => c + 1);
      // 4번마다 긴 휴식, 아니면 짧은 휴식
      setPhase(focusCount > 0 && (focusCount + 1) % 4 === 0 ? 'long' : 'short');
    } else {
      setPhase('focus');
    }
  }, [phase, focusCount]);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((s) => {
          if (s <= 1) {
            clearInterval(intervalRef.current!);
            setRunning(false);
            completeSession();
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, completeSession]);

  function start() { setRunning(true); }
  function pause() { setRunning(false); }
  function reset() {
    setRunning(false);
    setSecondsLeft(PHASE_DURATIONS[phase]);
  }
  function switchPhase(p: Phase) { setPhase(p); }
  function clearHistory() {
    setHistory([]);
    saveHistory([]);
    setFocusCount(0);
  }

  const total = PHASE_DURATIONS[phase];
  const progress = (total - secondsLeft) / total;

  return { phase, secondsLeft, running, progress, focusCount, history, start, pause, reset, switchPhase, clearHistory };
}
