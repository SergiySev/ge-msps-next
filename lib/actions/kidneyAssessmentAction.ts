'use server';

import { actionClient } from '../safe-action';
import prisma from '../prisma';
import {
  createKidneyAssessmentServerSchema,
  updateKidneyAssessmentServerSchema,
} from '../validation/kidney_assessment';
import { deleteActionSchema } from '../validation/DeleteActionSchema';
import { getAuthenticatedUserId } from '../auth/authenticated';

export const createKidneyAssessment = actionClient
  .schema(createKidneyAssessmentServerSchema)
  .action(async ({ parsedInput }) => {
    try {
      const userId = await getAuthenticatedUserId();

      const data = await prisma.kidney_assessment.create({
        data: {
          ...parsedInput,
          created_at: new Date(),
          created_by: userId,
        },
      });
      return { data /* : patient as KidneyAssessment  */ };
    } catch (error) {
      console.error('Error creating kidney assessment:', error);
      throw error;
    }
  });

export const updateKidneyAssessment = actionClient
  .schema(updateKidneyAssessmentServerSchema)
  .action(async ({ parsedInput }) => {
    try {
      const userId = await getAuthenticatedUserId();

      const data = await prisma.kidney_assessment.update({
        where: { id: parsedInput.id },
        data: {
          ...parsedInput,
          updated_at: new Date(),
          updated_by: userId,
        },
      });
      return { data /* : patient as KidneyAssessment */ };
    } catch (error) {
      console.error('Error updating kidney assessment:', error);
      throw error;
    }
  });

export const deleteKidneyAssessment = actionClient.schema(deleteActionSchema).action(async ({ parsedInput }) => {
  try {
    // Verify user is authenticated before delete
    await getAuthenticatedUserId();

    const data = await prisma.kidney_assessment.delete({
      where: { id: parsedInput.id },
    });
    return { data };
  } catch (error) {
    console.error('Error deleting kidney assessment:', error);
    throw error;
  }
});
