import { z } from "zod";
// import { itemSchema } from "./itemSchema";
import { genHexString } from "../../utils/stringHelpers";

export const categorySchema = z.object({
  name: z.string().min(1).max(30),
  items: z.array(z.string()),
  packingList: z.string()
});

export type CategoryFormFields = z.infer<typeof categorySchema>;

export const categoryDefaults = {
  items: [],
  packingList: genHexString(24),
}