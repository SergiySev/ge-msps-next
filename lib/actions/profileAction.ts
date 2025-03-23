'use server';

import { actionClient } from '../safe-action';
import { updateProfileSchema } from 'msps/lib/validation/staff-profile';
import prisma from '../prisma';
import { hash, compare } from 'bcryptjs';
import { revalidatePath } from 'next/cache';
import { getAuthenticatedUserId } from '../auth/authenticated';

export const updateProfile = actionClient.schema(updateProfileSchema).action(async ({ parsedInput }) => {
  try {
    const userId = await getAuthenticatedUserId();

    const user = await prisma.staff.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Check if username is already taken by another staff member
    if (parsedInput.username !== user.username) {
      const existingUser = await prisma.staff.findUnique({
        where: { username: parsedInput.username },
      });

      if (existingUser) {
        throw new Error('Username is already taken');
      }
    }

    // Verify current password
    const isValidPassword = await compare(parsedInput.currentPassword, user.password);
    if (!isValidPassword) {
      throw new Error('Current password is incorrect');
    }

    // Hash new password
    const hashedPassword = await hash(parsedInput.newPassword, 10);

    // Update user
    await prisma.staff.update({
      where: { id: userId },
      data: {
        username: parsedInput.username,
        password: hashedPassword,
        updated_at: new Date(),
      },
    });

    revalidatePath('/profile');
    return { success: 'Profile updated successfully' };
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
});
