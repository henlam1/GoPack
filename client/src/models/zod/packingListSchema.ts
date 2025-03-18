import { z } from "zod";
// import { categorySchema } from "./categorySchema";
import { genHexString } from "../../utils/stringHelpers";

export const packingListSchema = z.object({
  name: z.string().min(1).max(30),
  categories: z.array(z.string()),
  user: z.string(),
});

export type PackingListFormFields = z.infer<typeof packingListSchema>;

export const packingListDefaults = {
  categories: [],
  user: genHexString(24),
};
