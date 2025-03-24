'use server';

import { createActionClient, updateActionClient } from '../safe-action';
import prisma from '../prisma';
import { createHospitalServerSchema, updateHospitalServerSchema } from '../validation/hospital';
import { isUserAdmin } from '../auth/authenticated';

// Helper function to check admin permissions
const checkIsAdmin = async () => {
  const isAdmin = await isUserAdmin();
  if (!isAdmin) {
    throw new Error('Unauthorized: Only admin users can manage hospitals');
  }
  return true;
};

// Create hospital action with admin permission check
export const createHospital = createActionClient
  .schema(createHospitalServerSchema)
  .use(async ({ next }) => {
    await checkIsAdmin();
    return next();
  })
  .action(async ({ parsedInput, ctx: { session } }) => {
    try {
      const hospital = await prisma.hospital.create({
        data: {
          ...parsedInput,
        },
      });

      return { success: true, hospital };
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new Error('A hospital with this name already exists');
      }
      console.error('Error creating hospital:', error);
      throw new Error('Failed to create hospital');
    }
  });

// Update hospital action with admin permission check
export const updateHospital = updateActionClient
  .schema(updateHospitalServerSchema)
  .use(async ({ next }) => {
    await checkIsAdmin();
    return next();
  })
  .action(async ({ parsedInput }) => {
    try {
      const { id, ...data } = parsedInput;

      const hospital = await prisma.hospital.update({
        where: { id },
        data,
      });

      return { success: true, hospital };
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new Error('A hospital with this name already exists');
      }
      if (error.code === 'P2025') {
        throw new Error('Hospital not found');
      }
      console.error('Error updating hospital:', error);
      throw new Error('Failed to update hospital');
    }
  });

// Get hospital by ID
export const getHospitalById = async (id: number) => {
  try {
    const hospital = await prisma.hospital.findUnique({
      where: { id },
    });

    if (!hospital) {
      throw new Error('Hospital not found');
    }

    return { success: true, hospital };
  } catch (error) {
    console.error('Error fetching hospital:', error);
    throw new Error('Failed to fetch hospital');
  }
};
