import { z } from 'zod';
import { requiredText } from './helpers/translations';

export const loginSchema = z.object({
  username: z.string({ required_error: requiredText }).min(3, requiredText),
  password: z.string({ required_error: requiredText }).min(6, requiredText),
});

export type LoginSchema = z.infer<typeof loginSchema>;
