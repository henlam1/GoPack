import { GoogleGenAI } from '@google/genai';

export const createAIService = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY not set');
  return new GoogleGenAI({ apiKey: apiKey });
};

export const generateSuggestions = async (ai, prompt) => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });
  let text = response.text;
  text = text.replace(/```json|```/g, ''); // cleanup
  const json = JSON.parse(text);
  return json;
};
