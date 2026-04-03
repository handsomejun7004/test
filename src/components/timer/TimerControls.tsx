import type { Phase } from '../../types/timer';
import { PHASE_LABELS, PHASE_DURATIONS, PHASE_COLORS } from '../../types/timer';

interface TimerControlsProps {
  phase: Phase;
  running: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSwitch: (p: Phase) => void;
}

const PHASES: Phase[] = ['focus', 'short', 'long'];

export default function TimerControls({ phase, running, onStart, onPause, onReset, onSwitch }: TimerControlsProps) {
  return (
    <div className="space-y-4">
      {/* 페이즈 탭 */}
      <div className="flex bg-slate-800 rounded-xl p-1 gap-1">
        {PHASES.map((p) => (
          <button
            key={p}
            onClick={() => onSwitch(p)}
            className="flex-1 py-2 text-xs font-medium rounded-lg transition-colors"
            style={phase === p ? { backgroundColor: PHASE_COLORS[p], color: '#fff' } : { color: '#94a3b8' }}
          >
            {PHASE_LABELS[p]}
            <span className="block text-xs opacity-70">
              {PHASE_DURATIONS[p] / 60}분
            </span>
          </button>
        ))}
      </div>

      {/* 제어 버튼 */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={onReset}
          className="w-12 h-12 rounded-full bg-slate-700 hover:bg-slate-600 text-slate-300 text-lg transition-colors flex items-center justify-center"
          title="리셋"
        >
          ↺
        </button>
        <button
          onClick={running ? onPause : onStart}
          className="w-20 h-20 rounded-full text-white text-2xl font-bold transition-all active:scale-95 flex items-center justify-center shadow-lg"
          style={{ backgroundColor: PHASE_COLORS[phase] }}
        >
          {running ? '⏸' : '▶'}
        </button>
        <div className="w-12 h-12" /> {/* 균형용 */}
      </div>
    </div>
  );
}
