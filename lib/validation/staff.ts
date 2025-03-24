import { z } from 'zod';

export const updateStaffSchema = z
  .object({
    id: z.string(),
    username: z.string().email('Please enter a valid email address'),
    first_name: z.string().min(2, 'First name must be at least 2 characters'),
    last_name: z.string().min(2, 'Last name must be at least 2 characters'),
    role: z.enum(['nurse', 'doctor', 'manager', 'admin']),
    isActive: z.boolean(),
    newPassword: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    data => {
      // If one password field is filled, both must be filled
      const newPasswordProvided = !!data.newPassword;
      const confirmPasswordProvided = !!data.confirmPassword;

      return (newPasswordProvided && confirmPasswordProvided) || (!newPasswordProvided && !confirmPasswordProvided);
    },
    {
      message: 'Both password fields must be filled when setting a new password',
      path: ['confirmPassword'],
    }
  )
  .refine(
    data => {
      // If passwords are provided, they must match
      if (data.newPassword && data.confirmPassword) {
        return data.newPassword === data.confirmPassword;
      }
      return true;
    },
    {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    }
  )
  .refine(
    data => {
      // If password is provided, it must meet minimum length
      if (data.newPassword) {
        return data.newPassword.length >= 6;
      }
      return true;
    },
    {
      message: 'Password must be at least 6 characters',
      path: ['newPassword'],
    }
  );
