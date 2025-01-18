import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Create i18n middleware
const intlMiddleware = createIntlMiddleware({
  ...routing,
  // Add locales configuration directly here
  locales: ['ka', 'en'],
  defaultLocale: 'ka',
});

// List of public paths that don't require authentication
const PUBLIC_PATHS = ['/login'];

async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_vercel') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Handle i18n first to ensure proper locale paths
  const response = await intlMiddleware(request);

  // Extract the path without locale prefix for checking
  const pathWithoutLocale = pathname.replace(/^\/(?:ka|en)/, '');

  const isPublicPath = PUBLIC_PATHS.some(path => pathWithoutLocale.startsWith(path));

  // Get session token from cookie
  const session = request.cookies.get('next-auth.session-token');

  // Allow access to public paths regardless of authentication
  if (isPublicPath) {
    return response;
  }

  // For protected paths, check authentication
  if (!session) {
    // Get the locale from the response URL instead of manually parsing the pathname
    const responseUrl = response.headers.get('x-middleware-rewrite') || request.url;
    const locale = new URL(responseUrl).pathname.match(/^\/([a-z]{2})/)?.[1] || routing.defaultLocale;

    // Redirect to login while preserving the locale
    const loginUrl = new URL(`/${locale}/login`, request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If authenticated, return the i18n response
  return response;
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
