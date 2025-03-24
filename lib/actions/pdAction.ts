'use server';

import { createActionClient, updateActionClient, deleteActionClient } from '../safe-action';
import prisma from '../prisma';
import { createPDServerSchema, updatePDServerSchema } from '../validation/pd';
import { deleteActionSchema } from '../validation/DeleteActionSchema';
import { checkCreatePermission, checkUpdatePermission, checkDeletePermission } from '../auth/authenticated';

// Create PD action with create permission check
export const createPD = createActionClient
  .schema(createPDServerSchema)
  .use(async ({ next }) => {
    const { canProceed, error } = await checkCreatePermission();
    if (!canProceed) {
      throw new Error(error);
    }
    return next();
  })
  .action(async ({ parsedInput, ctx: { session } }) => {
    try {
      const data = await prisma.pd.create({
        data: {
          ...parsedInput,
          hospital_id: session.hospitalId,
          created_at: new Date(),
          created_by: session.id,
        },
      });
      return { data };
    } catch (error) {
      console.error('Error creating PD:', error);
      throw error;
    }
  });

// Update PD action with update permission check
export const updatePD = updateActionClient
  .schema(updatePDServerSchema)
  .use(async ({ next }) => {
    const { canProceed, error } = await checkUpdatePermission();
    if (!canProceed) {
      throw new Error(error);
    }
    return next();
  })
  .action(async ({ parsedInput, ctx: { session } }) => {
    try {
      const data = await prisma.pd.update({
        where: { id: parsedInput.id },
        data: {
          ...parsedInput,
          updated_at: new Date(),
          updated_by: session.id,
        },
      });
      return { data };
    } catch (error) {
      console.error('Error updating PD:', error);
      throw error;
    }
  });

// Delete PD action with delete permission check
export const deletePD = deleteActionClient
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
      const data = await prisma.pd.delete({
        where: { id: parsedInput.id },
      });
      return { data };
    } catch (error) {
      console.error('Error deleting PD:', error);
      throw error;
    }
  });
