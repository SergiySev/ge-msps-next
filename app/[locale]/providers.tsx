'use client';

import { NextUIProvider } from '@nextui-org/react';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import Menu from 'msps/lib/components/menu/Menu';
import { SessionProvider } from 'next-auth/react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <NextUIProvider locale="en-GB">
        <Menu className="mb-12" />
        <NuqsAdapter>{children}</NuqsAdapter>
      </NextUIProvider>
    </SessionProvider>
  );
}
