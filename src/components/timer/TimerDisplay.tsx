import type { Phase } from '../../types/timer';
import { PHASE_COLORS } from '../../types/timer';

interface TimerDisplayProps {
  secondsLeft: number;
  progress: number;
  phase: Phase;
}

const SIZE = 240;
const STROKE = 12;
const R = (SIZE - STROKE) / 2;
const CIRC = 2 * Math.PI * R;

export default function TimerDisplay({ secondsLeft, progress, phase }: TimerDisplayProps) {
  const mins = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const secs = String(secondsLeft % 60).padStart(2, '0');
  const color = PHASE_COLORS[phase];
  const offset = CIRC * (1 - progress);

  return (
    <div className="flex items-center justify-center">
      <div className="relative" style={{ width: SIZE, height: SIZE }}>
        <svg width={SIZE} height={SIZE} className="-rotate-90">
          {/* 배경 원 */}
          <circle
            cx={SIZE / 2} cy={SIZE / 2} r={R}
            fill="none" stroke="#1e293b" strokeWidth={STROKE}
          />
          {/* 진행 원 */}
          <circle
            cx={SIZE / 2} cy={SIZE / 2} r={R}
            fill="none"
            stroke={color}
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRC}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
        </svg>
        {/* 시간 텍스트 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-white text-5xl font-mono font-bold tracking-tight">
            {mins}:{secs}
          </span>
        </div>
      </div>
    </div>
  );
}
