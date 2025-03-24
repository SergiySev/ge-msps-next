'use server';

import { createActionClient, updateActionClient, deleteActionClient } from '../safe-action';
import prisma from '../prisma';
import {
  createKidneyAssessmentServerSchema,
  updateKidneyAssessmentServerSchema,
} from '../validation/kidney_assessment';
import { deleteActionSchema } from '../validation/DeleteActionSchema';
import { checkCreatePermission, checkUpdatePermission, checkDeletePermission } from '../auth/authenticated';

// Create kidney assessment action with create permission check
export const createKidneyAssessment = createActionClient
  .schema(createKidneyAssessmentServerSchema)
  .use(async ({ next }) => {
    const { canProceed, error } = await checkCreatePermission();
    if (!canProceed) {
      throw new Error(error);
    }
    return next();
  })
  .action(async ({ parsedInput, ctx: { session } }) => {
    try {
      const data = await prisma.kidney_assessment.create({
        data: {
          ...parsedInput,
          hospital_id: session.hospitalId,
          created_at: new Date(),
          created_by: session.id,
        },
      });
      return { data };
    } catch (error) {
      console.error('Error creating kidney assessment:', error);
      throw error;
    }
  });

// Update kidney assessment action with update permission check
export const updateKidneyAssessment = updateActionClient
  .schema(updateKidneyAssessmentServerSchema)
  .use(async ({ next }) => {
    const { canProceed, error } = await checkUpdatePermission();
    if (!canProceed) {
      throw new Error(error);
    }
    return next();
  })
  .action(async ({ parsedInput, ctx: { session } }) => {
    try {
      const data = await prisma.kidney_assessment.update({
        where: { id: parsedInput.id },
        data: {
          ...parsedInput,
          updated_at: new Date(),
          updated_by: session.id,
        },
      });
      return { data };
    } catch (error) {
      console.error('Error updating kidney assessment:', error);
      throw error;
    }
  });

// Delete kidney assessment action with delete permission check
export const deleteKidneyAssessment = deleteActionClient
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
      const data = await prisma.kidney_assessment.delete({
        where: { id: parsedInput.id },
      });
      return { data };
    } catch (error) {
      console.error('Error deleting kidney assessment:', error);
      throw error;
    }
  });
