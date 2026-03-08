import { useState } from 'preact/hooks';
import type { JSX } from 'preact';
import type { Question } from '../../data/grade4_jan_mar';
import { WritingCanvas } from './WritingCanvas';

interface Props {
  question: Question;
  onAnswer: (quality: 0 | 1 | 2) => void;
  cardIndex: number;
  total: number;
}

const TYPE_LABELS: Record<Question['type'], string> = {
  kanji: '漢字',
  proverb: 'ことわざ',
  idiom: '慣用句',
};

const TYPE_COLORS: Record<Question['type'], string> = {
  kanji: '#4A90D9',
  proverb: '#E8704A',
  idiom: '#9B59B6',
};

export function FlashCard({ question, onAnswer, cardIndex, total }: Props) {
  const [phase, setPhase] = useState<'question' | 'answer'>('question');
  const [showCanvas, setShowCanvas] = useState(false);

  const handleFlip = () => setPhase('answer');

  const handleAnswer = (quality: 0 | 1 | 2) => {
    setPhase('question');
    setShowCanvas(false);
    onAnswer(quality);
  };

  const typeColor = TYPE_COLORS[question.type];
  const typeLabel = TYPE_LABELS[question.type];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '0 16px', maxWidth: 420, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#888' }}>
        <span>{cardIndex + 1}/{total}</span>
        <div style={{ flex: 1, background: '#eee', borderRadius: 4, height: 6 }}>
          <div style={{ width: `${((cardIndex + 1) / total) * 100}%`, height: '100%', background: typeColor, borderRadius: 4, transition: 'width 0.3s ease' }} />
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: 20, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', overflow: 'hidden', minHeight: 300 }}>
        <div style={{ background: typeColor, color: 'white', padding: '8px 16px', fontSize: 13, fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{typeLabel}</span>
          {question.fullPhrase && <span style={{ fontSize: 11, opacity: 0.85 }}>{question.fullPhrase}</span>}
        </div>

        <div style={{ padding: '24px 20px' }}>
          <div style={{ fontSize: 24, lineHeight: 2.0, color: '#1a1a2e', marginBottom: 20, fontFamily: "'BIZ UDPGothic', 'Hiragino Kaku Gothic ProN', sans-serif" }}>
            {question.sentence.split('[　]').map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', verticalAlign: 'middle', margin: '0 2px' }}>
                    <span style={{ fontSize: 14, color: typeColor, fontWeight: 'bold', lineHeight: 1 }}>{question.reading}</span>
                    <span style={{ borderBottom: `3px solid ${typeColor}`, minWidth: question.reading.length * 14, height: 30, display: 'inline-block', background: `${typeColor}10`, borderRadius: 4, marginTop: 2 }} />
                  </span>
                )}
              </span>
            ))}
          </div>

          {phase === 'question' ? (
            <>
              <div style={{ marginBottom: 16 }}>
                <button onClick={() => setShowCanvas(!showCanvas)} style={{ background: 'white', border: `1.5px solid ${typeColor}`, color: typeColor, borderRadius: 20, padding: '8px 18px', fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                  ✏️ {showCanvas ? '書き取りをとじる' : '書いて練習する'}
                </button>
              </div>

              {showCanvas && <div style={{ marginBottom: 20 }}><WritingCanvas expectedAnswer={question.answer} /></div>}

              <button onClick={handleFlip} style={{ width: '100%', padding: '16px', background: `linear-gradient(135deg, ${typeColor}, ${typeColor}cc)`, color: 'white', border: 'none', borderRadius: 14, fontSize: 18, fontWeight: 'bold', cursor: 'pointer', boxShadow: `0 4px 15px ${typeColor}55` }}>
                答えを見る
              </button>
            </>
          ) : (
            <>
              <div style={{ background: '#F8F4FF', borderRadius: 14, padding: '20px', marginBottom: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 80, fontFamily: "'BIZ UDPMincho', 'Hiragino Mincho ProN', 'Yu Mincho', serif", color: '#1a1a2e', lineHeight: 1.2, marginBottom: 8 }}>{question.answer}</div>
                <div style={{ fontSize: 20, color: '#666' }}>（{question.reading}）</div>
              </div>

              {question.hint && <div style={{ background: '#FFF8E7', borderRadius: 10, padding: '14px 16px', marginBottom: 10, fontSize: 17, color: '#775500', borderLeft: '4px solid #FFB347', lineHeight: 1.7 }}><span style={{ fontWeight: 'bold' }}>成り立ち: </span>{question.hint}</div>}
              {question.meaning && <div style={{ background: '#F0F7FF', borderRadius: 10, padding: '14px 16px', marginBottom: 16, fontSize: 17, color: '#003366', borderLeft: '4px solid #4A90D9', lineHeight: 1.7 }}><span style={{ fontWeight: 'bold' }}>意味: </span>{question.meaning}</div>}

              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={() => handleAnswer(0)} style={selfEvalStyle('#F44336')}>😢 わからなかった</button>
                <button onClick={() => handleAnswer(1)} style={selfEvalStyle('#FF9800')}>🤔 むずかしい</button>
                <button onClick={() => handleAnswer(2)} style={selfEvalStyle('#4CAF50')}>😊 できた！</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function selfEvalStyle(color: string): JSX.CSSProperties {
  return {
    flex: 1, padding: '14px 4px', background: color, color: 'white',
    border: 'none', borderRadius: 14, fontSize: 16, fontWeight: 'bold',
    cursor: 'pointer', boxShadow: `0 3px 10px ${color}55`,
    lineHeight: 1.5, textAlign: 'center', fontFamily: "'BIZ UDPGothic', sans-serif",
  };
}
