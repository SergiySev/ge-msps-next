import { createSafeActionClient } from 'next-safe-action';
import { getAuthSession, checkRecordAccess } from './auth/authenticated';
import prisma from './prisma';
import { isActionWithId } from './validation/actionTypes';

class ActionError extends Error {}

// Base client with error handling
export const actionClient = createSafeActionClient({
  handleServerError(error) {
    console.error('Server error:', error);

    // If it's our custom ActionError, return its message
    if (error instanceof ActionError) {
      return error.message;
    }

    // If it's a regular Error, return its message
    if (error instanceof Error) {
      return error.message;
    }

    // For unknown errors, return a generic message
    return 'An unexpected error occurred';
  },
});

// Auth client that provides session context
export const authActionClient = actionClient.use(async ({ next }) => {
  const session = await getAuthSession();
  return next({ ctx: { session } });
});

// Record access client that checks hospital-based access
export const recordAccessClient = authActionClient.use(async ({ next, clientInput, ctx }) => {
  const { session } = ctx;

  // Only check record access for actions that have an ID
  if (isActionWithId(clientInput)) {
    // Check if the record exists and user has access to it
    const existingRecord = await prisma.patient.findUnique({
      where: { id: clientInput.id },
      select: { hospital_id: true },
    });

    if (!existingRecord) {
      throw new Error('Record not found');
    }

    // Check if user has access to this record based on hospital
    const { canAccess, error: accessError } = checkRecordAccess(session, existingRecord.hospital_id);
    if (!canAccess) {
      throw new Error(accessError);
    }
  }

  return next();
});

// Create a specialized client for each permission level
export const createActionClient = authActionClient;
export const updateActionClient = recordAccessClient;
export const deleteActionClient = recordAccessClient;
export const readActionClient = recordAccessClient;
