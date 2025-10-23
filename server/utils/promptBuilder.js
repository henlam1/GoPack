const prompts = {
  suggestCategories: (data) => {
    const { description, destination, duration, categories } = data;
    return `
You are a packing assistant. 
Return ONLY valid JSON: 
Record<string, { name: string; quantity: number; note?: string }[]>

Use concise, practical items.

Inputs:
- Trip Description: "${description || 'N/A'}"
- Destination: "${destination || 'N/A'}"
- Duration: ${duration || 0} days
- Categories: ${categories?.length ? categories.join(', ') : 'None'}
    `;
  },
};

export default prompts;
