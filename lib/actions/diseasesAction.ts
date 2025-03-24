'use server';

import { updateActionClient } from '../safe-action';
import prisma from '../prisma';
import { patient as Patient } from '@prisma/client';
import { updateDiseasesServerSchema } from '../validation/diseases';
import { checkUpdatePermission } from '../auth/authenticated';

// Update diseases action with update permission check
export const updateDiseases = updateActionClient
  .schema(updateDiseasesServerSchema)
  .use(async ({ next }) => {
    const { canProceed, error } = await checkUpdatePermission();
    if (!canProceed) {
      throw new Error(error);
    }
    return next();
  })
  .action(async ({ parsedInput, ctx: { session } }) => {
    try {
      const patient = await prisma.patient.update({
        where: { id: parsedInput.id },
        data: {
          ...parsedInput,
          updated_at: new Date(),
          updated_by: session.id,
        },
      });
      return { data: patient as Patient };
    } catch (error) {
      console.error('Error updating diseases:', error);
      throw error;
    }
  });
