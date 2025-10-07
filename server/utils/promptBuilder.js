const prompts = {
  suggestCategories: (data) => {
    const { description, destination, duration, categories } = data;
    return `
You are a packing assistant AI.
Generate a JSON object mapping packing categories to suggested items for a trip.
The JSON should be of type:
Record<string, { name: string, quantity: number, note?: string }[]>

Inputs:
- Trip Description: "${description}"
- Destination: "${destination}"
- Duration: ${duration} days
- Additional Categories (If Relevant): ${categories.join(', ')}

Be concise and practical. Don't include any explanations or text outside the JSON."
    `;
  },
};

export default prompts;
