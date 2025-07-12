# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `npm run dev` - Start development server with Turbopack (preferred)
- `npm run dev-sentry` - Start development server with Sentry instrumentation
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint checks

### Environment Setup
Required `.env` variables:
```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
DATABASE_URL=mysql://user:password@host:port/database
```

## Project Architecture

### Medical Information System
This is a hospital-based medical patient management system (MSPS) built with Next.js 15. The system tracks patients across different medical departments including peritoneal dialysis (PD), infectious diseases, kidney assessments, and general patient management.

### Core Architecture Patterns

**Multi-tenancy**: Hospital-based isolation where users can only access data from their assigned hospital. This is enforced at multiple levels:
- Database queries include `hospital_id` filters
- Server actions validate hospital access via `recordAccessClient`
- Authentication middleware checks hospital permissions

**Server Actions with Type Safety**: Uses `next-safe-action` library for type-safe server actions:
- Actions are defined in `lib/actions/` with schema validation
- Form components use `useHookFormAction` hook for integration
- CSRF protection and authentication built into action clients

**Controlled Form Components**: All form inputs are centralized in `lib/components/controlled-form-components/`:
- `ControlledInput`, `ControlledSelect`, `ControlledDateInput`, etc.
- Consistent validation and styling across forms
- Form schemas defined in `lib/validation/`

### Key Directory Structure

- `app/[locale]/` - Next.js 15 app router with internationalization
  - `(patient)/` - Patient management routes
  - `(pd)/` - Peritoneal dialysis routes
  - `admin/` - Hospital administration
  - `profile/[id]/` - User profiles with medical data views
- `lib/` - Core application logic
  - `actions/` - Server actions for CRUD operations
  - `auth/` - Authentication, permissions, and CSRF protection
  - `components/` - Reusable UI components
  - `validation/` - Zod schemas for client/server validation
- `prisma/` - Database schema and migrations
- `messages/` - i18n translation files (en.json, ka.json)

### Database Schema
Uses Prisma with MySQL. Core entities:
- `hospital` - Multi-tenant organization units
- `patient` - Main patient records
- `staff` - Medical staff with role-based permissions
- `infectious`, `noninfectious`, `pd`, `kidney_assessment` - Medical assessment types

### Authentication & Authorization
- NextAuth.js with role-based permissions (admin, doctor, nurse)
- Hospital-based data isolation
- CSRF protection on all state-changing operations
- Permission checks: `checkCreatePermission`, `checkUpdatePermission`, `checkDeletePermission`

### Internationalization
- Uses `next-intl` for i18n with Georgian (ka) and English (en)
- Translations in `messages/` directory
- Locale routing via middleware

### Styling and UI
- TailwindCSS for all styling (no custom CSS)
- HeroUI React components for UI primitives
- Responsive design with mobile-first approach

## Development Guidelines

### Server Actions
Always use the appropriate action client based on operation type:
- `createActionClient` - For creating new records
- `updateActionClient` - For updating existing records (includes record access check)
- `deleteActionClient` - For deleting records (includes record access check)

### Form Development
1. Create validation schemas in `lib/validation/`
2. Use controlled form components from `lib/components/controlled-form-components/`
3. Implement forms with `useHookFormAction` hook
4. Follow the pattern in `PatientForm.tsx` for consistent form structure

### Code Style Requirements
- Use Tailwind classes exclusively (enforced by .cursorrules)
- Event handlers must be prefixed with 'handle'
- Form components must be in `controlled-form-components` directory
- Server components require proper directives
- Next.js 15: Route params are directly accessible (not Promise-wrapped)

### Database Operations
- Always include hospital access checks for multi-tenancy
- Use hospital_id filters in all patient-related queries
- Include audit fields: `created_by`, `updated_by`, `created_at`, `updated_at`

### Testing
No specific test framework configured. Check README for testing instructions if needed.