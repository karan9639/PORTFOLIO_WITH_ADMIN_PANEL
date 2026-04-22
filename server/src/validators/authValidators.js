import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email("Valid email is required"),
  password: z.string().trim().min(8, "Password must be at least 8 characters"),
});
