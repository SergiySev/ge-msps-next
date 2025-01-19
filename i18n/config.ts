export const LOCALES = ['ka', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

export const i18nConfig = {
  defaultLocale: 'ka' as const,
  locales: LOCALES,
} as const;

// Helper to create a locale matcher pattern for regex
export const localePattern = LOCALES.join('|');
