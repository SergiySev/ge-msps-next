import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['ka', 'en'],
  defaultLocale: 'ka',
  localePrefix: {
    mode: 'as-needed',
    prefixes: {
      en: '/en',
    },
  },
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
