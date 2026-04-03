import { useEffect } from 'react';
import { useTimer } from './hooks/useTimer';
import TimerDisplay from './components/timer/TimerDisplay';
import TimerControls from './components/timer/TimerControls';
import SessionInfo from './components/timer/SessionInfo';
import History from './components/timer/History';
import { PHASE_LABELS, PHASE_COLORS } from './types/timer';

export default function App() {
  const { phase, secondsLeft, running, progress, focusCount, history, start, pause, reset, switchPhase, clearHistory } = useTimer();

  // 탭 제목에 타이머 표시
  useEffect(() => {
    const mins = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
    const secs = String(secondsLeft % 60).padStart(2, '0');
    document.title = running ? `${mins}:${secs} — ${PHASE_LABELS[phase]}` : '포모도로 타이머';
  }, [secondsLeft, running, phase]);

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {/* 헤더 */}
      <header className="border-b border-slate-800 px-4 py-4">
        <div className="max-w-sm mx-auto flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: PHASE_COLORS[phase] }}>
            <span className="text-white font-bold text-sm">⏱</span>
          </div>
          <h1 className="text-white font-bold text-lg">포모도로 타이머</h1>
        </div>
      </header>

      <main className="flex-1 max-w-sm mx-auto w-full px-4 py-8 space-y-6">
        {/* 원형 타이머 */}
        <TimerDisplay secondsLeft={secondsLeft} progress={progress} phase={phase} />

        {/* 컨트롤 */}
        <TimerControls
          phase={phase}
          running={running}
          onStart={start}
          onPause={pause}
          onReset={reset}
          onSwitch={switchPhase}
        />

        {/* 세션 정보 */}
        <SessionInfo focusCount={focusCount} phase={phase} />

        {/* 히스토리 */}
        <History history={history} onClear={clearHistory} />
      </main>
    </div>
  );
}
