// This function gets rid of the triple backslashes wrapping AI responses
const stripCodeFence = (text) => {
  // Remove ```json ... ``` or ``` ... ```
  return text.replace(/```(json)?\n?([\s\S]*?)```/i, '$2').trim();
};

const parseGeminiResponse = (raw) => {
  try {
    const cleaned = stripCodeFence(raw);
    return JSON.parse(cleaned);
  } catch (err) {
    console.error('Failed to parse AI JSON:', err);
    return null;
  }
};

export default parseGeminiResponse;
