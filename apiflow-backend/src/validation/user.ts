import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    rememberMe: z.boolean(),
});

/*
 * Password must at least contain the following:
 * AT LEAST 1 lower case letter
 * AT LEAST 1 upper case letter
 * AT LEAST 1 number
 * AT LEAST 1 symbol from the following(_ - @ # !)
 */
export const registerSchema = z
    .object({
        email: z.string().email(),
        name: z.string().regex(/^[A-Za-z]+$/),
        username: z.string().min(5).max(12),
        password: z
            .string()
            .min(5)
            .max(32)
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[_\-!@#])(?=.*\d).+$/),
        passwordConfirmation: z.string(),
    })
    .refine((data) => data.passwordConfirmation === data.password);
