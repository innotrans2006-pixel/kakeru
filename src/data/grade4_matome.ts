import type { Question } from './grade4_jan_mar';

/**
 * 4年生漢字のまとめテスト対策
 * 画像テスト（3/5実施・本番は来週）より抽出
 * ★ = 赤丸（まちがえた要注意問題）
 */

/** 書き取り 20問（各5点） */
export const matomuSheet1: Question[] = [
  {
    id: 'ma-01', type: 'kanji',
    sentence: '[　]を受けて行動する。',
    reading: 'めいれい',
    answer: '命令',
    hint: '命（いのち・めい）＝命じる。令（れい）＝おふれ。上の人の指示。',
  },
  {
    id: 'ma-02', type: 'kanji',
    sentence: '[　]の家から声がする。',
    reading: 'となり',
    answer: '隣',
    hint: '隣（となり）。こざとへん＋粦（りん）。すぐ横の家。',
  },
  {
    id: 'ma-03', type: 'kanji',
    sentence: 'シャワーを[　]びる。',
    reading: 'あ',
    answer: '浴',
    hint: '浴（あびる・よく）。水（さんずい）＋谷。谷の水をあびる形。',
  },
  {
    id: 'ma-04', type: 'kanji',
    sentence: '友[　]と公園で遊ぶ。',
    reading: 'だち',
    answer: '達',
    hint: '達（たつ・だち）。目標に「たっする」意味。友だちの「だち」。',
  },
  {
    id: 'ma-05', type: 'kanji',
    sentence: '全力で試合を[　]う。',
    reading: 'たたか',
    answer: '戦',
    hint: '戦（いくさ・たたかう）。戈（ほこ）＋単（ひとつ）。武器で戦う。',
  },
  {
    id: 'ma-06', type: 'kanji',
    sentence: '植物の成長を[　]する。',
    reading: 'かんさつ',
    answer: '観察',
    hint: '観（み）＝よくながめる。察（さっ）＝よく見てさとる。',
  },
  {
    id: 'ma-07', type: 'kanji',
    sentence: '３日[　]で練習した。',
    reading: 'れんぞく',
    answer: '連続',
    hint: '連（つれる）＝つながる。続（つづく）＝続く。',
  },
  {
    id: 'ma-08', type: 'kanji',
    sentence: '南[　]の氷がとけている。',
    reading: 'きょく',
    answer: '極',
    hint: '極（きわみ・きょく）。木のてっぺん。もっとも端。北極・南極。',
  },
  {
    id: 'ma-09', type: 'kanji',
    sentence: '国語の[　]で言葉を調べる。',
    reading: 'じてん',
    answer: '辞典',
    hint: '辞（じ）＝ことば。典（てん）＝手本・書物。言葉を集めた本。',
  },
  {
    id: 'ma-10', type: 'kanji',
    sentence: '[　]競技の大会に出る。',
    reading: 'りくじょう',
    answer: '陸上',
    hint: '陸（りく）＝おか・地面。地面の上でする走る・跳ぶ競技。',
  },
  {
    id: 'ma-11', type: 'kanji',
    sentence: '実験が[　]した。',
    reading: 'せいこう',
    answer: '成功',
    hint: '成（なる）＝できあがる。功（こう）＝てがら。やり遂げること。',
  },
  {
    id: 'ma-12', type: 'kanji',
    sentence: '歴史の[　]を見学した。',
    reading: 'はくぶつかん',
    answer: '博物館',
    hint: '博（ひろい）＝広く集める。物＋館。多くのものを展示した建物。',
  },
  {
    id: 'ma-13', type: 'kanji',
    sentence: '運動会で[　]をふった。',
    reading: 'はた',
    answer: '旗',
    hint: '旗（はた）。方＋その＋斤（おの）。目印として使う布。',
  },
  {
    id: 'ma-14', type: 'kanji',
    sentence: '話し合いの[　]点をまとめる。',
    reading: 'よう',
    answer: '要',
    hint: '要（かなめ・よう）。ウエストを手でおさえる形。大切なところ。',
  },
  {
    id: 'ma-15', type: 'kanji',
    sentence: '江戸時代の[　]士の暮らし。',
    reading: 'へい',
    answer: '兵',
    hint: '兵（つわもの・へい）。両手で武器を持つ形。武士・兵士。',
  },
  {
    id: 'ma-16', type: 'kanji',
    sentence: '[　]語をカタカナで書く。',
    reading: 'がいらい',
    answer: '外来',
    hint: '外来語（がいらいご）＝外国から来た言葉。パン・コーヒーなど。',
  },
  {
    id: 'ma-17', type: 'kanji',
    sentence: '努力の[　]が表れた。',
    reading: 'せいか',
    answer: '成果',
    hint: '成（なる）＋果（み・は）。頑張った結果として実った成績。',
  },
  {
    id: 'ma-18', type: 'kanji',
    sentence: '[　]会で暮らす人が増えた。',
    reading: 'と',
    answer: '都',
    hint: '都（みやこ・と）。邑（むら）＋者。人が集まる大きな街。',
  },
  {
    id: 'ma-19', type: 'kanji',
    sentence: '星の[　]察をした。',
    reading: 'かん',
    answer: '観',
    hint: '観（みる・かん）。見（みる）より丁寧にじっくり見ること。',
  },
  {
    id: 'ma-20', type: 'kanji',
    sentence: 'カレーライスは[　]から来た食べ物だ。',
    reading: 'がいこく',
    answer: '外国',
    hint: '外（そと・がい）＋国（くに）。日本以外の国のこと。',
  },
];

