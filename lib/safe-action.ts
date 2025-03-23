import { createSafeActionClient } from 'next-safe-action';

class ActionError extends Error {}

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
