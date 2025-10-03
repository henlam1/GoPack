import { z } from 'zod';

export const AISuggestionSchema = z
  .object({
    description: z.string().max(300),
    destination: z.string().min(1).max(85),
    duration: z.number().min(1),
    activities: z.array(z.string()),
  })
  .refine((data) => {
    if (data.activities.length === 0) {
      data.activities = ['general travel'];
    }
  });

export type AISuggestionFormFields = z.infer<typeof AISuggestionSchema>;

export const AISuggestionDefaults = (destination = '', duration = 1) => {
  return {
    description: '',
    destination: destination,
    duration: duration,
    activities: [],
  };
};
