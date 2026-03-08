/**
 * 簡易SM-2アルゴリズム（子供向ゑ3段階）
 * quality: 0=わからなかった, 1=むずかしかった, 2=かんたんだった
 */

export interface CardState {
  questionId: string;
  interval: number;
  easeFactor: number;
  repetitions: number;
  nextReview: number;
  lastReview: number;
  totalReviews: number;
  correctCount: number;
}

export function createCard(questionId: string): CardState {
  return {
    questionId,
    interval: 0,
    easeFactor: 2.0,
    repetitions: 0,
    nextReview: Date.now(),
    lastReview: 0,
    totalReviews: 0,
    correctCount: 0,
  };
}

const CRAM_MODE = true;
const CRAM_MAX_INTERVAL_DAYS = 4;

export function reviewCard(card: CardState, quality: 0 | 1 | 2): CardState {
  const now = Date.now();
  const DAY = 86400000;

  let { interval, easeFactor, repetitions } = card;

  if (quality === 0) {
    interval = 0;
    easeFactor = Math.max(1.3, easeFactor - 0.2);
    repetitions = 0;
  } else if (quality === 1) {
    if (repetitions === 0) interval = 1;
    else if (repetitions === 1) interval = 2;
    else interval = Math.round(interval * 1.3);
    easeFactor = Math.max(1.3, easeFactor - 0.1);
    repetitions = Math.max(1, repetitions);
  } else {
    if (repetitions === 0) interval = 1;
    else if (repetitions === 1) interval = 3;
    else interval = Math.round(interval * easeFactor);
    easeFactor = Math.min(2.5, easeFactor + 0.1);
    repetitions += 1;
  }

  if (CRAM_MODE) {
    interval = Math.min(interval, CRAM_MAX_INTERVAL_DAYS);
  }

  const nextReview = interval === 0
    ? now + 10 * 60 * 1000
    : now + interval * DAY;

  return {
    ...card,
    interval,
    easeFactor,
    repetitions,
    nextReview,
    lastReview: now,
    totalReviews: card.totalReviews + 1,
    correctCount: card.correctCount + (quality > 0 ? 1 : 0),
  };
}

export function isDue(card: CardState): boolean {
  return Date.now() >= card.nextReview;
}

export function getDueCards(cards: CardState[]): CardState[] {
  return cards
    .filter(isDue)
    .sort((a, b) => a.nextReview - b.nextReview);
}

export function getNextReviewText(card: CardState): string {
  const diff = card.nextReview - Date.now();
  if (diff <= 0) return 'いますぐ';
  const mins = Math.round(diff / 60000);
  if (mins < 60) return `${mins}分後`;
  const hours = Math.round(diff / 3600000);
  if (hours < 24) return `${hours}時間後`;
  const days = Math.round(diff / 86400000);
  return `${days}日後`;
}
