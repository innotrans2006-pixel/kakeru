import { useState, useEffect } from 'preact/hooks';
import { FlashCard } from '../components/study/FlashCard';
import { CatDisplay } from '../components/cat/CatDisplay';
import type { CardState } from '../lib/srs';
import { getDueCards, reviewCard } from '../lib/srs';
import { allQuestions } from '../data/grade4_jan_mar';
import type { CatState } from '../lib/storage';
import { addXp } from '../lib/storage';

interface Props {
  cards: CardState[];
  cat: CatState;
  onComplete: (updatedCards: CardState[], updatedCat: CatState) => void;
  onBack: () => void;
}

const SESSION_MAX = 10;
const SESSION_MINUTES = 5;

type SessionPhase = 'study' | 'complete';

export function Study({ cards, cat, onComplete, onBack }: Props) {
  const [sessionCards, setSessionCards] = useState<CardState[]>(() => {
    const due = getDueCards(cards);
    const pool = due.length > 0 ? due : [...cards].sort((a, b) => a.nextReview - b.nextReview);
    return pool.slice(0, SESSION_MAX);
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<SessionPhase>('study');
  const [results, setResults] = useState<{ quality: 0 | 1 | 2 }[]>([]);
  const [catAnim, setCatAnim] = useState<'idle' | 'bounce' | 'shake' | 'sparkle' | 'dance'>('idle');
  const [xpGained, setXpGained] = useState(0);
  const [leveledUp, setLeveledUp] = useState(false);
  const [startTime] = useState(Date.now());
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [startTime]);

  const currentCard = sessionCards[currentIndex];
  const currentQuestion = currentCard
    ? allQuestions.find(q => q.id === currentCard.questionId)
    : null;

  const handleAnswer = (quality: 0 | 1 | 2) => {
    if (!currentCard) return;

    const updatedCard = reviewCard(currentCard, quality);
    const xp = quality === 0 ? 0 : quality === 1 ? 3 : 5;
    setXpGained(prev => prev + xp);

    if (quality === 2) {
      setCatAnim('bounce');
      setTimeout(() => setCatAnim('idle'), 1000);
    } else if (quality === 0) {
      setCatAnim('shake');
      setTimeout(() => setCatAnim('idle'), 800);
    }

    setResults(prev => [...prev, { quality }]);

    const updatedSessionCards = sessionCards.map(c =>
      c.questionId === currentCard.questionId ? updatedCard : c
    );
    setSessionCards(updatedSessionCards);

    if (currentIndex + 1 >= sessionCards.length) {
      const sessionXp = xpGained + xp + 20;
      const prevLevel = cat.level;
      const updatedCat = addXp(cat, sessionXp);
      if (updatedCat.level > prevLevel) {
        setLeveledUp(true);
        setCatAnim('sparkle');
      } else {
        setCatAnim('dance');
      }

      const allUpdated = cards.map(c =>
        updatedSessionCards.find(sc => sc.questionId === c.questionId) ?? c
      );
      setTimeout(() => {
        setPhase('complete');
        onComplete(allUpdated, updatedCat);
      }, 1200);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  if (phase === 'complete') {
    const correct = results.filter(r => r.quality > 0).length;
    const pct = Math.round((correct / results.length) * 100);

    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '32px 20px',
        maxWidth: 420,
        margin: '0 auto',
        gap: 20,
      }}>
        <CatDisplay cat={cat} animate={leveledUp ? 'sparkle' : 'dance'} size={160} />

        {leveledUp && (
          <div style={{
            background: 'linear-gradient(135deg, #FFD700, #FFA500)',
            color: 'white',
            borderRadius: 20,
            padding: '16px 24px',
            fontSize: 22,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
            🎉 レベルアップ！ Lv.{cat.level}
          </div>
        )}

        <div style={{
          background: 'white',
          borderRadius: 20,
          padding: '24px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          width: '100%',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 48, fontWeight: 'bold', color: pct >= 80 ? '#4CAF50' : pct >= 60 ? '#FF9800' : '#F44336' }}>
            {pct}%
          </div>
          <div style={{ fontSize: 16, color: '#666', marginBottom: 16 }}>
            {results.length}問中 {correct}問 せいかい！
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <StatItem label="⏱ 時間" value={formatTime(elapsed)} />
            <StatItem label="✨ XP" value={`+${xpGained + 20}`} />
          </div>
        </div>

        <button
          onClick={onBack}
          style={{
            padding: '16px 40px',
            background: 'linear-gradient(135deg, #4A90D9, #5BA3F5)',
            color: 'white',
            border: 'none',
            borderRadius: 16,
            fontSize: 18,
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          ホームにもどる
        </button>
      </div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div style={{ paddingTop: 16 }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 16px',
        marginBottom: 8,
        maxWidth: 420,
        margin: '0 auto 8px',
      }}>
        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            fontSize: 24,
            cursor: 'pointer',
            color: '#888',
            padding: '4px 8px',
          }}
        >
          ←
        </button>
        <div style={{ fontSize: 13, color: '#888' }}>
          ⏱ {formatTime(elapsed)} / {SESSION_MINUTES}:00
        </div>
        <div style={{ width: 40 }} />
      </div>

      <div style={{ textAlign: 'center', marginBottom: 8 }}>
        <CatDisplay cat={cat} animate={catAnim} size={80} />
      </div>

      <FlashCard
        question={currentQuestion}
        onAnswer={handleAnswer}
        cardIndex={currentIndex}
        total={sessionCards.length}
      />
    </div>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div style={{
      background: '#F8F9FA',
      borderRadius: 12,
      padding: '12px',
      textAlign: 'center',
    }}>
      <div style={{ fontSize: 11, color: '#888', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 20, fontWeight: 'bold', color: '#333' }}>{value}</div>
    </div>
  );
}
