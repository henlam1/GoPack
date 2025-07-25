import { z } from "zod";
import { formatDate, genHexString } from "../../utils/stringHelpers";

export const packingListSchema = z
  .object({
    name: z.string().min(1).max(30),
    startDate: z.string(),
    endDate: z.string(),
    destination: z.string().max(30),
    description: z.string().max(30),
    categories: z.array(z.string()),
    user: z.string(),
  })
  .refine(
    (data) => {
      return new Date(data.endDate) >= new Date(data.startDate);
    },
    {
      message: "End date must be on or after start date",
      path: ["endDate"],
    }
  );

export type PackingListFormFields = z.infer<typeof packingListSchema>;

export const packingListDefaults = {
  startDate: formatDate(new Date()),
  endDate: formatDate(new Date()),
  destination: "",
  description: "",
  categories: [],
  user: genHexString(24),
};
