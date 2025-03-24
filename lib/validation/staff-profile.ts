import { z } from 'zod';

export const updateProfileSchema = z
  .object({
    username: z.string().email('Please enter a valid email address'),
    first_name: z.string().min(2, 'First name must be at least 2 characters'),
    last_name: z.string().min(2, 'Last name must be at least 2 characters'),
    currentPassword: z.string().optional(),
    newPassword: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    data => {
      // If any password field is filled, all must be filled
      const passwordFieldsProvided = [data.currentPassword, data.newPassword, data.confirmPassword].filter(
        Boolean
      ).length;

      // Either all password fields or none should be provided
      return passwordFieldsProvided === 0 || passwordFieldsProvided === 3;
    },
    {
      message: 'All password fields must be filled when changing password',
      path: ['currentPassword'],
    }
  )
  .refine(
    data => {
      // If we're changing password, ensure new passwords match
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
      // If we're changing password, ensure new password meets minimum length
      if (data.newPassword) {
        return data.newPassword.length >= 6;
      }
      return true;
    },
    {
      message: 'New password must be at least 6 characters',
      path: ['newPassword'],
    }
  );

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;
