'use client';

import { Spinner } from '@heroui/react';

export default function Loading() {
  return (
    <div className="w-full h-80 flex justify-center items-center">
      <Spinner size="lg" color="primary" label="იტვირთება..." />
    </div>
  );
}
