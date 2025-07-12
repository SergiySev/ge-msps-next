import { withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // Configure webpack cache for better performance
  webpack: (config, { dev, isServer }) => {
    // Enable cache in all environments with proper configuration
    if (!dev) {
      // Use filesystem cache for production builds
      config.cache = {
        type: 'filesystem',
        buildDependencies: {
          config: [__filename],
        },
        // Customize cache directory to avoid conflicts
        cacheDirectory: path.resolve('.next/cache/webpack'),
        // Set compression to reduce cache size
        compression: 'gzip',
      };
    }
    return config;
  },
};

// Ensure SENTRY_AUTH_TOKEN is available
const sentryAuthToken = process.env.SENTRY_AUTH_TOKEN;
if (!sentryAuthToken && process.env.NODE_ENV === 'production') {
  console.warn('⚠️ SENTRY_AUTH_TOKEN is not set in production. Sentry source maps upload will be disabled.');
}

// Sentry configuration
const sentryConfig = {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: 'dnt-lr',
  project: 'ge-msps',
  authToken: sentryAuthToken,

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Automatically annotate React components to show their full name in breadcrumbs and session replay
  reactComponentAnnotation: {
    enabled: true,
  },

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: '/monitoring',

  // Enable source maps for better debugging in production
  sourcemaps: {
    disable: false,
  },

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,

  // Disable telemetry collection
  telemetry: false,
};

// Only enable Sentry in production
const isProduction = process.env.NODE_ENV === 'production';

export default isProduction ? withSentryConfig(withNextIntl(nextConfig), sentryConfig) : withNextIntl(nextConfig);