/** ことわざ・慣用句 10問（各10点） */
export const matomuSheet2: Question[] = [
  {
    id: 'ma-p01', type: 'proverb',
    sentence: '[　]は成功のもと',
    reading: 'しっぱい',
    answer: '失敗',
    fullPhrase: '失敗は成功のもと',
    meaning: '失敗しても原因を改めれば、次は成功する力になるということ。',
    hint: '失（うしなう）＋敗（やぶれる）。',
  },
  {
    id: 'ma-p02', type: 'proverb',
    sentence: '旅は道[　]、世はなさけ',
    reading: 'みちづれ',
    answer: '道連れ',
    blankAnswer: '連れ',
    fullPhrase: '旅は道連れ、世は情け',
    meaning: '旅に仲間がいると心強いように、世の中も助け合いが大切だということ。',
    hint: '連（つれ）＝ひきつれる。道連れ＝いっしょに旅する人。',
  },
  {
    id: 'ma-p03', type: 'proverb',
    sentence: '案ずるより[　]むが易し',
    reading: 'う',
    answer: '産',
    fullPhrase: '案ずるより産むが易し',
    meaning: '心配するより思い切ってやってみると、案外うまくいくものだということ。',
    hint: '産（うむ）。産みの苦しみより実際はやさしい。',
  },
  {
    id: 'ma-p04', type: 'idiom',
    sentence: '火花を[　]らす',
    reading: 'ち',
    answer: '散',
    fullPhrase: '火花を散らす',
    meaning: 'はげしく争う。激しく競い合う。',
    hint: '散（ちる・ちらす）。花びらがちるイメージ。',
  },
  {
    id: 'ma-p05', type: 'idiom',
    sentence: 'はちの[　]をつついたよう',
    reading: 'す',
    answer: '巣',
    fullPhrase: 'はちの巣をつついたよう',
    meaning: '多くの人がいっせいに騒ぎ出す様子。',
    hint: '巣（す）＝鳥や虫のすみか。',
  },
  {
    id: 'ma-p06', type: 'proverb',
    sentence: '安物買いの[　]失い',
    reading: 'ぜに',
    answer: '銭',
    fullPhrase: '安物買いの銭失い',
    meaning: '安いものを買うと品質が悪く、かえって損をするということ。',
    hint: '銭（ぜに）＝コイン・お金。金へんに戈（ほこ）。',
  },
  {
    id: 'ma-p07', type: 'idiom',
    sentence: 'うでに[　]えがある',
    reading: 'おぼ',
    answer: '覚',
    fullPhrase: '腕に覚えがある',
    meaning: '技術や能力に自信がある。',
    hint: '覚（おぼえる・さとる）。学んで記憶すること。',
  },
  {
    id: 'ma-p08', type: 'idiom',
    sentence: '[　]が浅い',
    reading: 'そこ',
    answer: '底',
    fullPhrase: '底が浅い',
    meaning: '内容や知識などに深みがない。',
    hint: '底（そこ）＝一番下。ふかさがない。',
  },
  {
    id: 'ma-p09', type: 'proverb',
    sentence: '馬子にも[　]装',
    reading: 'いしょう',
    answer: '衣装',
    blankAnswer: '衣',
    fullPhrase: '馬子にも衣装',
    meaning: 'よい着物を着れば、どんな人でも立派に見えるということ。',
    hint: '衣（ころも）＋装（かざる）。服装次第で見た目が変わる。',
  },
  {
    id: 'ma-p10', type: 'idiom',
    sentence: 'おにが[　]う',
    reading: 'わら',
    answer: '笑',
    fullPhrase: '鬼が笑う',
    meaning: '先のことを予言してもわからないとのたとえ（来年のことを言うと鬼が笑う）。',
    hint: '笑（わらう）＝人が手をあげて笑う形。',
  },
];

/** 赤丸（まちがえた）問題ID — 重点的に練習！ */
export const nigate = ['ma-02', 'ma-11', 'ma-13', 'ma-16', 'ma-p01', 'ma-p04'];

export const matomuAll: Question[] = [...matomuSheet1, ...matomuSheet2];
