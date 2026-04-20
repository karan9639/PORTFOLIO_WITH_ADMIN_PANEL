import { z } from 'zod';
export const messageSchema = z.object({
  name: z.string().min(2, 'Name is required').max(80),
  email: z.string().email('Valid email is required'),
  subject: z.string().max(120).optional().default(''),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
});
