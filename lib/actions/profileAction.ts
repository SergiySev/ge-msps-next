'use server';

import { createSafeActionClient } from 'next-safe-action';
import { updateProfileSchema } from '../validation/staff-profile';
import prisma from '../prisma';
import { hash, compare } from 'bcryptjs';
import { getServerSession } from 'next-auth';
import { authOptions } from 'msps/app/api/auth/[...nextauth]/options';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

const action = createSafeActionClient();

export const updateProfile = action.schema(updateProfileSchema).action(async ({ parsedInput }) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { error: 'Not authenticated' };
    }

    // Check if username is already taken by another user
    const existingUser = await prisma.staff.findFirst({
      where: {
        username: parsedInput.username,
        NOT: {
          id: parseInt(session.user.id),
        },
      },
    });

    if (existingUser) {
      return { error: 'Username already exists' };
    }

    const staff = await prisma.staff.findUnique({
      where: { id: parseInt(session.user.id) },
    });

    if (!staff) {
      return { error: 'Staff member not found' };
    }

    const isPasswordValid = await compare(parsedInput.currentPassword, staff.password);
    if (!isPasswordValid) {
      return { error: 'Current password is incorrect' };
    }

    await prisma.staff.update({
      where: { id: parseInt(session.user.id) },
      data: {
        username: parsedInput.username,
        first_name: parsedInput.first_name,
        last_name: parsedInput.last_name,
        password: await hash(parsedInput.newPassword, 10),
      },
    });

    revalidatePath('/profile');
    return { success: true };
  } catch (error) {
    console.error('Error updating profile:', error);
    return { error: 'Failed to update profile' };
  }
});
