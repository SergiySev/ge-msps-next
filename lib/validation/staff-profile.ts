import { z } from 'zod';

export const updateProfileSchema = z.object({
  username: z.string().email('Please enter a valid email address'),
  first_name: z.string().min(2, 'First name must be at least 2 characters'),
  last_name: z.string().min(2, 'Last name must be at least 2 characters'),
});

export const updatePasswordSchema = z
  .object({
    newPassword: z.string().min(6, 'New password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;
export type UpdatePasswordSchema = z.infer<typeof updatePasswordSchema>;
