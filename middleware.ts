import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { i18nConfig, localePattern } from './i18n/config';

// Create i18n middleware
const intlMiddleware = createIntlMiddleware({
  ...routing,
  locales: i18nConfig.locales,
  defaultLocale: i18nConfig.defaultLocale,
});

// List of public paths that don't require authentication
const PUBLIC_PATHS = ['/login'];
const SKIP_MIDDLEWARE_PATHS = ['/_next', '/api/auth', '/_vercel'];
// API paths that need CSRF protection
const CSRF_PROTECTED_PATHS = ['/api/patients', '/api/staff', '/api/regions', '/api/xlsx'];

async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for static files and system paths
  if (SKIP_MIDDLEWARE_PATHS.some(path => pathname.startsWith(path)) || pathname.includes('.')) {
    return NextResponse.next();
  }

  // Add CSRF protection headers for API routes
  if (CSRF_PROTECTED_PATHS.some(path => pathname.startsWith(path))) {
    // Validate origin and referer for state-changing operations
    if (request.method !== 'GET') {
      const origin = request.headers.get('origin');
      const referer = request.headers.get('referer');
      const host = request.headers.get('host');

      if (origin && host && !origin.includes(host)) {
        return NextResponse.json(
          { error: 'CSRF protection: Origin mismatch' },
          { status: 403 }
        );
      }

      if (referer && host && !referer.includes(host)) {
        return NextResponse.json(
          { error: 'CSRF protection: Referer mismatch' },
          { status: 403 }
        );
      }
    }
  }

  // Handle i18n
  const response = await intlMiddleware(request);

  // Get path without locale prefix
  const pathWithoutLocale = pathname.replace(new RegExp(`^\/(?:${localePattern})`), '');

  // Allow access to public paths
  if (PUBLIC_PATHS.some(path => pathWithoutLocale.startsWith(path))) {
    return response;
  }

  // Check authentication
  const session = request.cookies.get('next-auth.session-token');
  if (!session) {
    const locale =
      pathname.match(new RegExp(`^\/(?:${localePattern})\/`))?.[0]?.replace(/\//g, '') ?? i18nConfig.defaultLocale;

    const returnTo = `/${locale}${pathWithoutLocale}${request.nextUrl.search}`;
    const loginUrl = new URL(`/${locale}/login`, request.url);
    loginUrl.searchParams.set('callbackUrl', returnTo);

    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export default middleware;

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
