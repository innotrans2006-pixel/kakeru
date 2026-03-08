import { useEffect, useState } from 'preact/hooks';
import type { CatState } from '../../lib/storage';

interface Props {
  cat: CatState;
  animate?: 'idle' | 'bounce' | 'shake' | 'sparkle' | 'dance';
  size?: number;
}

const TABBY = {
  base: '#9B8B6A',
  stripe: '#4A3E2E',
  light: '#C8B898',
  belly: '#D8CEB0',
  face: '#B8A880',
  nose: '#E8A090',
  eye: '#C8A020',
  eyePupil: '#1A1008',
  inner: '#C47860',
};

function getCatSize(level: number): 'kitten' | 'young' | 'adult' | 'elder' {
  if (level >= 20) return 'elder';
  if (level >= 10) return 'adult';
  if (level >= 5) return 'young';
  return 'kitten';
}

const MOOD_LABEL: Record<CatState['mood'], string> = {
  happy: '😸',
  excited: '🎉',
  sleepy: '😴',
  proud: '😎',
};

export function CatDisplay({ cat, animate = 'idle', size = 160 }: Props) {
  const [frame, setFrame] = useState(0);
  const catSize = getCatSize(cat.level);

  useEffect(() => {
    const interval = setInterval(() => setFrame(f => f + 1), 600);
    return () => clearInterval(interval);
  }, []);

  const tailWag = Math.sin(frame * 0.5) * (animate === 'dance' ? 30 : 10);
  const bodyFloat = animate === 'bounce'
    ? Math.abs(Math.sin(frame * 1.2)) * -14
    : animate === 'idle'
    ? Math.sin(frame * 0.35) * -3
    : 0;
  const shakeX = animate === 'shake' ? Math.sin(frame * 2.5) * 7 : 0;

  const eyesClosed = cat.mood === 'sleepy';
  const eyesHappy = cat.mood === 'happy' || cat.mood === 'proud';

  return (
    <div style={{ width: size, height: size, position: 'relative', display: 'inline-block', userSelect: 'none' }}>
      {animate === 'sparkle' && <SparkleEffect />}
      <svg
        viewBox="0 0 120 130"
        width={size}
        height={size}
        style={{
          transform: `translateY(${bodyFloat}px) translateX(${shakeX}px)`,
          transition: 'transform 0.08s ease',
          filter: animate === 'sparkle' ? 'drop-shadow(0 0 10px #FFD700)' : 'none',
          overflow: 'visible',
        }}
      >
        <path
          d={`M 85 95 Q ${100 + Math.sin(tailWag * 0.017) * 18} ${108} ${90 + Math.sin(tailWag * 0.017) * 25} ${98 + Math.cos(tailWag * 0.017) * 12}`}
          stroke={TABBY.base} strokeWidth="9" strokeLinecap="round" fill="none"
        />
        <path
          d={`M 85 95 Q ${100 + Math.sin(tailWag * 0.017) * 18} ${108} ${90 + Math.sin(tailWag * 0.017) * 25} ${98 + Math.cos(tailWag * 0.017) * 12}`}
          stroke={TABBY.stripe} strokeWidth="3" strokeLinecap="round" fill="none" strokeDasharray="6 4"
        />

        <ellipse cx="60" cy="92" rx="30" ry="24" fill={TABBY.base} />
        <path d="M 42 82 Q 60 80 78 82" stroke={TABBY.stripe} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M 38 90 Q 60 87 82 90" stroke={TABBY.stripe} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M 40 99 Q 60 96 80 99" stroke={TABBY.stripe} strokeWidth="2" fill="none" strokeLinecap="round" />
        <ellipse cx="60" cy="96" rx="16" ry="14" fill={TABBY.belly} />

        <circle cx="60" cy="54" r="28" fill={TABBY.face} />
        <path d="M 48 34 Q 52 30 56 34" stroke={TABBY.stripe} strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M 56 34 Q 60 29 64 34" stroke={TABBY.stripe} strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M 64 34 Q 68 30 72 34" stroke={TABBY.stripe} strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M 52 35 Q 52 42 50 48" stroke={TABBY.stripe} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M 60 34 Q 60 42 60 48" stroke={TABBY.stripe} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M 68 35 Q 68 42 70 48" stroke={TABBY.stripe} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M 36 56 Q 42 54 46 58" stroke={TABBY.stripe} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M 74 58 Q 78 54 84 56" stroke={TABBY.stripe} strokeWidth="1.5" fill="none" strokeLinecap="round" />

        <polygon points="32,30 38,52 20,50" fill={TABBY.base} />
        <polygon points="34,33 38,50 24,49" fill={TABBY.stripe} opacity="0.5" />
        <polygon points="34,34 38,50 26,49" fill={TABBY.inner} opacity="0.7" />
        <polygon points="88,30 82,52 100,50" fill={TABBY.base} />
        <polygon points="86,33 82,50 96,49" fill={TABBY.stripe} opacity="0.5" />
        <polygon points="86,34 82,50 94,49" fill={TABBY.inner} opacity="0.7" />

        {eyesClosed ? (
          <>
            <path d="M 44 54 Q 49 57 54 54" stroke={TABBY.stripe} strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 66 54 Q 71 57 76 54" stroke={TABBY.stripe} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </>
        ) : eyesHappy ? (
          <>
            <ellipse cx="49" cy="53" rx="6.5" ry="5" fill={TABBY.eye} />
            <ellipse cx="71" cy="53" rx="6.5" ry="5" fill={TABBY.eye} />
            <ellipse cx="49" cy="53" rx="3" ry="4.5" fill={TABBY.eyePupil} />
            <ellipse cx="71" cy="53" rx="3" ry="4.5" fill={TABBY.eyePupil} />
            <circle cx="51" cy="51" r="1.8" fill="white" />
            <circle cx="73" cy="51" r="1.8" fill="white" />
          </>
        ) : (
          <>
            <ellipse cx="49" cy="53" rx="6.5" ry="6" fill={TABBY.eye} />
            <ellipse cx="71" cy="53" rx="6.5" ry="6" fill={TABBY.eye} />
            <ellipse cx="49" cy="53" rx="2.5" ry="5.5" fill={TABBY.eyePupil} />
            <ellipse cx="71" cy="53" rx="2.5" ry="5.5" fill={TABBY.eyePupil} />
            <circle cx="51" cy="50" r="1.8" fill="white" />
            <circle cx="73" cy="50" r="1.8" fill="white" />
          </>
        )}

        <ellipse cx="60" cy="61" rx="4" ry="3" fill={TABBY.nose} />
        <line x1="60" y1="64" x2="60" y2="67" stroke={TABBY.stripe} strokeWidth="1.5" />
        {animate === 'shake' ? (
          <path d="M 56 67 Q 60 65 64 67" stroke={TABBY.stripe} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        ) : (
          <path d="M 56 67 Q 58 70 60 69 Q 62 70 64 67" stroke={TABBY.stripe} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        )}

        <line x1="28" y1="60" x2="48" y2="62" stroke="white" strokeWidth="1.5" opacity="0.9" />
        <line x1="26" y1="64" x2="47" y2="64" stroke="white" strokeWidth="1.5" opacity="0.9" />
        <line x1="28" y1="68" x2="48" y2="66" stroke="white" strokeWidth="1.5" opacity="0.9" />
        <line x1="72" y1="62" x2="92" y2="60" stroke="white" strokeWidth="1.5" opacity="0.9" />
        <line x1="73" y1="64" x2="94" y2="64" stroke="white" strokeWidth="1.5" opacity="0.9" />
        <line x1="72" y1="66" x2="92" y2="68" stroke="white" strokeWidth="1.5" opacity="0.9" />

        {cat.accessories.includes('ribbon') && (
          <>
            <polygon points="45,32 52,38 45,44" fill="#FF6B9D" opacity="0.92" />
            <polygon points="60,32 52,38 60,44" fill="#FF6B9D" opacity="0.92" />
            <circle cx="52" cy="38" r="4.5" fill="#FF1177" />
          </>
        )}
        {cat.accessories.includes('hat') && (
          <>
            <rect x="36" y="20" width="48" height="7" rx="3" fill="#2C1810" />
            <rect x="42" y="5" width="36" height="17" rx="5" fill="#1A0C08" />
            <rect x="40" y="20" width="40" height="2" fill="#8B6914" />
          </>
        )}
        {cat.accessories.includes('glasses') && (
          <>
            <circle cx="49" cy="53" r="10" fill="none" stroke="#6B4C11" strokeWidth="2.5" />
            <circle cx="71" cy="53" r="10" fill="none" stroke="#6B4C11" strokeWidth="2.5" />
            <line x1="59" y1="53" x2="61" y2="53" stroke="#6B4C11" strokeWidth="2.5" />
            <line x1="39" y1="52" x2="36" y2="54" stroke="#6B4C11" strokeWidth="2" />
            <line x1="81" y1="52" x2="84" y2="54" stroke="#6B4C11" strokeWidth="2" />
          </>
        )}
        {cat.accessories.includes('crown') && (
          <polygon points="38,26 48,12 58,22 68,12 78,22 82,28 34,28" fill="#FFD700" stroke="#DAA520" strokeWidth="1" />
        )}

        {catSize === 'kitten' && <text x="60" y="125" textAnchor="middle" fontSize="8" fill="#888" fontFamily="sans-serif">こねこ</text>}
        {catSize === 'young' && <text x="60" y="125" textAnchor="middle" fontSize="8" fill="#4A90D9" fontFamily="sans-serif">わかねこ</text>}
        {catSize === 'adult' && <text x="60" y="125" textAnchor="middle" fontSize="8" fill="#E8704A" fontFamily="sans-serif">おとなねこ</text>}
        {catSize === 'elder' && <text x="60" y="125" textAnchor="middle" fontSize="8" fill="#9B59B6" fontFamily="sans-serif">ぬしねこ</text>}
      </svg>
    </div>
  );
}

