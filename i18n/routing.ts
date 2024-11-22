import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['ka'],
  defaultLocale: 'ka',
  localePrefix: {
    mode: 'as-needed',
    prefixes: {
      ka: '/ka',
    },
  },
  pathnames: {
    '/': '/',
  },
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
