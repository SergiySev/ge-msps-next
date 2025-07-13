'use client';

import { Spinner } from '@heroui/react';
import { useTranslations } from 'next-intl';

export default function Loading() {
  const t = useTranslations();

  return (
    <div className="w-full h-80 flex justify-center items-center">
      <Spinner size="lg" color="primary" label={t('loading')} />
    </div>
  );
}
