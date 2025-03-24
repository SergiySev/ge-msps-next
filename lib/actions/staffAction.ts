import { createSafeActionClient } from 'next-safe-action';
import { updateStaffSchema } from '../validation/staff';
import prisma from '../prisma';
import { hash } from 'bcryptjs';
import { getServerSession } from 'next-auth';
import { authOptions } from 'msps/app/api/auth/[...nextauth]/options';
import { z } from 'zod';

type UpdateStaffInput = z.infer<typeof updateStaffSchema>;

const action = createSafeActionClient();

export const updateStaff = action.schema(updateStaffSchema).action(async ({ parsedInput }) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error('Unauthorized');
  }

  // Check if user has manager or admin role
  if (!['manager', 'admin'].includes(session.user.role)) {
    throw new Error('Unauthorized');
  }

  const { id, username, first_name, last_name, role, isActive, newPassword } = parsedInput;

  // Check if username is already taken by another user
  const existingUser = await prisma.staff.findFirst({
    where: {
      username,
      NOT: {
        id: parseInt(id),
      },
    },
  });

  if (existingUser) {
    return { error: 'Username already exists' };
  }

  const updateData: any = {
    username,
    first_name,
    last_name,
    role,
    active: isActive,
  };

  if (newPassword) {
    updateData.password = await hash(newPassword, 12);
  }

  const updatedStaff = await prisma.staff.update({
    where: { id: parseInt(id) },
    data: updateData,
  });

  return { success: true, data: updatedStaff };
});
