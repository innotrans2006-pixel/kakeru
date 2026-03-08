import { useState } from 'preact/hooks';
import type { JSX } from 'preact';
import { allQuestions, kanjiSheet1, kanjiSheet2 } from '../data/grade4_jan_mar';
import { WritingCanvas } from '../components/study/WritingCanvas';
import { CatDisplay } from '../components/cat/CatDisplay';
import type { CatState } from '../lib/storage';

interface Props {
  cat: CatState;
  onBack: () => void;
}

type Mode = 'select' | 'testing' | 'result';

const SETS = [
  { id: 'sheet1', label: '漢字書き取り①', desc: '20問 × 5点', questions: kanjiSheet1 },
  { id: 'sheet2', label: 'ことわざ・慣用句②', desc: '10問 × 10点', questions: kanjiSheet2 },
  { id: 'all', label: '全問まとめ', desc: '30問', questions: allQuestions },
];

export function Test({ cat, onBack }: Props) {
  const [mode, setMode] = useState<Mode>('select');
  const [selectedSet, setSelectedSet] = useState(SETS[0]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<{ revealed: boolean; correct: boolean | null }[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);

  const startTest = (set: typeof SETS[0]) => {
    setSelectedSet(set);
    setAnswers(set.questions.map(() => ({ revealed: false, correct: null })));
    setCurrentIdx(0);
    setShowAnswer(false);
    setMode('testing');
  };

  const handleReveal = () => setShowAnswer(true);

  const handleJudge = (correct: boolean) => {
    const updated = answers.map((a, i) =>
      i === currentIdx ? { revealed: true, correct } : a
    );
    setAnswers(updated);

    if (currentIdx + 1 < selectedSet.questions.length) {
      setCurrentIdx(currentIdx + 1);
      setShowAnswer(false);
    } else {
      setMode('result');
    }
  };

  if (mode === 'select') {
    return (
      <div style={{ padding: '20px 16px', maxWidth: 420, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <button onClick={onBack} style={backBtn}>←</button>
          <h2 style={{ margin: 0, fontSize: 20 }}>📋 小テスト</h2>
        </div>

        <div style={{ fontSize: 14, color: '#888', marginBottom: 16 }}>
          テストするセットを選んでね
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {SETS.map(set => (
            <button
              key={set.id}
              onClick={() => startTest(set)}
              style={{
                padding: '20px',
                background: 'white',
                border: '2px solid #E8704A',
                borderRadius: 16,
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <div style={{ fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 4 }}>
                {set.label}
              </div>
              <div style={{ fontSize: 13, color: '#888' }}>{set.desc}</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (mode === 'result') {
    const correct = answers.filter(a => a.correct).length;
    const total = selectedSet.questions.length;
    const score = selectedSet.id === 'sheet1'
      ? correct * 5
      : selectedSet.id === 'sheet2'
      ? correct * 10
      : correct;

    const pct = Math.round((correct / total) * 100);

    return (
      <div style={{ padding: '24px 16px', maxWidth: 420, margin: '0 auto', textAlign: 'center' }}>
        <CatDisplay cat={cat} animate={pct >= 80 ? 'sparkle' : 'idle'} size={140} />

        <div style={{ fontSize: 32, fontWeight: 'bold', margin: '16px 0 4px', color: pct >= 80 ? '#4CAF50' : '#FF9800' }}>
          {selectedSet.id !== 'all' ? `${score}点` : `${correct}/${total}問`}
        </div>
        <div style={{ color: '#666', marginBottom: 20 }}>
          {total}問中 {correct}問せいかい ({pct}%)
        </div>

        {pct >= 80 && (
          <div style={{
            background: '#E8F5E9',
            borderRadius: 12,
            padding: '12px',
            marginBottom: 16,
            color: '#2E7D32',
            fontWeight: 'bold',
          }}>
            🎉 すごい！テスト本番もがんばれ！
          </div>
        )}
        {pct < 60 && (
          <div style={{
            background: '#FFF3E0',
            borderRadius: 12,
            padding: '12px',
            marginBottom: 16,
            color: '#E65100',
          }}>
            まちがえた問題をよく練習しよう！
          </div>
        )}

        {answers.some(a => !a.correct) && (
          <div style={{ textAlign: 'left', marginBottom: 20 }}>
            <div style={{ fontSize: 14, color: '#888', marginBottom: 8 }}>まちがえた漢字：</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {answers.map((a, i) => !a.correct ? (
                <div key={i} style={{
                  background: '#FFEBEE',
                  borderRadius: 8,
                  padding: '8px 12px',
                  fontSize: 16,
                  color: '#C62828',
                  fontFamily: '"Hiragino Mincho ProN", serif',
                }}>
                  {selectedSet.questions[i].answer}
                  <span style={{ fontSize: 11, color: '#888', display: 'block' }}>
                    {selectedSet.questions[i].reading}
                  </span>
                </div>
              ) : null)}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={() => startTest(selectedSet)}
            style={{
              flex: 1,
              padding: '14px',
              background: '#E8704A',
              color: 'white',
              border: 'none',
              borderRadius: 14,
              fontSize: 16,
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            もう一度
          </button>
          <button
            onClick={onBack}
            style={{
              flex: 1,
              padding: '14px',
              background: 'white',
              color: '#666',
              border: '2px solid #ddd',
              borderRadius: 14,
              fontSize: 16,
              cursor: 'pointer',
            }}
          >
            ホームへ
          </button>
        </div>
      </div>
    );
  }

  const q = selectedSet.questions[currentIdx];

  return (
    <div style={{ maxWidth: 420, margin: '0 auto' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '16px 16px 8px',
        gap: 12,
      }}>
        <button onClick={onBack} style={backBtn}>←</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, color: '#888' }}>
            {currentIdx + 1} / {selectedSet.questions.length}問
          </div>
          <div style={{ background: '#eee', borderRadius: 4, height: 4, marginTop: 4 }}>
            <div style={{
              width: `${((currentIdx + 1) / selectedSet.questions.length) * 100}%`,
              height: '100%',
              background: '#E8704A',
              borderRadius: 4,
              transition: 'width 0.3s',
            }} />
          </div>
        </div>
      </div>

      <div style={{ padding: '16px' }}>
        <div style={{
          background: 'white',
          borderRadius: 20,
          padding: '24px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          marginBottom: 16,
        }}>
          <div style={{
            fontSize: 12,
            color: '#E8704A',
            fontWeight: 'bold',
            marginBottom: 12,
          }}>
            {q.type === 'kanji' ? '漢字' : q.type === 'proverb' ? 'ことわざ' : '慣用句'}
          </div>

          <div style={{
            fontSize: 24,
            lineHeight: 2.2,
            color: '#1a1a2e',
            marginBottom: 20,
            fontFamily: "'BIZ UDPGothic', 'Hiragino Kaku Gothic ProN', sans-serif",
          }}>
            {q.sentence.split('[　]').map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span>
                    <span style={{ fontSize: 15, color: '#E8704A', display: 'block', lineHeight: 1, fontWeight: 'bold' }}>
                      {q.reading}
                    </span>
                    <span style={{
                      display: 'inline-block',
                      borderBottom: '3px solid #E8704A',
                      minWidth: q.reading.length * 15,
                      height: 32,
                      verticalAlign: 'bottom',
                      background: '#E8704A10',
                      borderRadius: 4,
                    }} />
                  </span>
                )}
              </span>
            ))}
          </div>

          <div style={{ marginBottom: 16 }}>
            <WritingCanvas expectedAnswer={q.answer} />
          </div>

          {!showAnswer ? (
            <button
              onClick={handleReveal}
              style={{
                width: '100%',
                padding: '14px',
                background: '#E8704A',
                color: 'white',
                border: 'none',
                borderRadius: 12,
                fontSize: 16,
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              答えを見る
            </button>
          ) : (
            <>
              <div style={{
                textAlign: 'center',
                padding: '20px',
                background: '#FFF9F0',
                borderRadius: 12,
                marginBottom: 16,
              }}>
                <div style={{
                  fontSize: 84,
                  fontFamily: "'BIZ UDPMincho', 'Hiragino Mincho ProN', serif",
                  color: '#333',
                  lineHeight: 1.2,
                }}>
                  {q.answer}
                </div>
                <div style={{ fontSize: 20, color: '#888', marginTop: 6 }}>\uff08{q.reading}\uff09</div>
              </div>

              {q.hint && (
                <div style={{
                  background: '#FFF8E7',
                  borderRadius: 10,
                  padding: '14px 16px',
                  marginBottom: 10,
                  fontSize: 17,
                  color: '#775500',
                  borderLeft: '4px solid #FFB347',
                  lineHeight: 1.7,
                }}>
                  <strong>成り立ち: </strong>{q.hint}
                </div>
              )}

              {q.meaning && (
                <div style={{
                  background: '#F0F7FF',
                  borderRadius: 10,
                  padding: '14px 16px',
                  marginBottom: 16,
                  fontSize: 17,
                  color: '#003366',
                  borderLeft: '4px solid #4A90D9',
                  lineHeight: 1.7,
                }}>
                  <strong>意味: </strong>{q.meaning}
                </div>
              )}

              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  onClick={() => handleJudge(false)}
                  style={{ flex: 1, padding: '18px', background: '#F44336', color: 'white', border: 'none', borderRadius: 14, fontSize: 18, fontWeight: 'bold', cursor: 'pointer', fontFamily: "'BIZ UDPGothic', sans-serif" }}
                >
                  ✗ まちがえた
                </button>
                <button
                  onClick={() => handleJudge(true)}
                  style={{ flex: 1, padding: '18px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: 14, fontSize: 18, fontWeight: 'bold', cursor: 'pointer', fontFamily: "'BIZ UDPGothic', sans-serif" }}
                >
                  ○ あってた
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const backBtn: JSX.CSSProperties = {
  background: 'none',
  border: 'none',
  fontSize: 22,
  cursor: 'pointer',
  color: '#888',
  padding: '4px 8px',
  flexShrink: 0,
};
