'use server';

import { authActionClient } from '../safe-action';
import { updateProfileSchema } from '../validation/staff-profile';
import prisma from '../prisma';
import { hash, compare } from 'bcryptjs';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

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

      const staff = await prisma.staff.findUnique({
        where: { id: session.id },
      });

      if (!staff) {
        return { error: 'Staff member not found' };
      }

      // Base data to update (always update these fields)
      const updateData: any = {
        username: parsedInput.username,
        first_name: parsedInput.first_name,
        last_name: parsedInput.last_name,
      };

      // If password fields are provided, verify current password and update
      if (parsedInput.currentPassword && parsedInput.newPassword && parsedInput.confirmPassword) {
        const isPasswordValid = await compare(parsedInput.currentPassword, staff.password);
        if (!isPasswordValid) {
          return { error: 'Current password is incorrect' };
        }

        // Add password to update data
        updateData.password = await hash(parsedInput.newPassword, 10);
      }

      await prisma.staff.update({
        where: { id: session.id },
        data: updateData,
      });

      revalidatePath('/profile');
      return { success: true };
    } catch (error) {
      console.error('Error updating profile:', error);
      return { error: 'Failed to update profile' };
    }
  });