function SparkleEffect() {
  const sparkles = [
    { top: '5%', left: '-15%', char: '✨', delay: '0s' },
    { top: '10%', left: '108%', char: '⭐', delay: '0.1s' },
    { top: '55%', left: '-20%', char: '💫', delay: '0.2s' },
    { top: '60%', left: '112%', char: '🌟', delay: '0.15s' },
  ];
  return (
    <>
      {sparkles.map((s, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: s.top, left: s.left,
          fontSize: 22,
          animationName: `sparkle-${i}`,
          animationDuration: '0.9s',
          animationDelay: s.delay,
          animationFillMode: 'forwards',
          animationTimingFunction: 'ease-out',
          zIndex: 10,
        }}>
          {s.char}
        </div>
      ))}
    </>
  );
}

export function CatStatusBar({ cat }: { cat: CatState }) {
  const pct = Math.min(100, Math.round((cat.xp / cat.xpToNext) * 100));
  return (
    <div style={{ textAlign: 'center', padding: '6px 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#888', marginBottom: 5 }}>
        <span>Lv.{cat.level} {MOOD_LABEL[cat.mood]}</span>
        <span>XP {cat.xp}/{cat.xpToNext}</span>
      </div>
      <div style={{ background: '#E8E0D4', borderRadius: 8, height: 11, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: 'linear-gradient(90deg, #9B8B6A, #C8A060)', borderRadius: 8, transition: 'width 0.5s ease' }} />
      </div>
    </div>
  );
}
