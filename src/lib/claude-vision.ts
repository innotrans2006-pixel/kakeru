import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY ?? '');

export async function analyzeTestAndPlan(
  imageBase64: string,
  mediaType: string,
  testDate: string,
  onChunk: (text: string) => void,
): Promise<void> {
  const today = new Date();
  const test = new Date(testDate);
  const daysLeft = Math.ceil((test.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });

  const prompt = `これは小学4年生のテスト問題です。テストまで${daysLeft}日あります（テスト日: ${testDate}）。

この問題を分析して、残り${daysLeft}日間の効果的な勉強計画を日本語で教えてください。`;

  const result = await model.generateContentStream([
    { inlineData: { data: imageBase64, mimeType: mediaType } },
    prompt,
  ]);

  for await (const chunk of result.stream) {
    const text = chunk.text();
    if (text) onChunk(text);
  }
}

export function fileToBase64(file: File): Promise<{ base64: string; mediaType: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const parts = result.split(',');
      const base64 = parts[1];
      const mediaTypeMatch = parts[0].match(/data:([^;]+)/);
      const mediaType = mediaTypeMatch ? mediaTypeMatch[1] : 'image/jpeg';
      resolve({ base64, mediaType });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
