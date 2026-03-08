import { CatDisplay, CatStatusBar } from '../components/cat/CatDisplay';
import type { CatState, StreakState } from '../lib/storage';
import type { CardState } from '../lib/srs';
import { getDueCards, getNextReviewText } from '../lib/srs';

interface Props {
  cat: CatState;
  cards: CardState[];
  streak: StreakState;
  onStudy: () => void;
  onTest: () => void;
  onPrefecture: () => void;
  onMatome: () => void;
}

export function Home({ cat, cards, streak, onStudy, onTest, onPrefecture, onMatome }: Props) {
  const due = getDueCards(cards);
  const doneToday = cards.filter(c =>
    c.lastReview > new Date().setHours(0, 0, 0, 0)
  ).length;

  const catAnim = due.length > 0 ? 'bounce' : cat.mood === 'sleepy' ? 'idle' : 'idle';

  return (
    <div style={{ padding: '20px 16px', maxWidth: 420, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <div style={{ background: '#FFF3E0', borderRadius: 20, padding: '6px 14px', fontSize: 14, color: '#E65100', fontWeight: 'bold' }}>
          🔥 {streak.current}日れんぞく
        </div>
        <div style={{ background: '#E8F5E9', borderRadius: 20, padding: '6px 14px', fontSize: 14, color: '#2E7D32' }}>
          ✅ 今日: {doneToday}問
        </div>
      </div>

      <div style={{ textAlign: 'center', margin: '12px 0 8px' }}>
        <CatDisplay cat={cat} animate={catAnim} size={180} />
        <CatStatusBar cat={cat} />
      </div>

      <div style={{ background: 'linear-gradient(135deg, #FF6B6B, #FF8E53)', borderRadius: 16, padding: '16px 20px', color: 'white', marginBottom: 16, boxShadow: '0 4px 15px rgba(255,100,100,0.3)' }}>
        <div style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 4 }}>📝 4日後にテスト！</div>
        <div style={{ fontSize: 14, opacity: 0.9 }}>1月～3月の漢字 兤30問</div>
      </div>

      {due.length > 0 && (
        <div style={{ background: '#FFF9C4', borderRadius: 12, padding: '12px 16px', marginBottom: 16, fontSize: 14, color: '#795548', display: 'flex', alignItems: 'center', gap: 8 }}>
          ⏰ <strong>{due.length}問</strong> 復習の時間です！
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <button onClick={onStudy} style={{ padding: '20px', background: 'linear-gradient(135deg, #4A90D9, #5BA3F5)', color: 'white', border: 'none', borderRadius: 16, fontSize: 20, fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 15px rgba(74,144,217,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          📖 べんきょう開始
          {due.length > 0 && (
            <span style={{ background: 'rgba(255,255,255,0.3)', borderRadius: 12, padding: '2px 10px', fontSize: 14 }}>{due.length}問</span>
          )}
        </button>

        <button onClick={onTest} style={{ padding: '16px', background: 'white', color: '#E8704A', border: '2px solid #E8704A', borderRadius: 16, fontSize: 18, fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          📋 小テストに挑戦
        </button>

        <button onClick={onPrefecture} style={{ padding: '14px', background: 'linear-gradient(135deg, #2ECC71, #27AE60)', color: 'white', border: 'none', borderRadius: 16, fontSize: 16, fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          🗾 都道府県の場所と漢字
        </button>

        <button onClick={onMatome} style={{ padding: '14px', background: 'linear-gradient(135deg, #FF6B6B, #FF8E53)', color: 'white', border: 'none', borderRadius: 16, fontSize: 16, fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          📋 まとめテスト対策（3/5テスト分）
        </button>
      </div>

      <div style={{ marginTop: 20, background: 'white', borderRadius: 12, padding: '14px 16px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ fontSize: 13, color: '#888', marginBottom: 8 }}>学習状況</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          <StatBox label="今日の復習" value={due.length} color="#FF8C42" />
          <StatBox label="学習済み" value={cards.filter(c => c.totalReviews > 0).length} color="#4CAF50" />
          <StatBox label="全問題" value={cards.length} color="#9E9E9E" />
        </div>
        {cards.length > 0 && due.length === 0 && (
          <div style={{ marginTop: 8, fontSize: 13, color: '#888', textAlign: 'center' }}>
            次の復習: {getNextReviewText(cards.slice().sort((a, b) => a.nextReview - b.nextReview)[0])}
          </div>
        )}
      </div>
    </div>
  );
}

function StatBox({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div style={{ background: `${color}15`, borderRadius: 10, padding: '10px 8px', textAlign: 'center' }}>
      <div style={{ fontSize: 24, fontWeight: 'bold', color }}>{value}</div>
      <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>{label}</div>
    </div>
  );
}
