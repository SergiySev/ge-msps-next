'use server';

import { actionClient } from '../safe-action';
import { updateProfileSchema } from 'msps/lib/validation/staff-profile';
import prisma from '../prisma';
import { hash, compare } from 'bcryptjs';
import { revalidatePath } from 'next/cache';
import { getAuthenticatedUserId } from '../auth/authenticated';

type ProfileActionResult = { data?: string; error?: string };

export const updateProfile = actionClient.schema(updateProfileSchema).action(async ({ parsedInput }) => {
  try {
    const userId = await getAuthenticatedUserId();
    const user = await prisma.staff.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return { data: null, error: 'User not found' };
    }

    // Verify current password
    const isValidPassword = await compare(parsedInput.currentPassword, user.password);
    if (!isValidPassword) {
      return { data: null, error: 'Current password is incorrect' };
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
    return { data: 'Profile updated successfully' };
  } catch (error) {
    console.log('Error: ', error);
    return { data: null, error: 'Something went wrong' };
  }
});
