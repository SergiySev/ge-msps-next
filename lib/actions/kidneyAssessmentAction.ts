'use server';

import { actionClient } from '../safe-action';
import prisma from '../prisma';
import {
  createKidneyAssessmentServerSchema,
  updateKidneyAssessmentServerSchema,
} from '../validation/kidney_assessment';

export const createKidneyAssessment = actionClient
  .schema(createKidneyAssessmentServerSchema)
  .action(async ({ parsedInput }) => {
    console.log('Create: ', parsedInput);

    try {
      const data = await prisma.kidney_assessment.create({
        data: {
          ...parsedInput,
          created_at: new Date(),
          created_by: 1, // FIXME: get from session
        },
      });
      return { data /* : patient as KidneyAssessment  */ };
    } catch (error) {
      console.log('Error: ', error);
      return { error };
    }
  });

export const updateKidneyAssessment = actionClient
  .schema(updateKidneyAssessmentServerSchema)
  .action(async ({ parsedInput }) => {
    console.log('Update: ', parsedInput);

    try {
      const data = await prisma.kidney_assessment.update({
        where: { id: parsedInput.id },
        data: {
          ...parsedInput,
          updated_at: new Date(),
          updated_by: 1, // FIXME: get from session
        },
      });
      return { data /* : patient as KidneyAssessment */ };
    } catch (error) {
      console.log('Error: ', error);
      return { error };
    }
  });
