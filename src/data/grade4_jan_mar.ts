export interface Question {
  id: string;
  type: 'kanji' | 'proverb' | 'idiom';
  /** 空欄を [ ] で示した文 */
  sentence: string;
  /** 空欄のよみがな */
  reading: string;
  /** 正解の漢字（送り仮名含む） */
  answer: string;
  /** ことわざ・慣用句の全文 */
  fullPhrase?: string;
  /** 意味（ことわざ・慣用句） */
  meaning?: string;
  /** 漢字の成り立ち・ポイント */
  hint?: string;
  /** 実際に空欄に書く文字（答えと異なる場合。例: sentence に「道」が見えていて空欄は「連れ」のみ） */
  blankAnswer?: string;
}

/** 4年生 1月〜3月習う漢字 ① 書き取り（各5点） */
export const kanjiSheet1: Question[] = [
  {
    id: 'm-01', type: 'kanji',
    sentence: '[　]を見て身だしなみを整える。',
    reading: 'かがみ',
    answer: '鏡',
    hint: '金へんに「竟（きょう）」。金属でできた鏡。',
  },
  {
    id: 'm-02', type: 'kanji',
    sentence: '[　]の話題を見つける。',
    reading: 'きょうつう',
    answer: '共通',
    hint: '共＝「みんなで持つ」。通＝「とおる・通じる」。',
  },
  {
    id: 'm-03', type: 'kanji',
    sentence: '市長選挙の[　]の結果。',
    reading: 'かいひょう',
    answer: '開票',
    hint: '開＝「ひらく」。票＝「投票用紙」。',
  },
  {
    id: 'm-04', type: 'kanji',
    sentence: '[　]で生活する生き物。',
    reading: 'りくじょう',
    answer: '陸上',
    hint: '陸＝「おか・陸地」。上＝「うえ」。',
  },
  {
    id: 'm-05', type: 'kanji',
    sentence: '[　]のれきしを調べる。',
    reading: 'みんぞく',
    answer: '民族',
    hint: '民＝「たみ・人々」。族＝「なかま・集団」。',
  },
  {
    id: 'm-06', type: 'kanji',
    sentence: '図書館の本を[　]する。',
    reading: 'かんり',
    answer: '管理',
    hint: '管＝「くだ・とりしまる」。理＝「すじみち」。',
  },
  {
    id: 'm-07', type: 'kanji',
    sentence: '新しい橋が[　]する。',
    reading: 'かんせい',
    answer: '完成',
    hint: '完＝「完全・できあがる」。成＝「なる・できる」。',
  },
  {
    id: 'm-08', type: 'kanji',
    sentence: '[　]の結果を記録する。',
    reading: 'じっけん',
    answer: '実験',
    hint: '実＝「じつ・本当」。験＝「ためす」。',
  },
  {
    id: 'm-09', type: 'kanji',
    sentence: 'かみの毛を一つに[　]ねる。',
    reading: 'たば',
    answer: '束',
    hint: '木に縄をまきつけた形。まとめる意味。',
  },
  {
    id: 'm-10', type: 'kanji',
    sentence: '日本文化を[　]した記事。',
    reading: 'とくしゅう',
    answer: '特集',
    hint: '特＝「とくべつ」。集＝「あつめる」。',
  },
  {
    id: 'm-11', type: 'kanji',
    sentence: 'かぜの[　]があらわれる。',
    reading: 'ちょうこう',
    answer: '兆候',
    hint: '兆＝「きざし」。候＝「ようす・きざし」。',
  },
  {
    id: 'm-12', type: 'kanji',
    sentence: '人の気配を[　]する。',
    reading: 'さっ',
    answer: '察',
    hint: '察＝うかんむり＋祭。よく見てさとる。',
  },
  {
    id: 'm-13', type: 'kanji',
    sentence: '[　]一面に花畑が広がる。',
    reading: 'あたり',
    answer: '辺り',
    hint: '辺（あたり・へん）。近くのあたり一帯。',
  },
  {
    id: 'm-14', type: 'kanji',
    sentence: 'みんなの幸せを[　]う。',
    reading: 'ねが',
    answer: '願',
    hint: '願（ねがう）。原＋頁（おおがい）。心から求める。',
  },
  {
    id: 'm-15', type: 'kanji',
    sentence: '[　]声が聞こえる。',
    reading: 'いさましい',
    answer: '勇ましい',
    hint: '勇（いさむ）＝勇気がある・力強い。',
  },
  {
    id: 'm-16', type: 'kanji',
    sentence: '話す時の声を[　]める。',
    reading: 'ひく',
    answer: '低',
    hint: '低（ひくい）。人が低くかがんでいる形。',
  },
  {
    id: 'm-17', type: 'kanji',
    sentence: 'おだやかな生活を[　]む。',
    reading: 'のぞ',
    answer: '望',
    hint: '望（のぞむ）。月を見上げて遠くを見る。',
  },
  {
    id: 'm-18', type: 'kanji',
    sentence: '校門で友達と[　]れる。',
    reading: 'わか',
    answer: '別',
    hint: '別（わかれる・べつ）。刀で分かれる。',
  },
  {
    id: 'm-19', type: 'kanji',
    sentence: '日かげに雪が[　]る。',
    reading: 'のこ',
    answer: '残',
    hint: '残（のこる）。歹＋戈。後に残るもの。',
  },
  {
    id: 'm-20', type: 'kanji',
    sentence: '目標達成に[　]める。',
    reading: 'つと',
    answer: '努',
    hint: '努（つとめる）。女＋力＋力。力を尽くす。',
  },
];

