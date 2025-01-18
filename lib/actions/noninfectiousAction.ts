'use server';

import { actionClient } from '../safe-action';
import prisma from '../prisma';
import { createNoninfectiousServerSchema, updateNoninfectiousServerSchema } from '../validation/noninfectious';
import { deleteActionSchema } from '../validation/DeleteActionSchema';
import { getAuthenticatedUserId } from '../auth/authenticated';

export const createNoninfectious = actionClient
  .schema(createNoninfectiousServerSchema)
  .action(async ({ parsedInput }) => {
    try {
      const userId = await getAuthenticatedUserId();

      const data = await prisma.noninfectious.create({
        data: {
          ...parsedInput,
          created_at: new Date(),
          created_by: userId,
        },
      });
      return { data /* : patient as Noninfectious  */ };
    } catch (error) {
      console.log('Error: ', error);
      return { error };
    }
  });

export const updateNoninfectious = actionClient
  .schema(updateNoninfectiousServerSchema)
  .action(async ({ parsedInput }) => {
    try {
      const userId = await getAuthenticatedUserId();

      const data = await prisma.noninfectious.update({
        where: { id: parsedInput.id },
        data: {
          ...parsedInput,
          updated_at: new Date(),
          updated_by: userId,
        },
      });
      return { data /* : patient as Noninfectious */ };
    } catch (error) {
      console.log('Error: ', error);
      return { error };
    }
  });

export const deleteNoninfectious = actionClient.schema(deleteActionSchema).action(async ({ parsedInput }) => {
  try {
    // Verify user is authenticated before delete
    await getAuthenticatedUserId();

    const data = await prisma.noninfectious.delete({
      where: { id: parsedInput.id },
    });
    return { data };
  } catch (error) {
    console.log('Error: ', error);
    return { error };
  }
});
