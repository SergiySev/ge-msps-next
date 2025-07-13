'use client';

import { HeroUIProvider } from '@heroui/react';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import Menu from 'msps/lib/components/menu/Menu';
import { SessionProvider, useSession } from 'next-auth/react';
import { Spinner } from '@heroui/react';
import { useTranslations } from 'next-intl';

function AppContent({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const t = useTranslations();

  // Show global loading overlay only while session is loading
  if (status === 'loading') {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <Spinner size="lg" color="primary" label={t('loading')} />
      </div>
    );
  }

  return (
    <>
      <Menu className="mb-12" />
      <NuqsAdapter>{children}</NuqsAdapter>
    </>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <HeroUIProvider locale="en-GB">
        <AppContent>{children}</AppContent>
      </HeroUIProvider>
    </SessionProvider>
  );
}
