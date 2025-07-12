
# Project Improvements

This document outlines remaining valid improvements for the GE-MSPS-Next project.

## 1. Testing (CRITICAL)

The project currently lacks a testing framework. This is a critical weakness that should be addressed as soon as possible.

**Status:** Not implemented
**Priority:** Critical

**Recommendation:**

*   Integrate a testing framework like Jest and React Testing Library.
*   Write unit tests for all components, hooks, and utility functions.
*   Write integration tests for all pages and forms.
*   Set up a CI/CD pipeline to run the tests automatically on every push.

## 2. Dependencies (HIGH PRIORITY)

Many project dependencies are outdated, including several with major version updates available.

**Status:** 29 packages have updates available
**Priority:** High

**Critical Updates Needed:**

*   `@hookform/resolvers`: 4.1.3 → 5.1.1 (major version)
*   `@next-safe-action/adapter-react-hook-form`: 1.0.14 → 2.0.0 (major version)
*   `next-intl`: 3.26.5 → 4.3.4 (major version)
*   `tailwindcss`: 3.4.17 → 4.1.11 (major version)
*   `zod`: 3.24.2 → 4.0.5 (major version)

**Recommendation:**

*   Use `npm-check-updates` to systematically update dependencies
*   Test thoroughly after major version updates, especially for core libraries
*   Update TypeScript types packages to match main package versions

## 3. Next.js Configuration (MEDIUM PRIORITY)

Current configuration has several issues that impact development and production quality.

**Status:** Partially addressed, some issues remain
**Priority:** Medium

**Issues to Fix:**

*   **ESLint ignored during builds** (`eslint.ignoreDuringBuilds: true`) - prevents catching errors early
*   **Webpack cache disabled in production** (`config.cache = false`) - impacts build performance
*   **Source maps disabled in Sentry** (`sourcemaps.disable: true`) - hinders debugging

**Recommendation:**

*   Enable ESLint during builds to catch errors early
*   Re-enable webpack cache in production (investigate original serialization warnings)
*   Enable source maps in Sentry for better debugging in production
