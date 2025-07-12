'use server';

import { authActionClient } from '../safe-action';
import { updateStaffSchema } from '../validation/staff';
import prisma from '../prisma';
import { hash } from 'bcryptjs';

// type UpdateStaffInput = z.infer<typeof updateStaffSchema>;

// Staff update action with auth middleware and manager/admin role check
export const updateStaff = authActionClient
  .schema(updateStaffSchema)
  .use(async ({ next, ctx }) => {
    const { session } = ctx;

    // Check if user has manager or admin role
    if (!['manager', 'admin'].includes(session.role)) {
      throw new Error('Unauthorized: Only managers and administrators can update staff records');
    }

    return next();
  })
  .action(async ({ parsedInput }) => {
    try {
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

      // Base data to update
      const updateData: Record<string, unknown> = {
        username,
        first_name,
        last_name,
        role,
        active: isActive,
      };

      // Only update password if provided
      if (newPassword) {
        updateData.password = await hash(newPassword, 12);
      }

      const updatedStaff = await prisma.staff.update({
        where: { id: parseInt(id) },
        data: updateData,
      });

      return { success: true, data: updatedStaff };
    } catch (error) {
      console.error('Error updating staff:', error);
      return { error: 'Failed to update staff record' };
    }
  });
