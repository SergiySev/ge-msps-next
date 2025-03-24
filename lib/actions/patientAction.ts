'use server';

import { createActionClient, updateActionClient, deleteActionClient } from '../safe-action';
import { createPatientServerSchema, updatePatientServerSchema } from '../validation/patient';
import prisma from '../prisma';
import { patient as Patient } from '@prisma/client';
import { deleteActionSchema } from '../validation/DeleteActionSchema';
import { checkCreatePermission, checkUpdatePermission, checkDeletePermission } from '../auth/authenticated';

// Create patient action with create permission check
export const createPatient = createActionClient
  .schema(createPatientServerSchema)
  .use(async ({ next }) => {
    const { canProceed, error } = await checkCreatePermission();
    if (!canProceed) {
      throw new Error(error);
    }
    return next();
  })
  .action(async ({ parsedInput, ctx: { session } }) => {
    try {
      const patient = await prisma.patient.create({
        data: {
          ...parsedInput,
          hospital_id: session.hospitalId,
          created_at: new Date(),
          created_by: session.id,
        },
      });
      return { data: patient as Patient };
    } catch (error) {
      console.error('Error creating patient:', error);
      throw error;
    }
  });

// Update patient action with update permission check
export const updatePatient = updateActionClient
  .schema(updatePatientServerSchema)
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
      console.error('Error updating patient:', error);
      throw error;
    }
  });

// Delete patient action with delete permission check
export const deletePatient = deleteActionClient
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
      const data = await prisma.patient.delete({
        where: { id: parsedInput.id },
      });
      return { data };
    } catch (error) {
      console.error('Error deleting patient:', error);
      throw error;
    }
  });
