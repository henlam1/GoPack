import { z } from 'zod';
import { formatDate } from '../../utils/stringHelpers';

export const packingListSchema = z
  .object({
    name: z.string().trim().min(1).max(30),
    startDate: z.string(),
    endDate: z.string(),
    destination: z.string().trim().max(30),
    description: z.string().trim().max(30),
    status: z.string(),
    categories: z.array(z.string()),
  })
  .refine(
    (data) => {
      return new Date(data.endDate) >= new Date(data.startDate);
    },
    {
      message: 'End date must be on or after start date',
      path: ['endDate'],
    },
  );

export type PackingListFormFields = z.infer<typeof packingListSchema>;

export const packingListDefaults = {
  startDate: formatDate(new Date()),
  endDate: formatDate(new Date()),
  destination: '',
  description: '',
  status: 'active',
  categories: [],
};
