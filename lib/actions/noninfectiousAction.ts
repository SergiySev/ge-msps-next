'use server';

import { actionClient } from '../safe-action';
import prisma from '../prisma';
import { createNoninfectiousServerSchema, updateNoninfectiousServerSchema } from '../validation/noninfectious';

export const createNoninfectious = actionClient
  .schema(createNoninfectiousServerSchema)
  .action(async ({ parsedInput }) => {
    try {
      const data = await prisma.noninfectious.create({
        data: {
          ...parsedInput,
          created_at: new Date(),
          created_by: 1, // FIXME: get from session
        },
      });
      return { data /* : patient as Noninfectious  */ };
    } catch (error) {
      console.log('Error: ', error);
      return { error };
    }
  });

export const updateNoninfectious = actionClient
  .schema(updateNoninfectiousServerSchema)
  .action(async ({ parsedInput }) => {
    try {
      const data = await prisma.noninfectious.update({
        where: { id: parsedInput.id },
        data: {
          ...parsedInput,
          updated_at: new Date(),
          updated_by: 1, // FIXME: get from session
        },
      });
      return { data /* : patient as Noninfectious */ };
    } catch (error) {
      console.log('Error: ', error);
      return { error };
    }
  });
