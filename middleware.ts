import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Create i18n middleware
const intlMiddleware = createIntlMiddleware(routing);

// List of public paths that don't require authentication
const PUBLIC_PATHS = ['/login'];

async function middleware(request: NextRequest) {
  const isPublicPath = PUBLIC_PATHS.some(path => request.nextUrl.pathname.startsWith(path));

  // Get session token from cookie
  const session = request.cookies.get('next-auth.session-token');

  // For public paths (like login), just handle i18n
  if (isPublicPath) {
    return intlMiddleware(request);
  }

  // For protected paths, check authentication
  if (!session) {
    // Redirect to login if not authenticated
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If authenticated, handle i18n
  return intlMiddleware(request);
}

export default middleware;

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
