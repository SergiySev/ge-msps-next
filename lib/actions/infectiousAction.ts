'use server';

import { actionClient } from '../safe-action';
import prisma from '../prisma';
import { createInfectiousServerSchema, updateInfectiousServerSchema } from '../validation/infectious';
import { deleteActionSchema } from '../validation/DeleteActionSchema';

export const createInfectious = actionClient.schema(createInfectiousServerSchema).action(async ({ parsedInput }) => {
  try {
    const data = await prisma.infectious.create({
      data: {
        ...parsedInput,
        created_at: new Date(),
        created_by: 1, // FIXME: get from session
      },
    });
    return { data /* : patient as Infectious  */ };
  } catch (error) {
    console.log('Error: ', error);
    return { error };
  }
});

export const updateInfectious = actionClient.schema(updateInfectiousServerSchema).action(async ({ parsedInput }) => {
  try {
    const data = await prisma.infectious.update({
      where: { id: parsedInput.id },
      data: {
        ...parsedInput,
        updated_at: new Date(),
        updated_by: 1, // FIXME: get from session
      },
    });
    return { data /* : patient as Infectious */ };
  } catch (error) {
    console.log('Error: ', error);
    return { error };
  }
});

export const deleteInfectious = actionClient.schema(deleteActionSchema).action(async ({ parsedInput }) => {
  try {
    const data = await prisma.infectious.delete({
      where: { id: parsedInput.id },
    });
    return { data };
  } catch (error) {
    console.log('Error: ', error);
    return { error };
  }
});
