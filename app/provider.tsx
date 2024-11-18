'use client';

import { NextUIProvider } from '@nextui-org/react';
import Menu from 'msps/lib/components/menu/Menu';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider locale="en-GB">
      <Menu className="mb-12" />
      {children}
    </NextUIProvider>
  );
}
