'use server';

import { actionClient } from '../safe-action';
import prisma from '../prisma';
import { createInfectiousServerSchema, updateInfectiousServerSchema } from '../validation/infectious';
import { deleteActionSchema } from '../validation/DeleteActionSchema';
import { getAuthenticatedUserId } from '../auth/authenticated';

export const createInfectious = actionClient.schema(createInfectiousServerSchema).action(async ({ parsedInput }) => {
  try {
    const userId = await getAuthenticatedUserId();

    const data = await prisma.infectious.create({
      data: {
        ...parsedInput,
        created_at: new Date(),
        created_by: userId,
      },
    });
    return { data /* : patient as Infectious  */ };
  } catch (error) {
    console.error('Error creating infectious:', error);
    throw error;
  }
});

export const updateInfectious = actionClient.schema(updateInfectiousServerSchema).action(async ({ parsedInput }) => {
  try {
    const userId = await getAuthenticatedUserId();

    const data = await prisma.infectious.update({
      where: { id: parsedInput.id },
      data: {
        ...parsedInput,
        updated_at: new Date(),
        updated_by: userId,
      },
    });
    return { data /* : patient as Infectious */ };
  } catch (error) {
    console.error('Error updating infectious:', error);
    throw error;
  }
});

export const deleteInfectious = actionClient.schema(deleteActionSchema).action(async ({ parsedInput }) => {
  try {
    // Verify user is authenticated before delete
    await getAuthenticatedUserId();

    const data = await prisma.infectious.delete({
      where: { id: parsedInput.id },
    });
    return { data };
  } catch (error) {
    console.error('Error deleting infectious:', error);
    throw error;
  }
});
