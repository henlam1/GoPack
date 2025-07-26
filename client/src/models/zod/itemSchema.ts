import { z } from 'zod';
import { genHexString } from '../../utils/stringHelpers';

export const itemSchema = z.object({
  name: z.string().min(1).max(30),
  quantity: z.coerce.number().min(1).max(99),
  packed: z.boolean(),
  category: z.string(),
});

export type ItemFormFields = z.infer<typeof itemSchema>;

export const itemDefaults = {
  quantity: 1,
  packed: false,
  category: genHexString(24),
};
