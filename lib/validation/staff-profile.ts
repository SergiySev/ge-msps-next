import { z } from 'zod';

export const updateProfileSchema = z
  .object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    currentPassword: z.string().min(6, 'Current password is required'),
    newPassword: z.string().min(6, 'New password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Password confirmation is required'),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;
