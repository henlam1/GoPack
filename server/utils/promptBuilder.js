const prompts = {
  suggestCategories: (data) => {
    const { description, destination, duration, categories } = data;
    return `
You are a packing assistant AI.
Based on the following trip description, return ONLY a JSON object mapping categories to item lists.
Do not include any extra text, explanation, or markdown formatting.

Trip Description: "${description}"
Destination: "${destination}"
Duration: ${duration} days
Additional Categories (If Relevant): ${categories.join(', ')}

Expected JSON format:
{
  "Category Name": ["item1", "item2", "item3"],
  "Another Category": ["item1", "item2"]
}
    `;
  },
};

export default prompts;
