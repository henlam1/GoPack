import { z } from "zod";

export const LoginSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Username must be min of 1 characters" })
    .max(30, { message: "Username must be max of 30 characters" }),
  password: z.string(),
});

export type LoginFormFields = z.infer<typeof LoginSchema>;

export const LoginDefaults = {
  username: "",
  password: "",
};
