import { z } from 'zod';

export const updateStaffSchema = z
  .object({
    id: z.string(),
    username: z.string().email('Please enter a valid email address'),
    first_name: z.string().min(2, 'First name must be at least 2 characters'),
    last_name: z.string().min(2, 'Last name must be at least 2 characters'),
    role: z.enum(['nurse', 'doctor', 'manager', 'admin']),
    isActive: z.boolean(),
    newPassword: z.string().min(8, 'Password must be at least 8 characters').optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    data => {
      if (data.newPassword) {
        return data.newPassword === data.confirmPassword;
      }
      return true;
    },
    {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    }
  );
