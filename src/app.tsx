import { useState, useEffect } from 'preact/hooks';
import { Home } from './pages/Home';
import { Study } from './pages/Study';
import { Test } from './pages/Test';
import { PrefectureStudy } from './pages/PrefectureStudy';
import { MatomePractice } from './pages/MatomePractice';
import {
  loadCards, saveCards,
  loadCat, saveCat,
  loadStreak, updateStreak,
} from './lib/storage';
import type { CardState } from './lib/srs';
import type { CatState, StreakState } from './lib/storage';

type Page = 'home' | 'study' | 'test' | 'prefecture' | 'matome';

export function App() {
  const [page, setPage] = useState<Page>('home');
  const [cards, setCards] = useState<CardState[]>(() => loadCards());
  const [cat, setCat] = useState<CatState>(() => loadCat());
  const [streak, setStreak] = useState<StreakState>(() => {
    const s = loadStreak();
    return updateStreak(s);
  });

  useEffect(() => { saveCards(cards); }, [cards]);
  useEffect(() => { saveCat(cat); }, [cat]);

  const handleStudyComplete = (updatedCards: CardState[], updatedCat: CatState) => {
    setCards(updatedCards);
    setCat(updatedCat);
    const updatedStreak = updateStreak(streak);
    setStreak(updatedStreak);
  };

  return (
    <div style={{ minHeight: '100dvh', background: '#FFF9F0', fontFamily: '"Hiragino Kaku Gothic ProN", "Meiryo", sans-serif' }}>
      {page === 'home' && (
        <Home
          cat={cat}
          cards={cards}
          streak={streak}
          onStudy={() => setPage('study')}
          onTest={() => setPage('test')}
          onPrefecture={() => setPage('prefecture')}
          onMatome={() => setPage('matome')}
        />
      )}
      {page === 'study' && (
        <Study
          cards={cards}
          cat={cat}
          onComplete={(updatedCards, updatedCat) => {
            handleStudyComplete(updatedCards, updatedCat);
            setPage('home');
          }}
          onBack={() => setPage('home')}
        />
      )}
      {page === 'test' && (
        <Test
          cat={cat}
          onBack={() => setPage('home')}
        />
      )}
      {page === 'prefecture' && (
        <PrefectureStudy onBack={() => setPage('home')} />
      )}
      {page === 'matome' && (
        <MatomePractice onBack={() => setPage('home')} />
      )}
    </div>
  );
}
