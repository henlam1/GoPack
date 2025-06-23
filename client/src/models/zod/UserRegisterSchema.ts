import { z } from "zod";

export const UserRegisterSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Username must be min of 1 characters" })
    .max(30, { message: "Username must be max of 30 characters" }),
  password: z
    .string()
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+[\]{}|;:'",.<>/?`~\\-]{8,30}$/,
      {
        message:
          "Password needs to be between 8 and 30 characters and have numbers and letters",
      }
    ),
  email: z
    .string()
    .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, {
      message: "Not a valid email",
    }),
});

export type RegisterFormFields = z.infer<typeof UserRegisterSchema>;

// export const registerDefaults = {
//   name: "",
//   password: "",
//   email: ""
// }
