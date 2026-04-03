import type { Phase } from '../../types/timer';
import { PHASE_LABELS, PHASE_COLORS } from '../../types/timer';

interface SessionInfoProps {
  focusCount: number;
  phase: Phase;
}

export default function SessionInfo({ focusCount, phase }: SessionInfoProps) {
  // 4세션마다 긴 휴식
  const nextBreak = 4 - (focusCount % 4);
  const isLongNext = nextBreak === 1;

  return (
    <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex items-center justify-between">
      <div>
        <p className="text-slate-400 text-xs mb-1">오늘 완료한 집중</p>
        <div className="flex items-center gap-1">
          {Array.from({ length: Math.max(focusCount, 4) }).map((_, i) => (
            <div
              key={i}
              className="w-5 h-5 rounded-full flex items-center justify-center text-xs"
              style={{
                backgroundColor: i < focusCount ? PHASE_COLORS.focus : '#1e293b',
                border: `2px solid ${i < focusCount ? PHASE_COLORS.focus : '#334155'}`,
              }}
            >
              {i < focusCount && <span className="text-white text-xs">✓</span>}
            </div>
          ))}
          {focusCount > 4 && <span className="text-slate-400 text-xs ml-1">+{focusCount - 4}</span>}
        </div>
      </div>
      <div className="text-right">
        <p className="text-slate-400 text-xs mb-1">현재 단계</p>
        <span
          className="text-sm font-semibold px-2 py-0.5 rounded-full"
          style={{ backgroundColor: PHASE_COLORS[phase] + '33', color: PHASE_COLORS[phase] }}
        >
          {PHASE_LABELS[phase]}
        </span>
        {phase === 'focus' && focusCount > 0 && (
          <p className="text-slate-500 text-xs mt-1">
            {nextBreak}세션 후 {isLongNext ? '긴 휴식' : '짧은 휴식'}
          </p>
        )}
      </div>
    </div>
  );
}
