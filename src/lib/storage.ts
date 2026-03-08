import type { CardState } from './srs';
import { createCard } from './srs';
import { allQuestions } from '../data/grade4_jan_mar';

const CARDS_KEY = 'kakeru_cards_v1';
const CAT_KEY = 'kakeru_cat_v1';
const STREAK_KEY = 'kakeru_streak_v1';

export function loadCards(): CardState[] {
  try {
    const raw = localStorage.getItem(CARDS_KEY);
    if (raw) return JSON.parse(raw) as CardState[];
  } catch { /* empty */ }
  return allQuestions.map(q => createCard(q.id));
}

export function saveCards(cards: CardState[]): void {
  localStorage.setItem(CARDS_KEY, JSON.stringify(cards));
}

export function resetCards(): CardState[] {
  const fresh = allQuestions.map(q => createCard(q.id));
  saveCards(fresh);
  return fresh;
}

export interface CatState {
  level: number;
  xp: number;
  xpToNext: number;
  mood: 'happy' | 'excited' | 'sleepy' | 'proud';
  accessories: string[];
  lastStudy: number;
}

function xpForLevel(level: number): number {
  return level * 30;
}

export function loadCat(): CatState {
  try {
    const raw = localStorage.getItem(CAT_KEY);
    if (raw) return JSON.parse(raw) as CatState;
  } catch { /* empty */ }
  return { level: 1, xp: 0, xpToNext: xpForLevel(1), mood: 'happy', accessories: [], lastStudy: 0 };
}

export function saveCat(cat: CatState): void {
  localStorage.setItem(CAT_KEY, JSON.stringify(cat));
}

export function addXp(cat: CatState, amount: number): CatState {
  let xp = cat.xp + amount;
  let level = cat.level;
  let xpToNext = cat.xpToNext;

  while (xp >= xpToNext && level < 30) {
    xp -= xpToNext;
    level += 1;
    xpToNext = xpForLevel(level);
  }

  const accessories = [...cat.accessories];
  if (level >= 3 && !accessories.includes('ribbon')) accessories.push('ribbon');
  if (level >= 7 && !accessories.includes('hat')) accessories.push('hat');
  if (level >= 12 && !accessories.includes('glasses')) accessories.push('glasses');
  if (level >= 20 && !accessories.includes('crown')) accessories.push('crown');

  return { ...cat, xp, level, xpToNext, accessories, mood: 'excited', lastStudy: Date.now() };
}

export interface StreakState {
  current: number;
  longest: number;
  lastDate: string;
}

export function loadStreak(): StreakState {
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    if (raw) return JSON.parse(raw) as StreakState;
  } catch { /* empty */ }
  return { current: 0, longest: 0, lastDate: '' };
}

export function updateStreak(streak: StreakState): StreakState {
  const today = new Date().toISOString().slice(0, 10);
  if (streak.lastDate === today) return streak;

  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const current = streak.lastDate === yesterday ? streak.current + 1 : 1;
  const longest = Math.max(streak.longest, current);
  const updated = { current, longest, lastDate: today };
  localStorage.setItem(STREAK_KEY, JSON.stringify(updated));
  return updated;
}
