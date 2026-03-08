export type Region =
  | '北海道地方'
  | '東北地方'
  | '関東地方'
  | '中部地方'
  | '近畿地方'
  | '中国地方'
  | '四国地方'
  | '九州地方';

export interface Prefecture {
  id: number;
  kanji: string;
  reading: string;
  region: Region;
  x: number;
  y: number;
}

export const REGIONS: Region[] = [
  '北海道地方', '東北地方', '関東地方', '中部地方',
  '近畿地方', '中国地方', '四国地方', '九州地方',
];

export const PREFECTURES: Prefecture[] = [
  { id: 1,  kanji: '北海道', reading: 'ほっかいどう', region: '北海道地方', x: 72, y: 10 },
  { id: 2,  kanji: '青森県', reading: 'あおもりけん', region: '東北地方', x: 71, y: 22 },
  { id: 3,  kanji: '岩手県', reading: 'いわてけん',   region: '東北地方', x: 75, y: 28 },
  { id: 4,  kanji: '宮城県', reading: 'みやぎけん',   region: '東北地方', x: 72, y: 33 },
  { id: 5,  kanji: '秋田県', reading: 'あきたけん',   region: '東北地方', x: 67, y: 27 },
  { id: 6,  kanji: '山形県', reading: 'やまがたけん', region: '東北地方', x: 66, y: 33 },
  { id: 7,  kanji: '福島県', reading: 'ふくしまけん', region: '東北地方', x: 70, y: 38 },
  { id: 8,  kanji: '茨城県', reading: 'いばらきけん', region: '関東地方', x: 73, y: 43 },
  { id: 9,  kanji: '栃木県', reading: 'とちぎけん',   region: '関東地方', x: 69, y: 40 },
  { id: 10, kanji: '群馬県', reading: 'ぐんまけん',   region: '関東地方', x: 64, y: 40 },
  { id: 11, kanji: '埼玉県', reading: 'さいたまけん', region: '関東地方', x: 68, y: 44 },
  { id: 12, kanji: '千葉県', reading: 'ちばけん',     region: '関東地方', x: 73, y: 46 },
  { id: 13, kanji: '東京都', reading: 'とうきょうと', region: '関東地方', x: 69, y: 46 },
  { id: 14, kanji: '神奈川県', reading: 'かながわけん', region: '関東地方', x: 68, y: 49 },
  { id: 15, kanji: '新潟県', reading: 'にいがたけん', region: '中部地方', x: 61, y: 35 },
  { id: 16, kanji: '富山県', reading: 'とやまけん',   region: '中部地方', x: 57, y: 39 },
  { id: 17, kanji: '石川県', reading: 'いしかわけん', region: '中部地方', x: 52, y: 38 },
  { id: 18, kanji: '福井県', reading: 'ふくいけん',   region: '中部地方', x: 51, y: 43 },
  { id: 19, kanji: '山梨県', reading: 'やまなしけん', region: '中部地方', x: 64, y: 46 },
  { id: 20, kanji: '長野県', reading: 'ながのけん',   region: '中部地方', x: 60, y: 42 },
  { id: 21, kanji: '岐馘県', reading: 'ぎふけん',     region: '中部地方', x: 57, y: 45 },
  { id: 22, kanji: '静岡県', reading: 'しずおかけん', region: '中部地方', x: 63, y: 50 },
  { id: 23, kanji: '愛知県', reading: 'あいちけん',   region: '中部地方', x: 60, y: 49 },
  { id: 24, kanji: '三重県', reading: 'みえけん',     region: '近畿地方', x: 57, y: 52 },
  { id: 25, kanji: '滋賀県', reading: 'しがけん',     region: '近畿地方', x: 53, y: 48 },
  { id: 26, kanji: '京都府', reading: 'きょうとふ',   region: '近畿地方', x: 50, y: 47 },
  { id: 27, kanji: '大阪府', reading: 'おおさかふ',   region: '近畿地方', x: 50, y: 51 },
  { id: 28, kanji: '兵庫県', reading: 'ひょうごけん', region: '近畿地方', x: 46, y: 50 },
  { id: 29, kanji: '奈良県', reading: 'ならけん',     region: '近畿地方', x: 53, y: 53 },
  { id: 30, kanji: '和歌山県', reading: 'わかやまけん', region: '近畿地方', x: 51, y: 58 },
  { id: 31, kanji: '鳥取県', reading: 'とっとりけん', region: '中国地方', x: 43, y: 44 },
  { id: 32, kanji: '島根県', reading: 'しまねけん',   region: '中国地方', x: 38, y: 45 },
  { id: 33, kanji: '岡山県', reading: 'おかやまけん', region: '中国地方', x: 45, y: 50 },
  { id: 34, kanji: '広島県', reading: 'ひろしまけん', region: '中国地方', x: 41, y: 51 },
  { id: 35, kanji: '山口県', reading: 'やまぐちけん', region: '中国地方', x: 35, y: 53 },
  { id: 36, kanji: '徳島県', reading: 'とくしまけん', region: '四国地方', x: 50, y: 57 },
  { id: 37, kanji: '香川県', reading: 'かがわけん',   region: '四国地方', x: 47, y: 54 },
  { id: 38, kanji: '愛媛県', reading: 'えひめけん',   region: '四国地方', x: 43, y: 57 },
  { id: 39, kanji: '高知県', reading: 'こうちけん',   region: '四国地方', x: 46, y: 61 },
  { id: 40, kanji: '福岡県', reading: 'ふくおかけん', region: '九州地方', x: 31, y: 57 },
  { id: 41, kanji: '佐賀県', reading: 'さがけん',     region: '九州地方', x: 28, y: 59 },
  { id: 42, kanji: '長崎県', reading: 'ながさきけん', region: '九州地方', x: 24, y: 61 },
  { id: 43, kanji: '熊本県', reading: 'くまもとけん', region: '九州地方', x: 32, y: 63 },
  { id: 44, kanji: '大分県', reading: 'おおいたけん', region: '九州地方', x: 38, y: 59 },
  { id: 45, kanji: '宮崎県', reading: 'みやざきけん', region: '九州地方', x: 38, y: 66 },
  { id: 46, kanji: '鹿児島県', reading: 'かごしまけん', region: '九州地方', x: 33, y: 71 },
  { id: 47, kanji: '沖縄県', reading: 'おきなわけん', region: '九州地方', x: 20, y: 88 },
];

export function getPrefecturesByRegion(): Map<Region, Prefecture[]> {
  const map = new Map<Region, Prefecture[]>();
  for (const region of REGIONS) {
    map.set(region, PREFECTURES.filter(p => p.region === region));
  }
  return map;
}
