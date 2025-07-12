namespace NodeJS {
  interface ProcessEnv {
    // Database
    DATABASE_URL: string;

    // Authentication
    NEXTAUTH_SECRET: string;
    APP_WRITE_KEY: string;

    // Sentry
    SENTRY_AUTH_TOKEN?: string;

    // Environment
    NODE_ENV: 'development' | 'production' | 'test';
    NEXT_RUNTIME?: 'nodejs' | 'edge';

    // CI/CD
    CI?: string;
  }
}
