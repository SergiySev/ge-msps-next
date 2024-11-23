import { SafeActionFn } from 'next-safe-action';
import { z } from 'zod';

export const deleteActionSchema = z.object({
  id: z.number().int().positive(),
});

export type DeleteActionSchema = z.infer<typeof deleteActionSchema>;

export type DeleteActionFn = SafeActionFn<unknown, typeof deleteActionSchema, readonly [], unknown, unknown, unknown>;
