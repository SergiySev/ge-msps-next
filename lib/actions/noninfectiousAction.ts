'use server';

import { createActionClient, updateActionClient, deleteActionClient } from '../safe-action';
import prisma from '../prisma';
import { createNoninfectiousServerSchema, updateNoninfectiousServerSchema } from '../validation/noninfectious';
import { deleteActionSchema } from '../validation/DeleteActionSchema';
import { checkCreatePermission, checkUpdatePermission, checkDeletePermission } from '../auth/authenticated';

// Create noninfectious action with create permission check
export const createNoninfectious = createActionClient
  .schema(createNoninfectiousServerSchema)
  .use(async ({ next }) => {
    const { canProceed, error } = await checkCreatePermission();
    if (!canProceed) {
      throw new Error(error);
    }
    return next();
  })
  .action(async ({ parsedInput, ctx: { session } }) => {
    try {
      const data = await prisma.noninfectious.create({
        data: {
          ...parsedInput,
          hospital_id: session.hospitalId,
          created_at: new Date(),
          created_by: session.id,
        },
      });
      return { data };
    } catch (error) {
      console.error('Error creating noninfectious:', error);
      throw error;
    }
  });

// Update noninfectious action with update permission check
export const updateNoninfectious = updateActionClient
  .schema(updateNoninfectiousServerSchema)
  .use(async ({ next }) => {
    const { canProceed, error } = await checkUpdatePermission();
    if (!canProceed) {
      throw new Error(error);
    }
    return next();
  })
  .action(async ({ parsedInput, ctx: { session } }) => {
    try {
      const data = await prisma.noninfectious.update({
        where: {
          id: parsedInput.id,
          hospital_id: session.hospitalId,
        },
        data: {
          ...parsedInput,
          updated_at: new Date(),
          updated_by: session.id,
        },
      });
      return { data };
    } catch (error) {
      console.error('Error updating noninfectious:', error);
      throw error;
    }
  });

// Delete noninfectious action with delete permission check
export const deleteNoninfectious = deleteActionClient
  .schema(deleteActionSchema)
  .use(async ({ next }) => {
    const { canProceed, error } = await checkDeletePermission();
    if (!canProceed) {
      throw new Error(error);
    }
    return next();
  })
  .action(async ({ parsedInput, ctx: { session } }) => {
    try {
      const data = await prisma.noninfectious.delete({
        where: {
          id: parsedInput.id,
          hospital_id: session.hospitalId,
        },
      });
      return { data };
    } catch (error) {
      console.error('Error deleting noninfectious:', error);
      throw error;
    }
  });
