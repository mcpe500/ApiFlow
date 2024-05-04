import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    rememberMe: z
        .enum(["true", "false"])
        .transform((value) => value === "true"),
});
