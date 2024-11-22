'use server';

import { actionClient } from '../safe-action';
import prisma from '../prisma';
import { createPDServerSchema, updatePDServerSchema } from '../validation/pd';

export const createPD = actionClient.schema(createPDServerSchema).action(async ({ parsedInput }) => {
  try {
    const data = await prisma.pd.create({
      data: {
        ...parsedInput,
        created_at: new Date(),
        created_by: 1, // FIXME: get from session
      },
    });
    return { data };
  } catch (error) {
    console.log('Error: ', error);
    return { error };
  }
});

export const updatePD = actionClient.schema(updatePDServerSchema).action(async ({ parsedInput }) => {
  try {
    const data = await prisma.pd.update({
      where: { id: parsedInput.id },
      data: {
        ...parsedInput,
        updated_at: new Date(),
        updated_by: 1, // FIXME: get from session
      },
    });
    return { data };
  } catch (error) {
    console.log('Error: ', error);
    return { error };
  }
});

// FIXME: add deletePD action
