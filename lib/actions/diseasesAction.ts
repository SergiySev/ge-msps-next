'use server';

import { actionClient } from '../safe-action';
import prisma from '../prisma';
import { patient as Patient } from '@prisma/client';
import { updateDiseasesServerSchema } from '../validation/diseases';
import { getAuthenticatedUserId } from '../auth/authenticated';

export const updateDiseases = actionClient.schema(updateDiseasesServerSchema).action(async ({ parsedInput }) => {
  try {
    const userId = await getAuthenticatedUserId();

    const patient = await prisma.patient.update({
      where: { id: parsedInput.id },
      data: {
        ...parsedInput,
        updated_at: new Date(),
        updated_by: userId,
      },
    });
    return { data: patient as Patient };
  } catch (error) {
    console.log('Error: ', error);
    return { error };
  }
});
