import { useState } from 'preact/hooks';
import type { JSX } from 'preact';
import { matomuSheet1, matomuSheet2, matomuAll, nigate } from '../data/grade4_matome';
import type { Question } from '../data/grade4_jan_mar';
import { WritingCanvas } from '../components/study/WritingCanvas';

interface Props {
  onBack: () => void;
}

type Mode = 'menu' | 'drill' | 'test' | 'result';

const SETS = [
  {
    id: 'nigate',
    label: '★ 苦手だけ集中特訓',
    desc: `${nigate.length}問（赤丸がついた問題）`,
    color: '#F44336',
    icon: '🔥',
    questions: matomuAll.filter(q => nigate.includes(q.id)),
  },
  {
    id: 'sheet1',
    label: '書き取り練習',
    desc: `${matomuSheet1.length}問（各5点）`,
    color: '#4A90D9',
    icon: '✏️',
    questions: matomuSheet1,
  },
  {
    id: 'sheet2',
    label: 'ことわざ・慣用句',
    desc: `${matomuSheet2.length}問（各10点）`,
    color: '#9B59B6',
    icon: '📜',
    questions: matomuSheet2,
  },
  {
    id: 'all',
    label: '全問まとめテスト',
    desc: `全${matomuAll.length}問`,
    color: '#E8704A',
    icon: '📝',
    questions: matomuAll,
  },
];

export function MatomePractice({ onBack }: Props) {
  const [mode, setMode] = useState<Mode>('menu');
  const [selectedSet, setSelectedSet] = useState(SETS[0]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [answers, setAnswers] = useState<{ correct: boolean | null }[]>([]);
  const [isDrill, setIsDrill] = useState(false);

  const startSession = (set: typeof SETS[0], drill: boolean) => {
    setSelectedSet(set);
    setCurrentIdx(0);
    setShowAnswer(false);
    setAnswers(set.questions.map(() => ({ correct: null })));
    setIsDrill(drill);
    setMode(drill ? 'drill' : 'test');
  };

  const handleJudge = (correct: boolean) => {
    const updated = answers.map((a, i) =>
      i === currentIdx ? { correct } : a
    );
    setAnswers(updated);

    if (currentIdx + 1 < selectedSet.questions.length) {
      setCurrentIdx(currentIdx + 1);
      setShowAnswer(false);
    } else {
      setMode('result');
    }
  };

  if (mode === 'menu') {
    return <Menu onBack={onBack} onStart={startSession} />;
  }

  if (mode === 'result') {
    const correct = answers.filter(a => a.correct).length;
    const total = selectedSet.questions.length;
    const pct = Math.round((correct / total) * 100);
    return (
      <Result
        correct={correct}
        total={total}
        pct={pct}
        questions={selectedSet.questions}
        answers={answers}
        onRetry={() => startSession(selectedSet, isDrill)}
        onMenu={() => setMode('menu')}
        onBack={onBack}
      />
    );
  }

  const q = selectedSet.questions[currentIdx];
  const isNigate = nigate.includes(q.id);

  return (
    <div style={{ maxWidth: 480, margin: '0 auto' }}>
      <div style={{
        display: 'flex', alignItems: 'center',
        padding: '16px 16px 8px', gap: 12,
      }}>
        <button onClick={onBack} style={backBtn}>←</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, color: '#888' }}>
            {currentIdx + 1} / {selectedSet.questions.length}問
            {isNigate && <span style={{ marginLeft: 8, color: '#F44336', fontWeight: 'bold' }}>★ 苦手</span>}
          </div>
          <div style={{ background: '#eee', borderRadius: 4, height: 5, marginTop: 4 }}>
            <div style={{
              width: `${((currentIdx + 1) / selectedSet.questions.length) * 100}%`,
              height: '100%',
              background: selectedSet.color,
              borderRadius: 4,
              transition: 'width 0.3s',
            }} />
          </div>
        </div>
      </div>

      <div style={{ padding: '12px 16px' }}>
        <QuestionCard
          question={q}
          showAnswer={showAnswer}
          isDrill={isDrill}
          color={selectedSet.color}
          isNigate={isNigate}
          onReveal={() => setShowAnswer(true)}
          onJudge={handleJudge}
        />
      </div>
    </div>
  );
}