/** 4年生 1月〜3月習う漢字 ② ことわざ・慣用句（各10点） */
export const kanjiSheet2: Question[] = [
  {
    id: 'm-p01', type: 'proverb',
    sentence: '安物買いの[　]失い',
    reading: 'ぜに',
    answer: '銭',
    fullPhrase: '安物買いの銭失い',
    meaning: '安いものを買うと、品質が悪くてすぐだめになり、かえって高くつくということ。',
    hint: '銭（ぜに）＝お金・コイン。金へんに戈（ほこ）。',
  },
  {
    id: 'm-p02', type: 'proverb',
    sentence: '馬子にも[　]装',
    reading: 'いしょう',
    answer: '衣装',
    blankAnswer: '衣',
    fullPhrase: '馬子にも衣装',
    meaning: 'よい着物を着れば、どんな人でも立派に見えるということ。',
    hint: '衣（い）＝ころも・きもの。装（しょう）＝かざる。',
  },
  {
    id: 'm-p03', type: 'proverb',
    sentence: '旅は道[　]、世はなさけ',
    reading: 'みちづれ',
    answer: '道連れ',
    blankAnswer: '連れ',
    fullPhrase: '旅は道連れ、世は情け',
    meaning: '旅に仲間がいると心強いように、世の中も助け合いが大切だということ。',
    hint: '連（つれ）＝ひきつれる。道連れ＝いっしょに旅する人。',
  },
  {
    id: 'm-p04', type: 'proverb',
    sentence: '[　]は成功のもと',
    reading: 'しっぱい',
    answer: '失敗',
    fullPhrase: '失敗は成功のもと',
    meaning: '失敗しても原因に気づいて改めれば、成功する力になるということ。',
    hint: '失（うしなう）。敗（やぶれる）。',
  },
  {
    id: 'm-p05', type: 'proverb',
    sentence: '案ずるより[　]むが易し',
    reading: 'う',
    answer: '産',
    fullPhrase: '案ずるより産むが易し',
    meaning: '心配するよりも、思いきってやってみれば案外うまくいくものだということ。',
    hint: '産（うむ）＝生む・産む。産みの苦しみより実際はやさしい。',
  },
  {
    id: 'm-p06', type: 'idiom',
    sentence: '火花を[　]らす',
    reading: 'ち',
    answer: '散',
    fullPhrase: '火花を散らす',
    meaning: 'はげしく争う。激しく競い合う。',
    hint: '散（ちる・ちらす）。花びらがちるイメージ。',
  },
  {
    id: 'm-p07', type: 'idiom',
    sentence: '[　]が浅い',
    reading: 'そこ',
    answer: '底',
    fullPhrase: '底が浅い',
    meaning: '内容や知識などに深みがない。',
    hint: '底（そこ）＝一番下・ふかさ。',
  },
  {
    id: 'm-p08', type: 'idiom',
    sentence: 'はちの[　]をつついたよう',
    reading: 'す',
    answer: '巣',
    fullPhrase: 'はちの巣をつついたよう',
    meaning: '多くの人がいっせいに騒ぎ出す様子。',
    hint: '巣（す）＝鳥や虫のすみか。巣箱のイメージ。',
  },
  {
    id: 'm-p09', type: 'idiom',
    sentence: 'おにが[　]う',
    reading: 'わら',
    answer: '笑',
    fullPhrase: '鬼が笑う',
    meaning: '先のことを予言してもわからないとのたとえ（来年のことを言うと鬼が笑う）。',
    hint: '笑（わらう）＝人が手をあげて笑う形。',
  },
  {
    id: 'm-p10', type: 'idiom',
    sentence: 'うでに[　]えがある',
    reading: 'おぼ',
    answer: '覚',
    fullPhrase: '腕に覚えがある',
    meaning: '技術や能力に自信がある。',
    hint: '覚（おぼえる・さとる）。学んで記憶すること。',
  },
];

export const allQuestions: Question[] = [...kanjiSheet1, ...kanjiSheet2];
