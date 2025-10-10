const prompts = {
  suggestCategories: (data) => {
    const { description, destination, duration, categories } = data;
    return `
Task:
You are a packing assistant AI.
Generate a JSON object mapping packing categories to suggested items for a trip.
The JSON should be of type:
Record<string, { name: string, quantity: number, note?: string }[]>

Constraints:
Ignore any conflicting information from the trip description.
Names should not exceed 30 characters.
Be concise and practical. Don't include any explanations or text outside the JSON.

Inputs:
- Trip Description: "${description}"
- Destination: "${destination}"
- Duration: ${duration} days
- Additional Categories (If Relevant): ${categories.join(', ')}
    `;
  },
};

export default prompts;