function Menu({ onBack, onStart }: {
  onBack: () => void;
  onStart: (set: typeof SETS[0], drill: boolean) => void;
}) {
  return (
    <div style={{ padding: '20px 16px', maxWidth: 480, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <button onClick={onBack} style={backBtn}>←</button>
        <h2 style={{ margin: 0, fontSize: 20 }}>📋 まとめテスト対策</h2>
      </div>

      <div style={{
        background: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
        borderRadius: 16,
        padding: '14px 18px',
        color: 'white',
        marginBottom: 20,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}>
        <div style={{ fontSize: 32 }}>📄</div>
        <div>
          <div style={{ fontWeight: 'bold', fontSize: 15, marginBottom: 2 }}>
            4年生の漢字まとめテスト
          </div>
          <div style={{ fontSize: 13, opacity: 0.9 }}>
            3/5に実施済み ・ 赤丸の問題を重点練習！
          </div>
        </div>
      </div>

      <div style={{
        background: '#FFF3F3',
        borderRadius: 12,
        padding: '12px 16px',
        marginBottom: 20,
        border: '2px solid #FFCDD2',
      }}>
        <div style={{ fontSize: 14, fontWeight: 'bold', color: '#C62828', marginBottom: 8 }}>
          🔴 赤丸がついた問題（要注意！）
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {matomuAll.filter(q => nigate.includes(q.id)).map(q => (
            <div key={q.id} style={{
              background: 'white',
              borderRadius: 8,
              padding: '6px 12px',
              fontSize: 18,
              fontFamily: "'BIZ UDPMincho', serif",
              color: '#C62828',
              border: '1.5px solid #FFCDD2',
            }}>
              {q.answer}
              <span style={{ fontSize: 11, color: '#888', display: 'block', fontFamily: 'sans-serif' }}>
                {q.reading}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ fontSize: 14, color: '#888', marginBottom: 12 }}>練習するセットを選こう</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {SETS.map(set => (
          <div key={set.id} style={{
            background: 'white',
            borderRadius: 16,
            padding: '16px 18px',
            border: `2px solid ${set.id === 'nigate' ? '#FFCDD2' : '#F0E8D8'}`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }}>
            <div style={{ fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 4 }}>
              {set.icon} {set.label}
            </div>
            <div style={{ fontSize: 13, color: '#888', marginBottom: 12 }}>{set.desc}</div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={() => onStart(set, true)}
                style={{
                  flex: 1, padding: '10px',
                  background: set.color, color: 'white',
                  border: 'none', borderRadius: 10,
                  fontSize: 14, fontWeight: 'bold', cursor: 'pointer',
                }}
              >
                ✏️ 練習する
              </button>
              <button
                onClick={() => onStart(set, false)}
                style={{
                  flex: 1, padding: '10px',
                  background: 'white', color: set.color,
                  border: `2px solid ${set.color}`,
                  borderRadius: 10, fontSize: 14, fontWeight: 'bold', cursor: 'pointer',
                }}
              >
                📝 テスト形式
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuestionCard({ question, showAnswer, isDrill, color, isNigate, onReveal, onJudge }: {
  question: Question;
  showAnswer: boolean;
  isDrill: boolean;
  color: string;
  isNigate: boolean;
  onReveal: () => void;
  onJudge: (correct: boolean) => void;
}) {
  return (
    <div style={{
      background: 'white',
      borderRadius: 20,
      boxShadow: isNigate ? '0 4px 20px rgba(244,67,54,0.15)' : '0 4px 20px rgba(0,0,0,0.08)',
      overflow: 'hidden',
      border: isNigate ? '2px solid #FFCDD2' : 'none',
    }}>
      <div style={{
        background: color, color: 'white',
        padding: '8px 16px', fontSize: 13, fontWeight: 'bold',
        display: 'flex', justifyContent: 'space-between',
      }}>
        <span>{question.type === 'kanji' ? '漢字' : question.type === 'proverb' ? 'ことわざ' : '慣用句'}</span>
        {question.fullPhrase && <span style={{ fontSize: 11, opacity: 0.85 }}>{question.fullPhrase}</span>}
      </div>

      <div style={{ padding: '20px 18px' }}>
        <div style={{
          fontSize: 22, lineHeight: 2.6, color: '#1a1a2e', marginBottom: 16,
          fontFamily: "'BIZ UDPGothic', sans-serif",
        }}>
          {question.sentence.split('[　]').map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && (
                <span style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start', verticalAlign: 'bottom', lineHeight: 1, marginBottom: 2 }}>
                  <span style={{ fontSize: 11, color, fontWeight: 'bold', marginBottom: 3, whiteSpace: 'nowrap', letterSpacing: '0.05em' }}>
                    {question.reading}
                  </span>
                  <span style={{ display: 'flex', gap: 3 }}>
                    {Array.from(question.blankAnswer ?? question.answer).map((_, ci) => (
                      <span key={ci} style={{
                        display: 'inline-block', width: 30, height: 30,
                        borderBottom: `3px solid ${color}`,
                        background: `${color}10`, borderRadius: 3,
                      }} />
                    ))}
                  </span>
                </span>
              )}
            </span>
          ))}
        </div>

        {isDrill && (
          <div style={{ marginBottom: 16 }}>
            <WritingCanvas expectedAnswer={question.answer} />
          </div>
        )}

        {!showAnswer ? (
          <button onClick={onReveal} style={{
            width: '100%', padding: '14px',
            background: color, color: 'white',
            border: 'none', borderRadius: 12,
            fontSize: 16, fontWeight: 'bold', cursor: 'pointer',
          }}>
            答えを見る
          </button>
        ) : (
          <>
            <div style={{ textAlign: 'center', padding: '20px', background: '#FFF9F0', borderRadius: 12, marginBottom: 12 }}>
              <div style={{
                fontSize: question.answer.length >= 3 ? 56 : question.answer.length === 2 ? 72 : 80,
                fontFamily: "'BIZ UDPMincho', 'Hiragino Mincho ProN', serif",
                color: '#333', lineHeight: 1.2, letterSpacing: '0.1em',
              }}>
                {question.answer}
              </div>
              <div style={{ fontSize: 18, color: '#888', marginTop: 4 }}>（{question.reading}）</div>
            </div>

            {question.hint && (
              <div style={{ background: '#FFF8E7', borderRadius: 10, padding: '12px 14px', marginBottom: 10, fontSize: 15, color: '#775500', borderLeft: '4px solid #FFB347', lineHeight: 1.7 }}>
                <strong>成り立ち: </strong>{question.hint}
              </div>
            )}

            {question.meaning && (
              <div style={{ background: '#F0F7FF', borderRadius: 10, padding: '12px 14px', marginBottom: 14, fontSize: 15, color: '#003366', borderLeft: '4px solid #4A90D9', lineHeight: 1.7 }}>
                <strong>意味: </strong>{question.meaning}
              </div>
            )}

            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => onJudge(false)} style={{ flex: 1, padding: '16px 4px', background: '#F44336', color: 'white', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 'bold', cursor: 'pointer' }}>
                ✗ まちがえた
              </button>
              <button onClick={() => onJudge(true)} style={{ flex: 1, padding: '16px 4px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 'bold', cursor: 'pointer' }}>
                ○ あってた
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Result({ correct, total, pct, questions, answers, onRetry, onMenu, onBack }: {
  correct: number; total: number; pct: number;
  questions: Question[]; answers: { correct: boolean | null }[];
  onRetry: () => void; onMenu: () => void; onBack: () => void;
}) {
  return (
    <div style={{ padding: '20px 16px', maxWidth: 480, margin: '0 auto', textAlign: 'center' }}>
      <div style={{ fontSize: 48, marginBottom: 8 }}>
        {pct === 100 ? '🎉' : pct >= 80 ? '😊' : pct >= 60 ? '🤔' : '😢'}
      </div>
      <div style={{ fontSize: 48, fontWeight: 'bold', color: pct >= 80 ? '#4CAF50' : '#FF9800', marginBottom: 4 }}>
        {correct}/{total}問
      </div>
      <div style={{ fontSize: 20, color: '#666', marginBottom: 20 }}>正解率 {pct}%</div>

      {pct === 100 && <div style={{ background: '#E8F5E9', borderRadius: 12, padding: '12px', marginBottom: 16, color: '#2E7D32', fontWeight: 'bold' }}>🎉 全問正解！本番も絶対大丈夫！</div>}
      {pct < 100 && pct >= 60 && <div style={{ background: '#FFF3E0', borderRadius: 12, padding: '12px', marginBottom: 16, color: '#E65100' }}>まちがえた問題をもう一度練習しよう！</div>}
      {pct < 60 && <div style={{ background: '#FFEBEE', borderRadius: 12, padding: '12px', marginBottom: 16, color: '#C62828' }}>くり返し練習することが大切！諸めないで！</div>}

      {answers.some(a => !a.correct) && (
        <div style={{ textAlign: 'left', marginBottom: 20 }}>
          <div style={{ fontSize: 14, color: '#888', marginBottom: 8 }}>まちがえた漢字：</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {answers.map((a, i) => !a.correct ? (
              <div key={i} style={{ background: '#FFEBEE', borderRadius: 8, padding: '8px 12px', fontFamily: "'BIZ UDPMincho', serif", fontSize: 18, color: '#C62828' }}>
                {questions[i].answer}
                <span style={{ fontSize: 11, color: '#888', display: 'block', fontFamily: 'sans-serif' }}>{questions[i].reading}</span>
              </div>
            ) : null)}
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button onClick={onRetry} style={{ padding: '14px', background: '#E8704A', color: 'white', border: 'none', borderRadius: 14, fontSize: 16, fontWeight: 'bold', cursor: 'pointer' }}>もう一度</button>
        <button onClick={onMenu} style={{ padding: '14px', background: 'white', color: '#666', border: '2px solid #ddd', borderRadius: 14, fontSize: 16, cursor: 'pointer' }}>別のセットへ</button>
        <button onClick={onBack} style={{ padding: '14px', background: 'white', color: '#888', border: 'none', borderRadius: 14, fontSize: 14, cursor: 'pointer' }}>ホームへ</button>
      </div>
    </div>
  );
}

const backBtn: JSX.CSSProperties = {
  background: 'none', border: 'none', fontSize: 22,
  cursor: 'pointer', color: '#888', padding: '4px 8px', flexShrink: 0,
};
