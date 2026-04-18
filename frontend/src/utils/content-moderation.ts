// コンテンツモデレーションと分析のユーティリティ

export interface ModerationResult {
  isInappropriate: boolean;
  isHarassment: boolean;
  isDiscriminatory: boolean;
  isPotentialFakeNews: boolean;
  sentiment: string;
  toxicityLevel: number; // 0-100
  flags: string[];
}

// 不適切な単語やフレーズのパターン
const inappropriatePatterns = [
  /バカ|馬鹿|アホ|死ね|殺す|クソ|消えろ/i,
  /うざい|キモい|ダサい/i,
];

// パワハラのパターン
const harassmentPatterns = [
  /無能|役立たず|使えない|能なし/i,
  /やめろ|辞めろ|クビ/i,
  /お前なんか|こんなことも/i,
];

// 差別的発言のパターン
const discriminatoryPatterns = [
  /男のくせに|女のくせに|～だから/i,
  /～人は|外国人|障害者/i,
];

// デマ・偽情報のパターン
const fakeNewsPatterns = [
  /絶対に|100%|確実に|間違いなく/i,
  /～らしい|～みたい|噂によると|聞いた話/i,
  /政府が隠している|マスコミは報道しない/i,
  /拡散希望|シェアして|みんなに教えて/i,
];

// ポジティブな感情のパターン
const positivePatterns = [
  /ありがとう|感謝|嬉しい|楽しい|素晴らしい|最高|良い|いいね/i,
  /助かる|素敵|おめでとう|よかった/i,
];

// ネガティブな感情のパターン
const negativePatterns = [
  /悲しい|辛い|苦しい|困る|心配|不安|残念/i,
];

// 怒りの感情のパターン
const angryPatterns = [
  /腹立つ|むかつく|許せない|ふざけるな|いい加減/i,
];

export function analyzeContent(text: string): ModerationResult {
  const flags: string[] = [];
  let toxicityLevel = 0;

  // 不適切なコンテンツの検知
  const isInappropriate = inappropriatePatterns.some((pattern) => pattern.test(text));
  if (isInappropriate) {
    flags.push("不適切な表現");
    toxicityLevel += 40;
  }

  // パワハラの検知
  const isHarassment = harassmentPatterns.some((pattern) => pattern.test(text));
  if (isHarassment) {
    flags.push("パワハラの可能性");
    toxicityLevel += 35;
  }

  // 差別的発言の検知
  const isDiscriminatory = discriminatoryPatterns.some((pattern) => pattern.test(text));
  if (isDiscriminatory) {
    flags.push("差別的表現");
    toxicityLevel += 30;
  }

  // デマ・偽情報の検知
  const isPotentialFakeNews = fakeNewsPatterns.some((pattern) => pattern.test(text));
  if (isPotentialFakeNews) {
    flags.push("要検証情報");
    toxicityLevel += 20;
  }

  // 感情分析
  let sentiment: ModerationResult["sentiment"] = "neutral";
  if (angryPatterns.some((pattern) => pattern.test(text))) {
    sentiment = "angry";
  } else if (negativePatterns.some((pattern) => pattern.test(text))) {
    sentiment = "negative";
  } else if (positivePatterns.some((pattern) => pattern.test(text))) {
    sentiment = "positive";
  }

  return {
    isInappropriate,
    isHarassment,
    isDiscriminatory,
    isPotentialFakeNews,
    sentiment,
    toxicityLevel: Math.min(toxicityLevel, 100),
    flags,
  };
}

export function getSentimentColor(sentiment: ModerationResult["sentiment"]): string {
  switch (sentiment) {
    case "positive":
      return "bg-green-50 border-green-200";
    case "negative":
      return "bg-blue-50 border-blue-200";
    case "angry":
      return "bg-red-50 border-red-200";
    default:
      return "bg-gray-50 border-gray-200";
  }
}

export function getSentimentBadge(sentiment: ModerationResult["sentiment"]): string {
  switch (sentiment) {
    case "positive":
      return "😊 ポジティブ";
    case "negative":
      return "😢 ネガティブ";
    case "angry":
      return "😠 怒り";
    default:
      return "😐 中立";
  }
}
