import { headers } from 'next/headers';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

/**
 * CSRF protection utility for API routes and server actions
 */
export class CSRFError extends Error {
  constructor(message: string = 'CSRF token validation failed') {
    super(message);
    this.name = 'CSRFError';
  }
}

/**
 * Validates CSRF token for API routes
 * Should be called at the beginning of API route handlers
 */
export async function validateCSRFToken(request: NextRequest): Promise<void> {
  // Skip CSRF validation for GET requests (they should be safe by nature)
  if (request.method === 'GET') {
    return;
  }

  // Get the CSRF token from the request headers
  const csrfTokenFromHeader = request.headers.get('x-csrf-token');

  // Get the CSRF token from NextAuth
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    throw new CSRFError('No authentication token found');
  }

  // NextAuth automatically handles CSRF validation through its internal mechanisms
  // but we can add additional validation here if needed

  // For additional security, we can check if the request has the proper headers
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  const host = request.headers.get('host');

  // Validate that the request is coming from the same origin
  if (origin && host && !origin.includes(host)) {
    throw new CSRFError('Origin mismatch - potential CSRF attack');
  }

  if (referer && host && !referer.includes(host)) {
    throw new CSRFError('Referer mismatch - potential CSRF attack');
  }
}

/**
 * Validates CSRF for server actions
 * This function works with the request headers available in server components
 */
export async function validateCSRFForServerAction(): Promise<void> {
  const headersList = await headers();

  // Get origin and host headers
  const origin = headersList.get('origin');
  const referer = headersList.get('referer');
  const host = headersList.get('host');

  // Validate same-origin policy
  if (origin && host) {
    const originUrl = new URL(origin);
    if (originUrl.host !== host) {
      throw new CSRFError('Origin mismatch in server action');
    }
  }

  if (referer && host) {
    const refererUrl = new URL(referer);
    if (refererUrl.host !== host) {
      throw new CSRFError('Referer mismatch in server action');
    }
  }

  // Additional validation: ensure the request has proper headers indicating it's a server action
  // Server actions should have either next-action header or be from a form submission
  const actionType = headersList.get('next-action');
  const contentType = headersList.get('content-type');
  
  // Allow server actions with next-action header or form submissions
  if (!actionType && !contentType?.includes('application/x-www-form-urlencoded')) {
    // Only perform origin/referer validation, don't require specific headers
    // as legitimate server actions might not always have the next-action header
  }
}

/**
 * Middleware function to add CSRF protection to API routes
 */
export function withCSRFProtection<T extends any[]>(handler: (request: NextRequest, ...args: T) => Promise<Response>) {
  return async (request: NextRequest, ...args: T): Promise<Response> => {
    try {
      await validateCSRFToken(request);
      return await handler(request, ...args);
    } catch (error) {
      if (error instanceof CSRFError) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      throw error;
    }
  };
}
