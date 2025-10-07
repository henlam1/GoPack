import { z } from 'zod';

export const AISuggestionSchema = z.object({
  description: z.string().max(300),
  destination: z.string().min(1).max(85),
  duration: z.coerce.number().min(1).max(99),
  categories: z.array(z.string()).default(['general travel']),
});

export type AISuggestionFormFields = z.infer<typeof AISuggestionSchema>;

export const AISuggestionDefaults = (destination = '', duration = 1) => {
  return {
    description: '',
    destination: destination,
    duration: duration,
    categories: [],
  };
};
