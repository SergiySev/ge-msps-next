'use server';

import { authActionClient } from '../safe-action';
import { updateProfileSchema, updatePasswordSchema } from '../validation/staff-profile';
import prisma from '../prisma';
import { hash } from 'bcryptjs';
import { revalidatePath } from 'next/cache';

// type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
// type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>;

// Profile update action with auth middleware
export const updateProfile = authActionClient
  .schema(updateProfileSchema)
  .action(async ({ parsedInput, ctx: { session } }) => {
    try {
      if (!session?.id) {
        return { error: 'Not authenticated' };
      }

      // Check if username is already taken by another user
      const existingUser = await prisma.staff.findFirst({
        where: {
          username: parsedInput.username,
          NOT: {
            id: session.id,
          },
        },
      });

      if (existingUser) {
        return { error: 'Username already exists' };
      }

      await prisma.staff.update({
        where: { id: session.id },
        data: {
          username: parsedInput.username,
          first_name: parsedInput.first_name,
          last_name: parsedInput.last_name,
        },
      });

      revalidatePath('/profile');
      return { success: true };
    } catch (error) {
      console.error('Error updating profile:', error);
      return { error: 'Failed to update profile' };
    }
  });

// Password update action with auth middleware
export const updatePassword = authActionClient
  .schema(updatePasswordSchema)
  .action(async ({ parsedInput, ctx: { session } }) => {
    try {
      if (!session?.id) {
        return { error: 'Not authenticated' };
      }

      const staff = await prisma.staff.findUnique({
        where: { id: session.id },
      });

      if (!staff) {
        return { error: 'Staff member not found' };
      }

      // Update password
      await prisma.staff.update({
        where: { id: session.id },
        data: {
          password: await hash(parsedInput.newPassword, 10),
        },
      });

      revalidatePath('/profile');
      return { success: true };
    } catch (error) {
      console.error('Error updating password:', error);
      return { error: 'Failed to update password' };
    }
  });
