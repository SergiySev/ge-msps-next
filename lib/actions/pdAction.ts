'use server';

import { actionClient } from '../safe-action';
import prisma from '../prisma';
import { createPDServerSchema, updatePDServerSchema } from '../validation/pd';
import { deleteActionSchema } from '../validation/DeleteActionSchema';
import { getAuthenticatedUserId } from '../auth/authenticated';

export const createPD = actionClient.schema(createPDServerSchema).action(async ({ parsedInput }) => {
  try {
    const userId = await getAuthenticatedUserId();

    const data = await prisma.pd.create({
      data: {
        ...parsedInput,
        created_at: new Date(),
        created_by: userId,
      },
    });
    return { data };
  } catch (error) {
    console.error('Error creating PD:', error);
    throw error;
  }
});

export const updatePD = actionClient.schema(updatePDServerSchema).action(async ({ parsedInput }) => {
  try {
    const userId = await getAuthenticatedUserId();

    const data = await prisma.pd.update({
      where: { id: parsedInput.id },
      data: {
        ...parsedInput,
        updated_at: new Date(),
        updated_by: userId,
      },
    });
    return { data };
  } catch (error) {
    console.error('Error updating PD:', error);
    throw error;
  }
});

export const deletePD = actionClient.schema(deleteActionSchema).action(async ({ parsedInput }) => {
  try {
    // Verify user is authenticated before delete
    await getAuthenticatedUserId();

    const data = await prisma.pd.delete({
      where: { id: parsedInput.id },
    });
    return { data };
  } catch (error) {
    console.error('Error deleting PD:', error);
    throw error;
  }
});
