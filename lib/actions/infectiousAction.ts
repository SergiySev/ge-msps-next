'use server';

import { createActionClient, updateActionClient, deleteActionClient } from '../safe-action';
import prisma from '../prisma';
import { createInfectiousServerSchema, updateInfectiousServerSchema } from '../validation/infectious';
import { deleteActionSchema } from '../validation/DeleteActionSchema';
import { checkCreatePermission, checkUpdatePermission, checkDeletePermission } from '../auth/authenticated';

// Create infectious action with create permission check
export const createInfectious = createActionClient
  .schema(createInfectiousServerSchema)
  .use(async ({ next }) => {
    const { canProceed, error } = await checkCreatePermission();
    if (!canProceed) {
      throw new Error(error);
    }
    return next();
  })
  .action(async ({ parsedInput, ctx: { session } }) => {
    try {
      const data = await prisma.infectious.create({
        data: {
          ...parsedInput,
          hospital_id: session.hospitalId,
          created_at: new Date(),
          created_by: session.id,
        },
      });
      return { data };
    } catch (error) {
      console.error('Error creating infectious:', error);
      throw error;
    }
  });

// Update infectious action with update permission check
export const updateInfectious = updateActionClient
  .schema(updateInfectiousServerSchema)
  .use(async ({ next }) => {
    const { canProceed, error } = await checkUpdatePermission();
    if (!canProceed) {
      throw new Error(error);
    }
    return next();
  })
  .action(async ({ parsedInput, ctx: { session } }) => {
    try {
      const data = await prisma.infectious.update({
        where: { id: parsedInput.id },
        data: {
          ...parsedInput,
          updated_at: new Date(),
          updated_by: session.id,
        },
      });
      return { data };
    } catch (error) {
      console.error('Error updating infectious:', error);
      throw error;
    }
  });

// Delete infectious action with delete permission check
export const deleteInfectious = deleteActionClient
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
      const data = await prisma.infectious.delete({
        where: { id: parsedInput.id },
      });
      return { data };
    } catch (error) {
      console.error('Error deleting infectious:', error);
      throw error;
    }
  });
