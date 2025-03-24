'use server';

import { actionClient } from '../safe-action';
import { createPatientServerSchema, updatePatientServerSchema } from '../validation/patient';
import prisma from '../prisma';
import { patient as Patient } from '@prisma/client';
import { deleteActionSchema } from '../validation/DeleteActionSchema';
import {
  checkCreatePermission,
  checkUpdatePermission,
  checkDeletePermission,
  checkRecordAccess,
} from '../auth/authenticated';

export const createPatient = actionClient.schema(createPatientServerSchema).action(async ({ parsedInput }) => {
  try {
    // Check if user can create records and get session in one call
    const { session, canProceed, error } = await checkCreatePermission();
    if (!canProceed) {
      throw new Error(error);
    }

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

export const updatePatient = actionClient.schema(updatePatientServerSchema).action(async ({ parsedInput }) => {
  try {
    // Check if user can update records and get session in one call
    const { session, canProceed, error } = await checkUpdatePermission();
    if (!canProceed) {
      throw new Error(error);
    }

    // Get the patient to check hospital access
    const existingPatient = await prisma.patient.findUnique({
      where: { id: parsedInput.id },
      select: { hospital_id: true },
    });

    if (!existingPatient) {
      throw new Error('Patient not found');
    }

    // Check if user has access to this record based on hospital
    const { canAccess, error: accessError } = checkRecordAccess(session, existingPatient.hospital_id);
    if (!canAccess) {
      throw new Error(accessError);
    }

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

export const deletePatient = actionClient.schema(deleteActionSchema).action(async ({ parsedInput }) => {
  try {
    // Check if user can delete records and get session in one call
    const { session, canProceed, error } = await checkDeletePermission();
    if (!canProceed) {
      throw new Error(error);
    }

    // Get the patient to check hospital access
    const existingPatient = await prisma.patient.findUnique({
      where: { id: parsedInput.id },
      select: { hospital_id: true },
    });

    if (!existingPatient) {
      throw new Error('Patient not found');
    }

    // Check if user has access to this record based on hospital
    const { canAccess, error: accessError } = checkRecordAccess(session, existingPatient.hospital_id);
    if (!canAccess) {
      throw new Error(accessError);
    }

    const data = await prisma.patient.delete({
      where: { id: parsedInput.id },
    });
    return { data };
  } catch (error) {
    console.error('Error deleting patient:', error);
    throw error;
  }
});
