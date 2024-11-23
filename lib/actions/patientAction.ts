'use server';

import { actionClient } from '../safe-action';
import { createPatientServerSchema, updatePatientServerSchema } from '../validation/patient';
import prisma from '../prisma';
import { patient as Patient } from '@prisma/client';
import { deleteActionSchema } from '../validation/DeleteActionSchema';

export const createPatient = actionClient.schema(createPatientServerSchema).action(async ({ parsedInput }) => {
  try {
    const patient = await prisma.patient.create({
      data: {
        ...parsedInput,
        created_at: new Date(),
        created_by: 1, // FIXME: get from session
      },
    });
    return { data: patient as Patient };
  } catch (error) {
    console.log('Error: ', error);
    return { error };
  }
});

export const updatePatient = actionClient.schema(updatePatientServerSchema).action(async ({ parsedInput }) => {
  try {
    const patient = await prisma.patient.update({
      where: { id: parsedInput.id },
      data: {
        ...parsedInput,
        updated_at: new Date(),
        updated_by: 1, // FIXME: get from session
      },
    });
    return { data: patient as Patient };
  } catch (error) {
    console.log('Error: ', error);
    return { error };
  }
});

export const deletePatient = actionClient.schema(deleteActionSchema).action(async ({ parsedInput }) => {
  console.log('Parsed input: ', parsedInput.id);
  try {
    const data = await prisma.patient.delete({
      where: { id: parsedInput.id },
    });
    return { data };
  } catch (error) {
    console.log('Error: ', error);
    return { error };
  }
});
