import { useState, useCallback } from 'preact/hooks';
import { PREFECTURES, REGIONS, getPrefecturesByRegion } from '../data/prefectures';
import type { Prefecture, Region } from '../data/prefectures';

type Mode = 'menu' | 'list' | 'kanji-quiz' | 'region-quiz' | 'result';

interface Props {
  onBack: () => void;
}

const REGION_COLORS: Record<string, string> = {
  '北海道地方': '#4A90D9',
  '東北地方':   '#7B68EE',
  '関東地方':   '#E8704A',
  '中部地方':   '#F5A623',
  '近畿地方':   '#7ED321',
  '中国地方':   '#50C878',
  '四国地方':   '#20B2AA',
  '九州地方':   '#FF6B6B',
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeKanjiChoices(correct: Prefecture): Prefecture[] {
  const others = shuffle(PREFECTURES.filter(p => p.id !== correct.id)).slice(0, 3);
  return shuffle([correct, ...others]);
}

function makeRegionChoices(correct: Region): Region[] {
  const others = shuffle(REGIONS.filter(r => r !== correct)).slice(0, 3);
  return shuffle([correct, ...others]);
}

// -- List Mode
function ListView({ onBack }: { onBack: () => void }) {
  const byRegion = getPrefecturesByRegion();
  return (
    <div style={{ padding: '12px 16px', maxWidth: 420, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <button onClick={onBack} style={backBtnStyle}>← もどる</button>
        <h2 style={{ margin: 0, fontSize: 18 }}>地方別 一覧</h2>
      </div>
      {REGIONS.map(region => (
        <div key={region} style={{ marginBottom: 14 }}>
          <div style={{
            background: REGION_COLORS[region],
            color: 'white',
            borderRadius: 10,
            padding: '6px 14px',
            fontWeight: 'bold',
            fontSize: 14,
            marginBottom: 6,
          }}>
            {region}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {(byRegion.get(region) ?? []).map(p => (
              <div key={p.id} style={{
                background: `${REGION_COLORS[region]}18`,
                border: `1.5px solid ${REGION_COLORS[region]}55`,
                borderRadius: 8,
                padding: '6px 10px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 16, fontWeight: 'bold' }}>{p.kanji}</div>
                <div style={{ fontSize: 11, color: '#888' }}>{p.reading}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// -- Kanji Quiz
function KanjiQuiz({ onFinish }: { onFinish: (score: number, total: number) => void }) {
  const questions = useState(() => shuffle(PREFECTURES))[0];
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [choices] = useState(() => questions.map(q => makeKanjiChoices(q)));

  const current = questions[idx];
  const currentChoices = choices[idx];
  const answered = selected !== null;

  const pick = useCallback((p: Prefecture) => {
    if (answered) return;
    setSelected(p.id);
    if (p.id === current.id) setScore(s => s + 1);
  }, [answered, current.id]);

  const next = useCallback(() => {
    if (idx + 1 >= questions.length) {
      onFinish(score + (selected === current.id ? 1 : 0), questions.length);
    } else {
      setIdx(i => i + 1);
      setSelected(null);
    }
  }, [idx, questions.length, onFinish, score, selected, current.id]);

  const isCorrect = selected === current.id;

  return (
    <div style={{ padding: '16px', maxWidth: 420, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ fontSize: 13, color: '#888' }}>{idx + 1} / {questions.length}</div>
        <div style={{ fontSize: 13, color: '#4CAF50', fontWeight: 'bold' }}>✅ {score}</div>
      </div>

      <div style={{ background: '#EEE', borderRadius: 4, height: 6, marginBottom: 20 }}>
        <div style={{ background: '#4A90D9', width: `${(idx / questions.length) * 100}%`, height: '100%', borderRadius: 4, transition: 'width 0.3s' }} />
      </div>

      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ fontSize: 13, color: '#888', marginBottom: 4 }}>この計みの都道府県はどれ？</div>
        <div style={{
          fontSize: 40,
          fontWeight: 'bold',
          color: '#333',
          background: 'white',
          borderRadius: 16,
          padding: '20px 24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        }}>
          {current.reading}
        </div>
        <div style={{ fontSize: 12, color: '#AAA', marginTop: 4 }}>
          {REGION_COLORS[current.region] && (
            <span style={{ color: REGION_COLORS[current.region], fontWeight: 'bold' }}>
              {current.region}
            </span>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
        {currentChoices.map(p => {
          let bg = 'white';
          let border = '2px solid #DDD';
          let color = '#333';
          if (answered) {
            if (p.id === current.id) { bg = '#E8F5E9'; border = '2px solid #4CAF50'; color = '#2E7D32'; }
            else if (p.id === selected) { bg = '#FFEBEE'; border = '2px solid #EF5350'; color = '#C62828'; }
          }
          return (
            <button key={p.id} onClick={() => pick(p)} style={{
              padding: '14px 8px',
              background: bg,
              border,
              borderRadius: 12,
              fontSize: 18,
              fontWeight: 'bold',
              color,
              cursor: answered ? 'default' : 'pointer',
              lineHeight: 1.3,
            }}>
              {p.kanji}
              {answered && p.id === current.id && <div style={{ fontSize: 11, color: '#888', fontWeight: 'normal' }}>{p.reading}</div>}
            </button>
          );
        })}
      </div>

      {answered && (
        <div style={{ textAlign: 'center', marginBottom: 12 }}>
          <div style={{ fontSize: 20, fontWeight: 'bold', color: isCorrect ? '#4CAF50' : '#EF5350', marginBottom: 8 }}>
            {isCorrect ? '⭕ せいかい！' : '❌ ざんねん…'}
          </div>
          {!isCorrect && (
            <div style={{ fontSize: 14, color: '#555' }}>
              こたえ：<strong>{current.kanji}</strong>（{current.reading}）
            </div>
          )}
        </div>
      )}

      {answered && (
        <button onClick={next} style={{
          width: '100%',
          padding: '16px',
          background: 'linear-gradient(135deg, #4A90D9, #5BA3F5)',
          color: 'white',
          border: 'none',
          borderRadius: 14,
          fontSize: 18,
          fontWeight: 'bold',
          cursor: 'pointer',
        }}>
          {idx + 1 >= questions.length ? '結果を見る' : 'つぎへ →'}
        </button>
      )}
    </div>
  );
}

// -- Region Quiz
function RegionQuiz({ onFinish }: { onFinish: (score: number, total: number) => void }) {
  const questions = useState(() => shuffle(PREFECTURES))[0];
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [choices] = useState(() => questions.map(q => makeRegionChoices(q.region)));

  const current = questions[idx];
  const currentChoices = choices[idx];
  const answered = selected !== null;

  const pick = useCallback((r: Region) => {
    if (answered) return;
    setSelected(r);
    if (r === current.region) setScore(s => s + 1);
  }, [answered, current.region]);

  const next = useCallback(() => {
    if (idx + 1 >= questions.length) {
      onFinish(score + (selected === current.region ? 1 : 0), questions.length);
    } else {
      setIdx(i => i + 1);
      setSelected(null);
    }
  }, [idx, questions.length, onFinish, score, selected, current.region]);

  const isCorrect = selected === current.region;

  return (
    <div style={{ padding: '16px', maxWidth: 420, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ fontSize: 13, color: '#888' }}>{idx + 1} / {questions.length}</div>
        <div style={{ fontSize: 13, color: '#4CAF50', fontWeight: 'bold' }}>✅ {score}</div>
      </div>

      <div style={{ background: '#EEE', borderRadius: 4, height: 6, marginBottom: 20 }}>
        <div style={{ background: '#2ECC71', width: `${(idx / questions.length) * 100}%`, height: '100%', borderRadius: 4, transition: 'width 0.3s' }} />
      </div>

      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ fontSize: 13, color: '#888', marginBottom: 4 }}>この都道府県はどの地方？</div>
        <div style={{
          fontSize: 36,
          fontWeight: 'bold',
          color: '#333',
          background: 'white',
          borderRadius: 16,
          padding: '20px 24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        }}>
          {current.kanji}
        </div>
        <div style={{ fontSize: 14, color: '#AAA', marginTop: 6 }}>{current.reading}</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
        {currentChoices.map(r => {
          let bg = 'white';
          let border = '2px solid #DDD';
          let color = '#333';
          if (answered) {
            if (r === current.region) { bg = '#E8F5E9'; border = '2px solid #4CAF50'; color = '#2E7D32'; }
            else if (r === selected) { bg = '#FFEBEE'; border = '2px solid #EF5350'; color = '#C62828'; }
          } else {
            const c = REGION_COLORS[r];
            bg = `${c}18`;
            border = `2px solid ${c}55`;
          }
          return (
            <button key={r} onClick={() => pick(r as Region)} style={{
              padding: '12px 8px',
              background: bg,
              border,
              borderRadius: 12,
              fontSize: 13,
              fontWeight: 'bold',
              color,
              cursor: answered ? 'default' : 'pointer',
            }}>
              {r}
            </button>
          );
        })}
      </div>

      {answered && (
        <div style={{ textAlign: 'center', marginBottom: 12 }}>
          <div style={{ fontSize: 20, fontWeight: 'bold', color: isCorrect ? '#4CAF50' : '#EF5350', marginBottom: 4 }}>
            {isCorrect ? '⭕ せいかい！' : '❌ ざんねん…'}
          </div>
          {!isCorrect && (
            <div style={{ fontSize: 14, color: '#555' }}>
              こたえ：<strong style={{ color: REGION_COLORS[current.region] }}>{current.region}</strong>
            </div>
          )}
        </div>
      )}

      {answered && (
        <button onClick={next} style={{
          width: '100%',
          padding: '16px',
          background: 'linear-gradient(135deg, #2ECC71, #27AE60)',
          color: 'white',
          border: 'none',
          borderRadius: 14,
          fontSize: 18,
          fontWeight: 'bold',
          cursor: 'pointer',
        }}>
          {idx + 1 >= questions.length ? '結果を見る' : 'つぎへ →'}
        </button>
      )}
    </div>
  );
}

// -- Result Screen
function ResultScreen({ score, total, onRetry, onMenu }: {
  score: number; total: number; onRetry: () => void; onMenu: () => void;
}) {
  const pct = Math.round((score / total) * 100);
  const emoji = pct >= 90 ? '🏆' : pct >= 70 ? '⭕' : pct >= 50 ? '🔺' : '💪';
  return (
    <div style={{ padding: 24, maxWidth: 380, margin: '0 auto', textAlign: 'center' }}>
      <div style={{ fontSize: 60, marginBottom: 8 }}>{emoji}</div>
      <div style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 4 }}>
        {score} / {total}問 せいかい
      </div>
      <div style={{ fontSize: 20, color: '#888', marginBottom: 24 }}>{pct}%</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button onClick={onRetry} style={{
          padding: '16px',
          background: 'linear-gradient(135deg, #4A90D9, #5BA3F5)',
          color: 'white', border: 'none', borderRadius: 14, fontSize: 18, fontWeight: 'bold', cursor: 'pointer',
        }}>
          もう一度
        </button>
        <button onClick={onMenu} style={{
          padding: '14px',
          background: 'white', color: '#4A90D9', border: '2px solid #4A90D9',
          borderRadius: 14, fontSize: 16, fontWeight: 'bold', cursor: 'pointer',
        }}>
          メニューへ
        </button>
      </div>
    </div>
  );
}

// -- Main Component
const backBtnStyle: Record<string, string | number> = {
  padding: '6px 14px',
  background: 'white',
  border: '2px solid #DDD',
  borderRadius: 20,
  fontSize: 14,
  cursor: 'pointer',
  color: '#555',
};

export function PrefectureStudy({ onBack }: Props) {
  const [mode, setMode] = useState<Mode>('menu');
  const [quizKey, setQuizKey] = useState(0);
  const [lastScore, setLastScore] = useState({ score: 0, total: 0 });
  const [quizType, setQuizType] = useState<'kanji' | 'region'>('kanji');

  const handleFinish = useCallback((score: number, total: number) => {
    setLastScore({ score, total });
    setMode('result');
  }, []);

  const retryQuiz = useCallback(() => {
    setQuizKey(k => k + 1);
    setMode(quizType === 'kanji' ? 'kanji-quiz' : 'region-quiz');
  }, [quizType]);

  if (mode === 'list') {
    return <ListView onBack={() => setMode('menu')} />;
  }

  if (mode === 'kanji-quiz') {
    return <KanjiQuiz key={quizKey} onFinish={handleFinish} />;
  }

  if (mode === 'region-quiz') {
    return <RegionQuiz key={quizKey} onFinish={handleFinish} />;
  }

  if (mode === 'result') {
    return (
      <ResultScreen
        score={lastScore.score}
        total={lastScore.total}
        onRetry={retryQuiz}
        onMenu={() => setMode('menu')}
      />
    );
  }

  return (
    <div style={{ padding: '20px 16px', maxWidth: 420, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
        <button onClick={onBack} style={backBtnStyle}>← もどる</button>
        <h1 style={{ margin: 0, fontSize: 20 }}>🗾 都道府県</h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <button
          onClick={() => setMode('list')}
          style={{
            padding: '18px 20px',
            background: 'linear-gradient(135deg, #4A90D9, #5BA3F5)',
            color: 'white', border: 'none', borderRadius: 16,
            fontSize: 18, fontWeight: 'bold', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 12,
          }}
        >
          📋 地方別 一覧
          <span style={{ fontSize: 13, opacity: 0.85, fontWeight: 'normal' }}>47都道府県を確認</span>
        </button>

        <button
          onClick={() => { setQuizType('kanji'); setQuizKey(k => k + 1); setMode('kanji-quiz'); }}
          style={{
            padding: '18px 20px',
            background: 'linear-gradient(135deg, #E8704A, #F5A623)',
            color: 'white', border: 'none', borderRadius: 16,
            fontSize: 18, fontWeight: 'bold', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 12,
          }}
        >
          📝 漢字クイズ
          <span style={{ fontSize: 13, opacity: 0.85, fontWeight: 'normal' }}>読みから漢字を選ぶ</span>
        </button>

        <button
          onClick={() => { setQuizType('region'); setQuizKey(k => k + 1); setMode('region-quiz'); }}
          style={{
            padding: '18px 20px',
            background: 'linear-gradient(135deg, #2ECC71, #27AE60)',
            color: 'white', border: 'none', borderRadius: 16,
            fontSize: 18, fontWeight: 'bold', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 12,
          }}
        >
          🗺 地方クイズ
          <span style={{ fontSize: 13, opacity: 0.85, fontWeight: 'normal' }}>どの地方か当てる</span>
        </button>
      </div>

      <div style={{
        marginTop: 24, background: 'white', borderRadius: 14,
        padding: '14px 16px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}>
        <div style={{ fontSize: 13, color: '#888', marginBottom: 10 }}>8つの地方</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {REGIONS.map(r => (
            <div key={r} style={{
              background: `${REGION_COLORS[r]}22`,
              border: `1.5px solid ${REGION_COLORS[r]}66`,
              color: REGION_COLORS[r],
              borderRadius: 20, padding: '4px 10px',
              fontSize: 12, fontWeight: 'bold',
            }}>
              {r.replace('地方', '')}
            </div>
          ))}
        </div>
        <div style={{ fontSize: 12, color: '#BBB', marginTop: 8, textAlign: 'right' }}>
          呴47都道府県
        </div>
      </div>
    </div>
  );
}
