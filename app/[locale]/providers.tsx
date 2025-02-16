'use client';

import { HeroUIProvider } from "@heroui/react";
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import Menu from 'msps/lib/components/menu/Menu';
import { SessionProvider } from 'next-auth/react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <HeroUIProvider locale="en-GB">
        <Menu className="mb-12" />
        <NuqsAdapter>{children}</NuqsAdapter>
      </HeroUIProvider>
    </SessionProvider>
  );
}
